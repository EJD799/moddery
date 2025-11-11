let textures;
let elementData;
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
                label: "Number of Viewable Slots"
            }
        ],
        requires: ["minecraft:storage_item"]
    },
    "Can Destroy in Creative": {
        name: "Can Destroy in Creative",
        id: "minecraft:can_destroy_in_creative",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Can Break Blocks"
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
                tooltip: "How likely the composter level is to increase"
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
                label: "Duration (seconds)"
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
                label: "Damage Points"
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
                label: "Destroy Speed"
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
                label: "Durability"
            }
        ],
        requires: false
    },
    "Dyeable": {
        name: "Dyeable",
        id: "minecraft:dyeable",
        inputs: [
            {
                type: "text",
                name: "default_color",
                label: "Default Color"
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
                label: "Enchantability Value"
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
                label: "Entity"
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
                label: "Fire Resistant"
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
                label: "Can Always Eat"
            },
            {
                type: "number",
                name: "nutrition",
                label: "Nutrition"
            },
            {
                type: "number",
                name: "saturation_modifier",
                label: "Saturation"
            },
            {
                type: "string",
                name: "using_converts_to",
                label: "Using Converts To"
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
                label: "Duration"
            }
        ],
        requires: false
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
function createComponent() {
    let newComponentObj = {};
    let newComponentType;
    let newComponentDefault;
    let newComponentDOM;
    for (let i = 0; i < componentDefinitions[$("#addComponentType").val()].inputs.length; i++) {
        newComponentType = componentDefinitions[$("#addComponentType").val()].inputs[i].type
        if (newComponentType == "number") {
            newComponentDefault = 0;
        } else if (newComponentType == "boolean") {
            newComponentDefault = false;
        } else {
            newComponentDefault = "";
        }
        newComponentObj[componentDefinitions[$("#addComponentType").val()].inputs[i].name] = newComponentDefault;
    }
    if (!Object.keys(currentItemComponents).includes($("#addComponentType").val())) {
        currentItemComponents[$("#addComponentType").val()] = newComponentObj;
        var parentDiv = document.getElementById("componentsBox");
        var elementBox = document.createElement("div");
        elementBox.setAttribute("class", "componentbox");
        var elementBoxTitle = document.createElement("h3");
        elementBoxTitle.innerHTML = $("#addComponentType").val();
        elementBox.appendChild(elementBoxTitle);
        for (let i = 0; i < componentDefinitions[$("#addComponentType").val()].inputs.length; i++) {
            newComponentType = componentDefinitions[$("#addComponentType").val()].inputs[i].type;
            newComponentInputName = componentDefinitions[$("#addComponentType").val()].inputs[i].name;
            newComponentInputLabel = componentDefinitions[$("#addComponentType").val()].inputs[i].label;
            newComponentInputTooltip = componentDefinitions[$("#addComponentType").val()].inputs[i].tooltip;
            newComponentTypeName = componentDefinitions[$("#addComponentType").val()].name;
            if (newComponentType == "number") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.innerHTML = elementBox.innerHTML + " ";
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.innerHTML = elementBox.innerHTML + " ";
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("type", "number");
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "boolean") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.innerHTML = elementBox.innerHTML + " ";
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.innerHTML = elementBox.innerHTML + " ";
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("type", "checkbox");
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "list") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.innerHTML = elementBox.innerHTML + " ";
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.innerHTML = elementBox.innerHTML + " ";
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                elementBox.appendChild(newComponentDOM);
            } else {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", newComponentTypeName + newComponentInputName);
                newComponentDOM.innerHTML = newComponentInputLabel;
                elementBox.appendChild(newComponentDOM);
                if (newComponentInputTooltip) {
                    elementBox.innerHTML = elementBox.innerHTML + " ";
                    newComponentDOM = document.createElement("i");
                    newComponentDOM.setAttribute("class", "fas fa-circle-info tooltipIcon");
                    newComponentDOM.setAttribute("title", newComponentInputTooltip);
                    elementBox.appendChild(newComponentDOM);
                }
                elementBox.innerHTML = elementBox.innerHTML + " ";
                newComponentDOM = document.createElement("input");
                newComponentDOM.setAttribute("name", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("id", newComponentTypeName + newComponentInputName);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
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
        $('input').addClass("ui-widget ui-widget-content ui-corner-all");
        /*if (Object.keys(currentItemComponents).length % 3 === 0) {
            parentDiv.appendChild(document.createElement("br"));
        }*/
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
        texture: selectedTexture
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#itemIDBox").val(data.id);
    $("#nameBox").val(data.displayName);
    $("#categoryBox").val(data.invCategory);
    $("#stackSizeBox").val(data.maxStackSize);
    selectedTexture = data.texture;
}