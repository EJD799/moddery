let textures;
let elementData = {};
let selectedTexture;
let selectedLootTable;
let selectedFunction;
let criteriaData = [];

let advEditorComponent;
let advEditorInput;
let advEditorType;
let advEditorCurrentData;

const componentDefinitions = {
    "": {
        name: "",
        id: "",
        inputs: [],
        requires: false
    },
    "Allay Drop Item on Block": {
        name: "Allay Drop Item on Block",
        id: "minecraft:allay_drop_item_on_block",
        inputs: [
            {
                type: "text",
                name: "biome",
                label: "Biome",
                tooltip: "The biome required."
            },
            {
                type: "list",
                name: "blocks",
                label: "Blocks",
                tooltip: "The blocks the item can be dropped on."
            },
            {
                type: "list",
                name: "items",
                label: "Items",
                tooltip: "The items that can be dropped."
            }
        ],
        requires: false
    },
    "Any Block Use": {
        name: "Any Block Use",
        id: "minecraft:any_block_use",
        inputs: [
            {
                type: "list",
                name: "blocks",
                label: "Blocks",
                tooltip: "The blocks the item can be dropped on."
            },
            {
                type: "list",
                name: "items",
                label: "Items",
                tooltip: "The items that can be dropped."
            }
        ],
        requires: false
    },
    "Avoid Vibration": {
        name: "Avoid Vibration",
        id: "minecraft:avoid_vibration",
        inputs: [
            {
                type: "text",
                name: "biome",
                label: "Biome",
                tooltip: "The biome required."
            }
        ],
        requires: false
    },
    "Bee Nest Destroyed": {
        name: "Bee Nest Destroyed",
        id: "minecraft:bee_nest_destroyed",
        inputs: [
            {
                type: "dropdown",
                name: "block",
                label: "Block",
                tooltip: "The block that was destroyed.",
                options: [
                    "minecraft:bee_nest",
                    "minecraft:beehive"
                ]
            },
            {
                type: "list",
                name: "items",
                label: "Items",
                tooltip: "The items that can be dropped."
            },
            {
                type: "number",
                name: "min_bees_inside",
                label: "Min Bees Inside",
                tooltip: "The minimum number of bees inside the nest."
            },
            {
                type: "number",
                name: "max_bees_inside",
                label: "Max Bees Inside",
                tooltip: "The maximum number of bees inside the nest."
            }
        ],
        requires: false
    },
    "Bred Animals": {
        name: "Bred Animals",
        id: "minecraft:bred_animals",
        inputs: [
            {
                type: "list",
                name: "animals",
                label: "Animals",
                tooltip: "The animals that can be bred."
            }
        ],
        requires: false
    },
    "Brewed Potion": {
        name: "Brewed Potion",
        id: "minecraft:brewed_potion",
        inputs: [
            {
                type: "text",
                name: "potion",
                label: "Potion",
                tooltip: "The potion type to accept."
            }
        ],
        requires: false
    },
    "Changed Dimension": {
        name: "Changed Dimension",
        id: "minecraft:changed_dimension",
        inputs: [
            {
                type: "text",
                name: "from",
                label: "From",
                tooltip: "The dimension traveled from."
            },
            {
                type: "text",
                name: "to",
                label: "To",
                tooltip: "The dimension traveled to."
            }
        ],
        requires: false
    },
    "Channeled Lightning": {
        name: "Channeled Lightning",
        id: "minecraft:channeled_lightning",
        inputs: [
            {
                type: "list",
                name: "victims",
                label: "Victims",
                tooltip: "The list of entities that must be hit."
            }
        ],
        requires: false
    },
    "Construct Beacon": {
        name: "Construct Beacon",
        id: "minecraft:construct_beacon",
        inputs: [
            {
                type: "number",
                name: "min_level",
                label: "Min Level",
                tooltip: "The minimum level of the beacon."
            },
            {
                type: "number",
                name: "max_level",
                label: "Max Level",
                tooltip: "The maximum level of the beacon."
            }
        ],
        requires: false
    },
    "Consume Item": {
        name: "Consume Item",
        id: "minecraft:consume_item",
        inputs: [
            {
                type: "list",
                name: "items",
                label: "Items",
                tooltip: "The list of items that can be consumed."
            }
        ],
        requires: false
    },
    "Crafter Recipe Crafted": {
        name: "Crafter Recipe Crafted",
        id: "minecraft:crafter_recipe_crafted",
        inputs: [
            {
                type: "text",
                name: "recipe_id",
                label: "Recipe ID",
                tooltip: "The ID of the recipe."
            }
        ],
        requires: false
    },
    "Cured Zombie Villager": {
        name: "Cured Zombie Villager",
        id: "minecraft:cured_zombie_villager",
        inputs: [],
        requires: false
    },
    "Default Block Use": {
        name: "Default Block Use",
        id: "minecraft:default_block_use",
        inputs: [
            {
                type: "list",
                name: "blocks",
                label: "Blocks",
                tooltip: "The list of blocks to accept."
            }
        ],
        requires: false
    },
    /*"": {
        name: "",
        id: "minecraft:",
        inputs: [
            {
                type: "text",
                name: "from",
                label: "From",
                tooltip: "The dimension traveled from."
            }
        ],
        requires: false
    },*/
}

