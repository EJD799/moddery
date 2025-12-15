var elementData = {};
var currentSlot = 0;

var currentTiers = [];
var currentItems = [];

function addTier(customID = false) {
    let newID;
    if (customID) {
        newID = customID;
    } else {
        currentItems.push(["", 0]);
        newID = currentItems.length;
    }
    let container = document.getElementById("tiersContainerDiv");
    let div = document.createElement("div");
    div.setAttribute("id", `tierDiv${newID}`);
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", `tierNameBox${newID}`);
    nameLabel.innerHTML = "Name ";
    div.appendChild(nameLabel);
    let nameBox = document.createElement("input");
    nameBox.setAttribute("id", `tierNameBox${newID}`);
    nameBox.setAttribute("value", `Tier ${newID}`);
    nameBox.addEventListener("change", function(e) {
        currentTiers[newID - 1][0] = nameBox.value;
        loadItemList(currentItems);
    });
    div.appendChild(nameBox);
    let xpLabel = document.createElement("label");
    xpLabel.setAttribute("for", `tierXpBox${newID}`);
    xpLabel.innerHTML = " Required XP Points ";
    div.appendChild(xpLabel);
    let xpBox = document.createElement("input");
    xpBox.setAttribute("id", `tierXpBox${newID}`);
    xpBox.setAttribute("class", "smallInput");
    xpBox.setAttribute("type", "number");
    xpBox.setAttribute("value", "0");
    xpBox.addEventListener("change", function(e) {
        currentTiers[newID - 1][1] = Number(xpBox.value);
    });
    div.appendChild(xpBox);
    div.appendChild(document.createTextNode(" "));
    let deleteBtn = document.createElement("i");
    deleteBtn.setAttribute("id", `tierDeleteBtn${newID}`);
    deleteBtn.setAttribute("class", "fas fa-trash deleteIcon");
    deleteBtn.setAttribute("onclick", `removeTier(${newID})`);
    div.appendChild(deleteBtn);
    container.appendChild(div);
    $('input').addClass("ui-widget ui-widget-content ui-corner-all");
    loadItemList(currentItems);
}

