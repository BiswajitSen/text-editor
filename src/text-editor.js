class BufferController {
  #buffer
  #fs
  #renderer
  #fileName
  #keyBoardController
  #cursorController

  constructor(buffer, keyBoardController, cursorController, renderer, fs, fileName = "newfile.txt") {
    this.#buffer = buffer;
    this.#keyBoardController = keyBoardController;
    this.#cursorController = cursorController;
    this.#renderer = renderer;
    this.#fileName = fileName;
    this.#fs = fs;
  }

  #loadFileContent() {
    if (this.#fs.exists(this.#fileName)) {
      this.#fs.read(this.#fileName, 'utf-8').split("").forEach((char) => {
      });
    }
  }

  #saveListener() {
    this.#keyBoardController.on("save", () => {
      this.#keyBoardController.stop();
      const content = this.#buffer.getData().join('');
      this.#fs.write(this.#fileName, content);
    });
  }

  #bufferWriteListner() {
    this.#keyBoardController.on("buffer-write", (char) => {
      this.#buffer.add(char, this.#cursorController.position());
      this.#renderer.render(this.#buffer.getData(), this.#cursorController.position());
    });
  }

  #newLineListener() {
    this.#keyBoardController.on("new-line", () => {
      this.#buffer.add('\n', this.#cursorController.position());
      this.#renderer.render(this.#buffer.getData(), this.#cursorController.position());
    });
  }

  #backSpaceListener() {
    this.#keyBoardController.on("backspace", () => {
      this.#buffer.removeChunk(this.#cursorController.position());
      this.#renderer.render(this.#buffer.getData(), this.#cursorController.position());
    });
  }

  #stopListener() {
    this.#keyBoardController.on("stop", () => {
      this.#keyBoardController.stop();
      this.#renderer.render(this.#buffer.getData(), this.#cursorController.position());
    });
  }

  #leftKeyListener() {
    this.#keyBoardController.on('leftKey', () => {
      this.#renderer.render(this.#buffer.getData(), this.#cursorController.position());
    })
  }

  #rightKeyListener() {
    this.#keyBoardController.on('rightKey', () => {
      const pos = this.#cursorController.position();

      if (!this.#buffer.hasElement(pos)) {
        this.#buffer.add(' ', pos);
      }
      this.#renderer.render(this.#buffer.getData(), pos);
    })
  }

  configListener(event, listener) {
    this.#keyBoardController.on(event, listener);
  }

  #addListeners() {
    this.#bufferWriteListner();
    this.#newLineListener();
    this.#backSpaceListener();
    this.#stopListener();
    this.#saveListener();
    this.#leftKeyListener();
    this.#rightKeyListener();
  }

  start() {
    this.#addListeners();
    this.#loadFileContent(this.#fileName);
    this.#renderer.render(this.#buffer.getData(), this.#cursorController.position());
    this.#cursorController.start();
    this.#keyBoardController.start();
  }
}

exports.BufferController = BufferController;