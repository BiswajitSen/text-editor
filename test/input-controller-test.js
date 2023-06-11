const { describe, it } = require("node:test");
const { InputController } = require("../src/input-controller");
const { strictEqual } = require("assert");

describe('InputController', () => {
  describe('start', () => {
    it('should emit a event, based on the key-pressed.', (context) => {
      const emit = context.mock.fn();
      const setRawMode = context.mock.fn();
      const setEncoding = context.mock.fn();
      const eventEmitter = { emit };
      const on = context.mock.fn((_, callback) => {
        const key = 'a';
        callback(key);
      });
      const stdin = { on, setEncoding, setRawMode };
      const ic = new InputController(stdin, eventEmitter);

      ic.start();
      const actual = eventEmitter.emit.mock.callCount();
      const expected = 1;

      strictEqual(actual, expected);
    });

    it("should emit a buffer-write event, if pressed key isn't binded.", (context) => {
      const emit = context.mock.fn();
      const setRawMode = context.mock.fn();
      const setEncoding = context.mock.fn();
      const eventEmitter = { emit };
      const on = context.mock.fn((_, callback) => {
        const key = 'a';
        callback(key);
      });
      const stdin = { on, setEncoding, setRawMode };
      const ic = new InputController(stdin, eventEmitter);

      ic.start();
      const actual = eventEmitter.emit.mock.calls[0].arguments[0];
      const expected = 'buffer-write';

      strictEqual(actual, expected);
    });

    it("should emit a event with a key, if pressed key isn't binded.", (context) => {
      const emit = context.mock.fn();
      const setRawMode = context.mock.fn();
      const setEncoding = context.mock.fn();
      const eventEmitter = { emit };
      const on = context.mock.fn((_, callback) => {
        const key = 'a';
        callback(key);
      });
      const stdin = { on, setEncoding, setRawMode };
      const ic = new InputController(stdin, eventEmitter);

      ic.start();
      const actual = eventEmitter.emit.mock.calls[0].arguments[1];
      const expected = 'a';

      strictEqual(actual, expected);
    });
  });

  describe('start', () => {
    it('should emit a special event, if a binded key is pressed.', (context) => {
      const emit = context.mock.fn();
      const setRawMode = context.mock.fn();
      const setEncoding = context.mock.fn();
      const eventEmitter = { emit };
      const on = context.mock.fn((_, callback) => {
        const key = '\r';
        callback(key);
      });
      const stdin = { on, setEncoding, setRawMode };
      const ic = new InputController(stdin, eventEmitter);

      ic.start();
      const actual = eventEmitter.emit.mock.callCount();
      const expected = 1;

      strictEqual(actual, expected);
    });

    it("should emit a new-line event, if pressed key is '⎆'.", (context) => {
      const emit = context.mock.fn();
      const setRawMode = context.mock.fn();
      const setEncoding = context.mock.fn();
      const eventEmitter = { emit };
      const on = context.mock.fn((_, callback) => {
        const key = '\r';
        callback(key);
      });
      const stdin = { on, setEncoding, setRawMode };
      const ic = new InputController(stdin, eventEmitter);

      ic.start();
      const actual = eventEmitter.emit.mock.calls[0].arguments[0];
      const expected = 'new-line';

      strictEqual(actual, expected);
    });

    it("should emit a stop event, if pressed keys are 'ctrl + s'.", (context) => {
      const emit = context.mock.fn();
      const setRawMode = context.mock.fn();
      const setEncoding = context.mock.fn();
      const eventEmitter = { emit };
      const on = context.mock.fn((_, callback) => {
        const key = '\x1B';
        callback(key);
      });
      const stdin = { on, setEncoding, setRawMode };
      const ic = new InputController(stdin, eventEmitter);

      ic.start();
      const actual = eventEmitter.emit.mock.calls[0].arguments[0];
      const expected = 'stop';

      strictEqual(actual, expected);
    });

    it("should emit a backspace event, if pressed keys are 'ctrl + s'.", (context) => {
      const emit = context.mock.fn();
      const setRawMode = context.mock.fn();
      const setEncoding = context.mock.fn();
      const eventEmitter = { emit };
      const on = context.mock.fn((_, callback) => {
        const key = '\x7F';
        callback(key);
      });
      const stdin = { on, setEncoding, setRawMode };
      const ic = new InputController(stdin, eventEmitter);

      ic.start();
      const actual = eventEmitter.emit.mock.calls[0].arguments[0];
      const expected = 'backspace';

      strictEqual(actual, expected);
    });
  });
})