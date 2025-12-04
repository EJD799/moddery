var projZip;
var projManifest;
var tabCounter = 3;
var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
var tabs = $("#tabs");
var elementCount = 0;
var assetCount = 0;
var openElements = {};
var renameElementID;
var renameElementType;
var deleteElementID;
var deleteElementType;

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("savingBox").style.display = "none";
});

function arraysEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

function arrayContains(arrayOfArrays, targetArray) {
  return arrayOfArrays.some(arr => arraysEqual(arr, targetArray));
}

function indexInArray(arrayOfArrays, targetArray) {
  return arrayOfArrays.findIndex(arr => arraysEqual(arr, targetArray));
}

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


$("#toolbar").menu();
$("#tabs").tabs();
$("#newProjDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 400,
  width: 500
});
$("#newProjDlg").dialog("close");
$("#newProjType").selectmenu();
$("#newProjCancelBtn").button();
$("#newProjCreateBtn").button();
$("#editProjDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 400,
  width: 500
});
$("#editProjDlg").dialog("close");
$("#editProjCancelBtn").button();
$("#editProjSaveBtn").button();
$("#addElementDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 400,
  width: 500
});
$("#addElementDlg").dialog("close");
$("#addElementType").selectmenu();
$("#addElementCancelBtn").button();
$("#addElementAddBtn").button();
$("#addAssetDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 400,
  width: 500
});
$("#addAssetDlg").dialog("close");
$("#addAssetUploadBtn").button();
$("#addAssetCancelBtn").button();
$("#addAssetAddBtn").button();
$("#exportDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 400,
  width: 500
});
$("#exportDlg").dialog("close");
$("#loaderDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 150,
  width: 300,
  closeOnEscape: false,
  draggable: false,
  modal: true,
  dialogClass: "no-close",
  create: function () {
    // hide the close button on the dialog wrapper
    $(this).closest(".ui-dialog").find(".ui-dialog-titlebar-close").hide();
  }
});
$("#aboutDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 300,
  width: 300,
  closeOnEscape: false
});
$("#aboutDlg").dialog("close");
$("#loaderDlg").dialog("close");
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
$("#renameDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 200,
  width: 300,
  closeOnEscape: false
});
$("#renameDlg").dialog("close");
$("#renameDlgCancel").button();
$("#renameDlgConfirm").button();
$("#elementInfoDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 300,
  width: 300,
  closeOnEscape: false
});
$("#elementInfoDlg").dialog("close");
$("#elementInfoDlgClose").button();
function openNewProjDlg() {
  $("#newProjDlg").dialog("open");
}
function closeNewProjDlg() {
  $("#newProjDlg").dialog("close");
}
function openEditProjDlg() {
  $("#editProjDlg").dialog("open");
  $("#editProjNameBox").val(projManifest.name);
  $("#editProjNamespaceBox").val(projManifest.namespace);
  $("#editProjVersionBox1").val(projManifest.addon_version[0]);
  $("#editProjVersionBox2").val(projManifest.addon_version[1]);
  $("#editProjVersionBox3").val(projManifest.addon_version[2]);
  $("#editProjDescriptionBox").val(projManifest.description);
}
function closeEditProjDlg() {
  $("#editProjDlg").dialog("close");
}
function saveProjectInfo() {
  closeEditProjDlg();
  projManifest.name = $("#editProjNameBox").val();
  projManifest.namespace = $("#editProjNamespaceBox").val();
  projManifest.addon_version = [$("#editProjVersionBox1").val(), $("#editProjVersionBox2").val(), $("#editProjVersionBox3").val()];
  projManifest.description = $("#editProjDescriptionBox").val();
  projZip.file("manifest.json", JSON.stringify(projManifest));
  saveProject();
}
function createProject() {
  if ($("#newProjNamespaceBox").val() == "minecraft") {
    alert("The project namespace cannot be \"minecraft\"!");
  } else if (($("#newProjNameBox").val() == "") || ($("#newProjType").val() == "") || ($("#newProjNamespaceBox").val() == "")) {
    alert("All boxes must be filled in!")
  } else {
    closeNewProjDlg();
    document.getElementById("tabs").hidden = false;
    document.getElementById("welcome").hidden = true;
    document.getElementById("savingBox").style.display = "block";
    savingText.innerHTML = "<i class='fa-solid fa-circle-check'></i> Saved";
    projZip = new JSZip();
    projManifest = {
      "name": $("#newProjNameBox").val(),
      "type": $("#newProjType").val(),
      "namespace": $("#newProjNamespaceBox").val(),
      "bp_uuid": crypto.randomUUID(),
      "rp_uuid": crypto.randomUUID(),
      "addon_version": [1, 0, 0],
      "mc_version": [1, 21, 90],
      "description": ""
    };
    projZip.file("manifest.json", JSON.stringify(projManifest));
    projZip.folder("elements");
    projZip.folder("assets");
    $("#newProjNameBox").val("");
    $("#newProjNamespaceBox").val("");
  }
}


