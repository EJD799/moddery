let textures;
let elementData = {};
let currentBlockTextures = {default: ""};
let selectedTexture;
let selectedModel;
let currentTextureSelecting;
let currentModelSelecting;
let currentLootTableSelecting;

// new start
let advEditorComponent;
let advEditorInput;
let advEditorType;
let advEditorCurrentData;
let textureSelectorMode;
let tableSelectorMode;
// new end

const componentDefinitions = {
    "Placement Direction": {
        name: "Placement Direction",
        id: "minecraft:placement_direction",
        inputs: [
            {
                type: "dropdown",
                name: "type",
                label: "Type",
                tooltip: "The type of rotation to use. Cardinal direction rotation supports north, east, west, and south. Facing direction supports the cardinal directions, plus up and down.",
                options: [
                    "cardinal_direction",
                    "facing_direction"
                ]
            },
            {
                type: "number",
                name: "y_rotation_offset",
                label: "Rotation Offset",
                tooltip: "The offset of the y-axis rotation."
            }
        ],
        requires: false
    },
    "Placement Position": {
        name: "Placement Position",
        id: "minecraft:placement_position",
        inputs: [
            {
                type: "dropdown",
                name: "type",
                label: "Type",
                tooltip: "The type of positioning to use. Vertical half supports top and bottom. Block face supports north, east, west, south, up, and down.",
                options: [
                    "vertical_half",
                    "block_face"
                ]
            }
        ],
        requires: false
    },
    "Collision Box": {
        name: "Collision Box",
        id: "minecraft:collision_box",
        inputs: [
            {
                type: "boolean",
                name: "disable",
                label: "Disable Collision Box",
                tooltip: "Whether the collision box should be disabled."
            },
            {
                type: "text",
                name: "origin",
                label: "Origin",
                tooltip: "The bottom north-western corner of the collision box. Measured in pixels from the bottom center of the block. Enter the X, Y, and Z values separated by commas."
            },
            {
                type: "text",
                name: "size",
                label: "Size",
                tooltip: "The size of the collision box, in pixels, measured from the origin of the collision box. Enter the X, Y, and Z values separated by commas."
            }
        ],
        requires: false
    },
    "Block Tint": {
        name: "Block Tint",
        id: "minecraft:tint_color",
        inputs: [
            {
                type: "dropdown",
                name: "world_mode",
                label: "World Mode",
                tooltip: "The type of tinting to use in the world.",
                options: [
                    "none",
                    "birch_foliage",
                    "default_foliage",
                    "dry_foliage",
                    "evergreen_foliage",
                    "grass",
                    "water"
                ]
            },
            {
                type: "dropdown",
                name: "map_mode",
                label: "Map Mode",
                tooltip: "The type of tinting to use on maps.",
                options: [
                    "none",
                    "birch_foliage",
                    "default_foliage",
                    "dry_foliage",
                    "evergreen_foliage",
                    "grass",
                    "water"
                ]
            }
        ],
        requires: false
    },
    "Crafting Table": {
        name: "Crafting Table",
        id: "minecraft:crafting_table",
        inputs: [
            {
                type: "text",
                name: "table_name",
                label: "Table Name",
                tooltip: "The name of the crafting table."
            },
            {
                type: "list",
                name: "crafting_tags",
                label: "Crafting Tags",
                tooltip: "The list of crafting tags that apply to this table. Separate items with commas, and do not add spaces."
            }
        ],
        requires: false
    },
    "Destructible by Explosion": {
        name: "Destructible by Explosion",
        id: "minecraft:destructible_by_explosion",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Can Be Destroyed By Explosions",
                tooltip: "Whether the block can be destroyed by explosions."
            },
            {
                type: "number",
                name: "explosion_resistance",
                label: "Explosion Resistance",
                tooltip: "The explosion resistance value of the block."
            }
        ],
        requires: false
    },
    "Destructible by Mining": {
        name: "Destructible by Mining",
        id: "minecraft:destructible_by_mining",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Can Be Destroyed By Mining",
                tooltip: "Whether the block can be destroyed by mining."
            },
            {
                type: "number",
                name: "seconds_to_destroy",
                label: "Hardness",
                tooltip: "The hardness value of the block. The time it takes to destroy, in seconds, is 1.5 times this value."
            }
        ],
        requires: false
    },
    "Destruction Particles": {
        name: "Destruction Particles",
        id: "minecraft:destruction_particles",
        inputs: [
            {
                type: "number",
                name: "particle_count",
                label: "Particle Count",
                tooltip: "The number of particles that appear when the block is destroyed, from 0 to 255. Default is 100."
            }
        ],
        requires: false
    },
    "Flammable": {
        name: "Flammable",
        id: "minecraft:flammable",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Is Flammable",
                tooltip: "Whether the block is flammable."
            },
            {
                type: "number",
                name: "catch_chance_modifier",
                label: "Catch Chance Modifier",
                tooltip: "How likely the block is to catch on fire."
            },
            {
                type: "number",
                name: "destroy_chance_modifier",
                label: "Destroy Chance Modifier",
                tooltip: "How likely the block is to be destroyed when on fire."
            }
        ],
        requires: false
    },
    "Flower Pottable": {
        name: "Flower Pottable",
        id: "minecraft:flower_pottable",
        inputs: [],
        requires: false
    },
    "Friction": {
        name: "Friction",
        id: "minecraft:friction",
        inputs: [
            {
                type: "number",
                name: "main",
                label: "Friction",
                tooltip: "How much this block slows down the player while walking on it, from 0.0 to 0.9."
            }
        ],
        requires: false
    },
    "Interactable": {
        name: "Interactable",
        id: "interactable",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Interactable",
                tooltip: "Whether interaction can be detected using scripting."
            }
        ],
        requires: false
    },
    "Light Dampening": {
        name: "Light Dampening",
        id: "minecraft:light_dampening",
        inputs: [
            {
                type: "number",
                name: "main",
                label: "Light Dampening",
                tooltip: "The amount of light levels dampened by this block, from 0 to 15."
            }
        ],
        requires: false
    },
    "Light Emission": {
        name: "Light Emission",
        id: "minecraft:light_emission",
        inputs: [
            {
                type: "number",
                name: "main",
                label: "Light Emission",
                tooltip: "The amount of light levels emitted by this block, from 0 to 15."
            }
        ],
        requires: false
    },
    "Liquid Detection": {
        name: "Liquid Detection",
        id: "minecraft:liquid_detection",
        inputs: [
            {
                type: "boolean",
                name: "can_contain_liquid",
                label: "Allow Waterlogging",
                tooltip: "Whether the block can be waterlogged."
            },
            {
                type: "dropdown",
                name: "on_liquid_touches",
                label: "Reaction",
                tooltip: "What happens when water touches this block.",
                options: [
                    "blocking",
                    "broken",
                    "no_reaction",
                    "popped"
                ]
            }
        ],
        requires: false
    },
    "Loot": {
        name: "Loot",
        id: "minecraft:loot",
        inputs: [
            {
                type: "loot_table",
                name: "main",
                label: "Loot Table",
                tooltip: "The loot table to use for this block."
            }
        ],
        requires: false
    },
    "Map Color": {
        name: "Map Color",
        id: "minecraft:map_color",
        inputs: [
            {
                type: "color",
                name: "main",
                label: "Map Color",
                tooltip: "The color the block appears on a map."
            }
        ],
        requires: false
    },
    "Movable": {
        name: "Movable",
        id: "minecraft:movable",
        inputs: [
            {
                type: "dropdown",
                name: "movement_type",
                label: "Movement Type",
                tooltip: "The way the block should interact with pistons.",
                options: [
                    "immovable",
                    "popped",
                    "push",
                    "push_pull"
                ]
            },
            {
                type: "boolean",
                name: "sticky",
                label: "Sticky",
                tooltip: "Whether the block should act like slime and honey blocks."
            }
        ],
        requires: false
    },
    "Precipitation Interactions": {
        name: "Precipitation Interactions",
        id: "minecraft:precipitation_interactions",
        inputs: [
            {
                type: "dropdown",
                name: "precipitation_behavior",
                label: "Precipitation Behavior",
                tooltip: "How the block interacts with rain and snow.",
                options: [
                    "obstruct_rain_accumulate_snow",
                    "obstruct_rain",
                    "none"
                ]
            }
        ],
        requires: false
    },
    "Random Offset": {
        name: "Random Offset",
        id: "minecraft:random_offset",
        inputs: [
            {
                type: "number",
                name: "x_steps",
                label: "X Steps",
                tooltip: "The step amount for the x-axis."
            },
            {
                type: "number",
                name: "x_min",
                label: "X Range Min",
                tooltip: "The minimum range for the x-axis"
            },
            {
                type: "number",
                name: "x_max",
                label: "X Range Max",
                tooltip: "The maximum range for the x-axis"
            },
            {
                type: "number",
                name: "y_steps",
                label: "Y Steps",
                tooltip: "The step amount for the y-axis."
            },
            {
                type: "number",
                name: "y_min",
                label: "Y Range Min",
                tooltip: "The minimum range for the y-axis"
            },
            {
                type: "number",
                name: "y_max",
                label: "Y Range Max",
                tooltip: "The maximum range for the y-axis"
            },
            {
                type: "number",
                name: "z_steps",
                label: "Z Steps",
                tooltip: "The step amount for the z-axis."
            },
            {
                type: "number",
                name: "z_min",
                label: "Z Range Min",
                tooltip: "The minimum range for the z-axis"
            },
            {
                type: "number",
                name: "z_max",
                label: "Z Range Max",
                tooltip: "The maximum range for the z-axis"
            }
        ],
        requires: false
    },
    "Redstone Conductivity": {
        name: "Redstone Conductivity",
        id: "minecraft:redstone_conductivity",
        inputs: [
            {
                type: "boolean",
                name: "redstone_conductor",
                label: "Is Conductor",
                tooltip: "Whether the block can conduct redstone."
            },
            {
                type: "boolean",
                name: "allows_wire_to_step_down",
                label: "Allow Wire to Step Down",
                tooltip: "Whether the block should allow redstone wires to step down. Automatically on if \"Is Conductor\" is on."
            }
        ],
        requires: false
    },
    "Redstone Producer": {
        name: "Redstone Producer",
        id: "minecraft:redstone_producer",
        inputs: [
            {
                type: "number",
                name: "power",
                label: "Power Level",
                tooltip: "The power level output of the block, from 0 to 15."
            },
            {
                type: "list",
                name: "connected_faces",
                label: "Power Directions",
                tooltip: "Which directions the blocks outputs power. Separate items with commas, and do not add spaces. Items can be \"north\", \"south\", \"east\", \"west\", \"up\", or \"down\". Leave blank for all block faces."
            }
        ],
        requires: false
    },
    "Replaceable": {
        name: "Replaceable",
        id: "minecraft:replaceable",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Is Replaceable",
                tooltip: "Whether the block can be replaced by another block by right-clicking."
            }
        ],
        requires: false
    },
    "Selection Box": {
        name: "Selection Box",
        id: "minecraft:selection_box",
        inputs: [
            {
                type: "boolean",
                name: "disable",
                label: "Disable Selection Box",
                tooltip: "Whether the selection box should be disabled."
            },
            {
                type: "text",
                name: "origin",
                label: "Origin",
                tooltip: "The bottom north-western corner of the selection box. Measured in pixels from the bottom center of the block. Enter the X, Y, and Z values separated by commas."
            },
            {
                type: "text",
                name: "size",
                label: "Size",
                tooltip: "The size of the selection box, in pixels, measured from the origin of the selection box. Enter the X, Y, and Z values separated by commas."
            }
        ],
        requires: false
    }
};
var currentBlockComponents = {};

