let textures;
let elementData = {};
let currentEntityTextures = [["default", ""]];
let selectedTexture;
let selectedModel;
let currentTextureSelecting;
let currentModelSelecting;
let currentLootTableSelecting;

const componentDefinitions = {
    /* =======================
       SPAWNING / BASICS
       ======================= */

    "Spawn Egg": {
        name: "Spawn Egg",
        id: "spawn_egg",
        inputs: [
            { type: "color", name: "base_color", label: "Base Color", tooltip: "The base color of the spawn egg." },
            { type: "color", name: "overlay_color", label: "Overlay Color", tooltip: "The overlay color of the spawn egg." },
            { type: "texture", name: "texture", label: "Texture", tooltip: "Overrides spawn egg colors." }
        ],
        requires: false
    },

    "Experience Reward": {
        name: "Experience Reward",
        id: "experience_reward",
        inputs: [
            { type: "number", name: "min", label: "Minimum XP", tooltip: "Minimum XP dropped." },
            { type: "number", name: "max", label: "Maximum XP", tooltip: "Maximum XP dropped." }
        ],
        requires: false
    },

    "Loot": {
        name: "Loot",
        id: "loot",
        inputs: [
            { type: "loot_table", name: "table", label: "Loot Table", tooltip: "Loot table used when the entity dies." }
        ],
        requires: false
    },

    /* =======================
       HEALTH / DAMAGE
       ======================= */

    "Health": {
        name: "Health",
        id: "health",
        inputs: [
            { type: "number", name: "value", label: "Health", tooltip: "Maximum health of the entity." }
        ],
        requires: false
    },

    "Hurt On Condition": {
        name: "Hurt On Condition",
        id: "hurt_on_condition",
        inputs: [
            { type: "number", name: "damage", label: "Damage", tooltip: "Damage dealt when the condition is met." }
        ],
        requires: false
    },

    "Damage Sensor": {
        name: "Damage Sensor",
        id: "damage_sensor",
        inputs: [
            { type: "checkbox", name: "immune", label: "Immune", tooltip: "Whether the entity is immune to certain damage." }
        ],
        requires: false
    },

    /* =======================
       MOVEMENT
       ======================= */

    "Movement": {
        name: "Movement",
        id: "movement",
        inputs: [
            { type: "number", name: "value", label: "Speed", tooltip: "Base movement speed." }
        ],
        requires: false
    },

    "Movement Basic": {
        name: "Movement Basic",
        id: "movement_basic",
        inputs: [],
        requires: false
    },

    "Movement Fly": {
        name: "Movement Fly",
        id: "movement_fly",
        inputs: [],
        requires: false
    },

    "Movement Swim": {
        name: "Movement Swim",
        id: "movement_swim",
        inputs: [],
        requires: false
    },

    "Jump Static": {
        name: "Jump Static",
        id: "jump_static",
        inputs: [
            { type: "number", name: "jump_power", label: "Jump Power", tooltip: "Jump strength." }
        ],
        requires: false
    },

    /* =======================
       AI / BEHAVIOR
       ======================= */

    "Behavior Float": {
        name: "Behavior Float",
        id: "behavior_float",
        inputs: [],
        requires: false
    },

    "Behavior Panic": {
        name: "Behavior Panic",
        id: "behavior_panic",
        inputs: [
            { type: "number", name: "speed_multiplier", label: "Speed Multiplier", tooltip: "Speed while panicking." }
        ],
        requires: false
    },

    "Behavior Melee Attack": {
        name: "Behavior Melee Attack",
        id: "behavior_melee_attack",
        inputs: [
            { type: "number", name: "damage", label: "Damage", tooltip: "Melee attack damage." },
            { type: "number", name: "speed_multiplier", label: "Speed Multiplier", tooltip: "Speed while attacking." }
        ],
        requires: false
    },

    "Behavior Random Stroll": {
        name: "Behavior Random Stroll",
        id: "behavior_random_stroll",
        inputs: [
            { type: "number", name: "speed_multiplier", label: "Speed Multiplier", tooltip: "Movement speed while strolling." }
        ],
        requires: false
    },

    "Behavior Look At Player": {
        name: "Behavior Look At Player",
        id: "behavior_look_at_player",
        inputs: [
            { type: "number", name: "look_distance", label: "Look Distance", tooltip: "Distance to look at players." }
        ],
        requires: false
    },

    /* =======================
       SENSORY / TARGETING
       ======================= */

    "Follow Range": {
        name: "Follow Range",
        id: "follow_range",
        inputs: [
            { type: "number", name: "value", label: "Range", tooltip: "How far the entity can detect targets." }
        ],
        requires: false
    },

    "Attack": {
        name: "Attack",
        id: "attack",
        inputs: [
            { type: "number", name: "damage", label: "Damage", tooltip: "Base attack damage." }
        ],
        requires: false
    },

    /* =======================
       PHYSICS / COLLISION
       ======================= */

    "Physics": {
        name: "Physics",
        id: "physics",
        inputs: [
            { type: "checkbox", name: "has_gravity", label: "Has Gravity", tooltip: "Whether gravity affects the entity." }
        ],
        requires: false
    },

    "Collision Box": {
        name: "Collision Box",
        id: "collision_box",
        inputs: [
            { type: "number", name: "width", label: "Width", tooltip: "Collision width." },
            { type: "number", name: "height", label: "Height", tooltip: "Collision height." }
        ],
        requires: false
    },

    "Pushable": {
        name: "Pushable",
        id: "pushable",
        inputs: [
            { type: "checkbox", name: "is_pushable", label: "Pushable", tooltip: "Whether the entity can be pushed." }
        ],
        requires: false
    },

    /* =======================
       RENDERING
       ======================= */

    "Scale": {
        name: "Scale",
        id: "scale",
        inputs: [
            { type: "number", name: "value", label: "Scale", tooltip: "Visual scale of the entity." }
        ],
        requires: false
    },

    "Nameable": {
        name: "Nameable",
        id: "nameable",
        inputs: [
            { type: "checkbox", name: "allow_rename", label: "Allow Rename", tooltip: "Whether the entity can be renamed." }
        ],
        requires: false
    },

    "Interact": {
        name: "Interact",
        id: "interact",
        inputs: [
            { type: "text", name: "interaction_text", label: "Interaction Text", tooltip: "Text shown when interacting." }
        ],
        requires: false
    },

    /* =======================
       MISC
       ======================= */

    "Despawn": {
        name: "Despawn",
        id: "despawn",
        inputs: [
            { type: "checkbox", name: "despawnable", label: "Despawnable", tooltip: "Whether the entity can despawn." }
        ],
        requires: false
    },

    "Fire Immune": {
        name: "Fire Immune",
        id: "fire_immune",
        inputs: [
            { type: "checkbox", name: "immune", label: "Fire Immune", tooltip: "Whether the entity is immune to fire and lava." }
        ],
        requires: false
    }
};

