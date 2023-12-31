const { InsertModeKeyBindings, NormalModeKeyBindings } = require('./key-bindings.js');

const Bindings = {
  'INSERT': InsertModeKeyBindings,
  'NORMAL': NormalModeKeyBindings,
};

class InputController {
  #stdin
  #eventEmitter
  #currentKeyBindings
  #modeId
  #modeBindings

  constructor(stdin, eventEmitter) {
    this.#stdin = stdin;
    this.#eventEmitter = eventEmitter;
    this.#modeId = 0;
    this.#currentKeyBindings = InsertModeKeyBindings;
    this.#modeBindings = Object.values(Bindings);
  }

  #addChangeModeListener() {
    this.#eventEmitter.on('change-mode', () => {
      this.#modeId = (this.#modeId + 1) % this.#modeBindings.length;
      this.#currentKeyBindings = this.#modeBindings[this.#modeId];
    })
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
    this.#addChangeModeListener();
    this.#stdin.on('data', (key) => {
      if (this.#modeId === 0) {
        const event = this.#currentKeyBindings[key] || 'buffer-write';
        this.#eventEmitter.emit(event, key);
      } else {
        this.#eventEmitter.emit(this.#currentKeyBindings[key], key);
      }
    });
  }

  stop() {
    this.#stdin.setRawMode(false);
    this.#stdin.destroy();
  }
}

exports.InputController = InputController;