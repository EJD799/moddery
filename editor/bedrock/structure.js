


$("#dimensionBox").selectmenu();
$("#itemTextureBtn").button();
$("#addComponentBtn").button();
$("#addComponentCancelBtn").button();
$("#addComponentAddBtn").button();
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
    if (!Object.keys(currentItemComponents).includes(type)) {
        currentItemComponents[type] = newComponentObj;
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
                /*change: function (event, ui) {
                    updateInput(typeName, inputName, ui.item.value);
                }*/
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
        texture: selectedTexture,
        components: currentItemComponents
    };
}
function loadProject(data) {
    elementData = data;
    $("#elementIDBox").val(data.name);
    $("#itemIDBox").val(data.id);
    $("#nameBox").val(data.displayName);
    if ((data?.invCategory ?? false)) {
        $("#categoryBox").val(data.invCategory);
        $("#categoryBox").selectmenu("refresh");
    }
    $("#stackSizeBox").val(data.maxStackSize);
    selectedTexture = data.texture;
    if (selectedTexture) {
        document.getElementById("textureNameText").innerHTML = selectedTexture;
    } else {
        document.getElementById("textureNameText").innerHTML = "No texture selected";
    }
    loadComponents(data.components);
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
                currentItemComponents[Object.keys(data)[i]][componentInputDefs[j].name] = data[Object.keys(data)[i]][componentInputDefs[j].name];
            }
        }
    }
}

function updateInput(type, input, value) {
    currentItemComponents[type][input] = value;
}

function deleteComponent(name) {
    delete currentItemComponents[name];
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
