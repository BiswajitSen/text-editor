class Renderer {
  constructor() { };

  render(data) {
    console.clear();
    process.stdout.write(data);
  }
}

exports.Renderer = Renderer;