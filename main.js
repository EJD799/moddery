const appVersion = "0.5.43";
const minEngineVersion = [1, 21, 90];
const formatVersion = "1.21.90";

var exportZip1;
var exportZip2;
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
var autosaveEnabled = true;

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("savingBox").style.display = "none";
  aboutText1.innerHTML = `Moddery v${appVersion}`;
  aboutText2.innerHTML = `Moddery v${appVersion}`;
  let currentUsername = getCookie("currentUsername");
  let currentPassword = getCookie("currentPassword");
  if (currentUsername) {
    accountNameText.innerHTML = `Signing in...`;
    $("#signInBtn").button("disable");
    finishSignIn(currentUsername, currentPassword);
  }
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

function updateTabHeight() {
  const tabBar = document.querySelector('#tabBar');
  const h = tabBar.offsetHeight + 'px';

  document.documentElement.style.setProperty('--tab-height', h);
}
window.addEventListener('resize', updateTabHeight);

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
  height: 600,
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
$("#exportDlgModeBox").selectmenu();
$("#exportDlgCancelBtn").button();
$("#exportDlgExportBtn").button();

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

$("#signInDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 400,
  width: 320,
  closeOnEscape: false
});
$("#signInDlg").dialog("close");
$("#signInDlgSignIn").button();
$("#signInDlgCancel").button();

let signInMode = "in";
let signedIn = false;
$("#signInDlgPasswordBox2").hide();
$("#signInDlgPasswordBox2Label").hide();

function openSignInDlg() {
  $("#signInDlg").dialog("open");
}
function closeSignInDlg() {
  $("#signInDlg").dialog("close");
}
async function signIn() {
  let username = signInDlgUsernameBox.value;
  let password = signInDlgPasswordBox.value;
  let password2 = signInDlgPasswordBox2.value;
  let userFile;
  accountNameText.innerHTML = `Signing in...`;
  $("#signInBtn").button("disable");
  if (signInMode == "in") {
    try {
      userFile = JSON.parse(await db.readFile(`accounts/${username}.json`));
      if (userFile.password == password) {
        finishSignIn(username, password);
      } else {
        alert("Incorrect password!");
        accountNameText.innerHTML = `Not signed in`;
        $("#signInBtn").button("enable");
      }
    } catch(err) {
      accountNameText.innerHTML = `Not signed in`;
      $("#signInBtn").button("enable");
      if (confirm("The username entered does not exist! Sign up instead?")) {
        switchSignInMode();
      }
    }
  } else {
    if (password == password2) {
      if (password.length >= 6) {
        userFile = {
          username: username,
          password: password
        };
        await db.writeFile(`accounts/${username}.json`, userFile);
        finishSignIn(username, password);
      } else {
        alert("The password must be at least 6 characters long!");
        accountNameText.innerHTML = `Not signed in`;
        $("#signInBtn").button("enable");
      }
    } else {
      alert("The passwords entered do not match!");
      accountNameText.innerHTML = `Not signed in`;
      $("#signInBtn").button("enable");
    }
  }
}
function finishSignIn(username, password) {
  closeSignInDlg();
  setTimeout(function(){
    signedIn = true;
    setCookie("currentUsername", username, 399);
    setCookie("currentPassword", password, 399);
    accountNameText.innerHTML = `Signed in as ${username}`;
    $("#signInBtn").button("enable");
    signInBtn.innerHTML = "Sign Out";
  }, 1000);
}
function switchSignInMode() {
  if (signInMode == "up") {
    signInMode = "in";
    signInDlgText1.innerHTML = "Sign in to Moddery!";
    signInDlgText2.innerHTML = "Don't have an account? ";
    signInDlgModeLink.innerHTML = "Sign Up";
    $("#signInDlgPasswordBox2").hide();
    $("#signInDlgPasswordBox2Label").hide();
    signInDlgSignIn.innerHTML = "Sign In";
  } else {
    signInMode = "up";
    signInDlgText1.innerHTML = "Sign up for Moddery!";
    signInDlgText2.innerHTML = "Already have an account? ";
    signInDlgModeLink.innerHTML = "Sign In";
    $("#signInDlgPasswordBox2").show();
    $("#signInDlgPasswordBox2Label").show();
    signInDlgSignIn.innerHTML = "Sign Up";
  }
}
function signOut() {
  signedIn = false;
  setCookie("currentUsername", "", 399);
  setCookie("currentPassword", "", 399);
  accountNameText.innerHTML = "Not signed in";
  signInBtn.innerHTML = "Sign In";
}

$("#optionsDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 800,
  closeOnEscape: false
});
$("#optionsDlg").dialog("close");
$("#clearCacheBtn").button();
$("#signInBtn").button();
$("#themeMenu").selectmenu();

function openOptionsDlg() {
  $("#optionsDlg").dialog("open");
}
function closeOptionsDlg() {
  $("#optionsDlg").dialog("close");
}
function clearCache() {
  const warningText = "All open tabs will be refreshed, deleting all unsaved work. Are you sure you want to continue?";
  if (confirm(warningText)) {
    try {
      const f = document.querySelector("iframe");
      f.src = f.src.split('?')[0] + '?force=' + Date.now();
      alert("Cache cleared successfully.");
    } catch(e) {
      alert("No cache found to clear. Please open the tab that needs to be refreshed first.");
    }
  }
}

