class Buffer {
  #buffer;
  constructor() {
    this.#buffer = [];
  }

  add(chunk, position) {
    const tmp = this.#buffer.splice(position);
    this.#buffer.push(chunk);
    this.#buffer = [...this.#buffer, ...tmp.splice(1)];
  }

  removeChunk(position) {
    const tmp = this.#buffer.splice(position);
    this.#buffer.pop();
    this.#buffer = [...this.#buffer, ...tmp.splice(1)];
  }

  getData() {
    return this.#buffer.join('');
  }
}

exports.Buffer = Buffer;