function onThemeChange(name, style, type) {
    if (type == "light") {
        actionItems.special_remove.texture = "/moddery/custom_textures/special_remove_light.png";
        actionItems.special_custom.texture = "/moddery/custom_textures/special_custom_light.png";
    } else {
        actionItems.special_remove.texture = "/moddery/custom_textures/special_remove_dark.png";
        actionItems.special_custom.texture = "/moddery/custom_textures/special_custom_dark.png";
    }
    replaceSpecialCustomImages(type);
}

function replaceSpecialCustomImages(theme) {
  const images = document.querySelectorAll("img");

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = img.getAttribute("src");

    if (!src) continue;

    if (
      src.endsWith("special_custom_dark.png") ||
      src.endsWith("special_custom_light.png")
    ) {
      img.src = src.replace(
        /special_custom_(dark|light)\.png$/,
        `special_custom_${theme}.png`
      );
    }
  }
}


function addItemToBeginning(obj, key, value) {
    return { [key]: value, ...obj };
}

let actionItems = {
    "special_remove": {
        name: "Remove Item",
        texture: "/moddery/custom_textures/special_remove_dark.png"
    },
    "special_custom": {
        name: "Custom Item",
        texture: "/moddery/custom_textures/special_custom_dark.png"
    }
};

let customItems = {};
let customItemList = window?.parent?.getCustomItems?.() ?? [];
window.addEventListener("load", async function() {
    await Promise.all(customItemList.map(async (item) => {
        if (item.type == "Block") {
            if (item.hasItem) {
                let blob = await window.parent.projZip.folder("assets").file(item.textures.item).async("blob");
                let texture = await window.parent.fileToDataURL(blob);
                customItems[item.id] = {
                    name: item.displayName,
                    texture: texture
                };
            } else if (item.model == "Full Block") {
                let blob1 = await window.parent.projZip.folder("assets").file(item.textures["1"]).async("blob");
                let texture1 = await window.parent.fileToDataURL(blob1);
                let blob2 = await window.parent.projZip.folder("assets").file(item.textures["3"]).async("blob");
                let texture2 = await window.parent.fileToDataURL(blob2);
                let blob3 = await window.parent.projZip.folder("assets").file(item.textures["5"]).async("blob");
                let texture3 = await window.parent.fileToDataURL(blob3);

                let isoTexture = await makeIsometricCube(texture1, texture2, texture3);

                customItems[item.id] = {
                    name: item.displayName,
                    texture: isoTexture
                };
            } else {
                let blob = await window.parent.projZip.folder("assets").file(item.textures.default).async("blob");
                let texture = await window.parent.fileToDataURL(blob);
                customItems[item.id] = {
                    name: item.displayName,
                    texture: texture
                };
            }
        } else {
            let blob = await window.parent.projZip.folder("assets").file(item.texture).async("blob");
            let texture = await window.parent.fileToDataURL(blob);
            customItems[item.id] = {
                name: item.displayName,
                texture: texture
            };
        }
    }));
    onThemeChange(null, null, window.parent.generalThemeType);
    editedItemDefinitions = Object.fromEntries(
        Object.entries(itemDefinitions).filter(([key, value]) => value.filter != "bedrock")
    );
});