/*let fileInput = document.getElementById("openFileInput");
fileInput.addEventListener("change", function(e) {
  try {
    openProj(fileInput.files[0]);
  } catch(err) {
    alert("An error occurred during the import process. Is the uploaded file a valid Moddery project?");
  }
});

function openProjDlg() {
  fileInput.click();
}*/

let projFileHandle = null;

async function openProjDlg() {
  try {
    const [handle] = await window.showOpenFilePicker({
      types: [{
        description: "Moddery Project",
        accept: { "application/zip": [".zip"] }
      }]
    });

    projFileHandle = handle;    
    const file = await handle.getFile();
    openProj(file); // your existing function
  } catch (err) {
    alert("Error opening project.");
    document.getElementById("savingBox").style.display = "none";
  }
};


function openProj(file) {
  openLoader();
  loaderText.innerHTML = "Opening Project... (0%)";
  loaderProgress.setAttribute("max", "0"),
  loaderProgress.value = "0";
  JSZip.loadAsync(file).then(function (zip) {
    let manifest;
    zip.file("manifest.json").async("string").then(function(data) {
      manifest = JSON.parse(data);
      if (manifest?.type != null) {
        document.getElementById("tabs-1").innerHTML = `<p>Press the "+ <i class="fas fa-cubes"></i>" button to add an element.</p>`;
        document.getElementById("tabs-2").innerHTML = `<p>Press the "+ <i class="fas fa-image"></i>" button to add an asset.</p>`;
        projZip = zip;
        projManifest = manifest;
        document.getElementById("tabs").hidden = false;
        document.getElementById("welcome").hidden = true;
        document.getElementById("savingBox").style.display = "block";
        savingText.innerHTML = "<i class='fa-solid fa-spinner'></i> Opening Project...";
        elementFolderList = fileListInFolder("elements");
        assetFolderList = fileListInFolder("assets");
        let progressBarMax = elementFolderList.length + assetFolderList.length;
        loaderProgress.setAttribute("max", progressBarMax.toString());
        for (let i = 0; i < elementFolderList.length; i++) {
          if (!elementFolderList[i].endsWith(".code.json")) {
            projZip.folder("elements").file(elementFolderList[i]).async("string").then(function(file) {
              data = JSON.parse(file);
              $("#addElementNameBox").val(data.name);
              $("#addElementIDBox").val(data.id);
              $("#addElementType").val(data.type);
              addElement(true);
            });
          }
          loaderProgress.value = Number(loaderProgress.value + 1);
          loaderText.innerHTML = `Opening Project... (${(progressBarMax / loaderProgress.value) * 100}%)`;
        }
        for (let i = 0; i < assetFolderList.length; i++) {
          projZip.folder("assets").file(assetFolderList[i]).async("blob").then(function(file) {
            $("#addAssetNameBox").val(assetFolderList[i]);
            addAsset(true, file, assetFolderList[i]);
          });
          loaderProgress.value = Number(loaderProgress.value + 1);
          loaderText.innerHTML = `Opening Project... (${(progressBarMax / loaderProgress.value) * 100}%)`;
        }
        setTimeout(function() {
          closeLoader();
          savingText.innerHTML = "<i class='fa-solid fa-circle-check'></i> Saved";
        }, 500);
      } else {
        alert("The uploaded file is not a valid Moddery project!");
        closeLoader();
        document.getElementById("savingBox").style.display = "none";
      }
    });
  });
}