function addItem(customID = false) {
    let newID;
    if (customID) {
        newID = customID;
    } else {
        currentItems.push({
            tier: currentTiers[0][0],
            item1: ["", 1, 1],
            item2: ["", 1, 1],
            item3: ["", 1, 1]
        });
        newID = currentItems.length;
    }
    let container = document.getElementById("containerDiv");
    let div = document.createElement("div");
    div.setAttribute("id", `itemDiv${newID}`);

    let btn1 = document.createElement("button");
    btn1.setAttribute("id", `itemBtn${newID}a`);
    btn1.setAttribute("class", "itemIconBtn");
    btn1.setAttribute("onclick", `selectItem('${newID}a')`);
    let img1 = document.createElement("img");
    img1.setAttribute("id", `itemBtnImg${newID}a`);
    img1.setAttribute("class", "itemIconBtnImg");
    img1.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==");
    btn1.appendChild(img1);
    div.appendChild(btn1);
    let btn1QuantityBox1 = document.createElement("input");
    btn1QuantityBox1.setAttribute("id", `itemQuantityBox${newID}a1`);
    btn1QuantityBox1.setAttribute("class", "smallInput");
    btn1QuantityBox1.setAttribute("type", "number");
    btn1QuantityBox1.setAttribute("value", "1");
    btn1QuantityBox1.addEventListener("change", function(e) {
        currentItems[newID - 1].item1[1] = Number(btn1QuantityBox1.value);
    });
    div.appendChild(btn1QuantityBox1);
    let btn1QuantityBox2 = document.createElement("input");
    btn1QuantityBox2.setAttribute("id", `itemQuantityBox${newID}a2`);
    btn1QuantityBox2.setAttribute("class", "smallInput");
    btn1QuantityBox2.setAttribute("type", "number");
    btn1QuantityBox2.setAttribute("value", "1");
    btn1QuantityBox2.addEventListener("change", function(e) {
        currentItems[newID - 1].item1[2] = Number(btn1QuantityBox2.value);
    });
    div.appendChild(btn1QuantityBox2);

    div.appendChild(document.createTextNode("-"));

    let btn2 = document.createElement("button");
    btn2.setAttribute("id", `itemBtn${newID}b`);
    btn2.setAttribute("class", "itemIconBtn");
    btn2.setAttribute("onclick", `selectItem('${newID}b')`);
    let img2 = document.createElement("img");
    img2.setAttribute("id", `itemBtnImg${newID}b`);
    img2.setAttribute("class", "itemIconBtnImg");
    img2.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==");
    btn2.appendChild(img2);
    div.appendChild(btn2);
    let btn2QuantityBox1 = document.createElement("input");
    btn2QuantityBox1.setAttribute("id", `itemQuantityBox${newID}b1`);
    btn2QuantityBox1.setAttribute("class", "smallInput");
    btn2QuantityBox1.setAttribute("type", "number");
    btn2QuantityBox1.setAttribute("value", "1");
    btn2QuantityBox1.addEventListener("change", function(e) {
        currentItems[newID - 1].item2[1] = Number(btn2QuantityBox1.value);
    });
    div.appendChild(btn2QuantityBox1);
    let btn2QuantityBox2 = document.createElement("input");
    btn2QuantityBox2.setAttribute("id", `itemQuantityBox${newID}b2`);
    btn2QuantityBox2.setAttribute("class", "smallInput");
    btn2QuantityBox2.setAttribute("type", "number");
    btn2QuantityBox2.setAttribute("value", "1");
    btn2QuantityBox2.addEventListener("change", function(e) {
        currentItems[newID - 1].item2[2] = Number(btn2QuantityBox2.value);
    });
    div.appendChild(btn2QuantityBox2);

    let arrowIcon = document.createElement("i");
    arrowIcon.setAttribute("class", "fas fa-arrow-right");
    div.appendChild(arrowIcon);

    let btn3 = document.createElement("button");
    btn3.setAttribute("id", `itemBtn${newID}c`);
    btn3.setAttribute("class", "itemIconBtn");
    btn3.setAttribute("onclick", `selectItem('${newID}c')`);
    let img3 = document.createElement("img");
    img3.setAttribute("id", `itemBtnImg${newID}c`);
    img3.setAttribute("class", "itemIconBtnImg");
    img3.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==");
    btn3.appendChild(img3);
    div.appendChild(btn3);
    let btn3QuantityBox1 = document.createElement("input");
    btn3QuantityBox1.setAttribute("id", `itemQuantityBox${newID}c1`);
    btn3QuantityBox1.setAttribute("class", "smallInput");
    btn3QuantityBox1.setAttribute("type", "number");
    btn3QuantityBox1.setAttribute("value", "1");
    btn3QuantityBox1.addEventListener("change", function(e) {
        currentItems[newID - 1].item3[1] = Number(btn3QuantityBox1.value);
    });
    div.appendChild(btn3QuantityBox1);
    let btn3QuantityBox2 = document.createElement("input");
    btn3QuantityBox2.setAttribute("id", `itemQuantityBox${newID}c2`);
    btn3QuantityBox2.setAttribute("class", "smallInput");
    btn3QuantityBox2.setAttribute("type", "number");
    btn3QuantityBox2.setAttribute("value", "1");
    btn3QuantityBox2.addEventListener("change", function(e) {
        currentItems[newID - 1].item3[2] = Number(btn3QuantityBox2.value);
    });
    div.appendChild(btn3QuantityBox2);

    let label = document.createElement("label");
    label.setAttribute("id", `itemTierBoxLabel${newID}`);
    label.setAttribute("for", `itemTierBox${newID}`);
    label.innerHTML = " Tier ";
    div.appendChild(label);
    let tierBox = document.createElement("select");
    tierBox.setAttribute("id", `itemTierBox${newID}`);
    tierBox.innerHTML = generateSelectContents(currentTiers.map(item => item[0]));
    tierBox.addEventListener("change", function(e) {
        currentItems[newID - 1].tier = tierBox.value;
    });
    div.appendChild(weightBox);
    div.appendChild(document.createTextNode(" "));
    let deleteBtn = document.createElement("i");
    deleteBtn.setAttribute("id", `itemDeleteBtn${newID}`);
    deleteBtn.setAttribute("class", "fas fa-trash deleteIcon");
    deleteBtn.setAttribute("onclick", `removeItem(${newID})`);
    div.appendChild(deleteBtn);
    container.appendChild(div);
    $(`#itemBtn${newID}a1`).button();
    $(`#itemBtn${newID}a2`).button();
    $(`#itemBtn${newID}b1`).button();
    $(`#itemBtn${newID}b2`).button();
    $(`#itemBtn${newID}c1`).button();
    $(`#itemBtn${newID}c2`).button();
    $('input').addClass("ui-widget ui-widget-content ui-corner-all");
    initializeDraggableIcons();
}

