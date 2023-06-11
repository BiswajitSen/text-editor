const fs = require('fs');
const { BufferController, InputController, Buffer, Renderer } = require("./index");
const EventEmitter = require('events');

const fileSystem = {
  write: fs.writeFileSync,
  read: fs.readFileSync,
  exists: fs.existsSync
}

const main = () => {
  const fileName = process.argv[2];
  const buffer = new Buffer();
  const renderer = new Renderer();
  const ic = new InputController(process.stdin, new EventEmitter());
  const bc = new BufferController(buffer, ic, renderer, fileSystem, fileName);
  bc.configListener('new-line', () => { console.log('new Line added') })
  bc.start();
}

main();