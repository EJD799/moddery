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
    let code = `${getInput(block, "DATA")}.cancel = true;
`;
    return code;
};

Blockly.JavaScript.forBlock['run_command_dimension'] = function(block) {
    let code = `world.getDimension('${block.getFieldValue("DIMENSION")}').runCommand('${getInput(block, "COMMAND")}');
`;
    return code;
};

Blockly.JavaScript.forBlock['run_command_player'] = function(block) {
    let code = `${getInput(block, "PLAYER")}.runCommand('${getInput(block, "COMMAND")}');
`;
    return code;
};

Blockly.JavaScript.forBlock['send_message'] = function(block) {

};

Blockly.JavaScript.forBlock['set_gamerule'] = function(block) {

};

Blockly.JavaScript.forBlock['get_gamerule'] = function(block) {

};

Blockly.JavaScript.forBlock['new_form'] = function(block) {

};

Blockly.JavaScript.forBlock['show_form'] = function(block) {

};

Blockly.JavaScript.forBlock['show_form_var'] = function(block) {
    let code = 'r';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['form_title'] = function(block) {

};

Blockly.JavaScript.forBlock['form_body'] = function(block) {

};

Blockly.JavaScript.forBlock['form_cancel'] = function(block) {

};

Blockly.JavaScript.forBlock['form_confirm'] = function(block) {

};

Blockly.JavaScript.forBlock['form_submit'] = function(block) {

};

Blockly.JavaScript.forBlock['form_button'] = function(block) {

};

Blockly.JavaScript.forBlock['form_textfield'] = function(block) {

};

Blockly.JavaScript.forBlock['form_dropdown'] = function(block) {

};

Blockly.JavaScript.forBlock['form_slider'] = function(block) {

};

Blockly.JavaScript.forBlock['form_toggle'] = function(block) {

};

Blockly.JavaScript.forBlock['form_response_action'] = function(block) {

};

Blockly.JavaScript.forBlock['form_response_message'] = function(block) {

};

Blockly.JavaScript.forBlock['form_response_modal'] = function(block) {

};

Blockly.JavaScript.forBlock['is_hardcore'] = function(block) {

};

Blockly.JavaScript.forBlock['addobjective'] = function(block) {

};

Blockly.JavaScript.forBlock['removeobjective'] = function(block) {

};

Blockly.JavaScript.forBlock['objectivedisplay'] = function(block) {

};

Blockly.JavaScript.forBlock['hidedisplay'] = function(block) {

};

Blockly.JavaScript.forBlock['operatescore'] = function(block) {

};

Blockly.JavaScript.forBlock['form_slider'] = function(block) {

};

Blockly.JavaScript.forBlock['objective_list'] = function(block) {

};

Blockly.JavaScript.forBlock['player_list'] = function(block) {

};

Blockly.JavaScript.forBlock['set_dynamic_property'] = function(block) {

};

Blockly.JavaScript.forBlock['clear_dynamic_properties'] = function(block) {

};

Blockly.JavaScript.forBlock['command_parameter'] = function(block) {

};

Blockly.JavaScript.forBlock['command_origin'] = function(block) {

};

Blockly.JavaScript.forBlock['register_command'] = function(block) {

};

Blockly.JavaScript.forBlock['set_block'] = function(block) {

};

Blockly.JavaScript.forBlock['get_absolute_time'] = function(block) {

};

Blockly.JavaScript.forBlock['get_day'] = function(block) {

};

Blockly.JavaScript.forBlock['get_default_spawn'] = function(block) {

};

Blockly.JavaScript.forBlock['get_difficulty'] = function(block) {

};

Blockly.JavaScript.forBlock['dynamic_property_list'] = function(block) {

};

Blockly.JavaScript.forBlock['dynamic_property_size'] = function(block) {

};

Blockly.JavaScript.forBlock['get_time'] = function(block) {

};

Blockly.JavaScript.forBlock['get_moon_phase'] = function(block) {

};

Blockly.JavaScript.forBlock['world_play_music'] = function(block) {

};

Blockly.JavaScript.forBlock['world_queue_music'] = function(block) {

};

Blockly.JavaScript.forBlock['set_time'] = function(block) {

};

Blockly.JavaScript.forBlock['set_default_spawn'] = function(block) {

};

Blockly.JavaScript.forBlock['set_difficulty'] = function(block) {

};

Blockly.JavaScript.forBlock['world_stop_music'] = function(block) {

};

Blockly.JavaScript.forBlock['fill_blocks'] = function(block) {

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