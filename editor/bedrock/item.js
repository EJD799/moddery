const componentDefinitions = {
    "Allow Off Hand": {
        name: "Allow Off Hand",
        id: "minecraft:allow_off_hand",
        inputs: [
            {
                type: "boolean",
                name: "main",
                label: "Allow Off Hand"
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
                label: "Block ID"
            },
            {
                type: "boolean",
                name: "replace_block_item",
                label: "Replace Block Item"
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
                label: "Composting Chance (%)"
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
  height: 200,
  width: 500
});
$("#selectTextureDlg").dialog("close");
function addComponent() {
  $("#addComponentDlg").dialog("open");
}
function closeAddComponentDlg() {
  $("#addComponentDlg").dialog("close");
}
function openSelectTextureDlg() {
  $("#selectTextureDlg").dialog("open");
}
function closeSelectTextureDlg() {
  $("#selectTextureDlg").dialog("close");
}
function createComponent() {
    let newComponentObj = {};
    let newComponentType;
    let newComponentDefault;
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
    currentItemComponents[$("#addComponentType").val()] = newComponentObj;
    $("#addComponentDlg").dialog("close");
}
function selectTexture() {
    alert("Coming Soon!");
    $("#selectTextureDlg").dialog("close");
}
$("#addComponentType").selectmenu();