let selectedItemId = null;
let filteredItems = [];   // after search
let itemsPerRow = 0;
const btnSize = 50;       // 32px + borders/padding
const rowHeight = btnSize;
let iconItemType = "";
let editedItemDefinitions = false;

function openItemPickerDialog() {
    if (!editedItemDefinitions) {
        console.log("Glitch detected.");
        console.log("Retrying item definitions...");
        editedItemDefinitions = Object.fromEntries(
            Object.entries(itemDefinitions).filter(([key, value]) => value.filter != "bedrock")
        );
    }

    selectedItemId = null;
    itemPickerSelectBtn.disabled = true;
    $("#itemDataBox").val("0");
    $("#itemDataBox").hide();

    filteredItems = filterItems("");

    itemPickerDialog.classList.add("is-active");

    updateLayout();
    renderVisibleItems();
}

function filterItems(query) {
    const q = query.toLowerCase();
    return Object.entries(editedItemDefinitions).filter(([id, d]) =>
        d.name.toLowerCase().includes(q)
    );
}

function updateLayout() {
    const viewportWidth = $("#itemPickerViewport").width();
    itemsPerRow = Math.floor(viewportWidth / btnSize);
    if (itemsPerRow < 1) itemsPerRow = 1;

    const rowCount = Math.ceil(filteredItems.length / itemsPerRow);

    $("#itemPickerScroller").css({
        height: rowCount * rowHeight + "px"
    });
}

function replaceShortURLs(url) {
    return url.replace("@java", javaItemCDN);
}

function renderVisibleItems() {
    const viewport = $("#itemPickerViewport");
    const scrollTop = viewport.scrollTop();
    const viewportHeight = viewport.height();

    const allItems = [
        ...Object.entries(actionItems).map(([id, data]) => ({ id, ...data })),
        ...Object.entries(customItems).map(([id, data]) => ({ id, ...data })),
        ...filteredItems.map(([id, data]) => ({ id, ...data }))
    ];

    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.ceil((scrollTop + viewportHeight) / rowHeight);

    const startIndex = startRow * itemsPerRow;
    const endIndex = Math.min(allItems.length, endRow * itemsPerRow);

    const scroller = $("#itemPickerScroller");
    scroller.empty();

    for (let i = startIndex; i < endIndex; i++) {
        const item = allItems[i];
        const itemId = item.id;
        const textureUrl = replaceShortURLs(item.texture);

        const row = Math.floor(i / itemsPerRow);
        const col = i % itemsPerRow;

        const btn = $("<div>")
            .addClass("itemPickBtn")
            .attr("title", item.name)
            .data("id", itemId)
            .css({
                top: row * rowHeight,
                left: col * btnSize,
                width: btnSize + "px",
                height: rowHeight + "px",
                backgroundImage: `url(${textureUrl})`,
                position: "absolute",
                imageRendering: "pixelated",
                cursor: "pointer"
            });

        scroller.append(btn);
    }
}


// Scroll handler (re-renders visible rows)
$("#itemPickerViewport").on("scroll", renderVisibleItems);

// Click handler
$("#itemPickerScroller").on("click", ".itemPickBtn", function () {
    $(".itemPickBtn").removeClass("selected");
    $(this).addClass("selected");

    selectedItemId = $(this).data("id");
    if (editedItemDefinitions[selectedItemId]?.data ?? false) {
        $("#itemDataBox").show();
    } else {
        $("#itemDataBox").hide();
        $("#itemDataBox").val("0");
    }
    itemPickerSelectBtn.disabled = false;
});

