const KeyBindings = {
  '\r': 'new-line',
  '\x1B': 'stop',
  '\x7F': 'backspace',
  '\x13': 'save',
  '\x1B[D': 'leftKey',
  '\x1B[C': 'rightKey'
}

const validTokens = {
  ' ': ' ',
  '.': '.',
  '!': '!',
  '#': '#',
  '$': '$',
  '%': '%',
  '^': '^',
  '*': '*',
  "'": "'",
  '"': '"',
}

exports.KeyBindings = KeyBindings;
exports.validTokens = validTokens;