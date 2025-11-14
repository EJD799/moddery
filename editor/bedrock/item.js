let textures;
let elementData = {};
let selectedTexture;

const componentDefinitions = {
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
                tooltip: "The list of items the block can be used on. Separate items with commas. Do not add spaces."
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
                type: "text",
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
                tooltip: "The items that can repair this item. Separate items with commas. Do not add spaces."
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
                tooltip: "The items that can be used as ammunition. Separate items with commas. Do not add spaces."
            },
            {
                type: "boolean",
                name: "use_offhand",
                label: "Allow Off-hand",
                tooltip: "Whether the ammunition items can be used in the off-hand."
            },
            {
                type: "boolean",
                name: "search_inventory",
                label: "Search Inventory",
                tooltip: "Whether the inventory should be searched for ammunition."
            },
            {
                type: "boolean",
                name: "use_in_creative",
                label: "Use in Creative",
                tooltip: "Whether the item can be used in creative mode."
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

};
var currentItemComponents = {};

$("#categoryBox").selectmenu();
$("#itemTextureBtn").button();
$("#addComponentBtn").button();
$("#addComponentCancelBtn").button();
$("#addComponentAddBtn").button();
$("#selectTextureCancelBtn").button();
$("#selectTextureSelectBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

$("#addComponentDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 200,
  width: 500
});
$("#addComponentDlg").dialog("close");
$("#selectTextureDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectTextureDlg").dialog("close");
function addComponent() {
  $("#addComponentDlg").dialog("open");
}
function closeAddComponentDlg() {
  $("#addComponentDlg").dialog("close");
}
function removeSpaces(str) {
    return str.replaceAll(" ", "_s_");
}
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
        elementBox.setAttribute("class", "componentbox");
        var elementBoxTitle = document.createElement("h3");
        elementBoxTitle.innerHTML = type;
        elementBox.appendChild(elementBoxTitle);
        let dropdownsToRegister = [];
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
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", removeSpaces(newComponentTypeName + newComponentInputName));
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("type", "color");
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });
                elementBox.appendChild(newComponentDOM);
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

                // Add to dropdown registration list for jQuery UI
                dropdownsToRegister.push([removeSpaces(newComponentTypeName), removeSpaces(newComponentInputName)]);

                // Append to the element box
                elementBox.appendChild(newComponentDOM);
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
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.checked);
                });
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "list") {
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
                let typeName = newComponentTypeName;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });
                elementBox.appendChild(newComponentDOM);
            } else {
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
        for (let k = 0; k < dropdownsToRegister.length; k++) {
            const [typeName, inputName] = dropdownsToRegister[k];
            $("#" + typeName + inputName).selectmenu({
                change: function (event, ui) {
                    updateInput(typeName, inputName, ui.item.value);
                }
            });
        }
        $(".tooltipIcon").tooltip({
            show: { effect: "fadeIn", duration: 200, delay: 0 },
            hide: { effect: "fadeOut", duration: 200, delay: 0 },
            track: false
        });
        $('input').addClass("ui-widget ui-widget-content ui-corner-all");
    }
    $("#addComponentDlg").dialog("close");
}
function openSelectTextureDlg() {
  $("#selectTextureDlg").dialog("open");
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
    previewBox = document.createElement("div");
    previewBox.setAttribute("class", "smallPreviewBox");
    preview = document.createElement("img");
    window.parent.projZip.folder("assets").file(textures[i]).async("blob").then(async function (file) {
      preview.setAttribute("src", await window.parent.fileToDataURL(file));
    });
    preview.setAttribute("id", window.parent.encodeText(textures[i]) + "_preview");
    previewBox.appendChild(preview);
    selectTextureMenuItem.appendChild(previewBox);
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
  $("#selectTextureDlg").dialog("close");
}
function selectTexture() {
    $("#selectTextureDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedTexture"]:checked');
    if (selected.value) {
        const textureNameText = document.getElementById("textureNameText");
        textureNameText.innerHTML = selected.value;
        selectedTexture = selected.value;
    }
}
$("#addComponentType").selectmenu();

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
    $("#categoryBox").val(data.invCategory);
    $("#categoryBox").selectmenu("refresh");
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
    alert(`${type}\n${input}\n${value}`);
    currentItemComponents[type][input] = value;
}