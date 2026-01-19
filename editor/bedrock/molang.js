// Create the definition.
const bedrockMolangDefinitions =
    Blockly.common.createBlockDefinitionsFromJsonArray([
        {
            type: "q_armor_x_slot",
            message0: "armor %1 slot %2",
            colour: 160,
            args0: [
                {
                    type: "field_dropdown",
                    name: "TYPE",
                    options: [
                        ["texture", "texture"],
                        ["material", "material"]
                    ]
                },
                {
                    type: "input_value",
                    name: "SLOT",
                    check: null,
                },
            ],
            output: null,
        },
        {
            type: "q_is_name",
            message0: "is name %1",
            colour: 160,
            args0: [
                {
                    type: "input_value",
                    name: "NAME",
                    check: null,
                }
            ],
            output: "Boolean",
        },
        {
            type: "q_is_item_name",
            message0: "is item name in slot %1 %2 item id %3",
            colour: 160,
            args0: [
                {
                    type: "field_dropdown",
                    name: "SLOT",
                    options: [
                        ["main hand", "slot.weapon.mainhand"],
                        ["off-hand", "slot.weapon.offhand"],
                        ["head", "slot.armor.head"],
                        ["chest", "slot.armor.chest"],
                        ["legs", "slot.armor.legs"],
                        ["feet", "slot.armor.feet"],
                        ["horse armor", "slot.armor"],
                        ["saddle", "slot.saddle"],
                        ["hotbar", "slot.hotbar"],
                        ["inventory", "slot.inventory"],
                        ["ender chest", "slot.enderchest"]
                    ]
                },
                {
                    type: "input_value",
                    name: "SLOT_NUMBER",
                    check: null,
                },
                {
                    type: "input_value",
                    name: "ITEM",
                    check: null,
                },
            ],
            output: "Boolean",
        },
        {
            type: "q_is_enchanted",
            message0: "is enchanted",
            colour: 160,
            output: "Boolean",
        },
        {
            type: "q_is_eating",
            message0: "is eating",
            colour: 160,
            output: "Boolean",
        },
        {
            type: "q_is_ghost",
            message0: "is ghost",
            colour: 160,
            output: "Boolean",
        },
        {
            type: "q_is_grazing",
            message0: "is grazing",
            colour: 160,
            output: "Boolean",
        },
        {
            type: "q_is_jumping",
            message0: "is jumping",
            colour: 160,
            output: "Boolean",
        },
        {
            type: "armor_slot_menu",
            message0: "%1",
            colour: 160,
            args0: [
                {
                    type: "field_dropdown",
                    name: "SLOT",
                    options: [
                        ["helmet", "0"],
                        ["chestplate", "1"],
                        ["leggings", "2"],
                        ["boots", "3"],
                    ],
                },
            ],
            output: null,
        },
        {
            type: "v_set",
            message0: "set variable %1 to %2",
            colour: 10,
            args0: [
                {
                    type: "field_input",
                    name: "VAR",
                    spellcheck: false,
                },
                {
                    type: "input_value",
                    name: "VALUE",
                    check: null,
                },
            ],
            previousStatement: null,
            nextStatement: null
        },
        {
            type: "v_get_custom",
            message0: "get variable %1",
            colour: 10,
            args0: [
                {
                    type: "field_input",
                    name: "VAR",
                    spellcheck: false,
                },
            ],
            output: null,
        },
        {
            type: "v_get_custom_bool",
            message0: "get variable %1",
            colour: 10,
            args0: [
                {
                    type: "field_input",
                    name: "VAR",
                    spellcheck: false,
                },
            ],
            output: "Boolean",
        },
        {
            type: "v_get_built_in",
            message0: "get variable %1",
            colour: 10,
            args0: [
                {
                    type: "field_dropdown",
                    name: "VAR",
                    options: [
                        ["animation frames 128x128", "animation_frames_128x128"],
                        ["animation frames 32x32", "animation_frames_32x32"],
                        ["animation frames face", "animation_frames_face"],
                        ["attack time", "attack_time"],
                        ["bob animation", "bob_animation"],
                        ["charge amount", "charge_amount"],
                        ["gliding speed value", "gliding_speed_value"],
                        ["last blink time", "last_blink_time"],
                        ["left arm swim amount", "left_arm_swim_amount"],
                        ["player arm height", "player_arm_height"],
                        ["player x rotation", "player_x_rotation"],
                        ["right arm swim amount", "right_arm_swim_amount"],
                        ["short arm offset left", "short_arm_offset_left"],
                        ["short arm offset right", "short_arm_offset_right"],
                        ["swim amount", "swim_amount"]
                    ],
                },
            ],
            output: null,
        },
        {
            type: "v_get_built_in_bool",
            message0: "get variable %1",
            colour: 10,
            args0: [
                {
                    type: "field_dropdown",
                    name: "VAR",
                    options: [
                        ["damage nearby mobs", "damage_nearby_mobs"],
                        ["has target", "has_target"],
                        ["is brandishing spear", "is_brandishing_spear"],
                        ["is holding left", "is_holding_left"],
                        ["is holding right", "is_holding_right"],
                        ["is holding spyglass", "is_holding_spyglass"],
                        ["is horizontal splitscreen", "is_horizontal_splitscreen"],
                        ["is paperdoll", "is_paperdoll"],
                        ["is sneaking", "is_sneaking"],
                        ["is tooting goat horn", "is_tooting_goat_horn"],
                        ["is using brush", "is_using_brush"],
                        ["is using VR", "is_using_vr"],
                        ["is vertical splitscreen", "is_vertical_splitscreen"],
                        ["map face icon", "map_face_icon"],
                        ["use blinking animation", "use_blinking_animation"],
                        ["use item interval progress", "use_item_interval_progress"],
                        ["use item startup progress", "use_item_startup_progress"],
                        ["is first person", "is_first_person"]
                    ],
                },
            ],
            output: "Boolean",
        },
        {
            type: "t_set",
            message0: "set temporary variable %1 to %2",
            colour: 80,
            args0: [
                {
                    type: "field_input",
                    name: "VAR",
                    spellcheck: false,
                },
                {
                    type: "input_value",
                    name: "VALUE",
                    check: null,
                },
            ],
            previousStatement: null,
            nextStatement: null
        },
        {
            type: "t_get",
            message0: "get temporary variable %1",
            colour: 80,
            args0: [
                {
                    type: "field_input",
                    name: "VAR",
                    spellcheck: false,
                },
            ],
            output: null,
        },
        {
            type: "t_get_bool",
            message0: "get temporary variable %1",
            colour: 80,
            args0: [
                {
                    type: "field_input",
                    name: "VAR",
                    spellcheck: false,
                },
            ],
            output: "Boolean",
        },
        {
            type: "c_get",
            message0: "get context variable %1",
            colour: 230,
            args0: [
                {
                    type: "field_dropdown",
                    name: "VAR",
                    options: [
                        ["block face", "block_face"],
                        ["cardinal block face placed on", "cardinal_block_face_placed_on"],
                        ["count", "count"],
                        ["item slot", "item_slot"],
                        ["other item", "other"],
                        ["owning entity", "owning_entity"],
                        ["player off-hand arm height", "player_offhand_arm_height"]
                    ],
                },
            ],
            output: null,
        },
        {
            type: "c_get_bool",
            message0: "get context variable %1",
            colour: 230,
            args0: [
                {
                    type: "field_dropdown",
                    name: "VAR",
                    options: [
                        ["is first person", "is_first_person"]
                    ],
                },
            ],
            output: "Boolean",
        },
        {
            type: "loop_repeat",
            message0: "repeat %1 times %2",
            colour: 360,
            args0: [
                {
                    type: "input_value",
                    name: "TIMES",
                    check: null
                },
                {
                    type: "input_statement",
                    name: "CODE",
                    check: null
                }
            ],
            previousStatement: null,
            nextStatement: null
        },
        {
            type: "math_comparison",
            message0: "%1 %2 %3",
            colour: 300,
            args0: [
                {
                    type: "input_value",
                    name: "VALUE1",
                    check: null
                },
                {
                    type: "field_dropdown",
                    name: "OPERATOR",
                    options: [
                        ["=", "=="],
                        ["≠", "!="],
                        [">", ">"],
                        ["<", "<"],
                        ["≥", ">="],
                        ["≤", "<="]
                    ]
                },
                {
                    type: "input_value",
                    name: "VALUE2",
                    check: null
                },
            ],
            output: "Boolean",
            inputsInline: true
        },
        {
            type: "math_boolean_logic",
            message0: "%1 %2 %3",
            colour: 300,
            args0: [
                {
                    type: "input_value",
                    name: "VALUE1",
                    check: "Boolean"
                },
                {
                    type: "field_dropdown",
                    name: "OPERATOR",
                    options: [
                        ["and", "&&"],
                        ["or", "||"]
                    ]
                },
                {
                    type: "input_value",
                    name: "VALUE2",
                    check: "Boolean"
                },
            ],
            output: "Boolean",
            inputsInline: true
        },
        {
            type: "math_if_else",
            message0: "if %1 then %2 else %3",
            colour: 300,
            args0: [
                {
                    type: "input_value",
                    name: "CONDITION",
                    check: "Boolean"
                },
                {
                    type: "input_value",
                    name: "VALUE1",
                    check: null
                },
                {
                    type: "input_value",
                    name: "VALUE2",
                    check: null
                },
            ],
            output: null,
            inputsInline: true
        },
        {
            type: "math_arithmetic",
            message0: "%1 %2 %3",
            colour: 300,
            args0: [
                {
                    type: "input_value",
                    name: "VALUE1",
                    check: null
                },
                {
                    type: "field_dropdown",
                    name: "OPERATOR",
                    options: [
                        ["+", "+"],
                        ["-", "-"],
                        ["*", "*"],
                        ["/", "/"],
                        ["^", "^"]
                    ]
                },
                {
                    type: "input_value",
                    name: "VALUE2",
                    check: null
                },
            ],
            output: null,
            inputsInline: true
        },
        {
            type: "math_random",
            message0: "pick random %1 from %2 to %3",
            colour: 300,
            args0: [
                {
                    type: "field_dropdown",
                    name: "MODE",
                    options: [
                        ["float", "float"],
                        ["integer", "integer"]
                    ]
                },
                {
                    type: "input_value",
                    name: "VALUE1",
                    check: null
                },
                {
                    type: "input_value",
                    name: "VALUE2",
                    check: null
                },
            ],
            output: null,
            inputsInline: true
        },
        {
            type: "math_func_1",
            message0: "%1 %2",
            colour: 300,
            args0: [
                {
                    type: "field_dropdown",
                    name: "MODE",
                    options: [
                        ["round", "round"],
                        ["abs", "abs"],
                        ["acos", "acos"],
                        ["asin", "asin"],
                        ["atan", "atan"],
                        ["ceil", "ceil"],
                        ["cos", "cos"],
                        ["exp", "exp"],
                        ["hermite blend", "hermite_blend"],
                        ["ln", "ln"],
                        ["sin", "sin"],
                        ["sqrt", "sqrt"],
                        ["trunc", "trunc"]
                    ]
                },
                {
                    type: "input_value",
                    name: "VALUE",
                    check: null
                }
            ],
            output: null,
            inputsInline: true
        },
        {
            type: "math_func_2",
            message0: "%1 %2 %3",
            colour: 300,
            args0: [
                {
                    type: "field_dropdown",
                    name: "MODE",
                    options: [
                        ["atan2", "atan2"],
                        ["max", "max"],
                        ["min", "min"],
                        ["mod", "mod"]
                    ]
                },
                {
                    type: "input_value",
                    name: "VALUE1",
                    check: null
                },
                {
                    type: "input_value",
                    name: "VALUE2",
                    check: null
                }
            ],
            output: null,
            inputsInline: true
        },
        {
            type: "math_clamp",
            message0: "constrain %1 between %2 and %3",
            colour: 300,
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                    check: null
                },
                {
                    type: "input_value",
                    name: "MIN",
                    check: null
                },
                {
                    type: "input_value",
                    name: "MAX",
                    check: null
                }
            ],
            output: null,
            inputsInline: true
        },
        {
            type: "math_lerp",
            message0: "%1 between %2 and %3 by %4",
            colour: 300,
            args0: [
                {
                    type: "field_dropdown",
                    name: "MODE",
                    options: [
                        ["lerp", "lerp"],
                        ["lerprotate", "lerprotate"]
                    ]
                },
                {
                    type: "input_value",
                    name: "VALUE1",
                    check: null
                },
                {
                    type: "input_value",
                    name: "VALUE2",
                    check: null
                },
                {
                    type: "input_value",
                    name: "T",
                    check: null
                }
            ],
            output: null,
            inputsInline: true
        },
        {
            type: "loop_break",
            message0: "break",
            colour: 360,
            previousStatement: null,
            nextStatement: null
        },
        {
            type: "loop_continue",
            message0: "continue",
            colour: 360,
            previousStatement: null,
            nextStatement: null
        },
        {
            type: "return_val",
            message0: "return %1",
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                    check: null,
                },
            ],
            previousStatement: null,
            colour: 45,
            deletable: false,
            movable: false,
            editable: false,
        },
    ]);