function openAddElementDlg() {
  $("#addElementDlg").dialog("open");
}
function closeAddElementDlg() {
  $("#addElementDlg").dialog("close");
}
function openAddAssetDlg() {
  $("#addAssetDlg").dialog("open");
}
function closeAddAssetDlg() {
  $("#addAssetDlg").dialog("close");
}
function openExportDlg() {
  $("#exportDlg").dialog("open");
}
function closeExportDlg() {
  $("#exportDlg").dialog("close");
}
function openLoader() {
  $("#loaderDlg").dialog("open");
}
function closeLoader() {
  $("#loaderDlg").dialog("close");
}
function openAboutDlg() {
  $("#aboutDlg").dialog("open");
}
function closeAboutDlg() {
  $("#aboutDlg").dialog("close");
}

function encodeText(text) {
  return text.replaceAll(" ", "_space_").replaceAll(".", "_dot_").replaceAll("(", "_op_").replaceAll(")", "_cp_");
}
function decodeText(text) {
  return text.replaceAll("_space_", " ").replaceAll("_dot_", ".").replaceAll("_op_", "(").replaceAll("_cp_", ")");
}

function createElementDropdown(elementID, type) {
  let menu = document.createElement("ul");
  menu.setAttribute("class", "sublist");
  let menuItem;
  if (type == "asset") {
    menu.setAttribute("id", elementID + "_assetMenu");
    menuItem = document.createElement("li");
    menuItem.innerHTML = `<div><i class="fas fa-circle-info"></i> Info</div>`;
    menuItem.setAttribute("onclick", `openElementInfo('${elementID}', 'asset')`);
    menu.appendChild(menuItem);
    menuItem = document.createElement("li");
    menuItem.innerHTML = `<div><i class="fas fa-pencil"></i> Rename</div>`;
    menuItem.setAttribute("onclick", `openRenameElement('${elementID}', 'asset')`);
    menu.appendChild(menuItem);
    menuItem = document.createElement("li");
    menuItem.innerHTML = `<div class="deleteBtn"><i class="fas fa-trash"></i> Delete</div>`;
    menuItem.setAttribute("onclick", `openDeleteElement('${elementID}', 'asset')`);
    menu.appendChild(menuItem);
    document.body.appendChild(menu);
    $(`#${elementID}_assetMenu`).menu();
    $(`#${elementID}_assetOptionBtn`).on("click", function () {
      $(`#${elementID}_assetMenu`).show().position({
        my: "left top",
        at: "left bottom",
        of: $(`#${elementID}_assetOptionBtn`)
      });
    });
    $(document).on('click', function (e) {
      if (!$(e.target).closest($(`#${elementID}_assetMenu`)).length && !$(e.target).is($(`#${elementID}_assetOptionBtn`))) {
          $(`#${elementID}_assetMenu`).hide();
      }
    });
  } else {
    menu.setAttribute("id", elementID + "_elementMenu");
    menuItem = document.createElement("li");
    menuItem.innerHTML = `<div><i class="fas fa-circle-info"></i> Info</div>`;
    menuItem.setAttribute("onclick", `openElementInfo('${elementID}', 'element')`);
    menu.appendChild(menuItem);
    menuItem = document.createElement("li");
    menuItem.innerHTML = `<div><i class="fas fa-pencil"></i> Rename</div>`;
    menuItem.setAttribute("onclick", `openRenameElement('${elementID}', 'element')`);
    menu.appendChild(menuItem);
    menuItem = document.createElement("li");
    menuItem.innerHTML = `<div class="deleteBtn"><i class="fas fa-trash"></i> Delete</div>`;
    menuItem.setAttribute("onclick", `openDeleteElement('${elementID}', 'element')`);
    menu.appendChild(menuItem);
    document.body.appendChild(menu);
    $(`#${elementID}_elementMenu`).menu();
    $(`#${elementID}_optionBtn`).on("click", function () {
      $(`#${elementID}_elementMenu`).show().position({
        my: "left top",
        at: "left bottom",
        of: $(`#${elementID}_optionBtn`)
      });
    });
    $(document).on('click', function (e) {
      if (!$(e.target).closest($(`#${elementID}_elementMenu`)).length && !$(e.target).is($(`#${elementID}_optionBtn`))) {
          $(`#${elementID}_elementMenu`).hide();
      }
    });
  }
}

