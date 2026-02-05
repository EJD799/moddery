var elementData = {};
var currentSlot = 0;

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

function copySlot(a, b) {
    currentSlot = b;
    if (currentGrid[a - 1][0] == "") {
        setItem("special_remove");
    } else {
        setItem(currentGrid[a - 1][0]);
    }
    console.log(`copying slot ${a} to slot ${b}`);
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
    currentGrid[currentSlot - 1] = [itemID, Number($("#itemDataBox").val())];
    renderSlot(currentSlot, itemID, value);
    currentSlot = 0;
}
function renderSlot(slot, value, original) {
    let slotImage = document.getElementById("recipeBtnImg" + slot);
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
    let slotBtn = document.getElementById("recipeBtn" + slot);
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
    $("#recipeBtn" + slot).tooltip({
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

/*renderSlot(1, "", "special_remove");
renderSlot(2, "", "special_remove");
renderSlot(3, "", "special_remove");
renderSlot(4, "", "special_remove");
renderSlot(5, "", "special_remove");
renderSlot(6, "", "special_remove");
renderSlot(7, "", "special_remove");
renderSlot(8, "", "special_remove");
renderSlot(9, "", "special_remove");
renderSlot(10, "", "special_remove");*/


function saveProject() {
    return {
        name: elementData.name,
        id: $("#dialogIDBox").val(),
        type: "Dialog",
        dialogType: $("#dialogTypeMenu").val(),
        dialogData: dialogData
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#dialogIDBox").val(data.id);
    if (data.dialogType) {
        $("#dialogTypeMenu").val(data.dialogType);
    }

    dialogData = data.dialogData;
    dialogTitle.innerHTML = dialogData.title.internal;
}

function loadGrid(data) {
    if (data) {
        currentGrid = data;
        for (let i = 0; i < 10; i++) {
            if (currentGrid[i][0] == "") {
                renderSlot(i + 1, "", "special_remove");
            } else {
                renderSlot(i + 1, currentGrid[i][0], "special_custom");
            }
        }
    }
}

function enableSlot(num) {
    document.getElementById(`recipeBtn${num}`).style.display = "inline-block";
}
function disableSlot(num) {
    document.getElementById(`recipeBtn${num}`).style.display = "none";
}

dialogTypeMenu.addEventListener("change", function (e) {
    
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
        const fromId = this.id?.replace("recipeBtn", "");
        console.log("[DRAG START] from slot:", fromId);
    }
});

$(".itemIconBtn").droppable({
    tolerance: "pointer",

    drop: function (event, ui) {
        const fromBtn = ui.draggable[0];
        const toBtn   = this;

        const fromIdRaw = fromBtn?.id?.replace("recipeBtn", "");
        const toIdRaw   = toBtn?.id?.replace("recipeBtn", "");

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
            fromId < 1 || fromId > 10 ||
            toId < 1 || toId > 10 ||
            fromId === toId
        ) {
            console.warn("[DROP] Invalid slot IDs — copySlot NOT called");
            return;
        }

        console.log("[copySlot] Calling copySlot(", fromId, ",", toId, ")");
        copySlot(fromId, toId);
    }
});









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

let boxToValidate = dialogIDBox;
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

document.addEventListener("DOMContentLoaded", function() {
    bulmaSelectmenu.attachMenu(dialogTypeMenu);
});



let selectedObj = "";
let selectedObjType = "";
let dialogData = {
    title: {
        internal: "Title",
        external: "Title"
    },
    objects: {
        "dialogMainAction": {
            type: "actionBtn",
            label: "",
            tooltip: "",
            width: 150,
            special: true
        }
    },
    objectOrder: []
};

function positionToolbar(menu, button) {
    const rect = button.getBoundingClientRect();

    const top = rect.bottom + window.scrollY;
    const left = rect.left + window.scrollX;

    menu.style.position = "absolute";
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;

    // Available space below the button
    const viewportBottom = window.innerHeight + window.scrollY;
    const availableHeight = viewportBottom - top;

    // Read the CSS max-height (fallback to 300 if missing)
    const cssMaxHeight = parseFloat(
        getComputedStyle(menu).maxHeight
    ) || 300;

    // Clamp max-height so it never overflows
    menu.style.maxHeight = `${Math.max(
        0,
        Math.min(cssMaxHeight, availableHeight - 8)
    )}px`;
}

function showToolbar(element) {
    let el = document.getElementById(element);
    objToolbar.classList.remove("toolbarHidden");
    positionToolbar(objToolbar, el);
    el.classList.add("dialogSelectedObj");
    selectedObj = element;
    if (element == "dialogTitle") {
        selectedObjType = "title";
    } else {
        selectedObjType = dialogData.objects[selectedObj].type;
    }

    if (element == "dialogTitle" || element == "dialogMainAction") {
        $("#toolbarBtn1").show();
        $("#toolbarBtn2").hide();
        $("#toolbarBtn3").hide();
        $("#toolbarBtn4").hide();
    } else {
        $("#toolbarBtn1").show();
        $("#toolbarBtn2").show();
        $("#toolbarBtn3").show();
        $("#toolbarBtn4").show();
    }
}

function toolbarAction(btn) {
    if (btn == 1) {
        editObj();
    } else if (btn == 2) {
        moveObj("up");
    } else if (btn == 3) {
        moveObj("down");
    } else if (btn == 4) {
        openDeleteObj();
    }
}

document.addEventListener("mousedown", (e) => {
    if (!e.target.closest("#objToolbar")) {
        closeToolbar();
    }
});

function closeToolbar() {
    let els = document.querySelectorAll(".dialogSelectedObj");
    for (let i = 0; i < els.length; i++) {
        els[i].classList.remove("dialogSelectedObj");
    }
    objToolbar.classList.add("toolbarHidden");
}

function editObj() {
    editObjDlg.classList.add("is-active");
    if (selectedObjType == "title") {
        editObj_title.classList.remove("hidden");
        editObj_actionBtn.classList.add("hidden");
        editObj_title_1.value = dialogData.title.internal;
        editObj_title_2.value = dialogData.title.external;
    } else if (selectedObjType == "actionBtn") {
        editObj_title.classList.add("hidden");
        editObj_actionBtn.classList.remove("hidden");
        editObj_actionBtn_1.value = dialogData.objects[selectedObj].label;
        editObj_actionBtn_2.value = dialogData.objects[selectedObj].tooltip;
        editObj_actionBtn_3.value = dialogData.objects[selectedObj].width.toString();
    }
}

function closeEditObj() {
    editObjDlg.classList.remove("is-active");
}

function saveObj() {
    closeEditObj();
    if (selectedObjType == "title") {
        dialogData.title.internal = editObj_title_1.value;
        dialogData.title.external = editObj_title_2.value;
        dialogTitle.innerHTML = dialogData.title.internal;
    } else if (selectedObjType == "actionBtn") {
        dialogData.objects[selectedObj].label = editObj_actionBtn_1.value;
        dialogData.objects[selectedObj].tooltip = editObj_actionBtn_2.value;
        dialogData.objects[selectedObj].width = Number(editObj_actionBtn_3.value);
        let el = document.getElementById(selectedObj);
        el.innerHTML = dialogData.objects[selectedObj].label;
        el.style.width = dialogData.objects[selectedObj].width;
    }
}

function moveObj(direction) {

}

function closeDeleteObj() {
    deleteDlg.classList.remove("is-active");
}

function openDeleteObj() {
    deleteDlg.classList.add("is-active");
    let deleteDlgText = document.getElementById("deleteDlgText");
    let deleteDlgConfirm = document.getElementById("deleteDlgConfirm");
    deleteDlgText.innerHTML = `Are you sure you want to delete the object?`;
    deleteDlgConfirm.setAttribute("onclick", `deleteCriteria('${selectedObj}')`);
}

function deleteObj(id) {
    deleteDlg.classList.remove("is-active");

}