// Search handler
$("#itemSearchBox").on("input", function () {
    filteredItems = filterItems($(this).val());
    updateLayout();
    renderVisibleItems();
});

// Select button
$("#itemPickerSelectBtn").on("click", function () {
    if (selectedItemId) {
        setItem(selectedItemId);
        closeItemPicker();
    }
});

function closeItemPicker() {
    itemPickerDialog.classList.remove("is-active");
    // --- RESET SELECTION ---
    selectedItemId = null;                       // clear the selected ID
    $(".itemPickBtn").removeClass("selected");   // remove visual highlight

    itemPickerSelectBtn.disabled = true;

    // Optional: clear search box
    $("#itemSearchBox").val("");
}

function setItem(value) {
    let itemID;
    if (value == "special_custom") {
        itemID = prompt("Enter the item ID:");
    } else if (value == "special_remove") {
        itemID = "";
    } else {
        itemID = value;
    }
    iconItemType = [itemID, Number($("#itemDataBox").val())];
    renderSlot(itemID, value);
}
function renderSlot(value, original) {
    let slotImage = document.getElementById("iconItemBtnImg");
    if (original == "special_remove") {
        slotImage.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==");
    } else if (original == "special_custom" && Object.keys(editedItemDefinitions).includes("minecraft:" + value)) {
        slotImage.setAttribute("src", replaceShortURLs(editedItemDefinitions["minecraft:" + value].texture));
    } else if (original == "special_custom" && !Object.keys(editedItemDefinitions).includes(value) && !Object.keys(customItems).includes(value)) {
        if (window.parent.generalThemeType == "dark") {
            slotImage.setAttribute("src", "/moddery/custom_textures/special_custom_dark.png");
        } else {
            slotImage.setAttribute("src", "/moddery/custom_textures/special_custom_light.png");
        }
    } else {
        if (Object.keys(customItems).includes(value)) {
            slotImage.setAttribute("src", customItems[value].texture);
        } else {
            slotImage.setAttribute("src", replaceShortURLs(editedItemDefinitions[value].texture));
        }
    }
    let slotBtn = document.getElementById("iconItemBtn");
    if (original == "special_remove") {
        slotBtn.setAttribute("title", "");
    } else if ((original == "special_custom" && Object.keys(editedItemDefinitions).includes("minecraft:" + value)) || (editedItemDefinitions["minecraft:" + value]?.name ?? false)) {
        slotBtn.setAttribute("title", editedItemDefinitions["minecraft:" + value].name);
    } else if ((editedItemDefinitions[value]?.name ?? false)) {
        if (Object.keys(customItems).includes(value)) {
            slotBtn.setAttribute("title", customItems[value].name);
        } else {
            slotBtn.setAttribute("title", editedItemDefinitions[value].name);
        }
    } else {
        if (Object.keys(customItems).includes(value)) {
            slotBtn.setAttribute("title", customItems[value].name);
        } else {
            slotBtn.setAttribute("title", value);
        }
    }
    $("#iconItemBtn").tooltip({
        content: function() {
            return $(this).attr("title");
        },
        show: { effect: "fadeIn", duration: 200, delay: 0 },
        hide: { effect: "fadeOut", duration: 200, delay: 0 },
        track: true
    });
}
function selectItem(slot) {
    openItemPickerDialog();
}

renderSlot("", "special_remove");

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

