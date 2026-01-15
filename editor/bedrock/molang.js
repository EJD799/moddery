// Create the definition.
const bedrockMolangDefinitions =
    Blockly.common.createBlockDefinitionsFromJsonArray([
        {
            type: "q_armor_texture_slot",
            message0: "armor texture slot %1",
            colour: 160,
            args0: [
                {
                    type: "input_value",
                    name: "SLOT",
                    check: null,
                },
            ],
            output: null,
        },
        {
            type: "q_armor_material_slot",
            message0: "armor material slot %1",
            colour: 160,
            args0: [
                {
                    type: "input_value",
                    name: "SLOT",
                    check: null,
                },
            ],
            output: null,
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
            type: "v_get_built_in",
            message0: "get variable %1",
            colour: 10,
            args0: [
                {
                    type: "field_dropdown",
                    name: "VAR",
                    options: [
                        ["a", "a"],
                        ["b", "b"],
                    ],
                },
            ],
            output: null,
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
            type: "c_get",
            message0: "get variable %1",
            colour: 230,
            args0: [
                {
                    type: "field_dropdown",
                    name: "VAR",
                    options: [
                        ["a", "a"],
                        ["b", "b"],
                    ],
                },
            ],
            output: null,
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
            output: null,
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
                    type: "q_armor_texture_slot",
                    inputs: {
                        SLOT: { shadow: { type: "armor_slot_menu" } },
                    },
                },
                {
                    kind: "block",
                    type: "q_armor_material_slot",
                    inputs: {
                        SLOT: { shadow: { type: "armor_slot_menu" } },
                    },
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
                    type: "v_get_built_in"
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
            ],
        },
        {
            kind: "category",
            name: "Math and Logic",
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
