const fs = require('fs');
const { BufferController, InputController, Buffer, Renderer } = require("./index");

const writer = {
  write: fs.writeFileSync,
}

const main = () => {
  const fileName = process.argv[2];
  const buffer = new Buffer();
  const renderer = new Renderer();
  const ic = new InputController(process.stdin);
  const bc = new BufferController(buffer, ic, renderer, writer, fileName);
  bc.start();
}

main();