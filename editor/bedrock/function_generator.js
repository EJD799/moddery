Blockly.BedrockFunction = new Blockly.Generator('BedrockFunction');

Blockly.BedrockFunction.forBlock['message'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const message = block.getFieldValue('MESSAGE');
    return "say " + player + " " + message + "\n";
};
Blockly.BedrockFunction.forBlock['always_day'] = function(block) {
    const value = block.getFieldValue('VALUE');
    return "alwaysday " + value + "\n";
};
Blockly.BedrockFunction.forBlock['clear_inv'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const item_id = block.getFieldValue('ITEM_ID');
    const max_count = block.getFieldValue('MAX_COUNT');
    if (item_id) {
        if (max_count) {
            return "clear " + player + " " + item_id + " 0 " + max_count + "\n";
        } else {
            return "clear " + player + " " + item_id + "\n";
        }
    } else {
        return "clear " + player + "\n";
    }
};
Blockly.BedrockFunction.forBlock['set_block'] = function(block) {
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    const block_id = block.getFieldValue('BLOCK_ID');
    return "setblock " + x_pos + " " + y_pos + " " + z_pos + " " + block_id + "\n";
};
Blockly.BedrockFunction.forBlock['fill_blocks'] = function(block) {
    const x_pos1 = block.getFieldValue('X_POS1');
    const y_pos1 = block.getFieldValue('Y_POS1');
    const z_pos1 = block.getFieldValue('Z_POS1');
    const x_pos2 = block.getFieldValue('X_POS2');
    const y_pos2 = block.getFieldValue('Y_POS2');
    const z_pos2 = block.getFieldValue('Z_POS2');
    const block_id = block.getFieldValue('BLOCK_ID');
    return "setblock " + x_pos1 + " " + y_pos1 + " " + z_pos1 + " " + x_pos2 + " " + y_pos2 + " " + z_pos2 + " " + block_id + "\n";
};
Blockly.BedrockFunction.forBlock['clone_blocks'] = function(block) {
    const x_pos1 = block.getFieldValue('X_POS1');
    const y_pos1 = block.getFieldValue('Y_POS1');
    const z_pos1 = block.getFieldValue('Z_POS1');
    const x_pos2 = block.getFieldValue('X_POS2');
    const y_pos2 = block.getFieldValue('Y_POS2');
    const z_pos2 = block.getFieldValue('Z_POS2');
    const x_pos3 = block.getFieldValue('X_POS3');
    const y_pos3 = block.getFieldValue('Y_POS3');
    const z_pos3 = block.getFieldValue('Z_POS3');
    return "setblock " + x_pos1 + " " + y_pos1 + " " + z_pos1 + " " + x_pos2 + " " + y_pos2 + " " + z_pos2 + " " + x_pos3 + " " + y_pos3 + " " + z_pos3 + "\n";
};
Blockly.BedrockFunction.forBlock['op_status'] = function(block) {
    const mode = block.getFieldValue('MODE');
    const player = block.getFieldValue('PLAYER');
    if (mode = "revoke") {
        return "deop " + player + "\n";
    } else {
        return "op " + player + "\n";
    }
};
Blockly.BedrockFunction.forBlock['difficulty'] = function(block) {
    const difficulty = block.getFieldValue('DIFFICULTY');
    return "difficulty " + difficulty + "\n";
};

// Chaining function for statement blocks
Blockly.BedrockFunction.scrub_ = function(block, code) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = nextBlock ? Blockly.BedrockFunction.blockToCode(nextBlock) : '';
    return code + nextCode;
};

Blockly.BedrockFunction.finish = function(code) { return code; };