function removeSpaces(str) {
    return str.replaceAll(" ", "_s_");
}
// new start
function addSpaces(str) {
    return str.replaceAll("_s_", " ");
}
// new end
async function openSelectLootTableDlg(component, input, mode) {
    selectLootTableDlg.classList.add("is-active");
    textures = await window.parent.getLootTableList();
    let selectLootTableMenu = document.getElementById("selectLootTableMenu");
    selectLootTableMenu.innerHTML = "";
    for (let i = 0; i < textures.length; i++) {
        let selectLootTableMenuItem;
        let itemTitle;
        let itemRadio;
        selectLootTableMenuItem = document.createElement("div");
        selectLootTableMenuItem.setAttribute("class", "card textureMenuItem");
        itemRadio = document.createElement("input");
        itemRadio.setAttribute("type", "radio");
        itemRadio.setAttribute("name", "selectedLootTable");
        itemRadio.setAttribute("class", "textureRadio");
        itemRadio.setAttribute("value", textures[i]);
        selectLootTableMenuItem.appendChild(itemRadio);
        itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "textureMenuTitle");
        itemTitle.innerHTML = textures[i];
        selectLootTableMenuItem.appendChild(itemTitle);
        selectLootTableMenu.appendChild(selectLootTableMenuItem);
        selectLootTableMenuItem.addEventListener("click", () => {
            const itemRadio = selectLootTableMenuItem.querySelector('input[type="radio"]');
            if (itemRadio) {
                itemRadio.checked = true;  // select this radio
            }
        });
    }
}
function closeSelectLootTableDlg() {
    selectLootTableDlg.classList.remove("is-active");
}
function selectLootTable() {
    closeSelectLootTableDlg();
    const selected = document.querySelector('input[name="selectedLootTable"]:checked');
    if (selected.value) {
        const lootTableNameText = document.getElementById("lootTableNameText");
        if (selected.value == "None") {
            lootTableNameText.innerHTML = "No loot table selected";
            selectedLootTable = "";
        } else {
            lootTableNameText.innerHTML = selected.value;
            selectedLootTable = selected.value;
        }
    }
}



async function openSelectFunctionDlg(component, input, mode) {
    selectFunctionDlg.classList.add("is-active");
    textures = await window.parent.getFunctionList();
    let selectFunctionMenu = document.getElementById("selectFunctionMenu");
    selectFunctionMenu.innerHTML = "";
    for (let i = 0; i < textures.length; i++) {
        let selectFunctionMenuItem;
        let itemTitle;
        let itemRadio;
        selectFunctionMenuItem = document.createElement("div");
        selectFunctionMenuItem.setAttribute("class", "card textureMenuItem");
        itemRadio = document.createElement("input");
        itemRadio.setAttribute("type", "radio");
        itemRadio.setAttribute("name", "selectedFunction");
        itemRadio.setAttribute("class", "textureRadio");
        itemRadio.setAttribute("value", textures[i]);
        selectFunctionMenuItem.appendChild(itemRadio);
        itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "textureMenuTitle");
        itemTitle.innerHTML = textures[i];
        selectFunctionMenuItem.appendChild(itemTitle);
        selectFunctionMenu.appendChild(selectFunctionMenuItem);
        selectFunctionMenuItem.addEventListener("click", () => {
            const itemRadio = selectFunctionMenuItem.querySelector('input[type="radio"]');
            if (itemRadio) {
                itemRadio.checked = true;  // select this radio
            }
        });
    }
}
function closeSelectFunctionDlg() {
    selectFunctionDlg.classList.remove("is-active");
}
function selectFunction() {
    closeSelectFunctionDlg();
    const selected = document.querySelector('input[name="selectedFunction"]:checked');
    if (selected.value) {
        const functionNameText = document.getElementById("functionNameText");
        if (selected.value == "None") {
            functionNameText.innerHTML = "No function selected";
            selectedFunction = "";
        } else {
            functionNameText.innerHTML = selected.value;
            selectedFunction = selected.value;
        }
    }
}