function addElement(loadingProj) {
  if (!fileListInFolder("elements").includes($("#addElementNameBox").val() + ".json") || loadingProj) {
    if (!loadingProj) {
      var elementJSON = {
        "name": $("#addElementNameBox").val(),
        "id": $("#addElementIDBox").val(),
        "type": $("#addElementType").val()
      };
      projZip.folder("elements").file($("#addElementNameBox").val() + ".json", JSON.stringify(elementJSON));
      addTab($("#addElementType").val(), $("#addElementNameBox").val());
    }
    elementCount++;
    var parentDiv = document.getElementById("tabs-1");
    var elementBox = document.createElement("div");
    elementBox.setAttribute("class", "elementbox");
    elementBox.setAttribute("id", "elementbox" + $("#addElementNameBox").val());
    elementBox.innerHTML = `
    <h3 id="${"elementboxname" + $("#addElementNameBox").val()}">${$("#addElementNameBox").val()}</h3>
    <button onclick="editElement('${$("#addElementNameBox").val()}')" id="${$("#addElementNameBox").val()}_editBtn">Edit</button>
    <button id="${$("#addElementNameBox").val()}_optionBtn">&#x22EF;</button>
    `;
    parentDiv.appendChild(elementBox);
    $("#" + $("#addElementNameBox").val() + "_editBtn").button();
    $("#" + $("#addElementNameBox").val() + "_optionBtn").button();
    createElementDropdown($("#addElementNameBox").val(), "element");
  }
  closeAddElementDlg();
  $("#addElementNameBox").val("");
  $("#addElementIDBox").val("");
  if (projFileHandle) {
    saveProject();
  }
}

addAssetUploadInput.addEventListener("change", (event) => {
  addAssetNameBox.value = addAssetUploadInput.files[0].name;
});

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function addAsset(loadingProj, fileToLoad, fileToLoadName) {
  if (!fileListInFolder("assets").includes($("#addAssetNameBox").val()) || loadingProj) {
    let file;
    let fileType;
    let fileName;
    if (loadingProj) {
      file = fileToLoad;
      fileName = fileToLoadName;
      fileType = afterLastDot(fileName);
    } else {
      file = addAssetUploadInput.files[0];
      fileName = addAssetNameBox.value;
      fileType = afterLastDot(fileName);
    }
    let fileNameEncoded = encodeText(fileName);
    let previewBox;
    let preview;
    let editBtn;
    let optionsBtn;
    if (file) {
      projZip.folder("assets").file(fileName, file);
      assetCount++;
      var parentDiv = document.getElementById("tabs-2");
      var assetBox = document.createElement("div");
      var center = document.createElement("center");
      assetBox.setAttribute("class", "elementbox");
      assetBox.setAttribute("id", "elementbox" + fileNameEncoded);
      center.innerHTML = `<h3 id="${"elementboxname" + fileNameEncoded}">${fileName}</h3>`;
      if (fileType == "png") {
        previewBox = document.createElement("div");
        previewBox.setAttribute("class", "previewBox");
        preview = document.createElement("img");
        preview.setAttribute("src", await fileToDataURL(file));
        preview.setAttribute("id", fileNameEncoded + "_preview");
        previewBox.appendChild(preview);
      }
      center.appendChild(previewBox);
      center.appendChild(document.createElement("br"));
      editBtn = document.createElement("button");
      editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}')`);
      editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
      editBtn.innerHTML = "Edit";
      optionsBtn = document.createElement("button");
      optionsBtn.setAttribute("id", `${fileNameEncoded}_assetOptionBtn`);
      optionsBtn.innerHTML = "&#x22EF;";
      center.appendChild(editBtn);
      center.appendChild(optionsBtn);
      assetBox.appendChild(center);
      parentDiv.appendChild(assetBox);
      $(`#${fileNameEncoded}_assetEditBtn`).button();
      $(`#${fileNameEncoded}_assetOptionBtn`).button();
      createElementDropdown(fileNameEncoded, "asset");
    }
  }
  closeAddAssetDlg();
  addAssetUploadInput.value = "";
  addAssetNameBox.value = "";
  if (projFileHandle) {
    saveProject();
  }
}

