Blockly.BedrockFunction = new Blockly.Generator('BedrockFunction');

Blockly.BedrockFunction.forBlock['message'] = function(block) {
  const player = block.getFieldValue('PLAYER');
  const message = block.getFieldValue('MESSAGE');
  return `say ${player} ${message}\n`;
};

// Chaining function for statement blocks
Blockly.BedrockFunction.scrub_ = function(block, code) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = nextBlock ? Blockly.BedrockFunction.blockToCode(nextBlock) : '';
  return code + nextCode;
};

Blockly.BedrockFunction.finish = function(code) { return code; };