function removeTier(id) {
    currentTiers.splice(id - 1, 1);
    loadTierList(currentTiers);
}
function removeItem(id) {
    currentItems.splice(id - 1, 1);
    loadItemList(currentItems);
}

function addItemToBeginning(obj, key, value) {
    return { [key]: value, ...obj };
}

$("#addTierBtn").button();
$("#addItemBtn").button();
$("input").addClass("ui-widget ui-widget-content ui-corner-all");

const actionItems = {
    "special_remove": {
        name: "Remove Item",
        texture: "/moddery/custom_textures/special_remove.png"
    },
    "special_custom": {
        name: "Custom Item",
        texture: "/moddery/custom_textures/special_custom.png"
    }
};

let customItems = {};
let customItemList = window?.parent?.getCustomItems?.() ?? [];
window.setTimeout(async function() {
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
}, 100);

let selectedItemId = null;
let filteredItems = [];   // after search
let itemsPerRow = 0;
const btnSize = 50;       // 32px + borders/padding
const rowHeight = btnSize;

function openItemPickerDialog() {
    selectedItemId = null;
    $("#itemPickerSelectBtn").prop("disabled", true);
    $("#itemDataBox").val("0");
    $("#itemDataBox").hide();

    filteredItems = filterItems("");

    $("#itemPickerDialog").dialog("open");

    updateLayout();
    renderVisibleItems();
}

function filterItems(query) {
    const q = query.toLowerCase();
    return Object.entries(itemDefinitions).filter(([id, d]) =>
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
    if (itemDefinitions[selectedItemId]?.data ?? false) {
        $("#itemDataBox").show();
    } else {
        $("#itemDataBox").hide();
        $("#itemDataBox").val("0");
    }
    $("#itemPickerSelectBtn").button("option", "disabled", false);
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
    $("#itemPickerDialog").dialog("close");
    // --- RESET SELECTION ---
    selectedItemId = null;                       // clear the selected ID
    $(".itemPickBtn").removeClass("selected");   // remove visual highlight

    // Disable the select button again (jQuery UI)
    $("#itemPickerSelectBtn").button("option", "disabled", true);

    // Optional: clear search box
    $("#itemSearchBox").val("");
}

$("#itemPickerDialog").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 510,
  width: 500
});
$("#itemPickerDialog").dialog("close");

$("#itemPickerCancelBtn").button();
$("#itemPickerSelectBtn").button();

function copySlot(a, b) {
    currentSlot = b;
    if (currentItems[a - 1][0] == "") {
        setItem("special_remove");
    } else {
        setItem(currentItems[a - 1][0]);
    }
    console.log(`copying slot ${a} to slot ${b}`);
}

