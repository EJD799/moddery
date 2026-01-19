function getInput(block, name) {
  return (
    Blockly.BedrockMolang.valueToCode(
      block,
      name,
      Blockly.BedrockMolang.ORDER_ATOMIC
    ) || '0'
  );
}

function getStatement(block, name) {
  return Blockly.BedrockMolang.statementToCode(block, name);
}

Blockly.BedrockMolang = new Blockly.Generator('BedrockMolang');
Blockly.BedrockMolang.ORDER_ATOMIC = 0;


Blockly.BedrockMolang.forBlock['text'] = function(block) {
  const text = block.getFieldValue('TEXT');
  const escaped = text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
  return [`'${escaped}'`, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_number'] = function(block) {
  const num = block.getFieldValue('NUM');
  return [num, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_boolean'] = function(block) {
  const value = block.getFieldValue('BOOL');
  return [value, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['return_val'] = function(block) {
  const code = `return ${getInput(block, "VALUE")};
`;
  return code;
};


Blockly.BedrockMolang.workspaceToCode = function (workspace) {
  // Find the return block
  const returnBlock = workspace.getAllBlocks(false).find(
    b => b.type === 'return_val'
  );
  if (!returnBlock) return '';

  // Walk upward from return_val, collecting blocks
  const blocks = [];
  let current =
    returnBlock.previousConnection &&
    returnBlock.previousConnection.targetBlock();

  while (current) {
    blocks.push(current);
    current =
      current.previousConnection &&
      current.previousConnection.targetBlock();
  }

  // Restore execution order (top → bottom)
  blocks.reverse();

  let code = '';

  // Generate code for all blocks before return
  for (const block of blocks) {
    const line = this.blockToCode(block);
    if (typeof line === 'string') {
      code += line;
    }
  }

  // Generate the return statement itself
  const returnCode = this.blockToCode(returnBlock);
  if (typeof returnCode === 'string') {
    code += returnCode;
  }

  return this.finish(code);
};


Blockly.BedrockMolang.finish = function(code) { return code; };