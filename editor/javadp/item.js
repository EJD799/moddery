let textures;
let elementData = {};
let selectedTexture;

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
    onThemeChange(null, null, window.parent.generalThemeType);
    editedItemDefinitions = Object.fromEntries(
        Object.entries(itemDefinitions).filter(([key, value]) => value.filter != "bedrock")
    );
}, 100);

let selectedItemId = null;
let filteredItems = [];   // after search
let itemsPerRow = 0;
const btnSize = 50;       // 32px + borders/padding
const rowHeight = btnSize;
let baseItemType = "";

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
    baseItemType = [itemID, Number($("#itemDataBox").val())];
    renderSlot(itemID, value);
}
function renderSlot(value, original) {
    let slotImage = document.getElementById("baseItemBoxImg");
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
    let slotBtn = document.getElementById("baseItemBox");
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
    $("#baseItemBox").tooltip({
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

function saveProject() {
    return {
        name: elementData.name,
        id: $("#itemIDBox").val(),
        type: "Item",
        displayName: $("#nameBox").val(),
        baseItemType: baseItemType,
        texture: selectedTexture
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#itemIDBox").val(data.id);
    $("#nameBox").val(data.displayName);
    selectedTexture = data.texture;
    if (selectedTexture) {
        document.getElementById("textureNameText").innerHTML = selectedTexture;
    } else {
        document.getElementById("textureNameText").innerHTML = "No texture selected";
    }
    baseItemType = data.baseItemType;
    if (baseItemType == "") {
        renderSlot("", "special_remove");
    } else {
        renderSlot(baseItemType, "special_custom");
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