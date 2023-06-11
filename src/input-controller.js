const { EventEmitter } = require('events');

const KeyBindings = {
  '\r': ['new-line', '\n'],
  '\x1B': ['stop', 'ESC'],
  '\x7F': ['backspace', '\x7F'],
  '\x13': ['save', '\x13']
}

class InputController extends EventEmitter {
  #stdin

  constructor(stdin) {
    super();
    this.#stdin = stdin;
  }

  #setUpEnvironment() {
    this.#stdin.setRawMode(true);
    this.#stdin.setEncoding('utf-8');
  }

  start() {
    this.#setUpEnvironment();
    this.#stdin.on('data', (key) => {
      if (key in KeyBindings) {
        const [event, data] = KeyBindings[key];
        this.emit(event, data);
      } else {
        this.emit('buffer-write', key);
      }
    });
  }

  stop() {
    this.#stdin.setRawMode(false);
    this.#stdin.destroy();
  }
}

exports.InputController = InputController;