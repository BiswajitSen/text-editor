const InsertModeKeyBindings = {
  '\r': 'new-line',
  '\x1B': 'change-mode',
  '\x7F': 'backspace',
  '\x13': 'save',
  '\x1B[D': 'leftKey',
  '\x1B[C': 'rightKey',
}

const NormalModeKeyBindings = {
  '\x01': "delete-all",
  d: "delete-line",
  '\x1B': 'change-mode',
  '\x17': "stop",
  "\x13": "save",
  "\x1B[D": "move-left",
  "\x1B[C": "move-right",
};

exports.NormalModeKeyBindings = NormalModeKeyBindings;
exports.InsertModeKeyBindings = InsertModeKeyBindings;