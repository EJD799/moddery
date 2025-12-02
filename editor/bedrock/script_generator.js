function getInput(block, name) {
    return Blockly.JavaScript.valueToCode(block, name, Blockly.JavaScript.ORDER_ATOMIC) || '0';
}

function getStatement(block, name) {
    return Blockly.JavaScript.statementToCode(block, name);
}

// Override the built-in 'text' block generator
Blockly.JavaScript['text'] = function(block) {
  const text = block.getFieldValue('TEXT'); // get the raw text field
  // Wrap in quotes for JS
  const code = JSON.stringify(text);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

function rgbToHex(r, g, b) {
  // Clamp values between 0 and 255
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // Convert each component to two-digit hex
  const rh = r.toString(16).padStart(2, '0');
  const gh = g.toString(16).padStart(2, '0');
  const bh = b.toString(16).padStart(2, '0');

  return `#${rh}${gh}${bh}`;
}

function trimQuotes(str) {
    if (str.length >= 2 && str.startsWith("'") && str.endsWith("'")) {
        return str.slice(1, -1);
    }
    return str;
}




Blockly.JavaScript.forBlock['on_start'] = function(block) {
    return `import { world, system } from "@minecraft/server";
import { ModalFormData, MessageFormData, ActionFormData } from "@minecraft/server-ui";
import { modderyLibs } from "modderyLibs.js";
`;
};

Blockly.JavaScript.forBlock['before_event'] = function(block) {
    let code = `world.beforeEvents.${block.getFieldValue("EVENT")}.subscribe((e) => {
${getStatement(block, "DO")}});
`;
    return code;
};

Blockly.JavaScript.forBlock['after_event'] = function(block) {
    let code = `world.afterEvents.${block.getFieldValue("EVENT")}.subscribe((e) => {
${getStatement(block, "DO")}});
`;
    return code;
};

Blockly.JavaScript.forBlock['event_data'] = function(block) {
    let code = 'e';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['get_event_data'] = function(block) {
    let code = `${getInput(block, "DATA")}.${block.getFieldValue("TYPE")}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['cancel_event'] = function(block) {
    let code = `${getInput(block, "EVENT")}.cancel = true;
`;
    return code;
};

Blockly.JavaScript.forBlock['run_command_dimension'] = function(block) {
    let code = `world.getDimension('${block.getFieldValue("DIMENSION")}').runCommand(${getInput(block, "COMMAND")});
`;
    return code;
};

Blockly.JavaScript.forBlock['run_command_player'] = function(block) {
    let code = `${getInput(block, "PLAYER")}.runCommand(${getInput(block, "COMMAND")});
`;
    return code;
};

Blockly.JavaScript.forBlock['send_message'] = function(block) {
    let code = `${getInput(block, "PLAYER")}.sendMessage(${getInput(block, "MESSAGE")});
`;
    return code;
};

Blockly.JavaScript.forBlock['set_gamerule'] = function(block) {
    let code = `world.gameRules.${block.getFieldValue("RULE")} = ${getInput(block, "VALUE")};
`;
    return code;
};

Blockly.JavaScript.forBlock['get_gamerule'] = function(block) {
    let code = `world.gameRules.${block.getFieldValue("RULE")}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['new_form'] = function(block) {
    let code = `new ${block.getFieldValue("TYPE")}()`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['show_form'] = function(block) {
    let code = `${getInput(block, "FORM")}.show(${getInput(block, "PLAYER")}).then((r) => {
${getStatement(block, "DO")}});
`;
    return code;
};

Blockly.JavaScript.forBlock['show_form_var'] = function(block) {
    let code = 'r';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['form_title'] = function(block) {
    let code = `${getInput(block, "FORM")}.title(${getInput(block, "TEXT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_body'] = function(block) {
    let code = `${getInput(block, "FORM")}.body(${getInput(block, "TEXT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_cancel'] = function(block) {
    let code = `${getInput(block, "FORM")}.button1(${getInput(block, "TEXT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_confirm'] = function(block) {
    let code = `${getInput(block, "FORM")}.button2(${getInput(block, "TEXT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_submit'] = function(block) {
    let code = `${getInput(block, "FORM")}.submitButton(${getInput(block, "TEXT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_button'] = function(block) {
    let code = `${getInput(block, "FORM")}.button(${getInput(block, "TEXT")}, ${getInput(block, "IMAGE")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_textfield'] = function(block) {
    let code = `${getInput(block, "FORM")}.textField(${getInput(block, "LABEL")}, ${getInput(block, "PLACEHOLDER")}, ${getInput(block, "DEFAULT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_dropdown'] = function(block) {
    let code = `${getInput(block, "FORM")}.dropdown(${getInput(block, "LABEL")}, ${getInput(block, "OPTIONS")}, ${getInput(block, "DEFAULT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_slider'] = function(block) {
    let code = `${getInput(block, "FORM")}.slider(${getInput(block, "LABEL")}, ${getInput(block, "MIN")}, ${getInput(block, "MAX")}, ${getInput(block, "STEP")}, ${getInput(block, "DEFAULT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_toggle'] = function(block) {
    let code = `${getInput(block, "FORM")}.toggle(${getInput(block, "LABEL")}, ${getInput(block, "DEFAULT")});
`;
    return code;
};

Blockly.JavaScript.forBlock['form_response_action'] = function(block) {
    let code = `${getInput(block, "RESPONSE")}.selection`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['form_response_message'] = function(block) {
    let code = `${getInput(block, "RESPONSE")}.selection`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['form_response_modal'] = function(block) {
    let code = `${getInput(block, "RESPONSE")}.formValues[${getInput(block, "FIELD")}]`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['is_hardcore'] = function(block) {
    let code = `world.isHardcore`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['addobjective'] = function(block) {
    let code = `world.scoreboard.addObjective(${getInput(block, "OBJECTIVE")}, ${getInput(block, "DISPLAY_NAME")});
`;
    return code;
};

Blockly.JavaScript.forBlock['removeobjective'] = function(block) {
    let code = `world.scoreboard.removeObjective(${getInput(block, "OBJECTIVE")});
`;
    return code;
};

Blockly.JavaScript.forBlock['objectivedisplay'] = function(block) {
    let code;
    if (block.getFieldValue("DISPLAY").includes("Sidebar")) {
        if (block.getFieldValue("DISPLAY") == "SidebarAscending") {
            code = `world.scoreboard.setObjectiveAtDisplaySlot('Sidebar', {
    objective: ${getInput(block, "OBJECTIVE")},
    sortOrder: ObjectiveSortOrder.Ascending
});
`;
        } else {
            code = `world.scoreboard.setObjectiveAtDisplaySlot('Sidebar', {
    objective: ${getInput(block, "OBJECTIVE")},
    sortOrder: ObjectiveSortOrder.Descending
});
`;
        }
    } else {
        code = `world.scoreboard.setObjectiveAtDisplaySlot('${block.getFieldValue("DISPLAY")}', {
objective: ${getInput(block, "OBJECTIVE")}
});
`;
    }
    return code;
};

Blockly.JavaScript.forBlock['hidedisplay'] = function(block) {
    let code = `world.scoreboard.clearObjectiveAtDisplaySlot(${block.getFieldValue("DISPLAY")});
`;
    return code;
};

Blockly.JavaScript.forBlock['operatescore'] = function(block) {
    let mode = block.getFieldValue("MODE");
    let quantity = getInput(block, "QUANTITY");
    let player = getInput(block, "PLAYER");
    let objective = getInput(block, "OBJECTIVE");
    let code;
    if (mode == "add") {
        code = `world.scoreboard.getObjective(${objective}).addScore(${player}, ${quantity});
`;
    } else if (mode == "remove") {
        code = `world.scoreboard.getObjective(${objective}).addScore(${player}, ${0 - quantity});
`;
    } else {
        code = `world.scoreboard.getObjective(${objective}).setScore(${player}, ${quantity});
`;
    }
    return code;
};

Blockly.JavaScript.forBlock['getscore'] = function(block) {
    let code = `world.scoreboard.getObjective(${getInput(block, "OBJECTIVE")}).getScore(${getInput(block, "PLAYER")})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['objective_list'] = function(block) {
    let code = `world.scoreboard.getObjectives()`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['player_list'] = function(block) {
    let code = `world.getPlayers()`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['set_dynamic_property'] = function(block) {
    let code = `world.setDynamicProperty(${getInput(block, "PROPERTY")}, ${getInput(block, "VALUE")});
`;
    return code;
};

Blockly.JavaScript.forBlock['clear_dynamic_properties'] = function(block) {
    let code = `world.clearDynamicProperties();
`;
    return code;
};

Blockly.JavaScript.forBlock['get_dynamic_property'] = function(block) {
    let code = `world.getDynamicProperty(${getInput(block, "PROPERTY")})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['command_parameter'] = function(block) {
    let code = block.getFieldValue("PARAM");
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['command_origin'] = function(block) {
    let code = 'origin';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['register_command'] = function(block) {
    let code = `customCommandRegistry.registerCommand(
    {
        name: '${block.getFieldValue("NAME")}',
        description: '${block.getFieldValue("DESCRIPTION")}',
        permissionLevel: CommandPermissionLevel.${block.getFieldValue("PERMISSION_LEVEL")},
    },
    () => {
    ${getStatement(block, "CODE")}}
);`;
    return code;
};

Blockly.JavaScript.forBlock['set_block'] = function(block) {
    let dimension = block.getFieldValue("DIMENSION");
    let type = getInput(block, "BLOCK");
    let x = getInput(block, "X_POS");
    let y = getInput(block, "Y_POS");
    let z = getInput(block, "Z_POS");
    let code = `world.getDimension('${dimension}').setBlockType({x: ${x}, y: ${y}, z: ${z}}, ${type});
`;
    return code;
};

Blockly.JavaScript.forBlock['get_absolute_time'] = function(block) {
    let code = 'world.getAbsoluteTime()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['get_day'] = function(block) {
    let code = 'world.getDay()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['get_default_spawn'] = function(block) {
    let code = `world.getDefaultSpawn().${block.getFieldValue("POS")}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['get_difficulty'] = function(block) {
    let code = 'world.getDifficulty()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['dynamic_property_list'] = function(block) {
    let code = 'world.getDynamicPropertyIds()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['dynamic_property_size'] = function(block) {
    let code = 'world.getDynamicPropertyTotalByteCount()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['get_time'] = function(block) {
    let code = 'world.getTimeOfDay()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['get_moon_phase'] = function(block) {
    let code = 'world.getMoonPhase()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['world_play_music'] = function(block) {
    let code = `world.playMusic(${getInput(block, "TRACK")});
`;
    return code;
};

Blockly.JavaScript.forBlock['world_queue_music'] = function(block) {
    let code = `world.queueMusic(${getInput(block, "TRACK")});
`;
    return code;
};

Blockly.JavaScript.forBlock['set_time'] = function(block) {
    let code = `world.setTimeOfDay(${getInput(block, "TIME")});
`;
    return code;
};

Blockly.JavaScript.forBlock['set_default_spawn'] = function(block) {
    let code = `world.playMusic(${getInput(block, "TRACK")});
`;
    return code;
};

Blockly.JavaScript.forBlock['set_difficulty'] = function(block) {
    let code = `world.setDifficulty('${block.getFieldValue("DIFFICULTY")}');
`;
    return code;
};

Blockly.JavaScript.forBlock['world_stop_music'] = function(block) {
    let code = `world.stopMusic();
`;
    return code;
};

Blockly.JavaScript.forBlock['fill_blocks'] = function(block) {
    let dimension = block.getFieldValue("DIMENSION");
    let type = getInput(block, "BLOCK");
    let x1 = getInput(block, "X_POS1");
    let y1 = getInput(block, "Y_POS1");
    let z1 = getInput(block, "Z_POS1");
    let x2 = getInput(block, "X_POS2");
    let y2 = getInput(block, "Y_POS2");
    let z2 = getInput(block, "Z_POS2");
    let code = `world.getDimension('${dimension}').fillBlocks(new BlockVolume({x: ${x1}, y: ${y1}, z: ${z1}}, {x: ${x2}, y: ${y2}, z: ${z2}}), ${type});
`;
    return code;
};

Blockly.JavaScript.forBlock['create_explosion'] = function(block) {

};

Blockly.JavaScript.forBlock['get_biome'] = function(block) {

};

Blockly.JavaScript.forBlock['get_block'] = function(block) {

};

Blockly.JavaScript.forBlock['get_block_property'] = function(block) {

};

Blockly.JavaScript.forBlock['json_stringify'] = function(block) {

};

Blockly.JavaScript.forBlock['json_parse'] = function(block) {

};

Blockly.JavaScript.forBlock['set_block_type'] = function(block) {

};

Blockly.JavaScript.forBlock['set_block_waterlogged'] = function(block) {

};

Blockly.JavaScript.forBlock['get_entities'] = function(block) {

};

Blockly.JavaScript.forBlock['get_entities_at_location'] = function(block) {

};

Blockly.JavaScript.forBlock['get_players_dimension'] = function(block) {

};

Blockly.JavaScript.forBlock['is_chunk_loaded'] = function(block) {

};

Blockly.JavaScript.forBlock['play_sound_all'] = function(block) {

};

Blockly.JavaScript.forBlock['set_weather'] = function(block) {

};

Blockly.JavaScript.forBlock['spawn_entity'] = function(block) {

};

Blockly.JavaScript.forBlock['spawn_item'] = function(block) {

};

Blockly.JavaScript.forBlock['spawn_particle'] = function(block) {

};

Blockly.JavaScript.forBlock['get_entity_property'] = function(block) {

};

Blockly.JavaScript.forBlock['set_entity_property'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_add_effect'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_add_tag'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_apply_damage'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_clear_velocity'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_set_fire'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_get_component'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_has_tag'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_kill'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_look_at'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_play_animation'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_remove'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_remove_effect'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_remove_tag'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_set_rotation'] = function(block) {

};

Blockly.JavaScript.forBlock['entity_teleport'] = function(block) {

};

Blockly.JavaScript.forBlock['player_get_property'] = function(block) {

};

Blockly.JavaScript.forBlock['player_give_xp'] = function(block) {

};

Blockly.JavaScript.forBlock['player_play_sound'] = function(block) {

};

Blockly.JavaScript.forBlock['player_play_music'] = function(block) {

};

Blockly.JavaScript.forBlock['player_queue_music'] = function(block) {

};

Blockly.JavaScript.forBlock['player_set_gamemode'] = function(block) {

};

Blockly.JavaScript.forBlock['player_set_spawn_point'] = function(block) {

};

Blockly.JavaScript.forBlock['player_stop_music'] = function(block) {

};

Blockly.JavaScript.forBlock['colour_picker'] = function(block) {
    let code = getInput(block, "COLOUR");
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['colour_random'] = function(block) {
    let code = `modderyLibs.randomColor()`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['colour_rgb'] = function(block) {
    let code = `'${rgbToHex(Number(getInput(block, "RED")), Number(getInput(block, "GREEN")), Number(getInput(block, "BLUE")))}'`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['json_create'] = function(block) {

};

Blockly.JavaScript.forBlock['json_get_prop'] = function(block) {

};

Blockly.JavaScript.forBlock['json_set_prop'] = function(block) {

};

Blockly.JavaScript.forBlock['json_delete_prop'] = function(block) {

};

Blockly.JavaScript.forBlock['json_has_prop'] = function(block) {

};

Blockly.JavaScript.forBlock['json_keys'] = function(block) {

};

Blockly.JavaScript.forBlock['json_merge'] = function(block) {

};

Blockly.JavaScript.forBlock['run_js_statement'] = function(block) {
    let code = `${trimQuotes(getInput(block, "CODE"))};
`;
    return code;
};

Blockly.JavaScript.forBlock['run_js_reporter'] = function(block) {
    let code = `${trimQuotes(getInput(block, "CODE"))}`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['comment_block'] = function(block) {
    let code = `// ${block.getFieldValue("COMMENT")}
`;
    return code;
};