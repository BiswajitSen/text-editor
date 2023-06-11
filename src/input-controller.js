const { KeyBindings } = require('./key-bindings.js');

class InputController {
  #stdin
  #eventEmitter

  constructor(stdin, eventEmitter) {
    this.#stdin = stdin;
    this.#eventEmitter = eventEmitter;
  }

  on(event, listener) {
    this.#eventEmitter.on(event, listener);
  }

  #setUpEnvironment() {
    this.#stdin.setRawMode(true);
    this.#stdin.setEncoding('utf-8');
  }

  start() {
    this.#setUpEnvironment();
    this.#stdin.on('data', (key) => {
      const event = KeyBindings[key] || 'buffer-write';
      this.#eventEmitter.emit(event, key);
    });
  }

  stop() {
    this.#stdin.setRawMode(false);
    this.#stdin.destroy();
  }
}

exports.InputController = InputController;