/*
function saveProject() {
  projZip.generateAsync({type:"blob"})
  .then(function(content) {
      saveAs(content, projManifest.name + ".zip");
  });
}
*/

async function saveProject() {
  document.getElementById("savingText").innerHTML = "<i class='fa-solid fa-spinner'></i> Saving...";

  // If no file is opened, fall back to Save As
  if (!projFileHandle) {
    return await saveProjectAs();
  }

  const blob = await projZip.generateAsync({ type: "blob" });

  // Ensure we have write permission
  const perm = await projFileHandle.requestPermission({ mode: "readwrite" });
  if (perm !== "granted") {
    // If permission denied, fallback to Save As as well
    return await saveProjectAs();
  }

  const writable = await projFileHandle.createWritable();
  await writable.write(blob);
  await writable.close();

  console.log("Project saved!");
  document.getElementById("savingText").innerHTML = "<i class='fa-solid fa-circle-check'></i> Saved";
}
async function saveProjectAs() {
  projFileHandle = await window.showSaveFilePicker({
    suggestedName: (projManifest?.name || "project") + ".zip",
    types: [{
      description: "Moddery Project",
      accept: { "application/zip": [".zip"] }
    }]
  });

  // After choosing location, save normally
  return await saveProject();
}

$("#editProjBtn").button();
$("#addElementBtn").button();
$("#addAssetBtn").button();
$("#loaderProgress").progressbar({
  value: 50
});
$('input').addClass("ui-widget ui-widget-content ui-corner-all");
$('textarea').addClass("ui-widget ui-widget-content ui-corner-all");

function getTabContent(role, elementID) {
  if (role == "Function") {
    return '<iframe src="editor/bedrock/function.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Script") {
    return '<iframe src="editor/bedrock/script.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Item") {
    return '<iframe src="editor/bedrock/item.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Recipe") {
    return '<iframe src="editor/bedrock/recipe.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Image") {
    return '<iframe src="editor/image.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else {
    return "Coming soon!";
  }
}

function shouldRemoveMargin(role) {
  //if (role == "Function") {
    return true;
  //} else {
  //  return false;
  //}
}

function editElement(elementID) {
  projZip.folder("elements").file(elementID + ".json").async("string").then(function (data) {
    var dataParsed = JSON.parse(data);
    if (!arrayContains(Object.values(openElements), [dataParsed.type, elementID])) {
      addTab(dataParsed.type, elementID);
    }
  });
}
function editAsset(assetID) {
  projZip.folder("assets").file(decodeText(assetID)).async("string").then(function (data) {
    if (!arrayContains(Object.values(openElements), ["Image", assetID])) {
      addTab("Image", assetID);
    }
  });
}

