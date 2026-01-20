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
Blockly.BedrockMolang.forBlock['q_is_enchanted'] = function(block) {
  const code = `q.is_enchanted`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_is_eating'] = function(block) {
  const code = `q.is_eating`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_is_ghost'] = function(block) {
  const code = `q.is_ghost`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_is_grazing'] = function(block) {
  const code = `q.is_grazing`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_is_jumping'] = function(block) {
  const code = `q.is_jumping`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_is_roaring'] = function(block) {
  const code = `q.is_roaring`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_modified_move_speed'] = function(block) {
  const code = `q.modified_move_speed`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_on_fire_time'] = function(block) {
  const code = `q.on_fire_time`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_time_of_day'] = function(block) {
  const code = `q.time_of_day`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_scoreboard'] = function(block) {
  const code = `q.scoreboard(${getInput(block, "OBJECTIVE")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_structural_integrity'] = function(block) {
  const code = `q.structural_integrity`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_target_rotation'] = function(block) {
  const code = `q.target_${block.getFieldValue("AXIS")}_rotation`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_movement_direction'] = function(block) {
  const code = `q.movement_direction(${getInput(block, "AXIS")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['q_block_has_tag'] = function(block) {
  const code = `q.${block.getFieldValue("MODE")}_has_any_tag(${getInput(block, "X_POS")}, ${getInput(block, "Y_POS")}, ${getInput(block, "Z_POS")}, ${getInput(block, "TAG")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};

Blockly.BedrockMolang.forBlock['v_set'] = function(block) {
  const code = `v.${block.getFieldValue("VAR")} = ${getInput(block, "VALUE")};
`;
  return code;
};
Blockly.BedrockMolang.forBlock['t_set'] = function(block) {
  const code = `t.${block.getFieldValue("VAR")} = ${getInput(block, "VALUE")};
`;
  return code;
};

Blockly.BedrockMolang.forBlock['v_get_custom'] = function(block) {
  const code = `v.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['v_get_custom_bool'] = function(block) {
  const code = `v.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['t_get'] = function(block) {
  const code = `t.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['t_get_bool'] = function(block) {
  const code = `t.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};

Blockly.BedrockMolang.forBlock['v_get_built_in'] = function(block) {
  const code = `v.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['v_get_built_in_bool'] = function(block) {
  const code = `v.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['c_get'] = function(block) {
  const code = `c.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['c_get_bool'] = function(block) {
  const code = `c.${block.getFieldValue("VAR")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};

Blockly.BedrockMolang.forBlock['loop_repeat'] = function(block) {
  const code = `loop(${getInput(block, "TIMES")}, {
${getStatement(block, "CODE")}});
`;
  return code;
};
Blockly.BedrockMolang.forBlock['loop_break'] = function(block) {
  const code = `break;
`;
  return code;
};
Blockly.BedrockMolang.forBlock['loop_continue'] = function(block) {
  const code = `continue;
`;
  return code;
};

Blockly.BedrockMolang.forBlock['math_comparison'] = function(block) {
  const code = `${getInput(block, "VALUE1")} ${block.getFieldValue("OPERATOR")} ${getInput(block, "VALUE2")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_boolean_logic'] = function(block) {
  const code = `${getInput(block, "VALUE1")} ${block.getFieldValue("OPERATOR")} ${getInput(block, "VALUE2")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_if'] = function(block) {
  const code = `${getInput(block, "CONDITION")} ? ${getInput(block, "VALUE")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_if_else'] = function(block) {
  const code = `${getInput(block, "CONDITION")} ? ${getInput(block, "VALUE1")} : ${getInput(block, "VALUE2")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_arithmetic'] = function(block) {
  const code = `${getInput(block, "VALUE1")} ${block.getFieldValue("OPERATOR")} ${getInput(block, "VALUE2")}`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_pi'] = function(block) {
  const code = `math.pi`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_random'] = function(block) {
  const code = `math.${getInput(block, "MODE")}(${getInput(block, "VALUE1")}, ${getInput(block, "VALUE2")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_func_1'] = function(block) {
  const code = `math.${getInput(block, "MODE")}(${getInput(block, "VALUE")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_func_2'] = function(block) {
  const code = `math.${getInput(block, "MODE")}(${getInput(block, "VALUE1")}, ${getInput(block, "VALUE2")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_clamp'] = function(block) {
  const code = `math.clamp(${getInput(block, "VALUE")}, ${getInput(block, "MIN")}, ${getInput(block, "MAX")})`;
  return [code, Blockly.BedrockMolang.ORDER_ATOMIC];
};
Blockly.BedrockMolang.forBlock['math_lerp'] = function(block) {
  const code = `math.${getInput(block, "MODE")}(${getInput(block, "VALUE1")}, ${getInput(block, "VALUE2")}, ${getInput(block, "T")})`;
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