var currentEntityComponents = {};

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

$("#modelBtn").button();
$("#itemTextureBtn").button();
$("#blockTextureBtn0").button();

$("#categoryBox").selectmenu();
$("#addTextureBtn").button();
$("#entityTextureBtn0").button();
$("#addComponentBtn").button();
$("#addComponentCancelBtn").button();
$("#addComponentAddBtn").button();
$("#selectTextureCancelBtn").button();
$("#selectTextureSelectBtn").button();
$("#selectModelCancelBtn").button();
$("#selectModelSelectBtn").button();
$("#selectLootTableCancelBtn").button();
$("#selectLootTableSelectBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

$("#addComponentDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 200,
  width: 500
});
$("#addComponentDlg").dialog("close");
$("#selectTextureDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectTextureDlg").dialog("close");
$("#selectModelDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectModelDlg").dialog("close");
$("#selectLootTableDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectLootTableDlg").dialog("close");
$("#deleteDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 150,
  width: 300,
  closeOnEscape: false
});
$("#deleteDlg").dialog("close");
$("#deleteDlgCancel").button();
$("#deleteDlgConfirm").button();
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
    if (!Object.keys(currentEntityComponents).includes(type)) {
        currentEntityComponents[type] = newComponentObj;
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

function generateTextureSelector(id) {
    return `<label for="entityTextureBtn${id}"> <span id="textureNameText${id}">No texture selected</span></label>
<button name="entityTextureBtn${id}" id="entityTextureBtn${id}" onclick="openSelectTextureDlg(${id})">Select Texture</button>
<i class="fas fa-trash deleteIcon" onclick="removeTexture(${id})"></i>
<br><br>`;
}

function openSelectTextureDlg(textureToSelect) {
  $("#selectTextureDlg").dialog("open");
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
function selectTexture(textureNumber) {
    $("#selectTextureDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedTexture"]:checked');
    if (selected.value) {
        let textureNameText;
        textureNameText = document.getElementById("textureNameText" + textureNumber);
        if (textureNumber == 0) {
            currentEntityTextures[0][1] = selected.value;
        } else {
            currentEntityTextures[textureNumber - 1][1] = selected.value;
        }
        textureNameText.innerHTML = selected.value;
        selectedTexture = selected.value;
    }
}
$("#addComponentType").selectmenu();

function openSelectModelDlg() {
  $("#selectModelDlg").dialog("open");
  models = window.parent.getModelList("entity");
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
  $("#selectModelDlg").dialog("close");
}
async function selectModel() {
    $("#selectModelDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedModel"]:checked');
    let oldModel = selectedModel;
    if (selected.value) {
        modelNameText.innerHTML = selected.value;
        selectedModel = selected.value;
    }
}

function addTexture(name = "", value = "", i = currentEntityTextures.length, addToList = true) {
    let div = document.createElement("div");
    div.innerHTML = generateTextureSelector(i + 1);
    let nameBox = document.createElement("input");
    nameBox.setAttribute("id", `textureNameBox${i + 1}`);
    nameBox.addEventListener("change", function() {
        currentEntityTextures[i][0] = nameBox.value;
    });
    nameBox.value = name;
    div.prepend(nameBox);
    additionalTexturesDiv.appendChild(div);
    if (value == "") {
        document.getElementById(`textureNameText${i + 1}`).innerHTML = "No texture selected";
    } else {
        document.getElementById(`textureNameText${i + 1}`).innerHTML = value;
    }
    $(`#entityTextureBtn${i + 1}`).button();
    $('input').addClass("ui-widget ui-widget-content ui-corner-all");
    if (addToList) {
        currentEntityTextures.push([name, value]);
    }
}

function removeTexture(id) {
    currentEntityTextures.splice(id - 1, 1);
    additionalTexturesDiv.innerHTML = "";
    loadTextureList(currentEntityTextures);
}

function loadTextureList(data) {
    for (let i = 1; i < data.length; i++) {
        addTexture(data[i][0], data[i][1], i, false);
    }
}

function saveProject() {
    return {
        name: elementData.name,
        id: $("#entityIDBox").val(),
        type: "Entity",
        displayName: $("#nameBox").val(),
        model: selectedModel,
        textures: currentEntityTextures,
        components: currentEntityComponents
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#entityIDBox").val(data.id);
    $("#nameBox").val(data.displayName);
    if (data.textures) {
        currentEntityTextures = data.textures;
        loadTextures(data);
    }
    loadComponents(data.components);
}

async function loadTextures(data) {
    if (data) {
        selectedModel = data.model;
        if (data.model) {
            modelNameText.innerHTML = data.model;
        }
        loadTextureList(data.textures);
        dataKeys = Object.keys(data.textures);
        console.log("Object:");
        console.log(data.textures);
        console.log("Keys:");
        console.log(dataKeys);
        if (data.textures[0][1]) {
            document.getElementById(`textureNameText0`).innerHTML = data.textures[0][1];
        } else {
            document.getElementById(`textureNameText0`).innerHTML = "No texture selected";
        }
        for (let i = 1; i < dataKeys.length - 1; i++) {
            j = i.toString();
            console.log("i: " + i);
            console.log(data.textures[j]);
            if (data.textures[j]) {
                document.getElementById(`textureNameText${i}`).innerHTML = data.textures[j];
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
                    if (componentInputDefs[j].type == "dropdown") {
                        $(removeSpaces(`#${Object.keys(data)[i]}${componentInputDefs[j].name}`)).selectmenu("refresh");
                    }
                }
                currentEntityComponents[Object.keys(data)[i]][componentInputDefs[j].name] = data[Object.keys(data)[i]][componentInputDefs[j].name];
            }
        }
    }
}

function updateInput(type, input, value) {
    currentEntityComponents[type.replace("_s_", " ")][input] = value;
}

function deleteComponent(name) {
    delete currentEntityComponents[name];
    document.getElementById("componentbox_" + removeSpaces(name)).remove();
    closeDeleteComponent()
}

function closeDeleteComponent() {
    $("#deleteDlg").dialog("close");
}

function openDeleteComponent(name) {
    $("#deleteDlg").dialog("open");
    let deleteDlgText = document.getElementById("deleteDlgText");
    let deleteDlgConfirm = document.getElementById("deleteDlgConfirm");
    deleteDlgText.innerHTML = `Are you sure you want to delete the component "${name}"?`;
    deleteDlgConfirm.setAttribute("onclick", `deleteComponent("${name}")`);
}

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