function centerDialogViewport(selector) {
    const $dlg = $(selector).dialog("widget");
    const w = $dlg.outerWidth();
    const h = $dlg.outerHeight();

    $dlg.css({
        position: "fixed",
        top: `calc(50% - ${h / 2}px)`,
        left: `calc(50% - ${w / 2}px)`
    });
}

function addComponent() {
  addComponentDlg.classList.add("is-active");
}
function closeAddComponentDlg() {
  addComponentDlg.classList.remove("is-active");
}
function removeSpaces(str) {
    return str.replaceAll(" ", "_s_");
}
// new start
function addSpaces(str) {
    return str.replaceAll("_s_", " ");
}
// new end
function createComponent(type) {
    let newComponentObj = {};
    let newComponentType;
    let newComponentDefault;
    let newComponentDOM;
    for (let i = 0; i < componentDefinitions[type].inputs.length; i++) {
        newComponentType = componentDefinitions[type].inputs[i].type
        if (newComponentType == "number") {
            newComponentDefault = 0;
        } else if (newComponentType == "boolean") {
            newComponentDefault = false;
        } else {
            newComponentDefault = "";
        }
        newComponentObj[componentDefinitions[type].inputs[i].name] = newComponentDefault;
    }
    if (!Object.keys(currentBlockComponents).includes(type)) {
        currentBlockComponents[type] = newComponentObj;
        var parentDiv = document.getElementById("componentsBox");
        var elementBox = document.createElement("div");
        elementBox.setAttribute("class", "componentbox");
        elementBox.setAttribute("id", "componentbox_" + removeSpaces(type));
        var elementBoxTitle = document.createElement("h3");
        elementBoxTitle.innerHTML = type + " ";
        var elementBoxDelete = document.createElement("i");
        elementBoxDelete.setAttribute("class", "fas fa-trash deleteIcon");
        elementBoxDelete.setAttribute("onclick", `openDeleteComponent('${type}')`);
        elementBoxTitle.appendChild(elementBoxDelete);
        elementBox.appendChild(elementBoxTitle);
        for (let i = 0; i < componentDefinitions[type].inputs.length; i++) {
            newComponentType = componentDefinitions[type].inputs[i].type;
            newComponentInputName = componentDefinitions[type].inputs[i].name;
            newComponentInputLabel = componentDefinitions[type].inputs[i].label;
            newComponentInputTooltip = componentDefinitions[type].inputs[i].tooltip;
            newComponentTypeName = componentDefinitions[type].name;
            if (newComponentType == "number") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("class", "input normalInput");
                newComponentDOM.setAttribute("type", "number");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, Number(event.target.value));
                });
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "color") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                let container1 = document.createElement("div");
                container1.setAttribute("class", "field");
                let container2 = document.createElement("div");
                container2.setAttribute("class", "control button");
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("type", "color");
                newComponentDOM.setAttribute("class", "newColorPicker");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });
                container2.addEventListener("click", event => {
                    newComponentDOM.click();
                });
                container2.appendChild(newComponentDOM);
                container1.appendChild(container2);
                elementBox.appendChild(container1);
            } else if (newComponentType == "dropdown") {
                // Create label
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);

                // Optional tooltip icon
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    const tooltipIcon = document.createElement("i");
                    tooltipIcon.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    tooltipIcon.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(tooltipIcon);
                }

                // Add space before the dropdown
                elementBox.appendChild(document.createTextNode(" "));


                let inputContainer = document.createElement("div");
                inputContainer.setAttribute("class", "select");
                // Create <select> element
                newComponentDOM = document.createElement("select");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));

                // Retrieve and add options from component definition
                const newComponentInputOptions = componentDefinitions[type].inputs[i].options;
                if (Array.isArray(newComponentInputOptions)) {
                    for (const optVal of newComponentInputOptions) {
                        const opt = document.createElement("option");
                        opt.value = optVal;
                        opt.textContent = optVal;
                        newComponentDOM.appendChild(opt);
                    }
                }

                // Attach event listener
                const typeName = newComponentTypeName;
                const inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });

                // Append to the element box
                inputContainer.appendChild(newComponentDOM);
                elementBox.appendChild(inputContainer);
            } else if (newComponentType == "boolean") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("type", "checkbox");
                newComponentDOM.setAttribute("class", "is-primary");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.checked);
                });
                elementBox.appendChild(newComponentDOM);
            }/* new start */ else if (newComponentType == "list") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "[]");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openAdvInputEditor("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "list")`);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "texture") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTextureDlg("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "component")`);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "loot_table") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTableDlg("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "loot_table")`);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "trade_table") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName) + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTableDlg("${removeSpaces(newComponentTypeName)}", "${removeSpaces(newComponentInputName)}", "trade_table")`);
                elementBox.appendChild(newComponentDOM);
            }/* new end */ else {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.appendChild(document.createTextNode(" "));
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.appendChild(document.createTextNode(" "));
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("class", "input normalInput");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });
                elementBox.appendChild(newComponentDOM);
            }
            elementBox.appendChild(document.createElement("br"));
            elementBox.appendChild(document.createElement("br"));
        }
        parentDiv.appendChild(elementBox);
        $(".tooltipIcon").tooltip({
            show: { effect: "fadeIn", duration: 200, delay: 0 },
            hide: { effect: "fadeOut", duration: 200, delay: 0 },
            track: false
        });
    }
    closeAddComponentDlg();
}

function generateTextureSelector(id, name) {
    return `<label for="blockTextureBtn${id}">${name}: <span id="textureNameText${id}">No texture selected</span></label>
