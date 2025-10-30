// Create the generator object
Blockly.BedrockFunction = new Blockly.Generator('BedrockFunction');

// Optional: define order constants (not always needed)
Blockly.BedrockFunction.ORDER_ATOMIC = 0;

// Define how each block generates code
Blockly.BedrockFunction.forBlock['message'] = function (block) {
  const player = block.getFieldValue('PLAYER');
  const message = block.getFieldValue('MESSAGE');
  return 'say ' + player + ' ' + message;
};

console.log("Registered message generator:", Blockly.BedrockFunction.forBlock);

// Define workspaceToCode() helper
Blockly.BedrockFunction.finish = function (code) {
  // Add footer or header if desired
  return code;
};
