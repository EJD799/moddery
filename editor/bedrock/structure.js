$("#typeBox").selectmenu();
$("#directionBox").selectmenu();
$("#structureFileBtn").button();
$("#selectStructureCancelBtn").button();
$("#selectStructureSelectBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

$("#selectStructureDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectStructureDlg").dialog("close");

function openSelectStructureDlg() {
  $("#selectStructureDlg").dialog("open");
  textures = window.parent.getStructureList();
  let selectStructureMenu = document.getElementById("selectStructureMenu");
  selectStructureMenu.innerHTML = "";
  for (let i = 0; i < textures.length; i++) {
    let selectStructureMenuItem;
    let previewBox;
    let preview;
    let itemTitle;
    let itemRadio;
    selectStructureMenuItem = document.createElement("div");
    selectStructureMenuItem.setAttribute("class", "textureMenuItem");
    itemRadio = document.createElement("input");
    itemRadio.setAttribute("type", "radio");
    itemRadio.setAttribute("name", "selectedStructure");
    itemRadio.setAttribute("class", "textureRadio");
    itemRadio.setAttribute("value", textures[i]);
    selectStructureMenuItem.appendChild(itemRadio);
    itemTitle = document.createElement("span");
    itemTitle.setAttribute("class", "textureMenuTitle");
    itemTitle.innerHTML = textures[i];
    selectStructureMenuItem.appendChild(itemTitle);
    selectStructureMenu.appendChild(selectStructureMenuItem);
    selectStructureMenuItem.addEventListener("click", () => {
      const itemRadio = selectStructureMenuItem.querySelector('input[type="radio"]');
      if (itemRadio) {
        itemRadio.checked = true;  // select this radio
      }
    });
  }
}
function closeSelectStructureDlg() {
  $("#selectStructureDlg").dialog("close");
}
function selectStructure() {
    $("#selectStructureDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedStructure"]:checked');
    if (selected.value) {
		const structureNameText = document.getElementById("structureNameText");
		if (selected.value == "None") {
			structureNameText.innerHTML = "No structure selected";
			selectedStructure = "";
		} else {
			structureNameText.innerHTML = selected.value;
			selectedStructure = selected.value;
		}
    }
}

function saveProject() {
    return {
        name: elementData.name,
        id: $("#structureIDBox").val(),
        type: "Structure",
        structureType: $("#typeBox").val(),
        direction: $("#directionBox").val(),
        structure: selectedStructure,
        biomeFilter: $("#biomesBox").val(),
        spawnChance: [$("#spawnChanceBox1").val(), $("#spawnChanceBox2").val()]
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#structureIDBox").val(data.id);
    if ((data?.structureType ?? false)) {
        $("#typeBox").val(data.structureType);
        $("#typeBox").selectmenu("refresh");
    }
    if ((data?.direction ?? false)) {
        $("#directionBox").val(data.direction);
        $("#directionBox").selectmenu("refresh");
    }
    selectedStructure = data.structure;
    if (selectedStructure) {
        document.getElementById("structureNameText").innerHTML = selectedStructure;
    } else {
        document.getElementById("structureNameText").innerHTML = "No structure selected";
    }
    $("#biomesBox").val(data.biomeFilter);
    $("#spawnChanceBox1").val(data.spawnChance[0]);
    $("#spawnChanceBox2").val(data.spawnChance[1]);
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
