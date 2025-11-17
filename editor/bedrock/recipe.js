var elementData = {};

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
$("#selectTextureCancelBtn").button();
$("#selectTextureSelectBtn").button();
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

function openSelectTextureDlg() {
  $("#selectTextureDlg").dialog("open");
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
        id: $("#recipeIDBox").val(),
        type: "Recipe",
        recipeType: $("#recipeTypeMenu").val(),
        outputQuantity: $("#outputQuantityBox").val(),
        craftingGrid: saveGrid()
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#recipeIDBox").val(data.id);
    $("#recipeTypeMenu").val(data.recipeType);
    $("#recipeTypeMenu").selectmenu("refresh");
    $("#outputQuantityBox").val(data.outputQuantity);
    loadGrid(data.craftingGrid);
}

function saveGrid() {

}
function loadGrid(data) {

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
document.getElementById("recipeTypeMenu").addEventListener("change", function(e) {
    changeGridType(e.target.value);
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
