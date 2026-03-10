function getInput(block, name) {
    return Blockly.JavaScript.valueToCode(block, name, Blockly.JavaScript.ORDER_ATOMIC) || '0';
}

function getStatement(block, name) {
    return Blockly.JavaFunction.statementToCode(block, name);
}

Blockly.JavaFunction = new Blockly.Generator('JavaFunction');

Blockly.JavaFunction.forBlock['message'] = function(block) {
    const message = block.getFieldValue('MESSAGE');
    return `say ${message}\n`;
};
Blockly.JavaFunction.forBlock['clear_inv'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const item_id = block.getFieldValue('ITEM_ID');
    const max_count = block.getFieldValue('MAX_COUNT');
    if (item_id) {
        if (max_count) {
            return `clear ${player} ${item_id} ${max_count}\n`;
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
    const from_dimension = block.getFieldValue('FROM_DIMENSION');
    const x_pos1 = block.getFieldValue('X_POS1');
    const y_pos1 = block.getFieldValue('Y_POS1');
    const z_pos1 = block.getFieldValue('Z_POS1');
    const x_pos2 = block.getFieldValue('X_POS2');
    const y_pos2 = block.getFieldValue('Y_POS2');
    const z_pos2 = block.getFieldValue('Z_POS2');
    const to_dimension = block.getFieldValue('TO_DIMENSION');
    const x_pos3 = block.getFieldValue('X_POS3');
    const y_pos3 = block.getFieldValue('Y_POS3');
    const z_pos3 = block.getFieldValue('Z_POS3');
    return `clone from ${from_dimension} ${x_pos1} ${y_pos1} ${z_pos1} ${x_pos2} ${y_pos2} ${z_pos2} to ${to_dimension} ${x_pos3} ${y_pos3} ${z_pos3}\n`;
};
Blockly.JavaFunction.forBlock['spreadplayers'] = function(block) {
    const entities = block.getFieldValue('ENTITIES');
    const x_pos = block.getFieldValue('X_POS');
    const z_pos = block.getFieldValue('Z_POS');
    const min_spread = block.getFieldValue('MIN_SPREAD');
    const range = block.getFieldValue('RANGE');
    const respect_teams = block.getFieldValue('RESPECT_TEAMS');
    return `spreadplayers ${x_pos} ${z_pos} ${min_spread} ${range} ${respect_teams.toLowerCase()} ${entities}\n`;
};
Blockly.JavaFunction.forBlock['execute'] = function(block) {
    const anchored = block.getFieldValue('ANCHORED');
    const as = block.getFieldValue('AS');
    const at = block.getFieldValue('AT');
    const facing_x = block.getFieldValue('FACING_X');
    const facing_y = block.getFieldValue('FACING_Y');
    const facing_z = block.getFieldValue('FACING_Z');
    const in_arg = block.getFieldValue('IN');
    const pos_x = block.getFieldValue('POS_X');
    const pos_y = block.getFieldValue('POS_Y');
    const pos_z = block.getFieldValue('POS_Z');
    const rot_yaw = block.getFieldValue('ROT_YAW');
    const rot_pitch = block.getFieldValue('ROT_PITCH');
    const command = getStatement(block, "COMMAND");
    let params = "execute ";

    if (anchored) {
        params += `anchored ${anchored} `;
    }
    if (as) {
        params += `as ${as} `;
    }
    if (at) {
        params += `at ${at} `;
    }
    if ((facing_x != "") && (facing_y != "") && (facing_z != "")) {
        params += `facing ${facing_x} ${facing_y} ${facing_z} `;
    }
    if (in_arg) {
        params += `in ${in_arg} `;
    }
    if ((pos_x != "") && (pos_y != "") && (pos_z != "")) {
        params += `positioned ${pos_x} ${pos_y} ${pos_z} `;
    }
    if ((rot_yaw != "") && (rot_pitch != "")) {
        params += `rotated ${rot_yaw} ${rot_pitch} `;
    }

    params += "run ";
    params += command.slice(0, -2);

    return `${params}\n`;
};
Blockly.JavaFunction.forBlock['ride_start'] = function(block) {
    const rider = block.getFieldValue('RIDER');
    const vehicle = block.getFieldValue('VEHICLE');
    return `ride ${rider} mount ${vehicle}\n`;
};
Blockly.JavaFunction.forBlock['ride_stop'] = function(block) {
    const rider = block.getFieldValue('RIDER');
    return `ride ${rider} dismount\n`;
};
Blockly.JavaFunction.forBlock['op_status'] = function(block) {
    const mode = getInput(block, 'MODE');
    const player = getInput(block, 'PLAYER');
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
    const rule = getInput(block, 'RULE');
    const value = getInput(block, 'VALUE');
    return `gamerule ${rule} ${value}\n`;
};
Blockly.JavaFunction.forBlock['damage'] = function(block) {
    const amount = block.getFieldValue('AMOUNT');
    const target = block.getFieldValue('TARGET');
    return `damage ${target} ${amount}\n`;
};
Blockly.JavaFunction.forBlock['world_spawn'] = function(block) {
    const x_pos = getInput(block, 'X_POS');
    const y_pos = getInput(block, 'Y_POS');
    const z_pos = getInput(block, 'Z_POS');
    return "setworldspawn " + x_pos + " " + y_pos + " " + z_pos + "\n";
};
Blockly.JavaFunction.forBlock['kick'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    return `kick ${player}\n`;
};
Blockly.JavaFunction.forBlock['transfer'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const ip = block.getFieldValue('IP');
    const port = block.getFieldValue('PORT');
    return `transfer ${ip} ${port} ${player}\n`;
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
Blockly.JavaFunction.forBlock['macro'] = function(block) {
    const name = block.getFieldValue('NAME');
    return `$(${func})`;
};
Blockly.JavaFunction.forBlock['text'] = function(block) {
    const text = block.getFieldValue('TEXT');
    return text;
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
    return `effect give ${player} ${effect} ${duration} ${level} ${hide_particles}\n`;
};
Blockly.JavaFunction.forBlock['effect_clear'] = function(block) {
    const effect = block.getFieldValue('EFFECT');
    const player = block.getFieldValue('PLAYER');
    return `effect clear ${player} ${effect}\n`;
};
Blockly.JavaFunction.forBlock['enchant'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const enchantment = block.getFieldValue('ENCHANTMENT');
    const level = block.getFieldValue('LEVEL');
    return `enchant ${player} ${enchantment} ${level}\n`;
};
Blockly.JavaFunction.forBlock['tell'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const message = block.getFieldValue('MESSAGE');
    return `tell ${player} ${message}\n`;
};
Blockly.JavaFunction.forBlock['xp'] = function(block) {
    const player = block.getFieldValue('PLAYER');
    const quantity = block.getFieldValue('QUANTITY');
    const format = block.getFieldValue('FORMAT');
    const mode = block.getFieldValue('MODE');
    return `xp ${mode} ${player} ${quantity} ${format}\n`;
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
    const source = block.getFieldValue('SOURCE');
    const player = block.getFieldValue('PLAYER');
    const x_pos = block.getFieldValue('X_POS');
    const y_pos = block.getFieldValue('Y_POS');
    const z_pos = block.getFieldValue('Z_POS');
    const volume = block.getFieldValue('VOLUME');
    const pitch = block.getFieldValue('PITCH');
    return `playsound ${sound} ${source} ${player} ${x_pos} ${y_pos} ${z_pos} ${volume} ${pitch}\n`;
};
Blockly.JavaFunction.forBlock['stopsound'] = function(block) {
    const sound = block.getFieldValue('SOUND');
    const player = block.getFieldValue('PLAYER');
    return `stopsound ${player} * ${sound}\n`;
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
    return `scoreboard objectives setdisplay ${display} ${objective}\n`;
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

Blockly.JavaFunction.workspaceToCode = function (workspace) {
  // Find the hat block
  const hat = workspace.getAllBlocks(false).find(b => b.type === 'on_start');
  if (!hat) return ''; // No start block means no code.

  let code = '';
  // Walk through all blocks chained under the hat
  let current = hat.nextConnection && hat.nextConnection.targetBlock();
  while (current) {
    let line = Blockly.JavaFunction.blockToCode(current);
    if (line.includes("$(")) {
        line = "$" + line;
    }
    if (typeof line === 'string') code += line;
    current = current.nextConnection && current.nextConnection.targetBlock();
  }
  return Blockly.JavaFunction.finish(code);
};

Blockly.JavaFunction.finish = function(code) { return code; };