$( function() {
  $( "#optionsTabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#optionsTabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
} );

function openNewProjDlg() {
  $("#newProjDlg").dialog("open");
}
function closeNewProjDlg() {
  $("#newProjDlg").dialog("close");
}

$("#selectPackIconDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectPackIconDlg").dialog("close");

function openSelectPackIconDlg() {
  $("#selectPackIconDlg").dialog("open");
  textures = getTextureList();
  let selectPackIconMenu = document.getElementById("selectPackIconMenu");
  selectPackIconMenu.innerHTML = "";
  for (let i = 0; i < textures.length; i++) {
    let selectPackIconMenuItem;
    let previewBox;
    let preview;
    let itemTitle;
    let itemRadio;
    selectPackIconMenuItem = document.createElement("div");
    selectPackIconMenuItem.setAttribute("class", "textureMenuItem");
    itemRadio = document.createElement("input");
    itemRadio.setAttribute("type", "radio");
    itemRadio.setAttribute("name", "selectedPackIcon");
    itemRadio.setAttribute("class", "textureRadio");
    itemRadio.setAttribute("value", textures[i]);
    selectPackIconMenuItem.appendChild(itemRadio);
    previewBox = document.createElement("div");
    previewBox.setAttribute("class", "smallPreviewBox");
    preview = document.createElement("img");
    window.parent.projZip.folder("assets").file(textures[i]).async("blob").then(async function (file) {
      preview.setAttribute("src", await fileToDataURL(file));
    });
    preview.setAttribute("id", encodeText(textures[i]) + "_preview");
    previewBox.appendChild(preview);
    selectPackIconMenuItem.appendChild(previewBox);
    itemTitle = document.createElement("span");
    itemTitle.setAttribute("class", "textureMenuTitle");
    itemTitle.innerHTML = textures[i];
    selectPackIconMenuItem.appendChild(itemTitle);
    selectPackIconMenu.appendChild(selectPackIconMenuItem);
    selectPackIconMenuItem.addEventListener("click", () => {
      const itemRadio = selectPackIconMenuItem.querySelector('input[type="radio"]');
      if (itemRadio) {
        itemRadio.checked = true;  // select this radio
      }
    });
  }
}

let selectedPackIcon = "";

function closeSelectPackIconDlg() {
  $("#selectPackIconDlg").dialog("close");
}
function selectPackIcon() {
    $("#selectPackIconDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedPackIcon"]:checked');
    if (selected.value) {
        const packIconNameText = document.getElementById("packIconText");
        packIconNameText.innerHTML = selected.value;
        selectedPackIcon = selected.value;
    }
}

$("#packIconBtn").button();
$("#selectPackIconCancelBtn").button();
$("#selectPackIconSelectBtn").button();

// Select Script Entry Point Dialog

$("#selectScriptEntryDlg").dialog({
  position: { my: "center", at: "center", of: window },
  resizable: false,
  height: 500,
  width: 500
});
$("#selectScriptEntryDlg").dialog("close");

async function openSelectScriptEntryDlg() {
  $("#selectScriptEntryDlg").dialog("open");
  scripts = await getScriptList();
  let selectScriptEntryMenu = document.getElementById("selectScriptEntryMenu");
  selectScriptEntryMenu.innerHTML = "";
  for (let i = 0; i < scripts.length; i++) {
    let selectScriptEntryMenuItem;
    let previewBox;
    let preview;
    let itemTitle;
    let itemRadio;
    selectScriptEntryMenuItem = document.createElement("div");
    selectScriptEntryMenuItem.setAttribute("class", "textureMenuItem");
    itemRadio = document.createElement("input");
    itemRadio.setAttribute("type", "radio");
    itemRadio.setAttribute("name", "selectedScriptEntry");
    itemRadio.setAttribute("class", "textureRadio");
    itemRadio.setAttribute("value", scripts[i]);
    selectScriptEntryMenuItem.appendChild(itemRadio);
    itemTitle = document.createElement("span");
    itemTitle.setAttribute("class", "textureMenuTitle");
    itemTitle.innerHTML = scripts[i];
    selectScriptEntryMenuItem.appendChild(itemTitle);
    selectScriptEntryMenu.appendChild(selectScriptEntryMenuItem);
    selectScriptEntryMenuItem.addEventListener("click", () => {
      const itemRadio = selectScriptEntryMenuItem.querySelector('input[type="radio"]');
      if (itemRadio) {
        itemRadio.checked = true;  // select this radio
      }
    });
  }
}

let selectedScriptEntry = "";

function closeSelectScriptEntryDlg() {
  $("#selectScriptEntryDlg").dialog("close");
}
function selectScriptEntry() {
    $("#selectScriptEntryDlg").dialog("close");
    const selected = document.querySelector('input[name="selectedScriptEntry"]:checked');
    if (selected.value) {
        const scriptEntryNameText = document.getElementById("scriptEntryText");
        scriptEntryNameText.innerHTML = selected.value;
        selectedScriptEntry = selected.value;
    }
}

$("#scriptEntryBtn").button();
$("#selectScriptEntryCancelBtn").button();
$("#selectScriptEntrySelectBtn").button();

function openEditProjDlg() {
  $("#editProjDlg").dialog("open");
  $("#editProjNameBox").val(projManifest.name);
  $("#editProjNamespaceBox").val(projManifest.namespace);
  $("#editProjVersionBox1").val(Number(projManifest.addon_version[0]));
  $("#editProjVersionBox2").val(Number(projManifest.addon_version[1]));
  $("#editProjVersionBox3").val(Number(projManifest.addon_version[2]));
  $("#editProjDescriptionBox").val(projManifest.description);
  $("#editProjMCVersionBox1").val(projManifest.mc_version[0]);
  $("#editProjMCVersionBox2").val(projManifest.mc_version[1]);
  $("#editProjMCVersionBox3").val(projManifest.mc_version[2]);
  if (projManifest.packIcon) {
      document.getElementById("packIconText").innerHTML = projManifest.packIcon;
  } else {
      document.getElementById("packIconText").innerHTML = "No icon selected";
  }
  if (projManifest.scriptEntry) {
      document.getElementById("scriptEntryText").innerHTML = projManifest.scriptEntry;
  } else {
      document.getElementById("scriptEntryText").innerHTML = "No script entry point selected";
  }
}
function closeEditProjDlg() {
  $("#editProjDlg").dialog("close");
}
function saveProjectInfo() {
  closeEditProjDlg();
  projManifest.name = $("#editProjNameBox").val();
  projManifest.namespace = $("#editProjNamespaceBox").val();
  projManifest.addon_version = [$("#editProjVersionBox1").val(), $("#editProjVersionBox2").val(), $("#editProjVersionBox3").val()];
  projManifest.mc_version = [$("#editProjMCVersionBox1").val(), $("#editProjMCVersionBox2").val(), $("#editProjMCVersionBox3").val()];
  projManifest.description = $("#editProjDescriptionBox").val();
  projManifest.packIcon = selectedPackIcon;
  projManifest.scriptEntry = selectedScriptEntry;
  projZip.file("manifest.json", JSON.stringify(projManifest));
  if (autosaveEnabled) {
    saveProject();
  } else {
    setNotSaved();
  }
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
    setNotSaved(true);
    $("#savingFlyout")
      .position({
        my: "right bottom",
        at: "right top",
        of: $("#savingBox")
      });
  }
}

