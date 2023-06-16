class CursorController {
  #position
  #eventEmitter

  constructor(eventEmitter) {
    this.#position = 0;
    this.#eventEmitter = eventEmitter;
  };

  #validatePosition() {
    if (this.#position < 0) {
      this.#position = 0;
    }
  }

  #pointToNextCell() {
    this.#position++;
  }

  #pointToPreviousCell() {
    this.#position--;
  }

  position() {
    return this.#position;
  }

  on(event, listener) {
    this.#eventEmitter.on(event, listener);
  };

  fireEvent(eventName) {
    this.#eventEmitter.emit(eventName);
  }

  #leftKey() {
    this.#eventEmitter.on("leftKey", () => {
      this.#pointToPreviousCell();
      this.#validatePosition();
    })
  };

  #rightKey() {
    this.#eventEmitter.on("rightKey", () => {
      this.#pointToNextCell();
    })
  };

  #deleteWord() {
    //TODO
  }

  #deleteLine() {
    //TODO
  }

  #bufferWrite() {
    this.#eventEmitter.on("buffer-write", () => {
      this.#pointToNextCell();
    })
  }

  #newLineListener() {
    this.#eventEmitter.on("new-line", () => {
      this.#pointToNextCell();
    });
  }

  #backSpaceListener() {
    this.#eventEmitter.on("backspace", () => {
      this.#pointToPreviousCell();
      this.#validatePosition();
    });
  }

  configListener(event, listener) {
    this.#eventEmitter.on(event, listener);
  }

  #tabEvent() {
    this.#eventEmitter.on('tab', () => {
      this.#pointToNextCell();
      this.#pointToNextCell();
    })
  }

  #addListeners() {
    this.#leftKey();
    this.#rightKey();
    this.#tabEvent();
    this.#backSpaceListener();
    this.#newLineListener();
    this.#bufferWrite();
  }

  #hideCursor() {
    process.stdout.write('\u001B[?25l');
  }

  #showCursor() {
    process.stdout.write('\u001B[?25h');
  }

  #setUpEnvironment() {
    this.#hideCursor();
  }

  start() {
    this.#setUpEnvironment();
    this.#addListeners();
  }

  stop() {
    this.#showCursor();
  }

}

exports.CursorController = CursorController;