<button name="blockTextureBtn${id}" id="blockTextureBtn${id}" onclick="openSelectTextureDlg(false, false, 'default', ${id})">Select Texture</button>
<br><br>`;
}

function openSelectTextureDlg(component, input, mode, textureToSelect) {
    // new start
    if (mode == "component") {
        advEditorComponent = component;
        advEditorInput = input;
        advEditorType = "texture";
        textureSelectorMode = "component";
        $("#selectTextureSelectBtn").hide();
        $("#selectTextureSelectBtn2").show();
    } else {
        textureSelectorMode = "default";
        $("#selectTextureSelectBtn").show();
        $("#selectTextureSelectBtn2").hide();
    }
    // new end
    selectTextureDlg.classList.add("is-active");
    currentTextureSelecting = textureToSelect;
    textures = window.parent.getTextureList();
    let selectTextureMenu = document.getElementById("selectTextureMenu");
    selectTextureMenu.innerHTML = "";
    for (let i = 0; i < textures.length; i++) {
        let selectTextureMenuItem;
        let previewBox;
        let preview;
        let itemTitle;
        let itemRadio;
        selectTextureMenuItem = document.createElement("div");
        selectTextureMenuItem.setAttribute("class", "textureMenuItem");
        itemRadio = document.createElement("input");
        itemRadio.setAttribute("type", "radio");
        itemRadio.setAttribute("name", "selectedTexture");
        itemRadio.setAttribute("class", "textureRadio");
        itemRadio.setAttribute("value", textures[i]);
        selectTextureMenuItem.appendChild(itemRadio);
        if (textures[i] != "None") {
            previewBox = document.createElement("div");
            previewBox.setAttribute("class", "smallPreviewBox");
            preview = document.createElement("img");
            window.parent.projZip.folder("assets").file(textures[i]).async("blob").then(async function (file) {
            preview.setAttribute("src", await window.parent.fileToDataURL(file));
            });
            preview.setAttribute("id", window.parent.encodeText(textures[i]) + "_preview");
            previewBox.appendChild(preview);
            selectTextureMenuItem.appendChild(previewBox);
        }
        itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "textureMenuTitle");
        itemTitle.innerHTML = textures[i];
        selectTextureMenuItem.appendChild(itemTitle);
        selectTextureMenu.appendChild(selectTextureMenuItem);
        selectTextureMenuItem.addEventListener("click", () => {
        const itemRadio = selectTextureMenuItem.querySelector('input[type="radio"]');
        if (itemRadio) {
            itemRadio.checked = true;  // select this radio
        }
        });
    }
}
function closeSelectTextureDlg() {
  selectTextureDlg.classList.remove("is-active");
}
function selectTexture(textureNumber) {
    closeSelectTextureDlg();
    const selected = document.querySelector('input[name="selectedTexture"]:checked');
    if (selected.value) {
        if (selected.value == "None") {
            let textureNameText;
            if (textureNumber == -1) {
                textureNameText = document.getElementById("textureNameText");
                currentBlockTextures["item"] = "";
            } else {
                textureNameText = document.getElementById("textureNameText" + textureNumber);
                if (textureNumber == 0) {
                    currentBlockTextures["default"] = "";
                } else {
                    currentBlockTextures[textureNumber] = "";
                }
            }
            textureNameText.innerHTML = "No texture selected";
            selectedTexture = "";
        } else {
            let textureNameText;
            if (textureNumber == -1) {
                textureNameText = document.getElementById("textureNameText");
                currentBlockTextures["item"] = selected.value;
            } else {
                textureNameText = document.getElementById("textureNameText" + textureNumber);
                if (textureNumber == 0) {
                    currentBlockTextures["default"] = selected.value;
                } else {
                    currentBlockTextures[textureNumber] = selected.value;
                }
            }
            textureNameText.innerHTML = selected.value;
            selectedTexture = selected.value;
        }
    }
}
// new start
function selectCompTexture() {
    const selected = document.querySelector('input[name="selectedTexture"]:checked');

    let component = advEditorComponent;
    let input = advEditorInput;

    if (selected.value) {
        const textureNameText = document.getElementById("textureNameText");
        if (selected.value == "None") {
            $(`#${component}${input}`).val("");
            updateInput(component, input, "");
        } else {
            $(`#${component}${input}`).val(selected.value);
            updateInput(component, input, selected.value);
        }
    }

    closeSelectTextureDlg();
}



