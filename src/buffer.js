class Buffer {
  #buffer;

  constructor() {
    this.#buffer = [];
  }

  hasElement(position) {
    return this.#buffer[position];
  }

  add(chunk, position) {
    const tmp = this.#buffer.splice(position);
    this.#buffer.push(chunk);
    this.#buffer = [...this.#buffer, ...tmp];
  }

  removeChunk(position) {
    const tmp = this.#buffer.splice(position);
    this.#buffer.pop();
    this.#buffer = [...this.#buffer, ...tmp.splice(0)];
  }

  getData() {
    return this.#buffer.slice(0);
  }

  deleteAll() {
    this.#buffer.splice(0);
  }

  deleteALine(position) {
    const startingIndex = this.#buffer.lastIndexOf('\n', position);
    if (startingIndex !== -1) {
      this.#buffer.splice(startingIndex, position - startingIndex);
    }
    this.#buffer.splice(0);
  }
}

exports.Buffer = Buffer;