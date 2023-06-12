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

  position() {
    return this.#position;
  }

  on(event, listener) {
    this.#eventEmitter.on(event, listener);
  };

  #leftKey() {
    this.#eventEmitter.on("leftKey", () => {
      this.#position--;
      this.#validatePosition();
    })
  };

  #rightKey() {
    this.#eventEmitter.on("rightKey", () => {
      this.#position++;
    })
  };

  #bufferWrite() {
    this.#eventEmitter.on("buffer-write", () => {
      this.#position++;
    })
  }

  #newLineListener() {
    this.#eventEmitter.on("new-line", () => {
      this.#position++;
    });
  }

  #backSpaceListener() {
    this.#eventEmitter.on("backspace", () => {
      this.#position--;
      this.#validatePosition();
    });
  }

  configListener(event, listener) {
    this.#eventEmitter.on(event, listener);
  }

  #tabEvent() {
    this.#eventEmitter.on('tab', () => {
      this.#position++;
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

  start() {
    this.#addListeners();
  }

}

exports.CursorController = CursorController;