function openSelectTextureDlg(component, input, mode) {
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

function random7DigitString() {
    return Math.floor(Math.random() * 10_000_000).toString().padStart(7, '0');
}
function randomizeNumericID() {
    $("#numericIDBox").val(random7DigitString());
    numericIDBox.classList.remove("invalidTextBox");
}

function saveProject() {
    return {
        name: elementData.name,
        id: $("#advancementIDBox").val(),
        type: "Advancement",
        title: $("#titleBox").val(),
        description: $("#descriptionBox").val(),
        iconItemType: iconItemType,
        frameStyle: $("#frameMenu").val(),
        parent: $("#parentMenu").val(),
        backgroundTexture: selectedTexture,
        showToast: showToastBox.checked,
        announceToChat: announceToChatBox.checked,
        hidden: hiddenBox.checked,
        rewards: {
            xp: $("#rewardXPBox").val(),
            lootTable: selectedLootTable,
            function: selectedFunction
        },
        criteria: criteriaData
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#advancementIDBox").val(data.id);
    $("#titleBox").val(data.title);
    $("#descriptionBox").val(data.description);
    $("#frameMenu").val(data.frameStyle);
    $("#rewardXPBox").val(data.rewards?.xp ?? 0);
    iconItemType = data.iconItemType;
    selectedTexture = data?.backgroundTexture ?? false;
    if (selectedTexture) {
        document.getElementById("textureNameText").innerHTML = selectedTexture;
    } else {
        document.getElementById("textureNameText").innerHTML = "No texture selected";
    }
    selectedLootTable = data?.rewards?.lootTable ?? false;
    if (selectedLootTable) {
        document.getElementById("lootTableNameText").innerHTML = selectedLootTable;
    } else {
        document.getElementById("lootTableNameText").innerHTML = "No loot table selected";
    }
    selectedFunction = data?.rewards?.function ?? false;
    if (selectedFunction) {
        document.getElementById("functionNameText").innerHTML = selectedFunction;
    } else {
        document.getElementById("functionNameText").innerHTML = "No function selected";
    }
    showToastBox.checked = data.showToast ?? true;
    announceToChatBox.checked = data.announceToChat ?? true;
    hiddenBox.checked = data.hidden ?? false;
    if (data.criteria) {
        loadCriteria(data.criteria);
    }
    window.setTimeout(async function() {
        if (iconItemType?.[0] === "" || typeof iconItemType != "object") {
            renderSlot("", "special_remove");
        } else {
            renderSlot(iconItemType[0], "special_custom");
        }

        let customAdvancements = (await window.parent.getFilteredElements("Advancement")).filter(n => n.name != elementData.name);
        for (let i = 0; i < customAdvancements.length; i++) {
            let advancementData = customAdvancements[i];
            let option = document.createElement("option");
            option.innerHTML = advancementData.title;
            option.setAttribute("value", `${window.parent.projManifest.namespace}:${advancementData.id}`);
            customSection.appendChild(option);
        }
        $("#parentMenu").val(data.parent);
        if (data.parent == "root") {
            $("#backgroundTextureSelector").show();
        } else {
            $("#backgroundTextureSelector").hide();
        }
    }, 200);
}

function addCriteria() {
    criteriaData.push({
        name: "",
        trigger: "",
        fields: {}
    });
    createCriteria(criteriaData.length - 1);
}

function createCriteria(id) {
    let newComponentObj = {};
    let newComponentType;
    let newComponentDefault;
    let newComponentDOM;
    /*for (let i = 0; i < componentDefinitions[type].inputs.length; i++) {
        newComponentType = componentDefinitions[type].inputs[i].type
        if (newComponentType == "number") {
            newComponentDefault = 0;
        } else if (newComponentType == "boolean") {
            newComponentDefault = false;
        } else {
            newComponentDefault = "";
        }
        newComponentObj[componentDefinitions[type].inputs[i].name] = newComponentDefault;
    }*/
    if (true) {
        var parentDiv = document.getElementById("criteriaBox");
        var elementBox = document.createElement("div");
        elementBox.setAttribute("class", "card componentbox");
        elementBox.setAttribute("id", "componentbox_" + id);
        var elementBoxTitle = document.createElement("input");
        elementBoxTitle.setAttribute("class", "input almostFullInput");
        elementBoxTitle.setAttribute("id", `componentTitle_${id}`);
        elementBoxTitle.addEventListener("change", function(e) {
            criteriaData[id].name = elementBoxTitle.value;
        });
        var elementBoxDelete = document.createElement("button");
        elementBoxDelete.setAttribute("class", "button is-danger newDeleteBtn");
        elementBoxDelete.setAttribute("onclick", `openDeleteComponent(${id})`);
        elementBoxDelete.innerHTML = `<i class="fas fa-trash"></i>`;
        elementBox.appendChild(elementBoxTitle);
        elementBox.appendChild(elementBoxDelete);
        elementBox.appendChild(document.createElement("br"));
        elementBox.appendChild(document.createElement("br"));
        var elementBoxDropdownBox = document.createElement("div");
        elementBoxDropdownBox.setAttribute("class", "select");
        var elementBoxDropdown = document.createElement("select");
        elementBoxDropdown.setAttribute("id", `elementBoxDropdown${id}`);
        elementBoxDropdown.innerHTML = generateSelectContents(Object.keys(componentDefinitions)).replace("></option>", " value=\"\" disabled>Select a trigger</option>");
        bulmaSelectmenu.attachMenu(elementBoxDropdown);
        elementBoxDropdown.addEventListener("change", function(e) {
            changeCriteriaType(id, elementBoxDropdown.value);
        });
        elementBoxDropdownBox.appendChild(elementBoxDropdown);
        elementBox.appendChild(elementBoxDropdownBox);
        elementBox.appendChild(document.createElement("br"));
        elementBox.appendChild(document.createElement("br"));
        let type = criteriaData[id].trigger;
        for (let i = 0; i < componentDefinitions[type].inputs.length; i++) {
            newComponentType = componentDefinitions[type].inputs[i].type;
            newComponentInputName = componentDefinitions[type].inputs[i].name;
            newComponentInputLabel = componentDefinitions[type].inputs[i].label;
            newComponentInputTooltip = componentDefinitions[type].inputs[i].tooltip;
            newComponentTypeName = componentDefinitions[type].name;
            if (newComponentType == "number") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("class", "input normalInput");
                newComponentDOM.setAttribute("type", "number");
                let typeName = id;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, Number(event.target.value));
                });
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "color") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("type", "color");
                newComponentDOM.setAttribute("class", "newColorPicker");
                let typeName = id;
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
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);

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
                const typeName = id;
                const inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.value);
                });
                bulmaSelectmenu.attachMenu(newComponentDOM);

                // Append to the element box
                inputContainer.appendChild(newComponentDOM);
                elementBox.appendChild(inputContainer);
            } else if (newComponentType == "boolean") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("type", "checkbox");
                newComponentDOM.setAttribute("class", "is-primary");
                let typeName = id;
                let inputName = newComponentInputName;
                newComponentDOM.addEventListener("change", event => {
                    updateInput(typeName, inputName, event.target.checked);
                });
                elementBox.appendChild(newComponentDOM);
            }/* new start */ else if (newComponentType == "list") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "[]");
                let typeName = id;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}` + "_btn");
                newComponentDOM.setAttribute("onclick", `openAdvInputEditor("${id}", "${removeSpaces(newComponentInputName)}", "list")`);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "texture") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = id;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}` + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTextureDlg("${id}", "${removeSpaces(newComponentInputName)}", "component")`);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "loot_table") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = id;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}` + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTableDlg("${id}", "${removeSpaces(newComponentInputName)}", "loot_table")`);
                elementBox.appendChild(newComponentDOM);
            } else if (newComponentType == "trade_table") {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("disabled", "true");
                newComponentDOM.setAttribute("class", "input almostFullInput");
                newComponentDOM.setAttribute("value", "");
                let typeName = id;
                let inputName = newComponentInputName;
                elementBox.appendChild(newComponentDOM);
                newComponentDOM = document.createElement("button");
                newComponentDOM.innerHTML = `<i class="fas fa-pencil"></i>`;
                newComponentDOM.setAttribute("class", "button is-primary inputEditBtn");
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}` + "_btn");
                newComponentDOM.setAttribute("onclick", `openSelectTableDlg("${id}", "${removeSpaces(newComponentInputName)}", "trade_table")`);
                elementBox.appendChild(newComponentDOM);
            }/* new end */ else {
                newComponentDOM = document.createElement("label");
                newComponentDOM.setAttribute("for", `criteria${id}_${newComponentInputName}`);
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
                newComponentDOM.setAttribute("id", `criteria${id}_${newComponentInputName}`);
                newComponentDOM.setAttribute("placeholder", newComponentInputLabel);
                newComponentDOM.setAttribute("class", "input normalInput");
                let typeName = id;
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
}

