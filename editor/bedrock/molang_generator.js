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
Blockly.BedrockMolang.forBlock['item_slot_menu'] = function(block) {
  const code = `'${block.getFieldValue("SLOT")}'`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['armor_slot_menu'] = function(block) {
  const code = `${block.getFieldValue("SLOT")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['axis_menu'] = function(block) {
  const code = `${block.getFieldValue("AXIS")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};

Blockly.BedrockMolang.forBlock['q_armor_x_slot'] = function(block) {
  const code = `q.armor_${block.getFieldValue("TYPE")}_slot(${getInput(block, "SLOT")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_is_name'] = function(block) {
  const code = `q.is_name_any(${getInput(block, "NAME")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_is_item_name'] = function(block) {
  const code = `q.is_item_name_any(${getInput(block, "SLOT")}, ${getInput(block, "SLOT_NUMBER")}, ${getInput(block, "ITEM")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
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