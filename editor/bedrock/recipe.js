var elementData = {};
var currentGrid = [["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0], ["", 0]];
var currentSlot = 0;

function addItemToBeginning(obj, key, value) {
    return { [key]: value, ...obj };
}

$("#recipeTypeMenu").selectmenu();
$("#recipeBtn1").button();
$("#recipeBtn2").button();
$("#recipeBtn3").button();
$("#recipeBtn4").button();
$("#recipeBtn5").button();
$("#recipeBtn6").button();
$("#recipeBtn7").button();
$("#recipeBtn8").button();
$("#recipeBtn9").button();
$("#recipeBtn10").button();

$('input').addClass("ui-widget ui-widget-content ui-corner-all");

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

(async function() {
    let customItems = {};
    let customItemList = window.parent.getCustomItems();

    await Promise.all(customItemList.map(async (item) => {
        let blob = await projZip.folder("assets").file(item.texture).async("blob");
        let texture = await fileToDataURL(blob);

        customItems[item.id] = {
            name: item.displayName,
            texture: makeIsometricCube(texture, texture, texture)
        };
    }));
})();

const javaItemCDN = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.10/assets/minecraft/textures";

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
    } else if (original == "special_custom" && Object.keys(itemDefinitions).includes("minecraft:" + value)) {
        slotImage.setAttribute("src", replaceShortURLs(itemDefinitions["minecraft:" + value].texture));
    } else if (original == "special_custom" && !Object.keys(itemDefinitions).includes(value)) {
        slotImage.setAttribute("src", "/moddery/custom_textures/special_custom.png");
    } else {
        slotImage.setAttribute("src", replaceShortURLs(itemDefinitions[value].texture));
    }
    let slotBtn = document.getElementById("recipeBtn" + slot);
    if (original == "special_remove") {
        slotBtn.setAttribute("title", "");
    } else if ((original == "special_custom" && Object.keys(itemDefinitions).includes("minecraft:" + value)) || (itemDefinitions["minecraft:" + value]?.name ?? false)) {
        slotBtn.setAttribute("title", itemDefinitions["minecraft:" + value].name);
    } else if ((itemDefinitions[value]?.name ?? false)) {
        slotBtn.setAttribute("title", itemDefinitions[value].name);
    } else {
        slotBtn.setAttribute("title", value);
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

renderSlot(1, "", "special_remove");
renderSlot(2, "", "special_remove");
renderSlot(3, "", "special_remove");
renderSlot(4, "", "special_remove");
renderSlot(5, "", "special_remove");
renderSlot(6, "", "special_remove");
renderSlot(7, "", "special_remove");
renderSlot(8, "", "special_remove");
renderSlot(9, "", "special_remove");
renderSlot(10, "", "special_remove");


function saveProject() {
    return {
        name: elementData.name,
        id: $("#recipeIDBox").val(),
        type: "Recipe",
        recipeType: $("#recipeTypeMenu").val(),
        outputQuantity: $("#outputQuantityBox").val(),
        craftingGrid: currentGrid
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#recipeIDBox").val(data.id);
    if (data.recipeType) {
        $("#recipeTypeMenu").val(data.recipeType);
        $("#recipeTypeMenu").selectmenu("refresh");
    }
    $("#outputQuantityBox").val(data.outputQuantity);
    loadGrid(data.craftingGrid);
}

function loadGrid(data) {
    if (data) {
        currentGrid = data;
    }
    for (let i = 0; i < 10; i++) {
        if (currentGrid[i][0] == "") {
            renderSlot(i + 1, "", "special_remove");
        } else {
            renderSlot(i + 1, currentGrid[i][0], "special_custom");
        }
    }
}
function changeGridType(type) {
    if (type == "crafting" || type == "crafting_shapeless") {
        enableSlot(1);
        enableSlot(2);
        enableSlot(3);
        enableSlot(4);
        enableSlot(5);
        enableSlot(6);
        enableSlot(7);
        enableSlot(8);
        enableSlot(9);
    }
    if (type == "stonecutter" || type == "furnace" || type == "blast_furnace" || type == "smoker" || type == "campfire" || type == "soul_campfire") {
        disableSlot(1);
        disableSlot(2);
        disableSlot(3);
        disableSlot(4);
        disableSlot(5);
        enableSlot(6);
        disableSlot(7);
        disableSlot(8);
        disableSlot(9);
    }
    if (type == "brewing") {
        disableSlot(1);
        disableSlot(2);
        disableSlot(3);
        disableSlot(4);
        enableSlot(5);
        enableSlot(6);
        disableSlot(7);
        disableSlot(8);
        disableSlot(9);
    }
}
function enableSlot(num) {
    document.getElementById(`recipeBtn${num}`).style.display = "inline-block";
}
function disableSlot(num) {
    document.getElementById(`recipeBtn${num}`).style.display = "none";
}
$("#recipeTypeMenu").on("selectmenuchange", function (e, ui) {
    changeGridType(ui.item.value);
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
