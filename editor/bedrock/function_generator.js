// Create the generator object
Blockly.BedrockFunction = new Blockly.Generator('BedrockFunction');

// Optional: define order constants (not always needed)
Blockly.MyLang.ORDER_ATOMIC = 0;

// Define how each block generates code
Blockly.MyLang['message'] = function (block) {
  const player = block.getFieldValue('PLAYER');
  const message = block.getFieldValue('MESSAGE');
  return 'say ' + player + ' ' + message;
};

// Define workspaceToCode() helper
Blockly.MyLang.finish = function (code) {
  // Add footer or header if desired
  return code;
};
