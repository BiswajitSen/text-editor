class BufferController {
  #buffer;
  #fs;
  #renderer;
  #fileName;
  #keyBoardController;

  constructor(buffer, keyBoardController, renderer, fs, fileName = "newfile.txt") {
    this.#buffer = buffer;
    this.#keyBoardController = keyBoardController;
    this.#renderer = renderer;
    this.#fileName = fileName;
    this.#fs = fs;
  }

  #saveListener() {
    this.#keyBoardController.on("save", () => {
      this.#keyBoardController.stop();
      this.#fs.write(this.#fileName, this.#buffer.getData());
    });
  }

  #bufferWriteListner() {
    this.#keyBoardController.on("buffer-write", (char) => {
      this.#buffer.add(char);
      this.#renderer.render(this.#buffer.getData());
    });
  }

  #newLineListener() {
    this.#keyBoardController.on("new-line", () => {
      this.#buffer.add('\n');
      this.#renderer.render(this.#buffer.getData());
    });
  }

  #backSpaceListener() {
    this.#keyBoardController.on("backspace", () => {
      this.#buffer.removeChunk();
      this.#renderer.render(this.#buffer.getData());
    });
  }

  #stopListener() {
    this.#keyBoardController.on("stop", () => {
      this.#keyBoardController.stop();
      this.#renderer.render(this.#buffer.getData());
    });
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
  }

  #loadFileContent() {
    if (this.#fs.exists(this.#fileName)) {
      this.#buffer.add(this.#fs.read(this.#fileName).slice(""))
    }
  }

  start() {
    this.#addListeners();
    this.#loadFileContent(this.#fileName);
    this.#renderer.render(this.#buffer.getData());
    this.#keyBoardController.start();
  }
}

exports.BufferController = BufferController;