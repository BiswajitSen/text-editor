class Renderer {

  #windowOrientation() {
    return process.stdout.getWindowSize();
  }

  #renderWindow(frame) {
    const [width] = this.#windowOrientation();
    frame.split('').forEach((char, _column) => {
      process.stdout.write(char);
      if ((_column + 1) % width === 0) {
        process.stdout.write('\n');
      }
    });
  }

  #cursorPosition(position) {
    const [width] = this.#windowOrientation();
    return [position % width, Math.floor(position / width)];
  }

  render(data, position) {
    console.clear();
    this.#renderWindow(data);
    const [x, y] = this.#cursorPosition(position);
    process.stdout.cursorTo(x + 1, y);
  }
}

exports.Renderer = Renderer;