async function openSelectTableDlg(component, input, type) {
    tableSelectorMode = type;
    advEditorComponent = component;
    advEditorInput = input;
    advEditorType = type;
    let tables;
    if (type == "trade_table") {
        selectTableDlgTitle.innerHTML = "Select Trade Table";
        tables = await window.parent.getTradeTableList();
    } else {
        selectTableDlgTitle.innerHTML = "Select Loot Table";
        tables = await window.parent.getLootTableList();
    }
    selectTableDlg.classList.add("is-active");
    let selectTableMenu = document.getElementById("selectTableMenu");
    selectTableMenu.innerHTML = "";
    for (let i = 0; i < tables.length; i++) {
        let selectTableMenuItem;
        let previewBox;
        let preview;
        let itemTitle;
        let itemRadio;
        selectTableMenuItem = document.createElement("div");
        selectTableMenuItem.setAttribute("class", "textureMenuItem");
        itemRadio = document.createElement("input");
        itemRadio.setAttribute("type", "radio");
        itemRadio.setAttribute("name", "selectedTable");
        itemRadio.setAttribute("class", "textureRadio");
        itemRadio.setAttribute("value", tables[i]);
        selectTableMenuItem.appendChild(itemRadio);
        itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "textureMenuTitle");
        itemTitle.innerHTML = tables[i];
        selectTableMenuItem.appendChild(itemTitle);
        selectTableMenu.appendChild(selectTableMenuItem);
        selectTableMenuItem.addEventListener("click", () => {
            const itemRadio = selectTableMenuItem.querySelector('input[type="radio"]');
            if (itemRadio) {
                itemRadio.checked = true;  // select this radio
            }
        });
    }
}
function closeSelectTableDlg() {
    selectTableDlg.classList.remove("is-active");
}
function selectTable() {
    const selected = document.querySelector('input[name="selectedTable"]:checked');

    let component = advEditorComponent;
    let input = advEditorInput;

    if (selected.value) {
        const textureNameText = document.getElementById("textureNameText");
        if (selected.value == "None") {
            $(`#${component}${input}`).val("");
            updateInput(component, input, "");
        } else {
            $(`#${component}${input}`).val(selected.value);
            updateInput(component, input, selected.value);
        }
    }

    closeSelectTableDlg();
}
// new end

