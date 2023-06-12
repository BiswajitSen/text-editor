#!/usr/bin/env node

const fs = require('fs');
const { BufferController, InputController, Buffer, Renderer } = require("./index");
const EventEmitter = require('events');
const { CursorController } = require('./src/cursorController');

const fileSystem = {
  write: fs.writeFileSync,
  read: fs.readFileSync,
  exists: fs.existsSync
}

const main = () => {
  const fileName = process.argv[2];
  const buffer = new Buffer();
  const renderer = new Renderer();
  const eventEmitter = new EventEmitter();
  const ic = new InputController(process.stdin, eventEmitter);
  const cc = new CursorController(eventEmitter);
  const bc = new BufferController(buffer, ic, cc, renderer, fileSystem, fileName);
  bc.start();
}

main();