function updateInput(id, input, value) {
    criteriaData[id].fields[input] = value;
}

function loadCriteria(data) {
    if (data) {
        criteriaData = data;
        for (let i = 0; i < data.length; i++) {
            createCriteria(i);
            let fields = data[i].fields;
            let definition = componentDefinitions[data[i].trigger];
            for (let j = 0; j < Object.keys(fields).length; j++) {
                let inputType = definition.inputs.type;
                let el = document.getElementById(`criteria${i}_${Object.keys(fields)[j]}`);
                if (inputType == "boolean") {
                    el.checked = fields[Object.keys(fields)[j]];
                } else {
                    el.value = fields[Object.keys(fields)[j]];
                }
            }
            document.getElementById(`componentTitle_${i}`).value = criteriaData[i].name;
            document.getElementById(`elementBoxDropdown${i}`).value = criteriaData[i].trigger;
        }
    }
}

function changeCriteriaType(id, value) {
    criteriaData[id].trigger = value;
    criteriaData[id].fields = {};
    let def = componentDefinitions[value];
    for (let i = 0; i < def.inputs.length; i++) {
        let type = def.inputs[i].type;
        let defaultValue;
        if (type == "boolean") {
            defaultValue = false;
        } else if (type == "number") {
            defaultValue = 0;
        } else {
            defaultValue = "";
        }

        criteriaData[id].fields[def.inputs[i].name] = defaultValue;
    }
    criteriaBox.innerHTML = "";
    loadCriteria(criteriaData);
}