function openSelectModelDlg() {
  selectModelDlg.classList.add("is-active");
  models = window.parent.getModelList();
  let selectModelMenu = document.getElementById("selectModelMenu");
  selectModelMenu.innerHTML = "";
  for (let i = 0; i < models.length; i++) {
    let selectModelMenuItem;
    let previewBox;
    let preview;
    let itemTitle;
    let itemRadio;
    selectModelMenuItem = document.createElement("div");
    selectModelMenuItem.setAttribute("class", "textureMenuItem");
    itemRadio = document.createElement("input");
    itemRadio.setAttribute("type", "radio");
    itemRadio.setAttribute("name", "selectedModel");
    itemRadio.setAttribute("class", "textureRadio");
    itemRadio.setAttribute("value", models[i]);
    selectModelMenuItem.appendChild(itemRadio);
    itemTitle = document.createElement("span");
    itemTitle.setAttribute("class", "textureMenuTitle");
    itemTitle.innerHTML = models[i];
    selectModelMenuItem.appendChild(itemTitle);
    selectModelMenu.appendChild(selectModelMenuItem);
    selectModelMenuItem.addEventListener("click", () => {
      const itemRadio = selectModelMenuItem.querySelector('input[type="radio"]');
      if (itemRadio) {
        itemRadio.checked = true;  // select this radio
      }
    });
  }
}
function closeSelectModelDlg() {
    selectModelDlg.classList.remove("is-active");
}
async function selectModel() {
    closeSelectModelDlg();
    const selected = document.querySelector('input[name="selectedModel"]:checked');
    let oldModel = selectedModel;
    if (selected.value) {
        let materialInstances;
        if (selected.value == "None") {
            modelNameText.innerHTML = "No model selected";
            selectedModel = "";
            materialInstances = [];
        } else {
            modelNameText.innerHTML = selected.value;
            selectedModel = selected.value;
            if (oldModel != selectedModel) {
                let modelData;
                if (selectedModel == "Full Block") {
                    modelData = {
                        "minecraft:geometry": [
                            {
                            "bones": [
                                {
                                "name": "test_bone",
                                "cubes": [
                                    {
                                    "uv": {
                                        "up":    { "material_instance": "up" },
                                        "down":  { "material_instance": "down" },
                                        "north": { "material_instance": "north" },
                                        "east":  { "material_instance": "east" },
                                        "west":  { "material_instance": "west" },
                                        "south": { "material_instance": "south" }
                                    }
                                    }
                                ]
                                }
                            ]
                            }
                        ]
                    };
                } else if (selectedModel == "Plant") {
                    modelData = {
                        "minecraft:geometry": [
                            {
                            "bones": [
                                {
                                "name": "test_bone",
                                "cubes": [
                                    {
                                    "uv": {
                                    }
                                    }
                                ]
                                }
                            ]
                            }
                        ]
                    };
                } else {
                    await window.parent.projZip.folder("assets").file(selectedModel).async("string").then(function(data) {
                        modelData = JSON.parse(data);
                    });
                }
                materialInstances = getMaterialInstances(modelData);
            }
            additionalTexturesDiv.innerHTML = "";
            for (let i = 0; i < materialInstances.length; i++) {
                let div = document.createElement("div");
                div.innerHTML = generateTextureSelector(i + 1, materialInstances[i]);
                additionalTexturesDiv.appendChild(div);
            }
        }
    }
}