function openElementInfo(elementID, type) {
  $("#elementInfoDlg").dialog("open");
  let elementInfoDlg = document.getElementById("elementInfoDlg");
  let elementInfoDlgContent = document.getElementById("elementInfoDlgContent");
  let elementIdentifier;
  let elementType;
  if (type == "asset") {
    $("#elementInfoDlg").dialog("option", "title", "Asset Info");
    elementID = decodeText(elementID);
    elementIdentifier = decodeText(elementID);
    if (elementID.endsWith("png")) {
      elementType = "Image";
    } else {
      elementType = "Asset";
    }
    elementInfoDlgContent.innerHTML = `
    Name: ${elementID}<br>
    ID: ${elementIdentifier}<br>
    Type: ${elementType}
    `;
    $(`#${encodeText(elementID)}_assetMenu`).hide();
  } else {
    $("#elementInfoDlg").dialog("option", "title", "Element Info");
    projZip.folder("elements").file(elementID + ".json").async("string").then(function (data) {
      elementIdentifier = JSON.parse(data).id;
      elementType = JSON.parse(data).type;
      elementInfoDlgContent.innerHTML = `
      Name: ${elementID}<br>
      ID: ${elementIdentifier}<br>
      Type: ${elementType}
      `;
    });
    $(`#${elementID}_elementMenu`).hide();
  }
}
function openRenameElement(elementID, type) {
  $("#renameDlg").dialog("open");
  renameElementID = elementID;
  renameElementType = type;
  let renameDlgText = document.getElementById("renameDlgText");
  if (type == "asset") {
    $("#renameDlg").dialog("option", "title", "Rename Asset");
    $(`#${elementID}_assetMenu`).hide();
  } else {
    $("#renameDlg").dialog("option", "title", "Rename Element");
    $(`#${elementID}_elementMenu`).hide();
  }
  renameDlgText.innerHTML = `Rename ${decodeText(elementID)} to:`;
  let renameBox = document.getElementById("renameDlgBox");
  renameBox.value = decodeText(elementID);
}
function openDeleteElement(elementID, type) {
  $("#deleteDlg").dialog("open");
  deleteElementID = elementID;
  deleteElementType = type;
  let deleteDlgText = document.getElementById("deleteDlgText");
  if (type == "asset") {
    $("#deleteDlg").dialog("option", "title", "Delete Asset?");
    deleteDlgText.innerHTML = `Are you sure you want to delete the asset "${decodeText(elementID)}"?`;
    $(`#${elementID}_assetMenu`).hide();
  } else {
    $("#deleteDlg").dialog("option", "title", "Delete Element?");
    deleteDlgText.innerHTML = `Are you sure you want to delete the element "${decodeText(elementID)}"?`;
    $(`#${elementID}_elementMenu`).hide();
  }
}

function closeElementInfo() {
  $("#elementInfoDlg").dialog("close");
}
function closeRenameElement() {
  $("#renameDlg").dialog("close");
}
function closeDeleteElement() {
  $("#deleteDlg").dialog("close");
}

async function renameZipFile(zip, oldPath, newPath) {
    const file = zip.file(oldPath);
    if (!file) return false; // nothing to rename

    // Read the original file's data (as ArrayBuffer to preserve any type)
    const data = await file.async("arraybuffer");

    // Write it under the new name
    zip.file(newPath, data);

    // Delete the old one
    zip.remove(oldPath);
}

function deleteElementFromZip(id) {
    const mainPath = `elements/${id}.json`;
    const codePath = `elements/${id}.code.json`;
    const imagePath = `assets/${decodeText(id)}`;

    if (projZip.file(mainPath)) {
        projZip.remove(mainPath);
    }

    if (projZip.file(imagePath)) {
        projZip.remove(imagePath);
    }

    if (projZip.file(codePath)) {
        projZip.remove(codePath);
    }
}