function closeDeleteCriteria() {
    deleteDlg.classList.remove("is-active");
}

function openDeleteCriteria(id) {
    deleteDlg.classList.add("is-active");
    let deleteDlgText = document.getElementById("deleteDlgText");
    let deleteDlgConfirm = document.getElementById("deleteDlgConfirm");
    deleteDlgText.innerHTML = `Are you sure you want to delete the criteria "${criteriaData[id].name}"?`;
    deleteDlgConfirm.setAttribute("onclick", `deleteCriteria(${id})`);
}

function deleteCriteria(id) {
    delete criteriaData[id];
    criteriaBox.innerHTML = "";
    loadCriteria(criteriaData);
}

parentMenu.addEventListener("change", function() {
    if (parentMenu.value == "root") {
        $("#backgroundTextureSelector").show();
    } else {
        $("#backgroundTextureSelector").hide();
    }
});


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
        if (typeof criteriaData[component].fields[addSpaces(input)] != "object") {
            criteriaData[component].fields[addSpaces(input)] = [];
        }
        advEditorCurrentData = criteriaData[component].fields[addSpaces(input)];
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
    $(`#criteria${component}_${input}`).val(data.toString());
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

let boxToValidate = advancementIDBox;
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

$(function () {
    $("#itemPickerDialog").tooltip({
        items: ".itemPickBtn",      // apply tooltips to buttons
        content: function() {
            return $(this).attr("title"); // use the existing title attribute
        },
        show: { effect: "fadeIn", duration: 200, delay: 0 },
        hide: { effect: "fadeOut", duration: 200, delay: 0 },
        track: true                 // tooltip follows the mouse
    });
});

document.addEventListener("DOMContentLoaded", function() {
    bulmaSelectmenu.attachMenu(frameMenu);
    bulmaSelectmenu.attachMenu(parentMenu);
});