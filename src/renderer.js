class Renderer {

  #addCursor(data, position) {
    const nextCharIndex = position + 1;
    const char = data[nextCharIndex] || '│';

    data[nextCharIndex] = `\x1b[1;30;5m${char}\x1b[0m`;
  }

  #renderWindow(frame, position, mode) {
    this.clearScr();
    process.stdout.write(mode + '\n');
    frame.forEach((char, _column) => {
      process.stdout.write(char || '');
    });
  }

  clearScr() {
    console.clear();
  }

  render(data, position, mode) {
    this.#addCursor(data, position);
    this.#renderWindow(data, position, mode);
  }
}

exports.Renderer = Renderer;