function deleteElement() {
  closeDeleteElement();
  deleteElementFromZip(deleteElementID);
  document.getElementById("elementbox" + encodeText(deleteElementID)).remove();
  saveProject();
}
async function renameElement() {
  closeRenameElement();
  if (renameElementType == "element") {
    await renameZipFile(projZip, `elements/${renameElementID}.json`, `elements/${renameDlgBox.value}.json`);
    projZip.folder("elements").file(`${renameDlgBox.value}.json`).async("string").then(function (data) {
      let updated = JSON.parse(data);
      updated.name = renameDlgBox.value;
      projZip.folder("elements").file(`${renameDlgBox.value}.json`, JSON.stringify(updated));
    });
    if (projZip.file(`elements/${renameElementID}.code.json`)) {
      await renameZipFile(projZip, `elements/${renameElementID}.code.json`, `elements/${renameDlgBox.value}.code.json`);
    }
  } else {
    await renameZipFile(projZip, `assets/${decodeText(renameElementID)}`, `assets/${renameDlgBox.value}`);
  }
  let elementBox = document.getElementById("elementbox" + encodeText(renameElementID));
  if (renameElementType == "element") {
    elementBox.innerHTML = `
      <h3 id="elementboxname${renameDlgBox.value}">${renameDlgBox.value}</h3>
      <button onclick="editElement('${renameDlgBox.value}')" id="${renameDlgBox.value}_editBtn">Edit</button>
      <button id="${renameDlgBox.value}_optionBtn">&#x22EF;</button>
      `;
    $(`#${renameDlgBox.value}_editBtn`).button();
    $(`#${renameDlgBox.value}_optionBtn`).button();
    createElementDropdown(renameDlgBox.value, "element");
    $(`#${renameDlgBox.value}_optionBtn`).on("click", function () {
      $(`#${renameDlgBox.value}_elementMenu`).show().position({
        my: "left top",
        at: "left bottom",
        of: $(`#${renameDlgBox.value}_optionBtn`)
      });
    });
  } else {
    var assetBox = elementBox;
    var fileName = decodeText(renameDlgBox.value);
    var fileNameEncoded = encodeText(renameDlgBox.value);
    var fileType = "png";
    projZip.folder("assets").file(decodeText(fileName)).async("blob").then(async function (data) {
      var file = data;
      var center = document.createElement("center");
      assetBox.setAttribute("class", "elementbox");
      assetBox.setAttribute("id", "elementbox" + fileNameEncoded);
      assetBox.innerHTML = "";
      center.innerHTML = `<h3 id="${"elementboxname" + fileNameEncoded}">${fileName}</h3>`;
      if (fileType == "png") {
        previewBox = document.createElement("div");
        previewBox.setAttribute("class", "previewBox");
        preview = document.createElement("img");
        preview.setAttribute("src", await fileToDataURL(file));
        preview.setAttribute("id", fileNameEncoded + "_preview");
        previewBox.appendChild(preview);
      }
      center.appendChild(previewBox);
      center.appendChild(document.createElement("br"));
      editBtn = document.createElement("button");
      editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}')`);
      editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
      editBtn.innerHTML = "Edit";
      optionsBtn = document.createElement("button");
      optionsBtn.setAttribute("id", `${fileNameEncoded}_assetOptionBtn`);
      optionsBtn.innerHTML = "&#x22EF;";
      center.appendChild(editBtn);
      center.appendChild(optionsBtn);
      assetBox.appendChild(center);
      $(`#${fileNameEncoded}_assetEditBtn`).button();
      $(`#${fileNameEncoded}_assetOptionBtn`).button();
      createElementDropdown(fileNameEncoded, "asset");
      $(`#${fileNameEncoded}_assetOptionBtn`).on("click", function () {
        $(`#${fileNameEncoded}_assetMenu`).show().position({
          my: "left top",
          at: "left bottom",
          of: $(`#${fileNameEncoded}_assetOptionBtn`)
        });
      });
    });
  }
  saveProject();
}

function getCustomItems(mode) {
  let elementsList = fileListInFolder("elements");
  let itemsList = [];
  for (let i = 0; i < elementsList.length; i++) {
    projZip.folder("elements").file(elementsList[i]).async("string").then(async function (data) {
      let elementObj = JSON.parse(data);
      if ((elementObj.type == "Item" && mode != "Block") || (elementObj.type == "Block" && mode != "Item")) {
        itemsList.push(elementObj);
      }
    });
  }
  return itemsList;
}