function setItem(value, modifyList = true) {
    let itemID;
    if (value == "special_custom") {
        itemID = prompt("Enter the item ID:");
    } else if (value == "special_remove") {
        itemID = "";
    } else {
        itemID = value;
    }
    if (modifyList) {
        currentItems[currentSlot - 1][0] = itemID;
    }
    renderSlot(currentSlot, itemID, value);
    currentSlot = 0;
}
function renderSlot(slot, value, original) {
    let slotImage = document.getElementById("itemBtnImg" + slot);
    if (original == "special_remove") {
        slotImage.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==");
    } else if (original == "special_custom" && Object.keys(itemDefinitions).includes("minecraft:" + value)) {
        slotImage.setAttribute("src", replaceShortURLs(itemDefinitions["minecraft:" + value].texture));
    } else if (original == "special_custom" && !Object.keys(itemDefinitions).includes(value) && !Object.keys(customItems).includes(value)) {
        slotImage.setAttribute("src", "/moddery/custom_textures/special_custom.png");
    } else {
        if (Object.keys(customItems).includes(value)) {
            slotImage.setAttribute("src", customItems[value].texture);
        } else {
            slotImage.setAttribute("src", replaceShortURLs(itemDefinitions[value].texture));
        }
    }
    let slotBtn = document.getElementById("itemBtn" + slot);
    if (original == "special_remove") {
        slotBtn.setAttribute("title", "");
    } else if ((original == "special_custom" && Object.keys(itemDefinitions).includes("minecraft:" + value)) || (itemDefinitions["minecraft:" + value]?.name ?? false)) {
        slotBtn.setAttribute("title", itemDefinitions["minecraft:" + value].name);
    } else if ((itemDefinitions[value]?.name ?? false)) {
        if (Object.keys(customItems).includes(value)) {
            slotBtn.setAttribute("title", customItems[value].name);
        } else {
            slotBtn.setAttribute("title", itemDefinitions[value].name);
        }
    } else {
        if (Object.keys(customItems).includes(value)) {
            slotBtn.setAttribute("title", customItems[value].name);
        } else {
            slotBtn.setAttribute("title", value);
        }
    }
    $("#itemBtn" + slot).tooltip({
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
    currentSlot = slot;
}


function saveProject() {
    return {
        name: elementData.name,
        id: $("#tradeTableIDBox").val(),
        type: "Trade Table",
        tiers: currentTiers,
        items: currentItems
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#tradeTableIDBox").val(data.id);
    $("#rollCountBox1").val(data.rollCount[0]);
    $("#rollCountBox2").val(data.rollCount[1]);
    window.setTimeout(function() {
        if (data.tiers) {
            currentTiers = data.tiers;
        } else {
            currentTiers = [];
        }
        if (data.items) {
            currentItems = data.items;
        } else {
            currentItems = [];
        }
        loadTierList(currentTiers)
        loadItemList(currentItems);
    }, 200);
}

function loadTierList(data) {
    document.getElementById("tiersContainerDiv").innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        addTier(i + 1);
        $(`#tierNameBox${i + 1}`).val(data[i][0]);
        $(`#tierXpBox${i + 1}`).val(data[i][1].toString());
    }
}
function loadItemList(data) {
    document.getElementById("containerDiv").innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        addItem(i + 1);
        currentSlot = i + 1;
        if (data[i][0] == "") {
            setItem("special_remove", false);
        } else {
            setItem(data[i][0], false);
        }
        $(`#itemWeightBox${i + 1}`).val(data[i][1].toString());
    }
}



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

function initializeDraggableIcons() {
    $(".itemIconBtn").draggable({
        cancel: false,
        appendTo: "body",
        distance: 6,
        revert: "invalid",

        helper: function () {
            const img = $(this).find(".itemIconBtnImg");

            // Always return a helper so the real element never moves
            if (!img.length || !img.attr("src")) {
                return $("<div>").css({ width: 1, height: 1 });
            }

            return img.clone().css({
                width: img.width(),
                height: img.height(),
                pointerEvents: "none",
                zIndex: 1000000
            });
        },

        start: function () {
            const fromId = this.id?.replace("itemBtn", "");
            console.log("[DRAG START] from slot:", fromId);
        }
    });

    $(".itemIconBtn").droppable({
        tolerance: "pointer",

        drop: function (event, ui) {
            const fromBtn = ui.draggable[0];
            const toBtn   = this;

            const fromIdRaw = fromBtn?.id?.replace("itemBtn", "");
            const toIdRaw   = toBtn?.id?.replace("itemBtn", "");

            const fromId = parseInt(fromIdRaw, 10);
            const toId   = parseInt(toIdRaw, 10);

            console.log(
                "[DROP]",
                "from:", fromIdRaw, "→", fromId,
                "| to:", toIdRaw, "→", toId
            );

            if (
                !Number.isInteger(fromId) ||
                !Number.isInteger(toId) ||
                fromId < 1 || fromId > 1000 ||
                toId < 1 || toId > 1000 ||
                fromId === toId
            ) {
                console.warn("[DROP] Invalid slot IDs — copySlot NOT called");
                return;
            }

            console.log("[copySlot] Calling copySlot(", fromId, ",", toId, ")");
            copySlot(fromId, toId);
        }
    });
}
initializeDraggableIcons();









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
