const { KeyBindings, validTokens } = require('./key-bindings.js');

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

  #isAValidToken(key) {
    return key in validTokens;
  }

  #setUpEnvironment() {
    this.#stdin.setRawMode(true);
    this.#stdin.setEncoding('utf-8');
  }

  start() {
    this.#setUpEnvironment();
    this.#stdin.on('data', (key) => {
      const event = KeyBindings[key]
      if (event) this.#eventEmitter.emit(event, key);
      else if (key.match(/\w/) || this.#isAValidToken(key)) this.#eventEmitter.emit('buffer-write', key);
    });
  }

  stop() {
    this.#stdin.setRawMode(false);
    this.#stdin.destroy();
  }
}

exports.InputController = InputController;