function addTab(role, elementID) {
  var label = decodeText(elementID),
    id = "tabs-" + tabCounter,
    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
    tabContentHtml = getTabContent(role, elementID);
 
  tabs.find( ".ui-tabs-nav" ).append( li );
  if (shouldRemoveMargin(role)) {
    marginClass = 'class="noMargin" + ';
  } else {
    marginClass = '';
  }
  tabs.append( "<div " + marginClass + "id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
  tabs.tabs( "refresh" );
  tabs.tabs("option", "active", -1);
  tabCounter++;
  openElements[id] = [role, elementID];
  var frame = document.getElementById(elementID + "_frame");
  frame.onload = function() {
    if ((role == "Function") || (role == "Script")) {
      projZip.folder("elements").file(elementID + ".code.json").async("string").then(function (data) {
        frame.contentWindow.loadProject(JSON.parse(data));
      });
    } else if ((role == "Item") || (role == "Recipe")) {
      projZip.folder("elements").file(elementID + ".json").async("string").then(function (data) {
        frame.contentWindow.loadProject(JSON.parse(data));
      });
    } else if (role == "Image") {
      projZip.folder("assets").file(decodeText(elementID)).async("blob").then(async function (data) {
        frame.contentWindow.loadProject(await fileToDataURL(data));
      });
    }
  };
}

tabs.on( "click", "span.ui-icon-close", function() {
  var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  saveElement(openElements[panelId]);
  delete openElements[panelId];
  $( "#" + panelId ).remove();
  tabs.tabs( "refresh" );
  if (projFileHandle) {
    saveProject();
  }
});

function dataURItoFile(dataURI, filename) {
  // Split the metadata and the base64 data
  const [header, base64] = dataURI.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new File([bytes], filename, { type: mime });
}

async function saveElement(elementTab) {
  if ((elementTab[0] == "Function") || (elementTab[0] == "Script")) {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("elements").file(elementTab[1] + ".code.json", JSON.stringify(frame.contentWindow.saveProject()));
  } else if ((elementTab[0] == "Item") || (elementTab[0] == "Recipe")) {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("elements").file(elementTab[1] + ".json", JSON.stringify(frame.contentWindow.saveProject()));
  } else if (elementTab[0] == "Image") {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("assets").file(decodeText(elementTab[1]), dataURItoFile(frame.contentWindow.saveProject(), elementTab[1] + ".png"));
    var preview = document.getElementById(elementTab[1] + "_preview");
    preview.src = frame.contentWindow.saveProject();
  }
}

function fileListInFolder(path) {
  const folder = projZip.folder(path);
  const folderPath = path + "/";
  let fileNames = [];
  folder.forEach((relativePath, file) => {
    if (!file.dir) {
      fileNames.push(relativePath); // relativePath excludes "myfolder/"
    }
  });
  return fileNames;
}

function getTextureList() {
  return fileListInFolder("assets");
}

$("#newProjBtn").button();
$("#openProjBtn").button();
$("#closeAboutBtn").button();
document.getElementById("tabs").hidden = true;









// Patch all dialogs to stay fixed in viewport and draggable
function patchAllDialogsToViewport() {
    $(".ui-dialog-content").each(function () {
        const $content = $(this);
        const instance = $content.dialog("instance");
        if (!instance) return; // skip uninitialized dialogs

        const $dlg = $content.dialog("widget");

        // Make draggable once (compatible with Touch Punch)
        if (!$dlg.data("ui-draggable")) {
            $dlg.draggable({
                handle: ".ui-dialog-titlebar",
                scroll: false
            });
        }

        // Save original open function
        const originalOpen = $content.dialog("option", "open");

        // Center in viewport on open
        $content.dialog("option", "open", function (event, ui) {
            if (typeof originalOpen === "function") {
                originalOpen.call(this, event, ui);
            }

            function centerDialog() {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                $dlg.css({
                    position: "fixed",
                    top: Math.max((viewportHeight - $dlg.outerHeight()) / 2, 0),
                    left: Math.max((viewportWidth - $dlg.outerWidth()) / 2, 0)
                });
            }

            centerDialog();

            // Recenter on window resize
            $(window).off("resize.fixedDialog").on("resize.fixedDialog", centerDialog);
        });
    });
}

// Call after all dialogs are created
$(function () {
    patchAllDialogsToViewport();
});

var hasUnsavedChanges = true;
window.addEventListener('beforeunload', (event) => {
  if (hasUnsavedChanges) {
    // Cancel the event
    event.preventDefault();
    // Chrome requires returnValue to be set
    event.returnValue = ''; 
  }
});