class Renderer {

  #windowOrientation() {
    return process.stdout.getWindowSize();
  }

  #addCursor(data, position) {
    const nextCharIndex = position + 1;
    const char = data[nextCharIndex] || '│';

    data[nextCharIndex] = `\x1b[1;30;5m${char}\x1b[0m`;
  }

  #renderWindow(frame, position) {
    this.clearScr();

    frame.forEach((char, _column) => {
      process.stdout.write(char);
    });

    process.stdout.cursorTo(this.#cursorPosition(position));
  }

  #cursorPosition(position) {
    const [width] = this.#windowOrientation();

    return [position % width, Math.floor(position / width)];
  }

  clearScr() {
    console.clear();
  }

  render(data, position) {
    this.#addCursor(data, position);
    this.#renderWindow(data, position);
  }
}

exports.Renderer = Renderer;