function setNotSaved(nonAutosave) {
  document.getElementById("savingText").innerHTML = "<i class='fa-regular fa-file'></i> Not Saved";
  if (nonAutosave) {
    document.getElementById("savingFlyoutText").innerHTML = `Not saved. Click "Save Now" or "File>Save" to save your work.`;
  } else {
    document.getElementById("savingFlyoutText").innerHTML = `Not saved. Click "Save Now" or "File>Save" to save your work.<br>Autosave is disabled. Go to "Moddery>Options>General" to turn it on.`;
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

let autosaveBox = document.getElementById("autosaveBox");

if (getCookie("autosaveEnabled")) {
  autosaveEnabled = (getCookie("autosaveEnabled") == "true");
  autosaveBox.checked = (getCookie("autosaveEnabled") == "true");
} else {
  autosaveEnabled = true;
  autosaveBox.checked = true;
}

autosaveBox.addEventListener("change", function(e) {
  autosaveEnabled = autosaveBox.checked;
  setCookie("autosaveEnabled", autosaveEnabled.toString(), 399);
});

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
        selectedPackIcon = manifest.packIcon;
        selectedScriptEntry = manifest.scriptEntry;
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
          loaderText.innerHTML = `Opening Project... (${(loaderProgress.value / progressBarMax) * 100}%)`;
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

function waitForIframeLoad(iframe) {
  return new Promise(resolve => {
    iframe.onload = () => resolve();
  });
}
function waitForIframeReady(iframe, propName) {
  return new Promise(resolve => {
    const check = () => {
      if (iframe.contentWindow && iframe.contentWindow[propName]) {
        resolve();
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}


function parseCraftingGrid(grid) {
  // Normalize to 3x3 item-only array
  const items = grid.slice(0, 9).map(cell => cell?.[0] ?? "");

  // Convert to rows
  let rows = [
    items.slice(0, 3),
    items.slice(3, 6),
    items.slice(6, 9)
  ];

  // Trim empty rows
  while (rows.length && rows[0].every(v => !v)) rows.shift();
  while (rows.length && rows[rows.length - 1].every(v => !v)) rows.pop();

  // Trim empty columns
  let minCol = 0;
  let maxCol = rows[0].length - 1;

  while (rows.every(r => !r[minCol])) minCol++;
  while (rows.every(r => !r[maxCol])) maxCol--;

  rows = rows.map(r => r.slice(minCol, maxCol + 1));

  // Build pattern + key
  const key = {};
  const itemToChar = {};
  let charCode = "A".charCodeAt(0);

  const pattern = rows.map(row => {
    return row.map(item => {
      if (!item) return " ";

      if (!itemToChar[item]) {
        const char = String.fromCharCode(charCode++);
        itemToChar[item] = char;
        key[char] = item;
      }
      return itemToChar[item];
    }).join("");
  });

  return [pattern, key];
}

function parseItemComponents(file) {
  let components = file.components;
  let keys = Object.keys(components);
  let newObj = {};
  newObj["minecraft:max_stack_size"] = file.maxStackSize;
  if (keys.includes("Allow Off Hand")) {
    let component = components["Allow Off Hand"];
    newObj["minecraft:allow_off_hand"] = component.main;
  }
  if (keys.includes("Block Placer")) {
    let component = components["Block Placer"];
    newObj["minecraft:block_placer"] = {
      "block": component.block,
      "replace_block_item": component.replace_block_item,
      "use_on": component.use_on.split(",")
    };
  }
  if (keys.includes("Bundle Interaction")) {
    let component = components["Bundle Interaction"];
    newObj["minecraft:bundle_interaction"] = {
      "num_viewable_slots": component.num_viewable_slots
    };
  }
  if (keys.includes("Can Destroy in Creative")) {
    let component = components["Can Destroy in Creative"];
    newObj["minecraft:can_destroy_in_creative"] = component.main;
  }
  if (keys.includes("Compostable")) {
    let component = components["Compostable"];
    newObj["minecraft:compostable"] = {
      "composting_chance": component.composting_chance
    };
  }
  if (keys.includes("Cooldown")) {
    let component = components["Cooldown"];
    newObj["minecraft:cooldown"] = {
      "category": `${projManifest.namespace}:cooldown_${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
      "duration": component.duration,
      "type": "use"
    };
  }
  if (keys.includes("Damage")) {
    let component = components["Damage"];
    newObj["minecraft:damage"] = component.main;
  }
  if (keys.includes("Digger")) {
    let component = components["Digger"];
    newObj["minecraft:digger"] = {
      "use_efficiency": true,
      "destroy_speeds": [
        {
          "block": {
            "tags": component.block
          },
          "speed": component.speed
        }
      ]
    };
  }
  if (keys.includes("Durability")) {
    let component = components["Durability"];
    newObj["minecraft:durability"] = {
      "max_durability": component.max_durability,
      "damage_chance": {
        "min": component.damage_chance,
        "max": component.damage_chance
      }
    };
  }
  if (keys.includes("Dyeable")) {
    let component = components["Dyeable"];
    newObj["minecraft:dyeable"] = {
      "default_color": component.default_color
    };
  }
  if (keys.includes("Enchantable")) {
    let component = components["Enchantable"];
    newObj["minecraft:enchantable"] = {
      "slot": component.slot,
      "value": component.value
    };
  }
  if (keys.includes("Entity Placer")) {
    let component = components["Entity Placer"];
    newObj["minecraft:entity_placer"] = {
      "entity": component.entity,
      "use_on": [],
      "dispense_on": []
    };
  }
  if (keys.includes("Fire Resistant")) {
    let component = components["Fire Resistant"];
    newObj["minecraft:fire_resistant"] = {
      "value": component.main
    };
  }
  if (keys.includes("Food")) {
    let component = components["Food"];
    newObj["minecraft:food"] = {
      "can_always_eat": component.can_always_eat,
      "nutrition": component.nutrition,
      "saturation_modifier": component.saturation_modifier,
    };
    if (component.using_converts_to) {
      newObj["minecraft:food"].using_converts_to = component.using_converts_to;
    }
  }
  if (keys.includes("Fuel")) {
    let component = components["Fuel"];
    newObj["minecraft:fuel"] = {
      "duration": component.duration
    };
  }
  if (keys.includes("Glint")) {
    let component = components["Glint"];
    newObj["minecraft:glint"] = component.main;
  }
  if (keys.includes("Hand Equipped")) {
    let component = components["Hand Equipped"];
    newObj["minecraft:hand_equipped"] = component.main;
  }
  if (keys.includes("Hover Text Color")) {
    let component = components["Hover Text Color"];
    newObj["minecraft:hover_text_color"] = component.main;
  }
  if (keys.includes("Interact Button")) {
    let component = components["Interact Button"];
    newObj["minecraft:interact_button"] = component.main;
  }
  // Kinetic Weapon
  if (keys.includes("Liquid Clipped")) {
    let component = components["Liquid Clipped"];
    newObj["minecraft:liquid_clipped"] = component.main;
  }
  // Piercing Weapon
  if (keys.includes("Projectile")) {
    let component = components["Projectile"];
    newObj["minecraft:projectile"] = {
      "minimum_critical_power": component.minimum_critical_power,
      "projectile_entity": component.projectile_entity
    };
  }
  if (keys.includes("Rarity")) {
    let component = components["Rarity"];
    newObj["minecraft:rarity"] = component.main;
  }
  if (keys.includes("Record")) {
    let component = components["Record"];
    newObj["minecraft:record"] = {
      "comparator_signal": component.comparator_signal,
      "duration": component.duration,
      "sound_event": component.sound_event
    };
  }
  if (keys.includes("Repairable")) {
    let component = components["Repairable"];
    newObj["minecraft:repairable"] = {
      "repair_items": [
        {
          "items": [
            component.items.split(",")
          ],
          "repair_amount": component.repair_amount
        }
      ]
    };
  }
  if (keys.includes("Shooter")) {
    let component = components["Shooter"];
    newObj["minecraft:shooter"] = {
      "ammunition": [
        {
          "item": component.item,
          "use_offhand": true,
          "search_inventory": true,
          "use_in_creative": true
        }
      ],
      "max_draw_duration": component.max_draw_duration,
      "scale_power_by_draw_duration": component.scale_power_by_draw_duration,
      "charge_on_draw": component.charge_on_draw
    };
  }
  if (keys.includes("Should Despawn")) {
    let component = components["Should Despawn"];
    newObj["minecraft:should_despawn"] = component.main;
  }
  if (keys.includes("Storage Item")) {
    let component = components["Storage Item"];
    newObj["minecraft:storage_item"] = {
      "max_slots": component.max_slots,
      "allow_nested_storage_items": component.allow_nested_storage_items,
    };
    if (component.allowed_items) {
      newObj["minecraft:storage_item"].allowed_items = component.allowed_items.split(",");
    }
    if (component.banned_items) {
      newObj["minecraft:storage_item"].banned_items = component.banned_items.split(",");
    }
  }
  if (keys.includes("Swing Duration")) {
    let component = components["Swing Duration"];
    newObj["minecraft:swing_duration"] = {
      "value": component.value
    };
  }
  if (keys.includes("Tags")) {
    let component = components["Tags"];
    newObj["minecraft:tags"] = {
      "tags": component.tags.split(",")
    };
  }
  if (keys.includes("Throwable")) {
    let component = components["Throwable"];
    newObj["minecraft:throwable"] = {
      "do_swing_animation": component.do_swing_animation,
      "launch_power_scale": component.launch_power_scale,
      "max_launch_power": component.max_launch_power,
      "scale_power_by_draw_duration": false,
      "min_draw_duration": -1,
      "max_draw_duration": -1
    };
  }
  if (keys.includes("Use Animation")) {
    let component = components["Use Animation"];
    newObj["minecraft:use_animation"] = component.main;
  }
  if (keys.includes("Use Modifiers")) {
    let component = components["Use Modifiers"];
    newObj["minecraft:use_modifiers"] = {
      "emit_vibrations": component.emit_vibrations,
      "movement_modifer": component.movement_modifer,
      "use_duration": component.use_duration
    };
  }
  if (keys.includes("Wearable")) {
    let component = components["Wearable"];
    newObj["minecraft:wearable"] = {
      "slot": component.slot,
      "protection": component.protection,
      "hides_player_location": component.hides_player_location
    };
  }
  return newObj;
}


function logExporter(text, type = "info") {
  let textElement = document.createElement("span");
  if (type == "info") {
    console.log("[Exporter] " + text);
    textElement.innerHTML = text;
    textElement.setAttribute("class", "logTextInfo");
  } else if (type == "warn") {
    console.warn("[Exporter] " + text);
    textElement.innerHTML = text;
    textElement.setAttribute("class", "logTextWarn");
  } else if (type == "error") {
    console.error("[Exporter] " + text);
    textElement.innerHTML = text;
    textElement.setAttribute("class", "logTextError");
  }
  exportLog.appendChild(textElement);
  exportLog.appendChild(document.createElement("br"));
}


function openExportDlg() {
  $("#exportDlg").dialog("open");
}
function closeExportDlg() {
  $("#exportDlg").dialog("close");
}
async function exportProj() {
  openLoader();
  loaderText.innerHTML = "Exporting Project...";
  loaderProgress.setAttribute("max", "0"),
  loaderProgress.value = "0";
  exportLog.innerHTML = "";
  exportZip1 = new JSZip();
  exportZip2 = new JSZip();
  let packIcon = await projZip.folder("assets").file(projManifest.packIcon).async("blob");
  exportZip1.file("pack_icon.png", packIcon);
  exportZip2.file("pack_icon.png", packIcon);
  let bpManifest = {
    "format_version": 2,
    "header": {
      "name": projManifest.name,
      "description": projManifest.description,
      "uuid": projManifest.bp_uuid,
      "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])],
      "min_engine_version": minEngineVersion
    },
    "modules": [
      {
        "type": "data",
        "uuid": "5e60ecee-8628-4df7-a9cb-960baeae2c41",
        "version": [1, 0, 0]
      }
    ],
    "metadata": {
      "product_type": "addon"
    },
    "dependencies": [
      {
        "uuid": projManifest.rp_uuid,
        "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])]
      },
      {
        "module_name": "@minecraft/server",
        "version": "1.10.0"
      },
      {
        "module_name": "@minecraft/server-ui",
        "version": "1.2.0"
      }
    ]
  }
  if (projManifest?.scriptEntry ?? false) {
    let scriptInfoFile = JSON.parse(await projZip.folder("elements").file(`${projManifest.scriptEntry}.json`).async("string"));
    bpManifest.modules.push({
      "type": "script",
      "language": "javascript",
      "entry": scriptInfoFile?.id ?? "",
      "uuid": "53a5804b-fb35-4f7d-a89e-e4a925fadb77",
      "version": [1, 0, 0]
    });
    exportZip1.folder("scripts").file("modderyLibs.js", (await (await fetch("https://ejd799.github.io/moddery/export_utils/bedrock/modderyLibs.js")).text()))
  }
  exportZip1.file("manifest.json", JSON.stringify(bpManifest, null, 4));
  let rpManifest = {
    "format_version": 2,
    "header": {
      "name": projManifest.name,
      "description": projManifest.description,
      "uuid": projManifest.rp_uuid,
      "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])],
      "min_engine_version": minEngineVersion
    },
    "modules": [
      {
        "type": "resources",
        "uuid": "5a5510c5-5965-48af-a3b6-44cbaa434af5",
        "version": [1, 0, 0]
      }
    ],
    "metadata": {
      "product_type": "addon"
    },
    "dependencies": [
      {
        "uuid": projManifest.bp_uuid,
        "version": [Number(projManifest.addon_version[0]), Number(projManifest.addon_version[1]), Number(projManifest.addon_version[2])]
      }
    ]
  };
  exportZip2.file("manifest.json", JSON.stringify(rpManifest, null, 4));
  let elementsList = fileListInFolder("elements").filter(item => !item.endsWith(".code.json"));
  let assetsList = fileListInFolder("assets");
  loaderText.innerHTML = "Exporting Project... (0%)";
  let progressBarMax = elementsList.length + 1;
  loaderProgress.setAttribute("max", progressBarMax),
  loaderProgress.value = "0";
  let itemTextureFile = {
    "resource_pack_name": projManifest.namespace,
    "texture_name": "atlas.items",
    "texture_data": {}
  };
  let terrainTextureFile = {};
  let languageFile = "";
  for (let i = 0; i < elementsList.length; i++) {
    try {
      logExporter("Exporting element: " + elementsList[i], "info");
      let elementFile = JSON.parse(await projZip.folder("elements").file(elementsList[i]).async("string"));
      let namespacedID = `${projManifest.namespace}:${elementFile.id}`;
      let role = elementFile.type;
      let exportedFile1;
      let exportedFile2;
      if (role == "Function") {
        exporterFrame.src = "https://ejd799.github.io/moddery/editor/bedrock/function.html";
        let elementCode = JSON.parse(await projZip.folder("elements").file(elementsList[i].replace(".json", ".code.json")).async("string"));
        await waitForIframeLoad(exporterFrame);
        await waitForIframeReady(exporterFrame, "loadProject");
        exporterFrame.contentWindow.loadProject(elementCode);
        if (exporterFrame.contentWindow?.generateCode) {
          exportedFile1 = exporterFrame.contentWindow.generateCode();
        } else {
          exportedFile1 = "";
        }
        exportZip1.folder("functions").folder(projManifest.namespace).file(`${elementFile.id}.mcfunction`, exportedFile1);
      } else if (role == "Script") {
        exporterFrame.src = "https://ejd799.github.io/moddery/editor/bedrock/script.html";
        let elementCode = JSON.parse(await projZip.folder("elements").file(elementsList[i].replace(".json", ".code.json")).async("string"));
        await waitForIframeLoad(exporterFrame);
        await waitForIframeReady(exporterFrame, "loadProject");
        exporterFrame.contentWindow.loadProject(elementCode);
        if (exporterFrame.contentWindow?.generateCode) {
          exportedFile1 = exporterFrame.contentWindow.generateCode();
        } else {
          exportedFile1 = "";
        }
        exportZip1.folder("scripts").file(`${elementFile.id}.js`, exportedFile1);
      } else if (role == "Item") {
        let itemComponents = parseItemComponents(elementFile);
        let textureID = `${projManifest.namespace}:${elementFile.texture.replace(".png", "")}`;
        itemComponents["icon"] = textureID;
        if (!Object.keys(itemTextureFile.texture_data).includes(textureID)) {
          itemTextureFile.texture_data[textureID] = {
            "textures": `textures/items/${elementFile.texture.replace(".png", "")}`
          };
        }
        if (!fileListInFolder("textures/items", false, exportZip2).includes(elementFile.texture)) {
          let texture = await projZip.folder("assets").file(elementFile.texture).async("blob");
          exportZip2.folder("textures").folder("items").file(elementFile.texture, texture);
        }
        languageFile += `item.${namespacedID}.name=${elementFile.displayName}`
        let exportObj = {
          "format_version": formatVersion,
          "minecraft:item": {
            "description": {
              "identifier": namespacedID,
              "menu_category": {
                "category": elementFile.invCategory
              }
            },
            "components": itemComponents
          }
        };
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("items").file(`${elementFile.id}.json`, exportedFile1);
      } else if (role == "Block") {

      } else if (role == "Structure") {
        let exportObj1 = {
          "format_version": formatVersion,
          "minecraft:structure_template_feature": {
            "description": {
              "identifier": `${namespacedID}_feature`
            },
            "structure_name": namespacedID,
            "adjustment_radius": 4,
            "facing_direction": elementFile.facingDirection
          }
        };
        if (elementFile.structureType == "Surface") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "grounded": {},
            "unburied": {},
            "block_intersection": {
              "block_allowlist": [
                "minecraft:air" //The structure can only replace air
              ]
            }
          };
        } else if (elementFile.structureType == "Underground") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:air", //Makes the feature only replace air and stone
                "minecraft:stone"
              ]
            }
          };
        } else if (elementFile.structureType == "Floating") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:air" //Makes the structure only replace air
              ]
            }
          };
        } else if (elementFile.structureType == "Underwater") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:water" //Makes the structure only replace water
              ]
            }
          };
        } else if (elementFile.structureType == "Water Surface") {
          exportObj1["minecraft:structure_template_feature"]["constraints"] = {
            "block_intersection": {
              "block_allowlist": [
                "minecraft:water", //Makes the structure only replace air and water
                "minecraft:air"
              ]
            }
          };
        }

        let exportObj2 = {
          "format_version": formatVersion,
          "minecraft:feature_rules": {
            "description": {
              "identifier": `${namespacedID}_feature`,
              "places_feature": `${namespacedID}_feature`
            }
          }
        };
        if (elementFile.structureType == "Surface") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "overworld"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": "q.heightmap(v.worldx, v.worldz)", //Generates the feature on the highest block on the column
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        } else if (elementFile.structureType == "Underground") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "overworld"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": {
              "extent": [
                11,
                50 //Makes the structure generate between y11 and y50
              ],
              "distribution": "uniform"
            },
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": 1,
              "denominator": 15
            }
          };
        } else if (elementFile.structureType == "Floating") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "overworld"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": {
              "extent": [
                100, //Makes the structure generate from y100 to y200
                200
              ],
              "distribution": "uniform"
            },
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        } else if (elementFile.structureType == "Underwater") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "ocean"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": "q.above_top_solid(v.worldx, v.worldz)", //Places the feature on top of the highest solid block on the column, so it won't place it on the surface of the water
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        } else if (elementFile.structureType == "Water Surface") {
          exportObj2["minecraft:feature_rules"]["conditions"] = {
            "placement_pass": "first_pass",
            "minecraft:biome_filter": {
              "test": "has_biome_tag",
              "operator": "==",
              "value": "ocean"
            }
          };
          exportObj2["minecraft:feature_rules"]["distribution"] = {
            "iterations": 1,
            "x": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "y": 62, //Makes the feature generate only on y62, which is Minecraft water level
            "z": {
              "extent": [0, 16],
              "distribution": "uniform"
            },
            "scatter_chance": {
              "numerator": elementFile.spawnChance[0],
              "denominator": elementFile.spawnChance[1]
            }
          };
        }
        exportZip1.folder("features").file(`${elementFile.id}_feature.json`, JSON.stringify(exportObj1, null, 4));
        exportZip1.folder("feature_rules").file(`${elementFile.id}_feature_rule.json`, JSON.stringify(exportObj2, null, 4));
        let structureFile = await projZip.folder("assets").file(elementFile.structure).async("blob");
        exportZip1.folder("structures").file(`${elementFile.id}.mcstructure`, structureFile);
      } else if (role == "Recipe") {
        let craftingGrid = elementFile.craftingGrid;
        let exportObj = {
          "format_version": formatVersion
        };
        let parsedGrid;
        if (elementFile.recipeType == "crafting") {
          parsedGrid = parseCraftingGrid(craftingGrid, "crafting");
          exportObj["minecraft:recipe_shaped"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["crafting_table"],
            "pattern": parsedGrid[0],
            "key": parsedGrid[1],
            "result": [
              {
                "item": craftingGrid[9][0],
                "count": Number(elementFile.outputQuantity)
              }
            ]
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else if (elementFile.recipeType == "crafting_shapeless") {
          exportObj["minecraft:recipe_shapeless"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["crafting_table"],
            "ingredients": craftingGrid.slice(0, -1).map(v => v[0]).filter(Boolean),
            "result": [
              {
                "item": craftingGrid[9][0],
                "count": Number(elementFile.outputQuantity)
              }
            ]
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else if (elementFile.recipeType == "stonecutter") {
          exportObj["minecraft:recipe_stonecutter"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["stonecutter"],
            "input": craftingGrid[5][0],
            "output": {
              "item": craftingGrid[9][0],
              "count": Number(elementFile.outputQuantity)
            }
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else if (elementFile.recipeType == "brewing") {
          exportObj["minecraft:recipe_brewing_mix"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["brewing_stand"],
            "input": craftingGrid[5][0],
            "reagent": craftingGrid[4][0],
            "output": craftingGrid[9][0]
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        } else {
          exportObj["minecraft:recipe_furnace"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": [elementFile.recipeType],
            "input": craftingGrid[5][0],
            "output": {
              "item": craftingGrid[9][0],
              "count": Number(elementFile.outputQuantity)
            }
          };
          exportedFile1 = JSON.stringify(exportObj, null, 4);
          exportZip1.folder("recipes").file(`${elementFile.id}.json`, exportedFile1);
        }
      } else if (role == "Entity") {

      } else if (role == "Loot Table") {
        let exportObj = {
          "pools": [
            {
              "rolls": {
                "min": Number(elementFile.rollCount[0]),
                "max": Number(elementFile.rollCount[1])
              },
              "entries": []
            }
          ]
        };
        let itemList = elementFile.items;
        for (let i = 0; i < itemList.length; i++) {
          exportObj.pools[0].entries.push({
            "type": "item",
            "name": itemList[i][0],
            "weight": itemList[i][1]
          });
        }
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("loot_tables").file(`${elementFile.id}.json`, exportedFile1);
      } else if (role == "Trade Table") {
        let exportObj = {
          "tiers": []
        };
        let tierList = elementFile.tiers
        let itemList = elementFile.items;
        for (let i = 0; i < tierList.length; i++) {
          filteredItemList = itemList.filter(entry => entry.tier == elementFile.tiers[i][0]);
          exportObj.tiers.push({
            "total_exp_required": elementFile.tiers[i][1],
            "trades": []
          });
          for (let j = 0; j < filteredItemList.length; j++) {
            let wantsObj = [
              {
                "item": filteredItemList[j].item1[0],
                "quantity": {
                  "min": filteredItemList[j].item1[1],
                  "max": filteredItemList[j].item1[2]
                }
              }
            ];
            if (filteredItemList[j].item1[0] != "") {
              wantsObj.push({
                "item": filteredItemList[j].item2[0],
                "quantity": {
                  "min": filteredItemList[j].item2[1],
                  "max": filteredItemList[j].item2[2]
                }
              });
            }
            let givesObj = [
              {
                "item": filteredItemList[j].item3[0],
                "quantity": {
                  "min": filteredItemList[j].item3[1],
                  "max": filteredItemList[j].item3[2]
                }
              }
            ];
            exportObj.tiers[i].trades.push({
              "wants": wantsObj,
              "gives": givesObj,
              "max_uses": -1,
              "reward_exp": true,
              "trader_exp": 1
            });
          }
        }
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("trading").file(`${elementFile.id}.json`, exportedFile1);
      }
    } catch(err) {
      logExporter(err, "error");
    }
    loaderText.innerHTML = `Exporting Project... (${Math.round((loaderProgress.value / progressBarMax) * 100)}%)`;
    loaderProgress.value = (i + 1).toString();
  }
  exportZip2.folder("textures").file("item_texture.json", JSON.stringify(itemTextureFile, null, 4));
  exportZip2.folder("textures").file("terrain_texture.json", JSON.stringify(terrainTextureFile, null, 4));
  exportZip2.folder("texts").file("en_US.lang", languageFile);
  exportZip2.folder("texts").file("languages.json", JSON.stringify(["en_US"]));
  if (exportDlgModeBox.value === "1mcaddon" || exportDlgModeBox.value === "1zip") {
    // One file containing both BP and RP

    const exportZipFinal = new JSZip();

    const bpFolder = exportZipFinal.folder(`${projManifest.name}_BP`);
    const rpFolder = exportZipFinal.folder(`${projManifest.name}_RP`);

    await copyZipIntoFolder(exportZip1, bpFolder);
    await copyZipIntoFolder(exportZip2, rpFolder);

    const ext = exportDlgModeBox.value === "1mcaddon" ? "mcaddon" : "zip";
    await downloadZip(exportZipFinal, `${projManifest.name}.${ext}`);

  } else if (exportDlgModeBox.value === "2mcpack" || exportDlgModeBox.value === "2zip") {
    // Two separate files (BP + RP)

    const ext = exportDlgModeBox.value === "2mcpack" ? "mcpack" : "zip";

    await downloadZip(
      exportZip1,
      `${projManifest.name}_BP.${ext}`
    );

    await downloadZip(
      exportZip2,
      `${projManifest.name}_RP.${ext}`
    );

  }

  loaderText.innerHTML = `Exporting Project... (100%)`;
  loaderProgress.value = progressBarMax;
  closeLoader();
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
    $(`#${elementID}_assetMenu`).hide();
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
    $(`#${elementID}_elementMenu`).hide();
    $(document).on('click', function (e) {
      if (!$(e.target).closest($(`#${elementID}_elementMenu`)).length && !$(e.target).is($(`#${elementID}_optionBtn`))) {
          $(`#${elementID}_elementMenu`).hide();
      }
    });
  }
}

function removeElementDropdown(elementID, type) {
  if (type == "element") {
    $(`#${elementID}_elementMenu`).remove();
  } else {
    $(`#${encodeText(elementID)}_assetMenu`).remove();
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
    <button onclick="editElement('${$("#addElementNameBox").val()}')" id="${$("#addElementNameBox").val()}_editBtn"><i class="fas fa-pencil"></i> Edit</button>
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
    if (autosaveEnabled) {
      saveProject();
    } else {
      setNotSaved();
    }
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
      previewBox = document.createElement("div");
      previewBox.setAttribute("class", "previewBox");
      preview = document.createElement("img");
      if (fileType == "png") {
        preview.setAttribute("src", await fileToDataURL(file));
      } else if (fileType == "mcstructure") {
        preview.setAttribute("src", "/moddery/custom_textures/structure.png");
      } else if (fileType == "wav") {
        preview.setAttribute("src", "/moddery/custom_textures/audio.png");
      } else {
        preview.setAttribute("src", "/moddery/custom_textures/file.png");
      }
      preview.setAttribute("id", fileNameEncoded + "_preview");
      previewBox.appendChild(preview);
      center.appendChild(previewBox);
      center.appendChild(document.createElement("br"));
      if (fileType == "png") {
        editBtn = document.createElement("button");
        editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}', 'png')`);
        editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
        editBtn.innerHTML = `<i class="fas fa-pencil"></i> Edit`;
      }
      if (fileType == "wav") {
        editBtn = document.createElement("button");
        editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}', 'wav')`);
        editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
        editBtn.innerHTML = `<i class="fas fa-pencil"></i> Edit`;
      }
      optionsBtn = document.createElement("button");
      optionsBtn.setAttribute("id", `${fileNameEncoded}_assetOptionBtn`);
      optionsBtn.innerHTML = "&#x22EF;";
      if (fileType == "png" || fileType == "wav") {
        center.appendChild(editBtn);
      }
      center.appendChild(optionsBtn);
      assetBox.appendChild(center);
      parentDiv.appendChild(assetBox);
      if (fileType == "png" || fileType == "wav") {
        $(`#${fileNameEncoded}_assetEditBtn`).button();
      }
      $(`#${fileNameEncoded}_assetOptionBtn`).button();
      createElementDropdown(fileNameEncoded, "asset");
    }
  }
  closeAddAssetDlg();
  addAssetUploadInput.value = "";
  addAssetNameBox.value = "";
  if (projFileHandle) {
    if (autosaveEnabled) {
      saveProject();
    } else {
      setNotSaved();
    }
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
  document.getElementById("savingFlyoutText").innerHTML = `Saving...`;
  $("#savingFlyout")
    .position({
      my: "right bottom",
      at: "right top",
      of: $("#savingBox")
    });
  $("#savingFlyoutButton").hide();

  // If no file is opened, fall back to Save As
  if (!projFileHandle) {
    return await saveProjectAs();
  }

  const blob = await projZip.generateAsync({ type: "blob" });

  // Ensure we have write permission
  const perm = await projFileHandle.requestPermission({ mode: "readwrite" });
  if (perm !== "granted") {
    // If permission denied, fallback to Save As as well
    document.getElementById("savingText").innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Not Saving";
    document.getElementById("savingFlyoutText").innerHTML = `Project not saving. Check your browser permissions and try again.`;
    $("#savingFlyout")
      .position({
        my: "right bottom",
        at: "right top",
        of: $("#savingBox")
      });
  }

  const writable = await projFileHandle.createWritable();
  await writable.write(blob);
  await writable.close();

  console.log("Project saved!");
  document.getElementById("savingText").innerHTML = "<i class='fa-solid fa-circle-check'></i> Saved";
  document.getElementById("savingFlyoutText").innerHTML = `Last saved on ${getFormattedDateTime()}`;
  $("#savingFlyout")
    .position({
      my: "right bottom",
      at: "right top",
      of: $("#savingBox")
    });
  $("#savingFlyoutButton").show();
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
$('#savingFlyoutButton').button();

function getTabContent(role, elementID) {
  if (role == "Function") {
    return '<iframe src="editor/bedrock/function.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Script") {
    return '<iframe src="editor/bedrock/script.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Item") {
    return '<iframe src="editor/bedrock/item.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Block") {
    return '<iframe src="editor/bedrock/block.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Biome") {
    return '<iframe src="editor/bedrock/biome.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Structure") {
    return '<iframe src="editor/bedrock/structure.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Recipe") {
    return '<iframe src="editor/bedrock/recipe.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Entity") {
    return '<iframe src="editor/bedrock/entity.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Loot Table") {
    return '<iframe src="editor/bedrock/loot_table.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Trade Table") {
    return '<iframe src="editor/bedrock/trade_table.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Image") {
    return '<iframe src="editor/image.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Audio") {
    return '<iframe src="editor/audio.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
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
function editAsset(assetID, type) {
  if (type == "png") {
    projZip.folder("assets").file(decodeText(assetID)).async("string").then(function (data) {
      if (!arrayContains(Object.values(openElements), ["Image", assetID])) {
        addTab("Image", assetID);
      }
    });
  } else if (type == "wav") {
    addTab("Audio", assetID);
  }
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
    } else if (elementID.endsWith("mcstructure")) {
      elementType = "Structure";
    } else if (elementID.endsWith("wav")) {
      elementType = "Audio";
    } else if (elementID.endsWith("json")) {
      elementType = "JSON";
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
  removeElementDropdown(deleteElementID, "element");
  document.getElementById("elementbox" + encodeText(deleteElementID)).remove();
  if (autosaveEnabled) {
    saveProject();
  } else {
    setNotSaved();
  }
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
    elementBox.id = "elementbox" + renameDlgBox.value;
    elementBox.innerHTML = `
      <h3 id="elementboxname${renameDlgBox.value}">${renameDlgBox.value}</h3>
      <button onclick="editElement('${renameDlgBox.value}')" id="${renameDlgBox.value}_editBtn"><i class="fas fa-pencil"></i> Edit</button>
      <button id="${renameDlgBox.value}_optionBtn">&#x22EF;</button>
      `;
    $(`#${renameDlgBox.value}_editBtn`).button();
    $(`#${renameDlgBox.value}_optionBtn`).button();
    removeElementDropdown(renameElementID, "element");
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
    var fileType = afterLastDot(fileName);
    projZip.folder("assets").file(decodeText(fileName)).async("blob").then(async function (data) {
      var file = data;
      var center = document.createElement("center");
      assetBox.setAttribute("class", "elementbox");
      assetBox.setAttribute("id", "elementbox" + fileNameEncoded);
      assetBox.innerHTML = "";
      center.innerHTML = `<h3 id="${"elementboxname" + fileNameEncoded}">${fileName}</h3>`;
      previewBox = document.createElement("div");
      previewBox.setAttribute("class", "previewBox");
      preview = document.createElement("img");
      if (fileType == "png") {
        preview.setAttribute("src", await fileToDataURL(file));
      } else if (fileType == "mcstructure") {
        preview.setAttribute("src", "/moddery/custom_textures/structure.png");
      } else if (fileType == "wav") {
        preview.setAttribute("src", "/moddery/custom_textures/audio.png");
      } else {
        preview.setAttribute("src", "/moddery/custom_textures/file.png");
      }
      preview.setAttribute("id", fileNameEncoded + "_preview");
      previewBox.appendChild(preview);
      center.appendChild(previewBox);
      center.appendChild(document.createElement("br"));
      if (fileType == "png") {
        editBtn = document.createElement("button");
        editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}', 'png')`);
        editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
        editBtn.innerHTML = `<i class="fas fa-pencil"></i> Edit`;
      }
      if (fileType == "wav") {
        editBtn = document.createElement("button");
        editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}', 'wav')`);
        editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
        editBtn.innerHTML = `<i class="fas fa-pencil"></i> Edit`;
      }
      optionsBtn = document.createElement("button");
      optionsBtn.setAttribute("id", `${fileNameEncoded}_assetOptionBtn`);
      optionsBtn.innerHTML = "&#x22EF;";
      if (fileType == "png" || fileType == "wav") {
        center.appendChild(editBtn);
      }
      center.appendChild(optionsBtn);
      assetBox.appendChild(center);
      if (fileType == "png" || fileType == "wav") {
        $(`#${fileNameEncoded}_assetEditBtn`).button();
      }
      $(`#${fileNameEncoded}_assetOptionBtn`).button();
      removeElementDropdown(renameElementID, "asset");
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
  if (autosaveEnabled) {
    saveProject();
  } else {
    setNotSaved();
  }
}

function getCustomItems(mode) {
  let elementsList = fileListInFolder("elements");
  let itemsList = [];
  for (let i = 0; i < elementsList.length; i++) {
    projZip.folder("elements").file(elementsList[i]).async("string").then(async function (data) {
      let elementObj = JSON.parse(data);
      if ((elementObj.type == "Item" && mode != "Block") || (elementObj.type == "Block" && mode != "Item")) {
        elementObj.id = `${projManifest.namespace}:${elementObj.id}`;
        itemsList.push(elementObj);
      }
    });
  }
  return itemsList;
}
async function getFilteredElements(type) {
  let elementsList = fileListInFolder("elements");
  let itemsList = [];
  for (let i = 0; i < elementsList.length; i++) {
    let data = await projZip.folder("elements").file(elementsList[i]).async("string");
    let elementObj = JSON.parse(data);
    if (elementObj.type == type) {
      itemsList.push(elementObj);
    }
  }
  return itemsList;
}

function getElementTabIcon(type) {
  if (type == "Image") {
    return `<i class="fas fa-image"></i>`;
  } else if (type == "Audio") {
    return `<i class="fas fa-volume-high"></i>`;
  } else if (type == "Block") {
    return `<i class="fas fa-cube"></i>`;
  } else if (type == "Item") {
    return `<i class="fa-regular fa-gem"></i>`;
  } else if (type == "Entity") {
    return `<i class="fas fa-paw"></i>`;
  } else if (type == "Recipe") {
    return `<i class="fas fa-table-cells"></i>`;
  } else if (type == "Function") {
    return `<i class="fas fa-terminal"></i>`;
  } else if (type == "Script") {
    return `<i class="fas fa-code"></i>`;
  } else if (type == "Loot Table") {
    return `<i class="fas fa-coins"></i>`;
  } else if (type == "Trade Table") {
    return `<i class="fas fa-right-left"></i>`;
  } else if (type == "Structure") {
    return `<i class="fas fa-cubes"></i>`;
  } else {
    return `<i class="fa-regular fa-file"></i>`;
  }
}

function addTab(role, elementID) {
  var label = `${getElementTabIcon(role)} ${decodeText(elementID)}`,
    id = "tabs-" + tabCounter,
    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
    tabContentHtml = getTabContent(role, elementID);

  li.addClass("has-close");
 
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
    } else if ((role == "Item") || (role == "Recipe") || (role == "Entity") || (role == "Biome") || (role == "Structure") || (role == "Block") || (role == "Loot Table") || (role == "Trade Table")) {
      projZip.folder("elements").file(elementID + ".json").async("string").then(function (data) {
        frame.contentWindow.loadProject(JSON.parse(data));
      });
    } else if ((role == "Image") || (role == "Audio")) {
      projZip.folder("assets").file(decodeText(elementID)).async("blob").then(async function (data) {
        frame.contentWindow.loadProject(await fileToDataURL(data));
      });
    }
  };
  updateTabHeight();
}

tabs.on( "click", "span.ui-icon-close", function() {
  var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  saveElement(openElements[panelId]);
  delete openElements[panelId];
  $( "#" + panelId ).remove();
  tabs.tabs( "refresh" );
  if (projFileHandle) {
    if (autosaveEnabled) {
      saveProject();
    } else {
      setNotSaved();
    }
  }
  updateTabHeight();
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
  } else if ((elementTab[0] == "Item") || (elementTab[0] == "Recipe") || (elementTab[0] == "Entity") || (elementTab[0] == "Biome") || (elementTab[0] == "Structure") || (elementTab[0] == "Block") || (elementTab[0] == "Loot Table") || (elementTab[0] == "Trade Table")) {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("elements").file(elementTab[1] + ".json", JSON.stringify(frame.contentWindow.saveProject()));
  } else if (elementTab[0] == "Image") {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("assets").file(decodeText(elementTab[1]), dataURItoFile(frame.contentWindow.saveProject(), elementTab[1] + ".png"));
    var preview = document.getElementById(elementTab[1] + "_preview");
    preview.src = frame.contentWindow.saveProject();
  }
}

function fileListInFolder(path, filterType, zip = projZip) {
  const folder = zip.folder(path);
  const folderPath = path + "/";
  let fileNames = [];
  folder.forEach((relativePath, file) => {
    if (!file.dir) {
      if (relativePath.endsWith(filterType) || !filterType) {
        fileNames.push(relativePath); // relativePath excludes "myfolder/"
      }
    }
  });
  return fileNames;
}

function getTextureList() {
  return fileListInFolder("assets", "png");
}
function getStructureList() {
  return fileListInFolder("assets", "mcstructure");
}
function getModelList(mode) {
  let vanillaList;
  if (mode == "entity") {
    vanillaList = [];
  } else {
    vanillaList = ["Full Block", "Plant"];
  }
  return vanillaList.concat(fileListInFolder("assets", "json"));
}
async function getScriptList() {
  return (await getFilteredElements("Script")).map(obj => obj.name);
}

$("#newProjBtn").button();
$("#openProjBtn").button();
$("#closeAboutBtn").button();
document.getElementById("tabs").hidden = true;

// Click handler for the savingBox menu item
$("#savingBox").on("click", function (e) {
  e.stopPropagation(); // Prevent auto-closing on click

  $("#savingFlyout")
    .show()
    .position({
      my: "right bottom",
      at: "right top",
      of: $(this)
    });
});

// Hide flyout on outside click
$(document).on("click", function () {
  $("#savingFlyout").hide();
});

// Prevent closing when clicking inside flyout
$("#savingFlyout").on("click", function (e) {
  e.stopPropagation();
});






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