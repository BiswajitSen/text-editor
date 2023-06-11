class Buffer {
  #buffer;
  constructor() {
    this.#buffer = [];
  }

  add(chunk) {
    this.#buffer.push(chunk);
  }

  removeChunk() {
    this.#buffer.pop();
  }

  getData() {
    return this.#buffer.join('');
  }
}

exports.Buffer = Buffer;