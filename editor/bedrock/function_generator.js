Blockly.BedrockFunction = new Blockly.Generator('BedrockFunction');

Blockly.BedrockFunction.forBlock['message'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const message = block.getFieldValue('MESSAGE');
    return "say " + player + " " + message + "\n";
};
Blockly.BedrockFunction.forBlock['always_day'] = function(block) {
    const value = block.getFieldValue('value');
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

// Chaining function for statement blocks
Blockly.BedrockFunction.scrub_ = function(block, code) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = nextBlock ? Blockly.BedrockFunction.blockToCode(nextBlock) : '';
    return code + nextCode;
};

Blockly.BedrockFunction.finish = function(code) { return code; };