useCustomItemBox.addEventListener("change", function(){
    if (useCustomItemBox.checked) {
        //$("#itemTextureDiv").show();
    } else {
        $("#itemTextureDiv").hide();
    }
});

function saveProject() {
    return {
        name: elementData.name,
        id: $("#blockIDBox").val(),
        type: "Block",
        displayName: $("#nameBox").val(),
        invCategory: $("#categoryBox").val(),
        model: selectedModel,
        hasItem: useCustomItemBox.checked,
        textures: currentBlockTextures,
        components: currentBlockComponents
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#blockIDBox").val(data.id);
    $("#nameBox").val(data.displayName);
    if ((data?.invCategory ?? false)) {
        $("#categoryBox").val(data.invCategory);
    }
    if (data.hasItem) {
        useCustomItemBox.checked = true;
    }
    loadTextures(data);
    loadComponents(data.components);
    if (useCustomItemBox.checked) {
        //$("#itemTextureDiv").show();
    } else {
        $("#itemTextureDiv").hide();
    }
}

async function loadTextures(data) {
    if (data) {
        selectedModel = data.model;
        if (data.model) {
            modelNameText.innerHTML = data.model;
        }
        if (data.textures) {
            currentBlockTextures = data.textures;
        } else {
            currentBlockTextures = {default: ""}
        }
        if (data.hasItem && data.textures.item) {
            textureNameText.innerHTML = data.textures.item;
        }
        let modelData;
        if (selectedModel == "Full Block") {
            modelData = {
                "minecraft:geometry": [
                    {
                    "bones": [
                        {
                        "name": "test_bone",
                        "cubes": [
                            {
                            "uv": {
                                "up":    { "material_instance": "up" },
                                "down":  { "material_instance": "down" },
                                "north": { "material_instance": "north" },
                                "east":  { "material_instance": "east" },
                                "west":  { "material_instance": "west" },
                                "south": { "material_instance": "south" }
                            }
                            }
                        ]
                        }
                    ]
                    }
                ]
            };
        } else if (selectedModel == "Plant") {
            modelData = {
                "minecraft:geometry": [
                    {
                    "bones": [
                        {
                        "name": "test_bone",
                        "cubes": [
                            {
                            "uv": {
                            }
                            }
                        ]
                        }
                    ]
                    }
                ]
            };
        } else {
            await window.parent.projZip.folder("assets").file(selectedModel).async("string").then(function(data) {
                modelData = JSON.parse(data);
            });
        }
        let materialInstances = getMaterialInstances(modelData);
        additionalTexturesDiv.innerHTML = "";
        for (let i = 0; i < materialInstances.length; i++) {
            let div = document.createElement("div");
            div.innerHTML = generateTextureSelector(i + 1, materialInstances[i]);
            additionalTexturesDiv.appendChild(div);
        }
        dataKeys = Object.keys(data.textures);
        if (data.textures["default"]) {
            document.getElementById(`textureNameText0`).innerHTML = data.textures["default"];
        }
        for (const [key, value] of Object.entries(data.textures)) {
            if (key === "default" || key === "item") continue;

            const index = Number(key);
            if (Number.isNaN(index)) continue;

            const el = document.getElementById(`textureNameText${index}`);
            if (el) {
                el.innerHTML = value;
            }
        }
    }
}

function loadComponents(data) {
    if (data) {
        for (let i = 0; i < Object.keys(data).length; i++) {
            createComponent(Object.keys(data)[i]);
            let componentInputDefs = componentDefinitions[Object.keys(data)[i]].inputs;
            for (let j = 0; j < componentInputDefs.length; j++) {
                if (componentInputDefs[j].type == "boolean") {
                    $(removeSpaces(`#${Object.keys(data)[i]}${componentInputDefs[j].name}`)).prop("checked", data[Object.keys(data)[i]][componentInputDefs[j].name]);
                } else {
                    $(removeSpaces(`#${Object.keys(data)[i]}${componentInputDefs[j].name}`)).val(data[Object.keys(data)[i]][componentInputDefs[j].name]);
                }
                currentBlockComponents[Object.keys(data)[i]][componentInputDefs[j].name] = data[Object.keys(data)[i]][componentInputDefs[j].name];
            }
        }
    }
}

function updateInput(type, input, value) {
    currentBlockComponents[addSpaces(type)][input] = value;
}

function deleteComponent(name) {
    delete currentBlockComponents[name];
    document.getElementById("componentbox_" + removeSpaces(name)).remove();
    closeDeleteComponent()
}

function closeDeleteComponent() {
    deleteDlg.classList.remove("is-active");
}

function openDeleteComponent(name) {
    deleteDlg.classList.add("is-active");
    let deleteDlgText = document.getElementById("deleteDlgText");
    let deleteDlgConfirm = document.getElementById("deleteDlgConfirm");
    deleteDlgText.innerHTML = `Are you sure you want to delete the component "${name}"?`;
    deleteDlgConfirm.setAttribute("onclick", `deleteComponent("${name}")`);
}


// new start
function changeAdvInputMode(mode) {
    if (mode == "list") {
        $("#advEditorContentList").show();
        advEditorListContent.innerHTML = "";
    }
}
function openAdvInputEditor(component, input, type) {
    advEditorComponent = component;
    advEditorInput = input;
    advEditorType = type;
    advEditor.classList.add("is-active");
    if (type == "list") {
        changeAdvInputMode("list");
        if (typeof currentBlockComponents[addSpaces(component)][addSpaces(input)] != "object") {
            currentBlockComponents[addSpaces(component)][addSpaces(input)] = [];
        }
        advEditorCurrentData = currentBlockComponents[addSpaces(component)][addSpaces(input)];
        for (let i = 0; i < advEditorCurrentData.length; i++) {
            advEditorAddItem("list", advEditorCurrentData[i], i);
        }
    }
}
function closeAdvInputEditor() {
    advEditor.classList.remove("is-active");
}
function saveAdvInput() {
    let component = advEditorComponent;
    let input = advEditorInput;
    let type = advEditorType;
    let data = advEditorCurrentData;
    $(`#${component}${input}`).val(data.toString());
    updateInput(component, input, data);
    closeAdvInputEditor();
}
function advEditorAddItem(mode, value, idVal = -1) {
    let id;
    if (idVal >= 0) {
        id = idVal;
    } else {
        id = advEditorCurrentData.length;
        advEditorCurrentData[id] = value;
    }
    if (mode == "list") {
        let textBox = document.createElement("input");
        textBox.setAttribute("id", `advEditorListItem${id}`);
        textBox.setAttribute("value", value);
        textBox.addEventListener("change", event => {
            advEditorCurrentData[id] = event.target.value;
        });
        advEditorListContent.appendChild(textBox);
        let deleteBtn = document.createElement("i");
        deleteBtn.setAttribute("class", "fas fa-trash deleteIcon");
        deleteBtn.setAttribute("onclick", `advEditorRemoveItem(${id})`);
        advEditorListContent.appendChild(document.createTextNode(" "));
        advEditorListContent.appendChild(deleteBtn);
        advEditorListContent.appendChild(document.createElement("br"));
    }
}
function advEditorRemoveItem(id) {
    if (advEditorType == "list") {
        advEditorListContent.innerHTML = "";
    }
    advEditorCurrentData.splice(id, 1);
    for (let i = 0; i < advEditorCurrentData.length; i++) {
        advEditorAddItem(advEditorType, advEditorCurrentData[i], i);
    }
}
// new end


// Run after jQuery, jQuery UI and TouchPunch are loaded and after dialogs exist.
$(function () {

  // --- Small compatibility patch for draggable + fixed positioning (fixes offsets) ---
  // This tweak adjusts internal offsets when element is fixed. Run once.
  (function () {
    if (!$.ui || !$.ui.draggable) return;
    const _oldMouseStart = $.ui.draggable.prototype._mouseStart;
    $.ui.draggable.prototype._mouseStart = function (event) {
      // If helper/widget is fixed, adjust click offset to page coords so TouchPunch / draggable agree.
      try {
        if (this.helper && this.helper.css && this.helper.css("position") === "fixed" && event && event.pageX !== undefined) {
          const helperOffset = this.helper.offset(); // page coords
          this.offset.click = {
            left: event.pageX - helperOffset.left,
            top: event.pageY - helperOffset.top
          };
        }
      } catch (err) {
        // swallow harmless errors
      }
      return _oldMouseStart.call(this, event);
    };
  })();

  // --- Helpers ---
  function centerWidgetInViewport($widget) {
    // Use window.innerWidth/innerHeight to ensure viewport values
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = $widget.outerWidth();
    const h = $widget.outerHeight();
    const top = Math.max(Math.round((vh - h) / 2), 0);
    const left = Math.max(Math.round((vw - w) / 2), 0);
    $widget.css({
      position: "fixed",
      top: top + "px",
      left: left + "px",
      transform: "" // ensure no translate transform interfering
    });
  }

  function makeTitlebarTouchable($widget) {
    $widget.find(".ui-dialog-titlebar").css({
      "touch-action": "none",
      "-ms-touch-action": "none"
    });
  }

  // --- Main patch routine ---
  function patchAllDialogsToViewport() {
    $(".ui-dialog-content").each(function () {
      const $content = $(this);
      const inst = $content.dialog("instance");
      if (!inst) return;

      // Widget is the actual visible .ui-dialog wrapper
      const $widget = $content.dialog("widget");

      // ensure titlebar allows touch events
      makeTitlebarTouchable($widget);

      // Initialize draggable once on the widget (do NOT destroy/recreate on open)
      if (!$widget.data("ui-draggable")) {
        $widget.draggable({
          handle: ".ui-dialog-titlebar",
          scroll: false,
          // We do not set containment here because containment coords can be tricky with fixed,
          // but you can enable if you want to restrict dragging:
          // containment: [0, 0, window.innerWidth - $widget.outerWidth(), window.innerHeight - $widget.outerHeight()]
        });
      }

      // Preserve any existing open callback
      const originalOpen = $content.dialog("option", "open");

      // Replace open to center (but DO NOT re-init draggable)
      $content.dialog("option", "open", function (event, ui) {
        if (typeof originalOpen === "function") originalOpen.call(this, event, ui);

        // center the widget in the viewport (pixel-based)
        centerWidgetInViewport($widget);

        // reapply touchable titlebar (in case UI rebuilt the widget)
        makeTitlebarTouchable($widget);

        // Re-center on resize (use namespaced handler so we can overwrite safely)
        $(window).off("resize.centerDialog").on("resize.centerDialog", function () {
          centerWidgetInViewport($widget);
        });
      });
    });
  }

  // Run it now:
  patchAllDialogsToViewport();

  // Optional: watch for future dialogs being added dynamically and patch them
  const mo = new MutationObserver((mutations) => {
    let added = false;
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.classList && node.classList.contains("ui-dialog-content")) { added = true; break; }
        if (node.querySelector && node.querySelector(".ui-dialog-content")) { added = true; break; }
      }
      if (added) break;
    }
    if (added) patchAllDialogsToViewport();
  });
  mo.observe(document.body, { childList: true, subtree: true });

});

let boxToValidate = blockIDBox;
boxToValidate.addEventListener("input", function (e) {
  const value = boxToValidate.value;

  if (isValidElementID(value)) {
    // Valid → remove the "invalid" class if it exists
    boxToValidate.classList.remove("invalidTextBox");
  } else {
    // Invalid → add the "invalid" class
    boxToValidate.classList.add("invalidTextBox");
  }
});