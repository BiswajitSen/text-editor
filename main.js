const fs = require('fs');
const { BufferController, InputController, Buffer, Renderer } = require("./index");

const fileSystem = {
  write: fs.writeFileSync,
  read: fs.readFileSync,
  exists: fs.existsSync
}

const main = () => {
  const fileName = process.argv[2];
  const buffer = new Buffer();
  const renderer = new Renderer();
  const ic = new InputController(process.stdin);
  const bc = new BufferController(buffer, ic, renderer, fileSystem, fileName);
  bc.start();
}

main();