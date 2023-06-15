class Renderer {

  #windowOrientation() {
    return process.stdout.getWindowSize();
  }

  #renderWindow(frame, position) {
    console.clear();
    frame.forEach((char, _column) => {
      process.stdout.cursorTo(this.#cursorPosition(position.x));
      process.stdout.write(char);
    });
  }

  #cursorPosition(position) {
    const [width] = this.#windowOrientation();
    return [position % width, Math.floor(position / width)];
  }

  render(data, position) {
    this.#renderWindow(data, position);
  }
}

exports.Renderer = Renderer;