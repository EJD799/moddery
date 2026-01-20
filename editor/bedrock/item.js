let textures;
let elementData = {};
let selectedTexture;

// new start
let advEditorComponent;
let advEditorInput;
let advEditorType;
let advEditorCurrentData;
let textureSelectorMode;
let tableSelectorMode;
// new end

const componentDefinitions = {
    /*"Test": {
        name: "Test",
        id: "test",
        inputs: [
            {
                type: "list",
                name: "list",
                label: "List",
                tooltip: "A list."
            },
            {
                type: "texture",
                name: "texture",
                label: "Texture",
                tooltip: "A texture."
            },
            {
                type: "loot_table",
                name: "loot_table",
                label: "Loot Table",
                tooltip: "A loot table."
            },
            {
                type: "trade_table",
                name: "trade_table",
                label: "Trade Table",
                tooltip: "A trade table."
            }
        ],
        requires: false
    },*/
    "Allow Off Hand": {
        name: "Allow Off Hand",
        id: "minecraft:allow_off_hand",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Allow Off Hand",
                tooltip: "Whether the item can be wielded in the off-hand."
            }
        ],
        requires: false
    },
    "Block Placer": {
        name: "Block Placer",
        id: "minecraft:block_placer",
        inputs: [
            {
                type: "text",
                name: "block",
                label: "Block ID",
                tooltip: "The block to place."
            },
            {
                type: "boolean",
                name: "replace_block_item",
                label: "Replace Block Item",
                tooltip: "Whether the item should replace the block."
            },
            {
                type: "list",
                name: "use_on",
                label: "Use On Filter",
                tooltip: "The list of items the block can be used on."
            }
        ],
        requires: false
    },
    "Bundle Interaction": {
        name: "Bundle Interaction",
        id: "minecraft:bundle_interaction",
        inputs: [
            {
                type: "number",
                name: "num_viewable_slots",
                label: "Number of Viewable Slots",
                tooltip: "The number of slots that can be viewed on hover. Requires the Storage Item component."
            }
        ],
        requires: ["Storage Item"]
    },
    "Can Destroy in Creative": {
        name: "Can Destroy in Creative",
        id: "minecraft:can_destroy_in_creative",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Can Break Blocks",
                tooltip: "Whether the item can break blocks in Creative mode. Example: swords cannot break blocks."
            }
        ],
        requires: false
    },
    "Compostable": {
        name: "Compostable",
        id: "minecraft:compostable",
        inputs: [
            {
                type: "number",
                name: "composting_chance",
                label: "Composting Chance (%)",
                tooltip: "How likely the composter level is to increase."
            }
        ],
        requires: false
    },
    "Cooldown": {
        name: "Cooldown",
        id: "minecraft:cooldown",
        inputs: [
            {
                type: "number",
                name: "duration",
                label: "Duration (seconds)",
                tooltip: "How long the item will be disabled after using it."
            }
        ],
        requires: false
    },
    "Damage": {
        name: "Damage",
        id: "minecraft:damage",
        inputs: [
            {
                type: "number",
                name: "main",
                label: "Damage Points",
                tooltip: "The amount of damage the item deals on attack."
            }
        ],
        requires: false
    },
    "Digger": {
        name: "Digger",
        id: "minecraft:digger",
        inputs: [
            {
                type: "number",
                name: "speed",
                label: "Destroy Speed",
                tooltip: "How fast the item can break blocks, in seconds."
            },
            {
                type: "molang",
                name: "block",
                label: "Block Type Filter",
                tooltip: "Which types of blocks can be broken at this speed. Enter a Molang query."
            }
        ],
        requires: false
    },
    "Durability": {
        name: "Durability",
        id: "minecraft:durability",
        inputs: [
            {
                type: "number",
                name: "max_durability",
                label: "Durability",
                tooltip: "The durability level of the item."
            },
            {
                type: "number",
                name: "damage_chance",
                label: "Damage Chance (%)",
                tooltip: "The chance of the item to take durability damage."
            }
        ],
        requires: false
    },
    "Dyeable": {
        name: "Dyeable",
        id: "minecraft:dyeable",
        inputs: [
            {
                type: "color",
                name: "default_color",
                label: "Default Color",
                tooltip: "The default color of the item."
            }
        ],
        requires: false
    },
    "Enchantable": {
        name: "Enchantable",
        id: "minecraft:enchantable",
        inputs: [
            {
                type: "dropdown",
                name: "slot",
                label: "Slot",
                tooltip: "The enchantment category that can be applied to this item.",
                options: [
                    "armor_feet",
                    "armor_torso",
                    "armor_head",
                    "armor_legs",
                    "axe",
                    "bow",
                    "cosmetic_head",
                    "crossbow",
                    "elytra",
                    "fishing_rod",
                    "flintsteel",
                    "hoe",
                    "pickaxe",
                    "shears",
                    "shield",
                    "shovel",
                    "sword",
                    "all"
                ]
            },
            {
                type: "number",
                name: "value",
                label: "Enchantability Value",
                tooltip: "How enchantable the item is. See \"Enchanting Mechanics\" on the Minecraft Wiki."
            }
        ],
        requires: false
    },
    "Entity Placer": {
        name: "Entity Placer",
        id: "minecraft:entity_placer",
        inputs: [
            {
                type: "text",
                name: "entity",
                label: "Entity",
                tooltip: "The entity to place."
            }
        ],
        requires: false
    },
    "Fire Resistant": {
        name: "Fire Resistant",
        id: "minecraft:fire_resistant",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Fire Resistant",
                tooltip: "Whether the item is resistant to fire when dropped, like netherite."
            }
        ],
        requires: false
    },
    "Food": {
        name: "Food",
        id: "minecraft:food",
        inputs: [
            {
                type: "boolean",
                name: "can_always_eat",
                label: "Can Always Eat",
                tooltip: "Whether the item can be eaten when the hunger bar is full."
            },
            {
                type: "number",
                name: "nutrition",
                label: "Nutrition",
                tooltip: "The number of hunger points restored."
            },
            {
                type: "number",
                name: "saturation_modifier",
                label: "Saturation",
                tooltip: "The saturation modifier. See \"Saturation\" on the Minecraft Wiki."
            },
            {
                type: "string",
                name: "using_converts_to",
                label: "Using Converts To",
                tooltip: "The item the item turns into when it is consumed."
            }
        ],
        requires: false
    },
    "Fuel": {
        name: "Fuel",
        id: "minecraft:fuel",
        inputs: [
            {
                type: "number",
                name: "duration",
                label: "Duration",
                tooltip: "How long, in seconds, the item will power a furnace."
            }
        ],
        requires: false
    },
    "Glint": {
        name: "Glint",
        id: "minecraft:glint",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Show Glint",
                tooltip: "Whether the item should have an enchantment glint."
            }
        ],
        requires: false
    },
    "Hand Equipped": {
        name: "Hand Equipped",
        id: "minecraft:hand_equipped",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Tool Rendering",
                tooltip: "Whether the item should render like a tool when held."
            }
        ],
        requires: false
    },
    "Hover Text Color": {
        name: "Hover Text Color",
        id: "minecraft:hover_text_color",
        inputs: [
            {
                type: "dropdown",
                name: "main",
                label: "Color",
                tooltip: "The color the item name should be when hovered.",
                options: [
                    "black",
                    "dark_blue",
                    "dark_green",
                    "dark_aqua",
                    "dark_red",
                    "dark_purple",
                    "gold",
                    "gray",
                    "dark_gray",
                    "blue",
                    "green",
                    "aqua",
                    "red",
                    "light_purple",
                    "yellow",
                    "white",
                    "minecoin_gold",
                    "material_quartz",
                    "material_iron",
                    "material_netherite",
                    "material_redstone",
                    "material_copper",
                    "material_gold",
                    "material_emerald",
                    "material_diamond",
                    "material_lapis",
                    "material_amethyst",
                    "material_resin"
                ]
            }
        ],
        requires: false
    },
    "Interact Button": {
        name: "Interact Button",
        id: "minecraft:interact_button",
        inputs: [
            {
                type: "text",
                name: "main",
                label: "Text",
                tooltip: "The text that should be displayed on the touch controls interact button."
            }
        ],
        requires: false
    },
    "Liquid Clipped": {
        name: "Liquid Clipped",
        id: "minecraft:liquid_clipped",
        inputs: [
            {
                type: "text",
                name: "main",
                label: "Interact with Liquids",
                tooltip: "Whether the item can interact with liquid blocks."
            }
        ],
        requires: false
    },
    "Projectile": {
        name: "Projectile",
        id: "minecraft:projectile",
        inputs: [
            {
                type: "number",
                name: "minimum_critical_power",
                label: "Minimum Critical Power",
                tooltip: "The time the projectile needs to charge for a critical hit."
            },
            {
                type: "text",
                name: "projectile_entity",
                label: "Projectile Entity",
                tooltip: "The entity that is fired by this item."
            }
        ],
        requires: false
    },
    "Rarity": {
        name: "Rarity",
        id: "minecraft:rarity",
        inputs: [
            {
                type: "dropdown",
                name: "main",
                label: "Rarity",
                tooltip: "The rarity of the item.",
                options: [
                    "common",
                    "uncommon",
                    "rare",
                    "epic"
                ]
            }
        ],
        requires: false
    },
    "Record": {
        name: "Record",
        id: "minecraft:record",
        inputs: [
            {
                type: "number",
                name: "comparator_signal",
                label: "Comparator Signal",
                tooltip: "The signal strength output from a comparator."
            },
            {
                type: "number",
                name: "duration",
                label: "Duration",
                tooltip: "The duration of the disc, in seconds."
            },
            {
                type: "text",
                name: "sound_event",
                label: "Sound ID",
                tooltip: "The sound that is played by this disc."
            }
        ],
        requires: false
    },
    "Repairable": {
        name: "Repairable",
        id: "minecraft:repairable",
        inputs: [
            {
                type: "number",
                name: "repair_amount",
                label: "Repair Amount",
                tooltip: "How much durability is repaired."
            },
            {
                type: "list",
                name: "items",
                label: "Items",
                tooltip: "The items that can repair this item."
            }
        ],
        requires: false
    },
    "Shooter": {
        name: "Shooter",
        id: "minecraft:shooter",
        inputs: [
            {
                type: "list",
                name: "item",
                label: "Ammunition Items",
                tooltip: "The items that can be used as ammunition."
            },
            {
                type: "boolean",
                name: "charge_on_draw",
                label: "Charge on Draw",
                tooltip: "Whether the item should charge when drawn."
            },
            {
                type: "number",
                name: "max_draw_duration",
                label: "Max Draw Duration",
                tooltip: "How long, in seconds, the item can be drawn before releasing automatically."
            },
            {
                type: "boolean",
                name: "scale_power_by_draw_duration",
                label: "Scale Power by Draw Duration",
                tooltip: "Whether the power should increase when drawn longer."
            }
        ],
        requires: ["Use Modifiers"]
    },
    "Should Despawn": {
        name: "Should Despawn",
        id: "minecraft:should_despawn",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Should Despawn",
                tooltip: "Whether the item should despawn when left in the world."
            }
        ],
        requires: false
    },
    "Stacked by Data": {
        name: "Stacked by Data",
        id: "minecraft:stacked_by_data",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Allow Stacking",
                tooltip: "Whether items with different data can stack together."
            }
        ],
        requires: false
    },
    "Storage Item": {
        name: "Storage Item",
        id: "minecraft:storage_item",
        inputs: [
            {
                type: "boolean",
                name: "allow_nested_storage_items",
                label: "Allow Nested Storage Items",
                tooltip: "Whether other storage items can be stored in this item."
            },
            {
                type: "list",
                name: "allowed_items",
                label: "Allowed Items",
                tooltip: "The list of items that can be stored in this item."
            },
            {
                type: "list",
                name: "banned_items",
                label: "Banned Items",
                tooltip: "The list of items that cannot be stored in this item."
            },
            {
                type: "number",
                name: "max_slots",
                label: "Max Slots",
                tooltip: "The number of slots the item can hold."
            }
        ],
        requires: false
    },
    "Swing Duration": {
        name: "Swing Duration",
        id: "minecraft:swing_duration",
        inputs: [
            {
                type: "number",
                name: "value",
                label: "Swing Duration",
                tooltip: "The length of the swing animation, in seconds."
            }
        ],
        requires: false
    },
    "Tags": {
        name: "Tags",
        id: "minecraft:tags",
        inputs: [
            {
                type: "list",
                name: "tags",
                label: "Tags",
                tooltip: "The list of tags to apply to the item. Separate items with commas."
            }
        ],
        requires: false
    },
    "Throwable": {
        name: "Throwable",
        id: "minecraft:throwable",
        inputs: [
            {
                type: "boolean",
                name: "do_swing_animation",
                label: "Do Swing Animation",
                tooltip: "Whether the item will show a swing animation when thrown."
            },
            {
                type: "number",
                name: "launch_power_scale",
                label: "Launch Power Scale",
                tooltip: "The scale at which the power of the throw increases."
            },
            {
                type: "number",
                name: "max_launch_power",
                label: "Max Launch Power",
                tooltip: "The maximum power of the throw."
            }
        ],
        requires: ["Projectile"]
    },
    "Use Animation": {
        name: "Use Animation",
        id: "minecraft:use_animation",
        inputs: [
            {
                type: "dropdown",
                name: "main",
                label: "Animation",
                tooltip: "The animation of the item when used.",
                options: [
                    "eat",
                    "drink",
                    "bow",
                    "block",
                    "camera",
                    "crossbow",
                    "none",
                    "brush",
                    "spear",
                    "spyglass"
                ]
            }
        ],
        requires: false
    },
    "Use Modifiers": {
        name: "Use Modifiers",
        id: "minecraft:use_modifiers",
        inputs: [
            /*{
                type: "boolean",
                name: "emit_vibrations",
                label: "Emit Vibrations",
                tooltip: "Whether the item emits vibrations when it is used."
            },*/
            {
                type: "number",
                name: "movement_modifier",
                label: "Movement Modifier",
                tooltip: "The scale of the player speed while the item is used."
            },
            {
                type: "number",
                name: "use_duration",
                label: "Use Duration",
                tooltip: "How long, in seconds, it takes to use the item."
            }
        ],
        requires: false
    },
    "Wearable": {
        name: "Wearable",
        id: "minecraft:wearable",
        inputs: [
            {
                type: "dropdown",
                name: "slot",
                label: "Slot",
                tooltip: "The slot that the item can be worn in.",
                options: [
                    "slot.armor.head",
                    "slot.armor.chest",
                    "slot.armor.legs",
                    "slot.armor.feet"
                ]
            },
            {
                type: "number",
                name: "protection",
                label: "Protection",
                tooltip: "The amount of protection the item provides when worn."
            },
            {
                type: "boolean",
                name: "hides_player_location",
                label: "Hides Player Location",
                tooltip: "Whether a player wearing the item is hidden from locator maps and the locator bar."
            }
        ],
        requires: false
    }
};
var currentItemComponents = {};

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
    if (!Object.keys(currentItemComponents).includes(type)) {
        currentItemComponents[type] = newComponentObj;
        var parentDiv = document.getElementById("componentsBox");
        var elementBox = document.createElement("div");
        elementBox.setAttribute("class", "card componentbox");
        elementBox.setAttribute("id", "componentbox_" + removeSpaces(type));
        var elementBoxTitle = document.createElement("h5");
        elementBoxTitle.setAttribute("class", "title is-5");
        elementBoxTitle.innerHTML = type + " ";
        var elementBoxDelete = document.createElement("button");
        elementBoxDelete.setAttribute("class", "button is-danger newDeleteBtn");
        elementBoxDelete.setAttribute("onclick", `openDeleteComponent('${type}')`);
        elementBoxDelete.innerHTML = `<i class="fas fa-trash"></i>`;
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
    addComponentDlg.classList.remove("is-active");
}
function openSelectTextureDlg(component, input, mode) {
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
        selectTextureMenuItem.setAttribute("class", "card textureMenuItem");
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
function selectTexture() {
    closeSelectTextureDlg();
    const selected = document.querySelector('input[name="selectedTexture"]:checked');
    if (selected.value) {
        const textureNameText = document.getElementById("textureNameText");
        if (selected.value == "None") {
            textureNameText.innerHTML = "No texture selected";
            selectedTexture = "";
        } else {
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
    openSelectTableDlg.classList.add("is-active");
    let selectTableMenu = document.getElementById("selectTableMenu");
    selectTableMenu.innerHTML = "";
    for (let i = 0; i < tables.length; i++) {
        let selectTableMenuItem;
        let previewBox;
        let preview;
        let itemTitle;
        let itemRadio;
        selectTableMenuItem = document.createElement("div");
        selectTableMenuItem.setAttribute("class", "card textureMenuItem");
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

function saveProject() {
    return {
        name: elementData.name,
        id: $("#itemIDBox").val(),
        type: "Item",
        displayName: $("#nameBox").val(),
        invCategory: $("#categoryBox").val(),
        maxStackSize: $("#stackSizeBox").val(),
        texture: selectedTexture,
        components: currentItemComponents
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#itemIDBox").val(data.id);
    $("#nameBox").val(data.displayName);
    if ((data?.invCategory ?? false)) {
        $("#categoryBox").val(data.invCategory);
    }
    $("#stackSizeBox").val(data.maxStackSize);
    selectedTexture = data.texture;
    if (selectedTexture) {
        document.getElementById("textureNameText").innerHTML = selectedTexture;
    } else {
        document.getElementById("textureNameText").innerHTML = "No texture selected";
    }
    loadComponents(data.components);
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
                currentItemComponents[Object.keys(data)[i]][componentInputDefs[j].name] = data[Object.keys(data)[i]][componentInputDefs[j].name];
            }
        }
    }
}

function updateInput(type, input, value) {
    currentItemComponents[addSpaces(type)][input] = value;
}

function deleteComponent(name) {
    delete currentItemComponents[name];
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
        if (typeof currentItemComponents[addSpaces(component)][addSpaces(input)] != "object") {
            currentItemComponents[addSpaces(component)][addSpaces(input)] = [];
        }
        advEditorCurrentData = currentItemComponents[addSpaces(component)][addSpaces(input)];
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
        textBox.setAttribute("class", "input normalInput");
        textBox.addEventListener("change", event => {
            advEditorCurrentData[id] = event.target.value;
        });
        advEditorListContent.appendChild(textBox);
        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "button is-danger newDeleteBtn");
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
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

let boxToValidate = itemIDBox;
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