var bedrockMolangToolbox = {
    kind: "categoryToolbox",
    contents: [
        {
            kind: "category",
            name: "Queries",
            colour: 160,
            contents: [
                {
                    kind: "block",
                    type: "q_armor_x_slot",
                    inputs: {
                        SLOT: { shadow: { type: "armor_slot_menu" } },
                    },
                },
                {
                    kind: "block",
                    type: "q_is_name",
                    inputs: {
                        NAME: { shadow: { type: "text" } },
                    },
                },
                {
                    kind: "block",
                    type: "q_is_item_name",
                    inputs: {
                        SLOT_NUMBER: { shadow: { type: "math_number" } },
                        ITEM: { shadow: { type: "text" } },
                    },
                },
                {
                    kind: "block",
                    type: "q_is_enchanted"
                },
                {
                    kind: "block",
                    type: "q_is_eating"
                },
                {
                    kind: "block",
                    type: "q_is_ghost"
                },
                {
                    kind: "block",
                    type: "q_is_grazing"
                },
                {
                    kind: "block",
                    type: "q_is_jumping"
                },
            ],
        },
        {
            kind: "category",
            name: "Variables",
            colour: 10,
            contents: [
                {
                    kind: "block",
                    type: "v_set",
                    inputs: {
                        VALUE: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "v_get_custom"
                },
                {
                    kind: "block",
                    type: "v_get_custom_bool"
                },
                {
                    kind: "block",
                    type: "v_get_built_in"
                },
                {
                    kind: "block",
                    type: "v_get_built_in_bool"
                },
            ],
        },
        {
            kind: "category",
            name: "Temporary Variables",
            colour: 80,
            contents: [
                {
                    kind: "block",
                    type: "t_set",
                    inputs: {
                        VALUE: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "t_get"
                },
                {
                    kind: "block",
                    type: "t_get_bool"
                },
            ],
        },
        {
            kind: "category",
            name: "Context Variables",
            colour: 230,
            contents: [
                {
                    kind: "block",
                    type: "c_get"
                },
                {
                    kind: "block",
                    type: "c_get_bool"
                },
            ],
        },
        {
            kind: "category",
            name: "Math & Logic",
            colour: 300,
            contents: [
                {
                    kind: "block",
                    type: "math_comparison",
                    inputs: {
                        VALUE1: { shadow: { type: "math_number" } },
                        VALUE2: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "math_boolean_logic",
                },
                {
                    kind: "block",
                    type: "math_if_else",
                    inputs: {
                        VALUE1: { shadow: { type: "math_number" } },
                        VALUE2: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "math_arithmetic",
                    inputs: {
                        VALUE1: { shadow: { type: "math_number" } },
                        VALUE2: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "math_random",
                    inputs: {
                        VALUE1: { shadow: { type: "math_number" } },
                        VALUE2: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "math_func_1",
                    inputs: {
                        VALUE: { shadow: { type: "math_number" } }
                    },
                },
                {
                    kind: "block",
                    type: "math_func_2",
                    inputs: {
                        VALUE1: { shadow: { type: "math_number" } },
                        VALUE2: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "math_clamp",
                    inputs: {
                        VALUE: { shadow: { type: "math_number" } },
                        MIN: { shadow: { type: "math_number" } },
                        MAX: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "math_lerp",
                    inputs: {
                        VALUE1: { shadow: { type: "math_number" } },
                        VALUE2: { shadow: { type: "math_number" } },
                        T: { shadow: { type: "math_number" } },
                    },
                },
            ],
        },
        {
            kind: "category",
            name: "Loops",
            colour: 360,
            contents: [
                {
                    kind: "block",
                    type: "loop_repeat",
                    inputs: {
                        TIMES: { shadow: { type: "math_number" } },
                    },
                },
                {
                    kind: "block",
                    type: "loop_break"
                },
                {
                    kind: "block",
                    type: "loop_continue"
                },
            ],
        },
        {
            kind: "category",
            name: "Text & Numbers",
            colour: "#505050",
            contents: [
                {
                    kind: "block",
                    type: "text"
                },
                {
                    kind: "block",
                    type: "math_number"
                },
            ],
        },
    ],
};

// Apply the no_disable_menu logic to all blocks
Blockly.BlockSvg.prototype.customContextMenu = function (menuOptions) {
    // Filter out "Disable block" entries
    for (let i = menuOptions.length - 1; i >= 0; i--) {
        if (menuOptions[i].text && menuOptions[i].text.includes("Disable")) {
            menuOptions.splice(i, 1);
        }
    }
};

Blockly.common.defineBlocks(bedrockMolangDefinitions);
var workspace = Blockly.inject("blocklyDiv", {
    toolbox: bedrockMolangToolbox,
    move: {
        scrollbars: {
            horizontal: true,
            vertical: true,
        },
        drag: true,
        wheel: true,
    },
    renderer: "zelos",
    zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75, // smaller scale (0.5–1.0 is common)
        maxScale: 1.2,
        minScale: 0.5,
        scaleSpeed: 1.1,
    },
});
const startBlock = workspace.newBlock("return_val");
startBlock.initSvg();
startBlock.render();
startBlock.setDeletable(false);
startBlock.moveBy(50, 50);

function loadProject(data) {
    Blockly.serialization.workspaces.load(data, workspace);
}
function saveProject() {
    return Blockly.serialization.workspaces.save(workspace);
}
function generateCode() {
    const code = Blockly.BedrockFunction.workspaceToCode(workspace);
    console.log("Generated code:");
    console.log(code);
    return code;
}
document.addEventListener("keydown", (e) => {
    if (e.key === "g") generateCode();
});
