Blockly.JavaFunction = new Blockly.Generator('JavaFunction');

Blockly.JavaFunction.forBlock['message'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const message = block.getFieldValue('MESSAGE');
    return `say ${player} ${message}\n`;
};
Blockly.JavaFunction.forBlock['always_day'] = function(block) {
    const value = block.getFieldValue('VALUE');
    return `alwaysday ${value}\n`;
};
Blockly.JavaFunction.forBlock['clear_inv'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const item_id = block.getFieldValue('ITEM_ID');
    const max_count = block.getFieldValue('MAX_COUNT');
    if (item_id) {
        if (max_count) {
            return `clear ${player} ${item_id} 0 ${max_count}\n`;
        } else {
            return `clear ${player} ${item_id}\n`;
        }
    } else {
        return `clear ${player}\n`;
    }
};
Blockly.JavaFunction.forBlock['set_block'] = function(block) {
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    const block_id = block.getFieldValue('BLOCK_ID');
    return `setblock ${x_pos} ${y_pos} ${z_pos} ${block_id}\n`;
};
Blockly.JavaFunction.forBlock['fill_blocks'] = function(block) {
    const x_pos1 = block.getFieldValue('X_POS1');
    const y_pos1 = block.getFieldValue('Y_POS1');
    const z_pos1 = block.getFieldValue('Z_POS1');
    const x_pos2 = block.getFieldValue('X_POS2');
    const y_pos2 = block.getFieldValue('Y_POS2');
    const z_pos2 = block.getFieldValue('Z_POS2');
    const block_id = block.getFieldValue('BLOCK_ID');
    return `fill ${x_pos1} ${y_pos1} ${z_pos1} ${x_pos2} ${y_pos2} ${z_pos2} ${block_id}\n`;
};
Blockly.JavaFunction.forBlock['clone_blocks'] = function(block) {
    const x_pos1 = block.getFieldValue('X_POS1');
    const y_pos1 = block.getFieldValue('Y_POS1');
    const z_pos1 = block.getFieldValue('Z_POS1');
    const x_pos2 = block.getFieldValue('X_POS2');
    const y_pos2 = block.getFieldValue('Y_POS2');
    const z_pos2 = block.getFieldValue('Z_POS2');
    const x_pos3 = block.getFieldValue('X_POS3');
    const y_pos3 = block.getFieldValue('Y_POS3');
    const z_pos3 = block.getFieldValue('Z_POS3');
    return `clone ${x_pos1} ${y_pos1} ${z_pos1} ${x_pos2} ${y_pos2} ${z_pos2} ${x_pos3} ${y_pos3} ${z_pos3}\n`;
};
Blockly.JavaFunction.forBlock['op_status'] = function(block) {
    const mode = block.getFieldValue('MODE');
    const player = block.getFieldValue('PLAYER');
    if (mode == "revoke") {
        return `deop ${player}\n`;
    } else {
        return `op ${player}\n`;
    }
};
Blockly.JavaFunction.forBlock['difficulty'] = function(block) {
    const difficulty = block.getFieldValue('DIFFICULTY');
    return `difficulty ${difficulty}\n`;
};
Blockly.JavaFunction.forBlock['gamerule'] = function(block) {
    const rule = block.getFieldValue('RULE');
    const value = block.getFieldValue('VALUE');
    return `gamerule ${rule} ${value}\n`;
};
Blockly.JavaFunction.forBlock['max_players'] = function(block) {
    const max_players = block.getFieldValue('MAX_PLAYERS');
    return `setmaxplayers ${max_players}\n`;
};
Blockly.JavaFunction.forBlock['world_spawn'] = function(block) {
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    return "setworldspawn " + x_pos + " " + y_pos + " " + z_pos + "\n";
};
Blockly.JavaFunction.forBlock['player_spawn'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    return `spawnpoint ${player} ${x_pos} ${y_pos} ${z_pos}\n`;
};
Blockly.JavaFunction.forBlock['run_command'] = function(block) {
    const command = block.getFieldValue('COMMAND');
    return `${command}\n`;
};
Blockly.JavaFunction.forBlock['run_function'] = function(block) {
    const func = block.getFieldValue('FUNCTION');
    return `function ${func}\n`;
};
Blockly.JavaFunction.forBlock['time'] = function(block) {
    const time = block.getFieldValue('TIME');
    return `time set ${time}\n`;
};
Blockly.JavaFunction.forBlock['weather'] = function(block) {
    const weather = block.getFieldValue('WEATHER');
    return `weather ${weather}\n`;
};
Blockly.JavaFunction.forBlock['effect'] = function(block) {
    const effect = block.getFieldValue('EFFECT');
    const level = block.getFieldValue('LEVEL');
    const player = block.getFieldValue('PLAYER');
    const duration = block.getFieldValue('DURATION');
    const hide_particles = block.getFieldValue('HIDE_PARTICLES');
    return `effect ${player} ${effect} ${duration} ${level} ${hide_particles}\n`;
};
Blockly.JavaFunction.forBlock['enchant'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const enchantment = block.getFieldValue('ENCHANTMENT');
    const level = block.getFieldValue('LEVEL');
    return `enchant ${player} ${enchantment} ${level}\n`;
};
Blockly.JavaFunction.forBlock['xp'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const quantity = block.getFieldValue('QUANTITY');
    const format = block.getFieldValue('FORMAT');
    if (format == "levels") {
        return `xp ${quantity}L ${player}\n`;
    } else {
        return `xp ${quantity} ${player}\n`;
    }
};
Blockly.JavaFunction.forBlock['tp_e'] = function(block) {
    const player1 = block.getFieldValue('PLAYER1');
    const player2 = block.getFieldValue('PLAYER2');
    return `tp ${player1} ${player2}\n`;
};
Blockly.JavaFunction.forBlock['tp_xyz'] = function(block) {
    const player1 = block.getFieldValue('PLAYER1');
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    return `tp ${player1} ${x_pos} ${y_pos} ${z_pos}\n`;
};
Blockly.JavaFunction.forBlock['kill'] = function(block) {
    const entity = block.getFieldValue('ENTITY');
    return `kill ${entity}\n`;
};
Blockly.JavaFunction.forBlock['gamemode'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const gamemode = block.getFieldValue('GAMEMODE');
    return `gamemode ${gamemode} ${player}\n`;
};
Blockly.JavaFunction.forBlock['summon'] = function(block) {
    const entity = block.getFieldValue('ENTITY');
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    return `summon ${entity} ${x_pos} ${y_pos} ${z_pos}\n`;
};
Blockly.JavaFunction.forBlock['give'] = function(block) {
    const quantity = block.getFieldValue('QUANTITY');
    const item = block.getFieldValue('ITEM');
    const player = block.getFieldValue('PLAYER');
    return `give ${player} ${item} ${quantity}\n`;
};
Blockly.JavaFunction.forBlock['replaceitem'] = function(block) {
    const slot_type = block.getFieldValue('SLOT_TYPE');
    const slot_number = block.getFieldValue('SLOT_NUMBER');
    const player = block.getFieldValue('PLAYER');
    const quantity = block.getFieldValue('QUANTITY');
    const item = block.getFieldValue('ITEM');
    return `replaceitem entity ${player} ${slot_type} ${slot_number} ${item} ${quantity}\n`;
};
Blockly.JavaFunction.forBlock['particle'] = function(block) {
    const particle = block.getFieldValue('PARTICLE');
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    return `particle ${particle} ${x_pos} ${y_pos} ${z_pos}\n`;
};
Blockly.JavaFunction.forBlock['title'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const style = block.getFieldValue('STYLE');
    const text = block.getFieldValue('TEXT');
    return `title ${player} ${style} ${text}\n`;
};
Blockly.JavaFunction.forBlock['tag'] = function(block) {
    const mode = block.getFieldValue('MODE');
    const tag = block.getFieldValue('TAG');
    const entity = block.getFieldValue('ENTITY');
    return `tag ${entity} ${mode} ${tag}\n`;
};
Blockly.JavaFunction.forBlock['playsound'] = function(block) {
    const sound = block.getFieldValue('SOUND');
    const player = block.getFieldValue('PLAYER');
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    const volume = block.getFieldValue('VOLUME');
    const pitch = block.getFieldValue('PITCH');
    return `playsound ${sound} ${player} ${x_pos} ${y_pos} ${z_pos} ${volume} ${pitch}\n`;
};
Blockly.JavaFunction.forBlock['stopsound'] = function(block) {
    const sound = block.getFieldValue('SOUND');
    const player = block.getFieldValue('PLAYER');
    return `stopsound ${player} ${sound}\n`;
};
Blockly.JavaFunction.forBlock['addobjective'] = function(block) {
    const objective = block.getFieldValue('OBJECTIVE');
    const display_name = block.getFieldValue('DISPLAY_NAME');
    return `scoreboard objectives add ${objective} dummy ${display_name}\n`;
};
Blockly.JavaFunction.forBlock['removeobjective'] = function(block) {
    const objective = block.getFieldValue('OBJECTIVE');
    return `scoreboard objectives remove ${objective}\n`;
};
Blockly.JavaFunction.forBlock['objectivedisplay'] = function(block) {
    const objective = block.getFieldValue('OBJECTIVE');
    const display = block.getFieldValue('DISPLAY');
    if (display == "sidebar_ascending") {
        return `scoreboard objectives setdisplay sidebar ${objective} ascending\n`;
    }
    if (display == "sidebar_descending") {
        return `scoreboard objectives setdisplay sidebar ${objective} descending\n`;
    }
    if (display == "belowname") {
        return `scoreboard objectives setdisplay belowname ${objective}\n`;
    }
};
Blockly.JavaFunction.forBlock['hidedisplay'] = function(block) {
    const display = block.getFieldValue('DISPLAY');
    return `scoreboard objectives setdisplay ${display}\n`;
};
Blockly.JavaFunction.forBlock['operatescore'] = function(block) {
    const mode = block.getFieldValue('MODE');
    const quantity = block.getFieldValue('QUANTITY');
    const player = block.getFieldValue('PLAYER');
    const objective = block.getFieldValue('OBJECTIVE');
    return `scoreboard players ${mode} ${player} ${objective} ${quantity}\n`;
};

// Chaining function for statement blocks
/*Blockly.JavaFunction.scrub_ = function(block, code) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = nextBlock ? Blockly.JavaFunction.blockToCode(nextBlock) : '';
    return code + nextCode;
};*/

Blockly.JavaFunction.workspaceToCode = function (workspace) {
  // Find the hat block
  const hat = workspace.getAllBlocks(false).find(b => b.type === 'on_start');
  if (!hat) return ''; // No start block means no code.

  let code = '';
  // Walk through all blocks chained under the hat
  let current = hat.nextConnection && hat.nextConnection.targetBlock();
  while (current) {
    const line = Blockly.JavaFunction.blockToCode(current);
    if (typeof line === 'string') code += line;
    current = current.nextConnection && current.nextConnection.targetBlock();
  }
  return Blockly.JavaFunction.finish(code);
};

Blockly.JavaFunction.finish = function(code) { return code; };