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
}

exports.Buffer = Buffer;