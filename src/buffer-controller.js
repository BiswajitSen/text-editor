class BufferController {
  #buffer;
  #writer;
  #renderer;
  #fileName;
  #keyBoardController;

  constructor(buffer, keyBoardController, renderer, writer, fileName = "newfile.txt") {
    this.#buffer = buffer;
    this.#keyBoardController = keyBoardController;
    this.#renderer = renderer;
    this.#fileName = fileName;
    this.#writer = writer;
  }

  #saveListener() {
    this.#keyBoardController.on("save", () => {
      this.#keyBoardController.stop();
      this.#writer.write(this.#fileName, this.#buffer.getData());
    });
  }

  #bufferWriteListner() {
    this.#keyBoardController.on("buffer-write", (char) => {
      this.#buffer.add(char);
      this.#renderer.render(this.#buffer.getData());
    });
  }

  #newLineListener() {
    this.#keyBoardController.on("new-line", (char) => {
      this.#buffer.add(char);
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

  #addListeners() {
    this.#bufferWriteListner();
    this.#newLineListener();
    this.#backSpaceListener();
    this.#stopListener();
    this.#saveListener();
  }

  start() {
    this.#addListeners();
    this.#keyBoardController.start();
  }
}

exports.BufferController = BufferController;