const appVersion = "1.1.115";
const buildDate = "1/9/2026";
const minEngineVersion = [1, 21, 90];
const formatVersion = "1.21.90";

var exportZip1;
var exportZip2;
var projZip;
var projManifest;

var tabCounter = 3;
var tabTemplate = `<li><a href='#{href}'>#{label}</a> <span class='ui-icon-close tabCloseIcon' role='presentation'><i class="fa-solid fa-x"></i></span></li>`;
var tabs = $("#tabs");

var elementCount = 0;
var assetCount = 0;
var openElements = {};

var renameElementID;
var renameElementType;
var deleteElementID;
var deleteElementType;

var autosaveEnabled = true;
var storageMode = "";
var editorTheme = "system";
let customThemes = {

};
let currentProjectId = null;
let projDeleteID;

var editorScriptList;

let addAssetMode = "upload";

let projectTypes = {
  "be_addon": {
    name: "Bedrock Addon",
    shortname: "Addon"
  },
  "be_rp": {
    name: "Bedrock Resource Pack",
    shortname: "Resource Pack"
  },
  "je_dp": {
    name: "Java Datapack",
    shortname: "Datapack"
  },
  "je_rp": {
    name: "Java Resource Pack",
    shortname: "Resource Pack"
  },
  "je_forge": {
    name: "Java Forge Mod",
    shortname: "Forge Mod"
  },
  "je_fabric": {
    name: "Java Fabric Mod",
    shortname: "Fabric Mod"
  },
  "je_spigot": {
    name: "Java Spigot Plugin",
    shortname: "Spigot Plugin"
  },
  "nexo": {
    name: "Nexo Addon",
    shortname: "Nexo Addon"
  },
  "mtr_je": {
    name: "MTR Content (Java)",
    shortname: "MTR Content"
  },
  "mtr_be": {
    name: "MTR Content (Bedrock)",
    shortname: "MTR Content"
  }
};

document.addEventListener("DOMContentLoaded", function(){
  document.title = `Moddery v${appVersion}`;
  document.getElementById("savingBox").style.display = "none";
  aboutText.innerHTML = `Moddery v${appVersion} (${buildDate})`;
  let currentUsername = getCookie("currentUsername");
  let currentPassword = getCookie("currentPassword");
  if (currentUsername) {
    accountNameText.innerHTML = `Signing in...`;
    signInBtn.classList.add("is-loading");
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
$("#addAssetBlankDiv").hide();
addAssetModeMenu.addEventListener("change", function (event) {
  addAssetMode = addAssetModeMenu.value;
  if (addAssetMode == "upload") {
    $("#addAssetUploadDiv").show();
    $("#addAssetBlankDiv").hide();
  } else {
    $("#addAssetUploadDiv").hide();
    $("#addAssetBlankDiv").show();
  }
});

let signInMode = "in";
let signedIn = false;
$("#signInDlgPasswordBox2").hide();
$("#signInDlgPasswordBox2Label").hide();

function openSignInDlg() {
  signInDlg.classList.add("is-active");
}
function closeSignInDlg() {
  signInDlg.classList.remove("is-active");
}
async function signIn() {
  let username = signInDlgUsernameBox.value;
  let password = signInDlgPasswordBox.value;
  let password2 = signInDlgPasswordBox2.value;
  let userFile;
  accountNameText.innerHTML = `Signing in...`;
  signInBtn.classList.add("is-loading");
  if (signInMode == "in") {
    try {
      userFile = JSON.parse(await db.readFile(`accounts/${username}.json`));
      if (userFile.password == password) {
        finishSignIn(username, password);
      } else {
        alert("Incorrect password!");
        accountNameText.innerHTML = `Not signed in`;
        signInBtn.classList.remove("is-loading");
      }
    } catch(err) {
      accountNameText.innerHTML = `Not signed in`;
      signInBtn.classList.remove("is-loading");
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
        signInBtn.classList.remove("is-loading");
      }
    } else {
      alert("The passwords entered do not match!");
      accountNameText.innerHTML = `Not signed in`;
      signInBtn.classList.remove("is-loading");
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
    signInBtn.classList.remove("is-loading");
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

$("#optionsContent2").hide();
$("#optionsContent3").hide();
$("#optionsContent4").hide();
$("#optionsContent5").hide();
function switchOptionsTab(tab) {
  optionsTab1.classList.remove("is-active");
  optionsTab2.classList.remove("is-active");
  optionsTab3.classList.remove("is-active");
  optionsTab4.classList.remove("is-active");
  optionsTab5.classList.remove("is-active");
  $("#optionsContent1").hide();
  $("#optionsContent2").hide();
  $("#optionsContent3").hide();
  $("#optionsContent4").hide();
  $("#optionsContent5").hide();
  document.getElementById(`optionsTab${tab}`).classList.add("is-active");
  $(`#optionsContent${tab}`).show();
}
function openOptionsDlg() {
  optionsDlg.classList.add("is-active");
}
function closeOptionsDlg() {
  optionsDlg.classList.remove("is-active");
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



function openNewProjDlg() {
  newProjDlg.classList.add("is-active");
}
function closeNewProjDlg() {
  newProjDlg.classList.remove("is-active");
}

function openSelectPackIconDlg() {
  selectPackIconDlg.classList.add("is-active");
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
    selectPackIconMenuItem.setAttribute("class", "textureMenuItem card");
    itemRadio = document.createElement("input");
    itemRadio.setAttribute("type", "radio");
    itemRadio.setAttribute("name", "selectedPackIcon");
    itemRadio.setAttribute("class", "textureRadio");
    itemRadio.setAttribute("value", textures[i]);
    selectPackIconMenuItem.appendChild(itemRadio);
    if (textures[i] != "None") {
      previewBox = document.createElement("div");
      previewBox.setAttribute("class", "smallPreviewBox");
      preview = document.createElement("img");
      window.parent.projZip.folder("assets").file(textures[i]).async("blob").then(async function (file) {
        preview.setAttribute("src", await fileToDataURL(file));
      });
      preview.setAttribute("id", encodeText(textures[i]) + "_preview");
      previewBox.appendChild(preview);
      selectPackIconMenuItem.appendChild(previewBox);
    }
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
  selectPackIconDlg.classList.remove("is-active");
}
function selectPackIcon() {
  closeSelectPackIconDlg();
  const selected = document.querySelector('input[name="selectedPackIcon"]:checked');
  if (selected.value) {
    const packIconNameText = document.getElementById("packIconText");
    if (selected.value == "None") {
      packIconNameText.innerHTML = "No pack icon selected";
      selectedPackIcon = "";
    } else {
      packIconNameText.innerHTML = selected.value;
      selectedPackIcon = selected.value;
    }
  }
}

async function openSelectScriptEntryDlg() {
  selectScriptEntryDlg.classList.add("is-active");
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
    selectScriptEntryMenuItem.setAttribute("class", "textureMenuItem card");
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
  selectScriptEntryDlg.classList.remove("is-active");
}
function selectScriptEntry() {
  closeSelectScriptEntryDlg();
  const selected = document.querySelector('input[name="selectedScriptEntry"]:checked');
  if (selected.value) {
    const scriptEntryNameText = document.getElementById("scriptEntryText");
    if (selected.value == "None") {
      scriptEntryNameText.innerHTML = "No script entry point selected";
      selectedScriptEntry = "";
    } else {
      scriptEntryNameText.innerHTML = selected.value;
      selectedScriptEntry = selected.value;
    }
  }
}

function openEditProjDlg() {
  editProjDlg.classList.add("is-active");
  $("#editProjNameBox").val(projManifest.name);
  $("#editProjNamespaceBox").val(projManifest.namespace);
  $("#editProjVersionBox1").val(Number(projManifest.addon_version[0]));
  $("#editProjVersionBox2").val(Number(projManifest.addon_version[1]));
  $("#editProjVersionBox3").val(Number(projManifest.addon_version[2]));
  $("#editProjDescriptionBox").val(projManifest.description);
  if (Array.isArray(projManifest.mc_version)) {
    projManifest.mc_version = "1.21.90";
  }
  $("#editProjMCVersionBox").val(projManifest.mc_version);
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
  editProjDlg.classList.remove("is-active");
}
function saveProjectInfo() {
  closeEditProjDlg();
  projManifest.name = $("#editProjNameBox").val();
  projManifest.namespace = $("#editProjNamespaceBox").val();
  projManifest.addon_version = [$("#editProjVersionBox1").val(), $("#editProjVersionBox2").val(), $("#editProjVersionBox3").val()];
  projManifest.mc_version = $("#editProjMCVersionBox").val();
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
  } else if (!isValidElementID($("#newProjNamespaceBox").val())) {
    alert("The project namespace is invalid!");
  } else if (($("#newProjNameBox").val() == "") || ($("#newProjType").val() == "") || ($("#newProjNamespaceBox").val() == "")) {
    alert("All boxes must be filled in!")
  } else {
    closeNewProjDlg();
    document.getElementById("tabs").hidden = false;
    document.getElementById("welcome").hidden = true;
    document.getElementById("savingBox").style.display = "block";
    projZip = new JSZip();
    let bpUUID = crypto.randomUUID();
    let rpUUID = crypto.randomUUID();
    projManifest = {
      "name": $("#newProjNameBox").val(),
      "type": $("#newProjType").val(),
      "namespace": $("#newProjNamespaceBox").val(),
      "bp_uuid": bpUUID,
      "rp_uuid": rpUUID,
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
    if (storageMode == "local_storage") {
      currentProjectId = bpUUID;
    }
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
  setCookie("autosaveEnabled", "true", 399);
}

autosaveBox.addEventListener("change", function(e) {
  autosaveEnabled = autosaveBox.checked;
  setCookie("autosaveEnabled", autosaveEnabled.toString(), 399);
});


let themeMenu = document.getElementById("themeMenu");

if (getCookie("editorTheme")) {
  editorTheme = getCookie("editorTheme");
  $("#themeMenu").val(getCookie("editorTheme"));
  if (editorTheme == "system") {
    autoThemeChange();
  } else {
    document.documentElement.setAttribute("data-theme", editorTheme);
    handleFrameThemeChange();
  }
} else {
  editorTheme = "system";
  $("#themeMenu").val("system");
  setCookie("editorTheme", "system", 399);
  autoThemeChange();
}

themeMenu.addEventListener("change", function(e) {
  editorTheme = themeMenu.value;
  setCookie("editorTheme", editorTheme, 399);
  if (editorTheme == "system") {
    autoThemeChange();
  } else {
    document.documentElement.setAttribute("data-theme", editorTheme);
    handleFrameThemeChange();
  }
});

function autoThemeChange() {
  if (getThemePreference() == "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  handleFrameThemeChange();
}

function handleFrameThemeChange() {
  let themeName;
  let importTheme;
  if (editorTheme == "system") {
    if (getThemePreference() == "dark") {
      themeName = "dark";
      importTheme = false;
    } else {
      themeName = "light";
      importTheme = false;
    }
  } else if (editorTheme == "light") {
    themeName = "light";
    importTheme = false;
  } else if (editorTheme == "dark") {
    themeName = "dark";
    importTheme = false;
  } else {
    themeName = editorTheme;
    importTheme = customThemes[editorTheme].stylesheet;
  }
  let iframes = document.querySelectorAll("iframe");
  for (let i = 0; i < iframes.length; i++) {
    let iframe = iframes[i];
    if (importTheme) {
      iframe.contentWindow.themeStyleElement.innerHTML = importTheme;
    }
    iframe.contentWindow.document.documentElement.setAttribute("data-theme", themeName);
  }
}

// Select the media query for the dark color scheme preference
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Define a function to handle the theme change
function handleThemeChange(event) {
  if (editorTheme == "system") {
    autoThemeChange();
  }
}

// Add an event listener to call the function when the theme preference changes
if (window.matchMedia) {
    darkModeMediaQuery.addEventListener('change', handleThemeChange);
}

const supportsFileSystemAPI =
    'showOpenFilePicker' in window &&
    'showSaveFilePicker' in window &&
    'showDirectoryPicker' in window;

let storageModeBox = document.getElementById("storageModeBox");

if (supportsFileSystemAPI) {
  if (getCookie("storageMode")) {
    storageMode = getCookie("storageMode");
    $("#storageModeBox").val(getCookie("storageMode"));
  } else {
    storageMode = "file_system";
    $("#storageModeBox").val("file_system");
    setCookie("storageMode", "file_system", 399);
  }
} else {
  storageMode = "local_storage";
  storageModeBoxOpt1.setAttribute("disabled", "true");
  $("#storageModeBox").val("local_storage");
  setCookie("storageMode", "local_storage", 399);
}

storageModeBox.addEventListener("change", function(e) {
  storageMode = storageModeBox.value;
  setCookie("storageMode", storageMode, 399);
  if (projManifest?.bp_uuid ?? false) {
    currentProjectId = projManifest?.bp_uuid ?? null;
  }
});



let projFileHandle = null;

async function openProjDlg() {
  if (storageMode == "file_system") {
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
  } else {
    openProjDBDlg.classList.add("is-active");
    let projectList = await listProjectsDB();
    let div = document.getElementById("openProjDBDlgContent");
    div.innerHTML = "";
    for (let i = 0; i < projectList.length; i++) {
      projectInfo = projectList[i];
      let box = document.createElement("div");
      box.setAttribute("class", "projListItem card");

      let title = document.createElement("h5");
      title.innerHTML = `${projectInfo.name} (${projectInfo.namespace})`;
      title.setAttribute("class", "title is-5");
      box.appendChild(title);

      let typeText = document.createElement("span");
      typeText.innerHTML = `<b>Type:</b> ${projectTypes[projectInfo.type].name} <b>Last Modified:</b> ${formatTimestamp(projectInfo.lastSaved)}`;
      box.appendChild(typeText);
      box.appendChild(document.createElement("br"));

      let openBtn = document.createElement("button");
      openBtn.innerHTML = `<i class="fas fa-pencil"></i> Open`;
      openBtn.setAttribute("id", `openBtn_${projectInfo.id}`);
      openBtn.setAttribute("onclick", `openProjFromDB("${projectInfo.id}")`);
      openBtn.setAttribute("class", "button is-primary");
      box.appendChild(openBtn);
      box.appendChild(document.createTextNode(" "));

      let downloadBtn = document.createElement("button");
      downloadBtn.innerHTML = `<i class="fas fa-download"></i> Download`;
      downloadBtn.setAttribute("id", `downloadBtn_${projectInfo.id}`);
      downloadBtn.setAttribute("onclick", `downloadProjectDB("${projectInfo.id}")`);
      downloadBtn.setAttribute("class", "button");
      box.appendChild(downloadBtn);
      box.appendChild(document.createTextNode(" "));

      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = `<i class="fas fa-trash"></i> Delete`;
      deleteBtn.setAttribute("id", `deleteBtn_${projectInfo.id}`);
      deleteBtn.setAttribute("onclick", `deleteConfirmationDB("${projectInfo.id}")`);
      deleteBtn.setAttribute("class", "button is-danger");
      box.appendChild(deleteBtn);

      div.appendChild(box);
      div.appendChild(document.createElement("br"));
    }
  }
};

function closeOpenProjDlg() {
  openProjDBDlg.classList.remove("is-active");
}

async function openProjFromDB(id) {
  closeOpenProjDlg();
  let file = await loadProjectDB(id);
  openProj(file);
}

async function downloadProjectDB(id) {
  // 1. Load the ZIP blob
  const blob = await loadProjectDB(id);

  if (!blob) {
    alert("Failed to load project.");
    return;
  }

  // 2. Get metadata for filename (optional but recommended)
  const projects = await listProjectsDB();
  const info = projects.find(p => p.id === id);

  const filename =
    (info?.name || "project") + ".zip";

  // 3. Create a temporary download URL
  const url = URL.createObjectURL(blob);

  // 4. Create & click a temporary <a>
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // 5. Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


function deleteConfirmationDB(id) {
  projDeleteID = id;
  deleteProjDlg.classList.add("is-active");
}

function closeDeleteProj() {
  deleteProjDlg.classList.remove("is-active");
}

async function deleteCurrentProj() {
  closeDeleteProj();
  await deleteProjectDB(projDeleteID);
  openProjDBDlg.classList.remove("is-active");
  openProjDlg();
}


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
        if (storageMode == "local_storage") {
          currentProjectId = projManifest.bp_uuid;
        }
        selectedPackIcon = manifest.packIcon;
        selectedScriptEntry = manifest.scriptEntry;
        document.getElementById("tabs").hidden = false;
        document.getElementById("welcome").hidden = true;
        document.getElementById("savingBox").style.display = "block";
        savingText.innerHTML = "<i class='loadingSpinner'></i> Opening Project...";
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
          $("#addElementType").val("Block");
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
  addElementDlg.classList.add("is-active");
}
function closeAddElementDlg() {
  addElementDlg.classList.remove("is-active");
}
function openAddAssetDlg() {
  addAssetDlg.classList.add("is-active");
}
function closeAddAssetDlg() {
  addAssetDlg.classList.remove("is-active");
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
  if (!isBedrockShapedRecipeValid(grid)) {
    logExporter("Invalid crafting recipe!", "warn");
  }
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
  newObj["minecraft:max_stack_size"] = Number(file.maxStackSize);
  if (keys.includes("Allow Off Hand")) {
    let component = components["Allow Off Hand"];
    newObj["minecraft:allow_off_hand"] = component.main;
  }
  if (keys.includes("Block Placer")) {
    let component = components["Block Placer"];
    newObj["minecraft:block_placer"] = {
      "block": component.block,
      "replace_block_item": component.replace_block_item,
    };
    if (component.use_on) {
      newObj["minecraft:block_placer"].use_on = component.use_on;
    }
  }
  if (keys.includes("Bundle Interaction")) {
    let component = components["Bundle Interaction"];
    newObj["minecraft:bundle_interaction"] = {
      "num_viewable_slots": Number(component.num_viewable_slots)
    };
  }
  if (keys.includes("Can Destroy in Creative")) {
    let component = components["Can Destroy in Creative"];
    newObj["minecraft:can_destroy_in_creative"] = component.main;
  }
  if (keys.includes("Compostable")) {
    let component = components["Compostable"];
    newObj["minecraft:compostable"] = {
      "composting_chance": Number(component.composting_chance)
    };
  }
  /*if (keys.includes("Cooldown")) {
    let component = components["Cooldown"];
    newObj["minecraft:cooldown"] = {
      "category": `${projManifest.namespace}:cooldown_${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
      "duration": Number(component.duration),
      "type": "use"
    };
  }*/
  if (keys.includes("Damage")) {
    let component = components["Damage"];
    newObj["minecraft:damage"] = Number(component.main);
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
          "speed": Number(component.speed)
        }
      ]
    };
  }
  if (keys.includes("Durability")) {
    let component = components["Durability"];
    newObj["minecraft:durability"] = {
      "max_durability": Number(component.max_durability),
      "damage_chance": {
        "min": Number(component.damage_chance),
        "max": Number(component.damage_chance)
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
      "value": Number(component.value)
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
      "nutrition": Number(component.nutrition),
      "saturation_modifier": Number(component.saturation_modifier),
    };
    if (component.using_converts_to) {
      newObj["minecraft:food"].using_converts_to = component.using_converts_to;
    }
  }
  if (keys.includes("Fuel")) {
    let component = components["Fuel"];
    newObj["minecraft:fuel"] = {
      "duration": Number(component.duration)
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
      "minimum_critical_power": Number(component.minimum_critical_power),
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
      "comparator_signal": Number(component.comparator_signal),
      "duration": Number(component.duration),
      "sound_event": component.sound_event
    };
  }
  if (keys.includes("Repairable")) {
    let component = components["Repairable"];
    newObj["minecraft:repairable"] = {
      "repair_items": [
        {
          "items": component.items,
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
      "max_draw_duration": Number(component.max_draw_duration),
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
      "max_slots": Number(component.max_slots),
      "allow_nested_storage_items": component.allow_nested_storage_items,
    };
    if (component.allowed_items) {
      newObj["minecraft:storage_item"].allowed_items = component.allowed_items;
    }
    if (component.banned_items) {
      newObj["minecraft:storage_item"].banned_items = component.banned_items;
    }
  }
  if (keys.includes("Swing Duration")) {
    let component = components["Swing Duration"];
    newObj["minecraft:swing_duration"] = {
      "value": Number(component.value)
    };
  }
  if (keys.includes("Tags")) {
    let component = components["Tags"];
    newObj["minecraft:tags"] = {
      "tags": component.tags
    };
  }
  if (keys.includes("Throwable")) {
    let component = components["Throwable"];
    newObj["minecraft:throwable"] = {
      "do_swing_animation": component.do_swing_animation,
      "launch_power_scale": Number(component.launch_power_scale),
      "max_launch_power": Number(component.max_launch_power),
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
      //"emit_vibrations": component.emit_vibrations,
      "movement_modifer": component.movement_modifer,
      "use_duration": Number(component.use_duration)
    };
  }
  if (keys.includes("Wearable")) {
    let component = components["Wearable"];
    newObj["minecraft:wearable"] = {
      "slot": component.slot,
      "protection": Number(component.protection),
      "hides_player_location": component.hides_player_location
    };
  }
  return newObj;
}

async function parseBlockComponents(file) {
  let components = file.components;
  let keys = Object.keys(components);
  let newObj1 = {};
  let newObj2 = [];
  let newObj3 = {};
  let newObj4 = false;

  if (keys.includes("Placement Direction")) {
    let component = components["Placement Direction"];
    newObj3["minecraft:placement_direction"] = {
      "enabled_states": [`minecraft:${component.type}`],
      "y_rotation_offset": Number(component.y_rotation_offset)
    };
    let permutationsToAdd;
    if (component.type == "cardinal_direction") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'north'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'west'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 90, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'south'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 180, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:cardinal_direction') == 'east'",
          "components": {
            "minecraft:transformation": { "rotation": [0, -90, 0] }
          }
        }
      ];
    } else if (component.type == "facing_direction") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'down'",
          "components": {
            "minecraft:transformation": { "rotation": [90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'up'",
          "components": {
            "minecraft:transformation": { "rotation": [-90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'north'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'west'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 90, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'south'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 180, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:facing_direction') == 'east'",
          "components": {
            "minecraft:transformation": { "rotation": [0, -90, 0] }
          }
        }
      ];
    }
    newObj2.push(...permutationsToAdd);
  }
  if (keys.includes("Placement Position")) {
    let component = components["Placement Position"];
    newObj3["minecraft:placement_position"] = {
      "enabled_states": [`minecraft:${component.type}`]
    };
    let permutationsToAdd;
    if (component.type == "vertical_half") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:vertical_half') == 'bottom'",
          "components": {
            "minecraft:transformation": { "translation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:vertical_half') == 'top'",
          "components": {
            "minecraft:transformation": { "translation": [0, 8, 0] }
          }
        }
      ];
    } else if (component.type == "block_face") {
      permutationsToAdd = [
        {
          "condition": "q.block_state('minecraft:block_face') == 'down'",
          "components": {
            "minecraft:transformation": { "rotation": [90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'up'",
          "components": {
            "minecraft:transformation": { "rotation": [-90, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'north'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 0, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'west'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 90, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'south'",
          "components": {
            "minecraft:transformation": { "rotation": [0, 180, 0] }
          }
        },
        {
          "condition": "q.block_state('minecraft:block_face') == 'east'",
          "components": {
            "minecraft:transformation": { "rotation": [0, -90, 0] }
          }
        }
      ];
    }
    newObj2.push(...permutationsToAdd);
  }
  if (keys.includes("Collision Box")) {
    let component = components["Collision Box"];
    if (component.disable) {
      newObj1["minecraft:collision_box"] = false;
    } else {
      let originV3 = component.origin.split(",").map(str => Number(str));
      let sizeV3 = component.size.split(",").map(str => Number(str));
      newObj1["minecraft:collision_box"] = {
        "origin": originV3,
        "size": sizeV3
      };
    }
  }
  if (keys.includes("Crafting Table")) {
    let component = components["Crafting Table"];
    newObj1["minecraft:crafting_table"] = {
      "table_name": component.table_name,
      "crafting_tags": [component.crafting_tags]
    };
  }
  if (keys.includes("Destructible by Explosion")) {
    let component = components["Destructible by Explosion"];
    if (!component.main) {
      newObj1["minecraft:destructible_by_explosion"] = false;
    } else {
      newObj1["minecraft:destructible_by_explosion"] = {
        "explosion_resistance": Number(component.explosion_resistance)
      };
    }
  }
  if (keys.includes("Destructible by Mining")) {
    let component = components["Destructible by Mining"];
    if (!component.main) {
      newObj1["minecraft:destructible_by_mining"] = false;
    } else if (component.seconds_to_destroy == 0) {
      newObj1["minecraft:destructible_by_mining"] = true;
    } else {
      newObj1["minecraft:destructible_by_mining"] = {
        "seconds_to_destroy": Number(component.seconds_to_destroy)
      };
    }
  }
  if (keys.includes("Destruction Particles")) {
    let component = components["Destruction Particles"];
    newObj1["minecraft:destruction_particles"] = {
      "particle_count": component.particle_count
    };
  }
  if (keys.includes("Flammable")) {
    let component = components["Flammable"];
    if (!component.main) {
      newObj1["minecraft:flammable"] = false;
    } else {
      newObj1["minecraft:flammable"] = {
        "catch_chance_modifier": Number(component.catch_chance_modifier),
        "destroy_chance_modifier": Number(component.destroy_chance_modifier)
      };
    }
  }
  if (keys.includes("Flower Pottable")) {
    let component = components["Flower Pottable"];
    newObj1["minecraft:flower_pottable"] = {};
  }
  if (keys.includes("Friction")) {
    let component = components["Friction"];
    newObj1["minecraft:friction"] = Number(component.main);
  }
  if (keys.includes("Interactable")) {
    let component = components["Interactable"];
    if (component.main) {
      newObj4 = [
        `${projManifest.namespace}:interactable`
      ];
    }
  }
  if (keys.includes("Light Dampening")) {
    let component = components["Light Dampening"];
    newObj1["minecraft:light_dampening"] = Number(component.main);
  }
  if (keys.includes("Light Emission")) {
    let component = components["Light Emission"];
    newObj1["minecraft:light_emission"] = Number(component.main);
  }
  if (keys.includes("Liquid Detection")) {
    let component = components["Liquid Detection"];
    newObj1["minecraft:liquid_detection"] = {
      "detection_rules": [
        {
          "liquid_type": "water",
          "can_contain_liquid": component.can_contain_liquid,
          "on_liquid_touches": component.on_liquid_touches
        }
      ]
    };
  }
  if (keys.includes("Loot")) {
    let component = components["Loot"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.main}.json`).async("string"));
    newObj1["minecraft:loot"] = `loot_tables/${lootTableFile.id}.json`;
  }
  if (keys.includes("Map Color")) {
    let component = components["Map Color"];
    newObj1["minecraft:map_color"] = component.main;
  }
  if (keys.includes("Movable")) {
    let component = components["Movable"];
    newObj1["minecraft:movable"] = {
      "movement_type": component.movement_type,
      "sticky": component.sticky
    };
  }
  if (keys.includes("Precipitation Interactions")) {
    let component = components["Precipitation Interactions"];
    newObj1["minecraft:precipitation_interactions"] = {
      "precipitation_behavior": component.precipitation_behavior
    };
  }
  if (keys.includes("Random Offset")) {
    let component = components["Random Offset"];
    newObj1["minecraft:random_offset"] = {
      "x": {
        "steps": Number(component.x_steps),
        "range": {
          "min": Number(component.x_min),
          "max": Number(component.x_max)
        }
      },
      "y": {
        "steps": Number(component.y_steps),
        "range": {
          "min": Number(component.y_min),
          "max": Number(component.y_max)
        }
      },
      "z": {
        "steps": Number(component.z_steps),
        "range": {
          "min": Number(component.z_min),
          "max": Number(component.z_max)
        }
      }
    };
  }
  if (keys.includes("Redstone Conductivity")) {
    let component = components["Redstone Conductivity"];
    newObj1["minecraft:redstone_conductivity"] = {
      "redstone_conductor": component.redstone_conductor,
      "allows_wire_to_step_down": component.allows_wire_to_step_down
    };
  }
  if (keys.includes("Redstone Producer")) {
    let component = components["Redstone Producer"];
    newObj1["minecraft:redstone_producer"] = {
      "power": Number(component.power),
    };
    if (component.connected_faces) {
      newObj1["minecraft:redstone_producer"].connected_faces = component.connected_faces;
    }
  }
  if (keys.includes("Replaceable")) {
    let component = components["Replaceable"];
    if (component.main) {
      newObj1["minecraft:replaceable"] = {};
    }
  }
  if (keys.includes("Selection Box")) {
    let component = components["Selection Box"];
    if (component.disable) {
      newObj1["minecraft:selection_box"] = false;
    } else {
      let originV3 = component.origin.split(",").map(str => Number(str));
      let sizeV3 = component.size.split(",").map(str => Number(str));
      newObj1["minecraft:selection_box"] = {
        "origin": originV3,
        "size": sizeV3
      };
    }
  }

  return [newObj1, newObj2, newObj3, newObj4];
}

async function parseEntityComponents(file) {
  let components = file.components;
  let keys = Object.keys(components);
  let newObj1 = {};
  let newObj2 = {};

  if (keys.includes("Health")) {
    let component = components["Health"];
    newObj1["minecraft:health"] = {
      value: Number(component.value),
      max: Number(component.max)
    };
  }
  if (keys.includes("Attack Damage")) {
    let component = components["Attack Damage"];
    newObj1["minecraft:attack"] = {
      damage: Number(component.damage)
    };
  }
  if (keys.includes("Movement Speed")) {
    let component = components["Movement Speed"];
    newObj1["minecraft:movement"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Collision Box")) {
    let component = components["Collision Box"];
    newObj1["minecraft:collision_box"] = {
      height: Number(component.height),
      width: Number(component.width)
    };
  }
  if (keys.includes("Can Fly")) {
    let component = components["Can Fly"];
    newObj1["minecraft:can_fly"] = component.main;
  }
  if (keys.includes("Can Climb")) {
    let component = components["Can Climb"];
    newObj1["minecraft:can_climb"] = component.main;
  }
  if (keys.includes("Buoyant")) {
    let component = components["Buoyant"];
    if (component.main) {
      newObj1["minecraft:buoyant"] = {
        liquid_blocks: ["water", "lava"]
      };
    }
  }
  if (keys.includes("Fire Immune")) {
    let component = components["Fire Immune"];
    newObj1["minecraft:fire_immune"] = component.main;
  }
  if (keys.includes("Random Stroll Behavior")) {
    let component = components["Random Stroll Behavior"];
    newObj1["minecraft:behavior.random_stroll"] = {
      priority: Number(component.priority),
      speed_multiplier: Number(component.speed_multiplier)
    };
  }
  if (keys.includes("Melee Attack Behavior")) {
    let component = components["Melee Attack Behavior"];
    newObj1["minecraft:behavior.melee_attack"] = {
      priority: Number(component.priority),
      speed_multiplier: Number(component.speed_multiplier)
    };
  }
  if (keys.includes("Panic Behavior")) {
    let component = components["Panic Behavior"];
    newObj1["minecraft:behavior.panic"] = {
      priority: Number(component.priority),
      speed_multiplier: Number(component.speed_multiplier)
    };
  }
  if (keys.includes("Loot")) {
    let component = components["Loot"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.table}.json`).async("string"));
    newObj1["minecraft:loot"] = {
      table: `loot_tables/${lootTableFile.id}.json`
    };
  }
  if (keys.includes("Effect Immunity")) {
    let component = components["Effect Immunity"];
    newObj1["minecraft:mob_effect_immunity"] = {
      mob_effects: component.effect
    };
  }
  if (keys.includes("Apply Effect")) {
    let component = components["Apply Effect"];
    newObj1["minecraft:mob_effect"] = {
      mob_effect: component.effect,
      effect_time: Number(component.duration),
      effect_range: Number(component.range),
      cooldown_time: Number(component.cooldown),
      entity_filter: component.entity_filter,
      ambient: component.ambient
    };
  }
  if (keys.includes("Spawn Weight")) {
    let component = components["Spawn Weight"];
    newObj1["minecraft:weight"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Transient")) {
    let component = components["Transient"];
    newObj1["minecraft:transient"] = component.main;
  }
  if (keys.includes("Interactable")) {
    let component = components["Interactable"];
    newObj1["minecraft:interact"] = {
      interact_text: component.interact_text,
      cooldown: Number(component.cooldown),
      play_sounds: component.play_sounds
    };
  }
  if (keys.includes("Add Rider")) {
    let component = components["Add Rider"];
    newObj1["minecraft:addrider"] = {
      entity_type: component.entity_type
    };
  }
  if (keys.includes("Break Door")) {
    let component = components["Break Door"];
    newObj1["minecraft:annotation.break_door"] = {
      break_time: Number(component.break_time),
      min_difficulty: component.min_difficulty
    };
  }
  if (keys.includes("Open Door")) {
    let component = components["Open Door"];
    newObj1["minecraft:annotation.open_door"] = {};
  }
  if (keys.includes("Attack Cooldown")) {
    let component = components["Attack Cooldown"];
    newObj1["minecraft:attack_cooldown"] = {
      attack_cooldown_time: [Number(component.attack_cooldown_time_min), Number(component.attack_cooldown_time_max)]
    };
  }
  if (keys.includes("Barter")) {
    let component = components["Barter"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.barter_table}.json`).async("string"));
    newObj1["minecraft:barter"] = {
      barter_table: `loot_tables/${lootTableFile.id}.json`,
      cooldown_after_being_attacked: Number(component.cooldown_after_being_attacked)
    };
  }
  if (keys.includes("Boss")) {
    let component = components["Boss"];
    newObj1["minecraft:boss"] = {
      name: component.name,
      hud_range: Number(component.hud_range),
      should_darken_sky: component.should_darken_sky
    };
  }
  if (keys.includes("Breathable")) {
    let component = components["Breathable"];
    newObj1["minecraft:breathable"] = {
      breathes_air: component.breathes_air,
      breathes_lava: component.breathes_lava,
      breathes_solids: component.breathes_solids,
      breathes_water: component.breathes_water,
      can_dehydrate: component.can_dehydrate,
      generates_bubbles: component.generates_bubbles,
      inhale_time: Number(component.inhale_time),
      total_supply: Number(component.total_supply)
    };
  }
  if (keys.includes("Burns in Daylight")) {
    let component = components["Burns in Daylighr"];
    newObj1["minecraft:burns_in_daylight"] = component.main;
  }
  if (keys.includes("Can Join Raid")) {
    let component = components["Can Join Raid"];
    newObj1["minecraft:can_join_raid"] = component.main;
  }
  if (keys.includes("Can Power Jump")) {
    let component = components["Can Power Jump"];
    newObj1["minecraft:can_power_jump"] = component.main;
  }
  if (keys.includes("Cannot Be Attacked")) {
    let component = components["Cannot Be Attacked"];
    newObj1["minecraft:cannot_be_attacked"] = component.main;
  }
  if (keys.includes("Economy Trade Table")) {
    let component = components["Economy Trade Table"];
    let lootTableFile = JSON.parse(await projZip.folder("elements").file(`${component.table}.json`).async("string"));
    newObj1["minecraft:economy_trade_table"] = {
      table: `trading/${lootTableFile.id}.json`,
      display_name: component.display_name
    };
  }
  if (keys.includes("Flying Speed")) {
    let component = components["Flying Speed"];
    newObj1["minecraft:flying_speed"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Friction Modifier")) {
    let component = components["Friction Modifier"];
    newObj1["minecraft:friction_modifier"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Ground Offset")) {
    let component = components["Ground Offset"];
    newObj1["minecraft:ground_offset"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Input Controls")) {
    let component = components["Input Controls"];
    newObj1["minecraft:input_ground_controlled"] = component.main;
  }
  if (keys.includes("Is Collidable")) {
    let component = components["Is Collidable"];
    newObj1["minecraft:is_collidable"] = component.main;
  }
  if (keys.includes("Is Dyeable")) {
    let component = components["Is Dyeable"];
    newObj1["minecraft:is_dyeable"] = {
      interact_text: component.interact_text
    };
  }
  if (keys.includes("Is Hidden When Invisible")) {
    let component = components["Is Hidden When Invisible"];
    newObj1["minecraft:is_hidden_when_invisible"] = component.main;
  }
  if (keys.includes("Renders When Invisible")) {
    let component = components["Renders When Invisible"];
    newObj1["minecraft:renders_when_invisible"] = component.main;
  }
  if (keys.includes("Scale")) {
    let component = components["Scale"];
    newObj1["minecraft:scale"] = {
      value: Number(component.value)
    };
  }
  if (keys.includes("Item Hopper")) {
    let component = components["Item Hopper"];
    newObj1["minecraft:item_hopper"] = component.main;
  }
  if (keys.includes("Static Jump")) {
    let component = components["Static Jump"];
    newObj1["minecraft:jump.static"] = {
      jump_power: Number(component.jump_power)
    };
  }
  if (keys.includes("Leashable")) {
    let component = components["Leashable"];
    newObj1["minecraft:leashable"] = {
      can_be_cut: component.can_be_cut,
      can_be_stolen: component.can_be_stolen
    };
  }
  if (keys.includes("Amphibious Movement")) {
    let component = components["Amphibious Movement"];
    newObj1["minecraft:movement.amphibious"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Basic Movement")) {
    let component = components["Basic Movement"];
    newObj1["minecraft:movement.basic"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Fly Movement")) {
    let component = components["Fly Movement"];
    newObj1["minecraft:movement.fly"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Generic Movement")) {
    let component = components["Generic Movement"];
    newObj1["minecraft:movement.generic"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Hover Movement")) {
    let component = components["Hover Movement"];
    newObj1["minecraft:movement.hover"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Jump Movement")) {
    let component = components["Jump Movement"];
    newObj1["minecraft:movement.jump"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Skip Movement")) {
    let component = components["Skip Movement"];
    newObj1["minecraft:movement.skip"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Sway Movement")) {
    let component = components["Sway Movement"];
    newObj1["minecraft:movement.sway"] = {
      max_turn: Number(component.max_turn)
    };
  }
  if (keys.includes("Nameable")) {
    let component = components["Nameable"];
    newObj1["minecraft:nameable"] = {
      allow_name_tag_renaming: component.allow_name_tag_renaming,
      always_show: component.always_show
    };
  }
  if (keys.includes("Climb Navigation")) {
    let component = components["Climb Navigation"];
    newObj1["minecraft:navigation.climb"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Float Navigation")) {
    let component = components["Float Navigation"];
    newObj1["minecraft:navigation.float"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Fly Navigation")) {
    let component = components["Fly Navigation"];
    newObj1["minecraft:navigation.fly"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Generic Navigation")) {
    let component = components["Generic Navigation"];
    newObj1["minecraft:navigation.generic"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Hover Navigation")) {
    let component = components["Hover Navigation"];
    newObj1["minecraft:navigation.hover"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Swim Navigation")) {
    let component = components["Swim Navigation"];
    newObj1["minecraft:navigation.swim"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Walk Navigation")) {
    let component = components["Walk Navigation"];
    newObj1["minecraft:navigation.walk"] = {
      avoid_damage_blocks: component.avoid_damage_blocks,
      avoid_portals: component.avoid_portals,
      avoid_sun: component.avoid_sun,
      avoid_water: component.avoid_water,
      blocks_to_avoid: component.blocks_to_avoid,
      can_breach: component.can_breach,
      can_break_doors: component.can_break_doors,
      can_jump: component.can_jump,
      can_open_doors: component.can_open_doors,
      can_open_iron_doors: component.can_open_iron_doors,
      can_pass_doors: component.can_pass_doors,
      can_path_from_air: component.can_path_from_air,
      can_path_over_lava: component.can_path_over_lava,
      can_path_over_water: component.can_path_over_water,
      can_sink: component.can_sink,
      can_swim: component.can_swim,
      can_walk: component.can_walk,
      can_walk_in_lava: component.can_walk_in_lava,
      is_amphibious: component.is_amphibious
    };
  }
  if (keys.includes("Persistent")) {
    let component = components["Persistent"];
    newObj1["minecraft:persistent"] = component.main;
  }
  if (keys.includes("Physics")) {
    let component = components["Physics"];
    newObj1["minecraft:physics"] = {
      has_collision: component.has_collision,
      has_gravity: component.has_gravity,
      push_towards_closest_space: component.push_towards_closest_space
    };
  }
  if (keys.includes("Pushable")) {
    let component = components["Pushable"];
    newObj1["minecraft:pushable"] = {
      is_pushable: component.is_pushable,
      is_pushable_by_piston: component.is_pushable_by_piston
    };
  }
  if (keys.includes("Rail Movement")) {
    let component = components["Rail Movement"];
    newObj1["minecraft:rail_movement"] = {
      max_speed: Number(component.max_speed)
    };
  }
  if (keys.includes("Rideable")) {
    let component = components["Rideable"];
    newObj1["minecraft:rideable"] = {
      controlling_seat: Number(component.controlling_seat),
      crouching_skip_interact: component.crouching_skip_interact,
      dismount_mode: component.dismount_mode,
      family_types: component.family_types,
      interact_text: component.interact_text,
      passenger_max_width: Number(component.passenger_max_width),
      pull_in_entities: component.pull_in_entities,
      seat_count: Number(component.seat_count),
      seats: component.seats
    };
  }
  if (keys.includes("Tameable")) {
    let component = components["Tameable"];
    newObj1["minecraft:tameable"] = {
      probability: Number(component.probability) / 100,
      tame_items: component.tame_items
    };
  }
  if (keys.includes("Max Auto Step")) {
    let component = components["Max Auto Step"];
    newObj1["minecraft:variable_max_auto_step"] = {
      base_value: Number(component.base_value),
      controlled_value: Number(component.controlled_value)
    };
  }
  if (keys.includes("Vertical Movement Action")) {
    let component = components["Vertical Movement Action"];
    newObj1["minecraft:vertical_movement_action"] = {
      vertical_velocity: Number(component.vertical_velocity)
    };
  }
  if (keys.includes("Water Movement")) {
    let component = components["Water Movement"];
    newObj1["minecraft:water_movement"] = {
      drag_factor: Number(component.drag_factor)
    };
  }

  if (keys.includes("Spawn Egg")) {
    let component = components["Spawn Egg"];
    if (component.texture) {
      newObj2["spawn_egg"] = {
        texture: component.texture
      };
    } else {
      newObj2["spawn_egg"] = {
        base_color: component.base_color,
        overlay_color: component.overlay_color
      };
    }
  }
  
  return [newObj1, newObj2];
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
  exportDlg.classList.add("is-active");
}
function closeExportDlg() {
  exportDlg.classList.remove("is-active");
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
      "entry": `scripts/${scriptInfoFile?.id ?? ""}.js`,
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
  let terrainTextureFile = {
    "resource_pack_name": projManifest.namespace,
    "texture_name": "atlas.terrain",
    "texture_data": {}
  };
  let languageFile = "";
  for (let i = 0; i < elementsList.length; i++) {
    //try {
      logExporter("Exporting element: " + elementsList[i], "info");
      let elementFile = JSON.parse(await projZip.folder("elements").file(elementsList[i]).async("string"));
      let namespacedID = `${projManifest.namespace}:${elementFile.id}`;
      let role = elementFile.type;
      let exportedFile1;
      let exportedFile2;
      let exportedFile3;
      let exportedFile4;
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
          if (projManifest.scriptEntry == elementFile.name) {
            exportedFile1 += `world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent(
        "${projManifest.namespace}:interactable",
        {
            onPlayerInteract() {}
        }
    );
});`;
          }
        } else {
          exportedFile1 = "";
        }
        exportZip1.folder("scripts").file(`${elementFile.id}.js`, exportedFile1);
      } else if (role == "Item") {
        let itemComponents = parseItemComponents(elementFile);
        let textureID = `${projManifest.namespace}:${elementFile.texture.replace(".png", "")}`;
        itemComponents["minecraft:icon"] = textureID;
        if (!Object.keys(itemTextureFile.texture_data).includes(textureID)) {
          itemTextureFile.texture_data[textureID] = {
            "textures": `textures/items/${elementFile.texture.replace(".png", "")}`
          };
        }
        if (!fileListInFolder("textures/items", false, exportZip2).includes(elementFile.texture)) {
          let texture = await projZip.folder("assets").file(elementFile.texture).async("blob");
          exportZip2.folder("textures").folder("items").file(elementFile.texture, texture);
        }
        languageFile += `item.${namespacedID}=${elementFile.displayName}\n`;
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
        let parsedFile = await parseBlockComponents(elementFile);
        let blockComponents = parsedFile?.[0] ?? {};
        let blockPermutations = parsedFile?.[1] ?? [];
        let blockTraits = parsedFile?.[2] ?? {};
        let modelID;
        let geoFile;
        if (elementFile.model == "Full Block") {
          modelID = "minecraft:geometry.full_block";
          geoFile = {
            "minecraft:geometry": [
              {
                "bones": [
                  {
                    "name": "test_bone",
                    "cubes": [
                      {
                        "uv": {
                          "up":    { "material_instance": "up" },
                          "down":  { "material_instance": "down" },
                          "north": { "material_instance": "north" },
                          "east":  { "material_instance": "east" },
                          "west":  { "material_instance": "west" },
                          "south": { "material_instance": "south" }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          };
        } else if (elementFile.model == "Plant") {
          modelID = "minecraft:geometry.cross";
          geoFile = {
            "minecraft:geometry": [
              {
                "bones": [
                  {
                    "name": "test_bone",
                    "cubes": [
                      {
                        "uv": {}
                      }
                    ]
                  }
                ]
              }
            ]
          };
        } else {
          modelID = `geometry.${elementFile.model.replace(".geo.json", "")}`;
          geoFile = await projZip.folder("assets").file(elementFile.model).async("string");
          exportZip2.folder("models").folder("blocks").file(elementFile.model, geoFile);
        }
        blockComponents["minecraft:geometry"] = modelID;
        let texturesObj = elementFile.textures;
        if (texturesObj["item"]) {
          delete texturesObj["item"];
        }
        let texturesKeys = Object.keys(texturesObj);
        let materialInstances = getMaterialInstances(geoFile);
        blockComponents["minecraft:material_instances"] = {};
        for (let j = 0; j < texturesKeys.length; j++) {
          if (texturesKeys[j] != "item") {
            let materialName;
            if (texturesKeys[j] == "default") {
              materialName = "*";
            } else {
              materialName = materialInstances[j];
            }
            let textureID = `${projManifest.namespace}:${(texturesObj[texturesKeys[j]]).replace(".png", "")}`;
            if (!fileListInFolder("textures/blocks", false, exportZip2).includes(texturesObj[texturesKeys[j]])) {
              console.log(texturesObj);
              console.log(j);
              let texture = await projZip.folder("assets").file(texturesObj[texturesKeys[j]]).async("blob");
              exportZip2.folder("textures").folder("blocks").file(texturesObj[texturesKeys[j]], texture);
            }
            if (!Object.keys(terrainTextureFile.texture_data).includes(textureID)) {
              terrainTextureFile.texture_data[textureID] = {
                "textures": `textures/blocks/${(texturesObj[texturesKeys[j]]).replace(".png", "")}`
              };
            }
            blockComponents["minecraft:material_instances"][materialName] = {
              "texture": textureID
            };
          }
        }
        if (typeof blockComponents["minecraft:flower_pottable"] == "object") {
          blockComponents["minecraft:embedded_visual"] = {
            "geometry": modelID,
            "material_instances": blockComponents["minecraft:material_instances"]
          };
        }
        languageFile += `tile.${namespacedID}.name=${elementFile.displayName}\n`;
        let exportObj = {
          "format_version": formatVersion,
          "minecraft:block": {
            "description": {
              "identifier": namespacedID,
              "menu_category": {
                "category": elementFile.invCategory
              },
              "traits": blockTraits
            },
            "components": blockComponents,
            "permutations": blockPermutations
          }
        };
        if (parsedFile[3]) {
          exportObj.custom_components = parsedFile[3];
        }
        exportedFile1 = JSON.stringify(exportObj, null, 4);
        exportZip1.folder("blocks").file(`${elementFile.id}.json`, exportedFile1);
      } else if (role == "Entity") {
        let parsedFile = await parseEntityComponents(elementFile);

        let exportObj1 = {
          "format_version": formatVersion,
          "minecraft:entity": {
            "description": {
              "identifier": namespacedID,
              "is_summonable": true,
              "is_spawnable": true
            },
            "components": parsedFile[0]
          }
        };

        let exportObj2 = {
          "format_version": formatVersion,
          "minecraft:client_entity": {
            "description": {
              "identifier": namespacedID,
              "materials": {
                "default": "entity_alphatest"
              },
              "textures": {},
              "geometry": {
                "default": `geometry.${elementFile.id}`
              },
              "render_controllers": [
                `controller.render.${elementFile.id}`
              ],
              "enable_attachables": elementFile.additionalOptions.enableAttachables,
              "hide_armor": elementFile.additionalOptions.hideArmor
            }
          }
        };
        let modelFile = JSON.parse(await projZip.folder("assets").file(elementFile.model).async("string"));
        modelFile["minecraft:geometry"][0]["description"]["identifier"] = `geometry.${elementFile.id}`;
        exportZip2.folder("models").folder("entity").file(`geometry.${elementFile.id}.json`, JSON.stringify(modelFile));
        let textureList = elementFile.textures;
        for (let j = 0; j < textureList.length; j++) {
          let texture = textureList[j];
          exportObj2["minecraft:client_entity"]["description"]["textures"][texture[0]] = `textures/entity/${elementFile.id}/${texture[1].replace(".png", "")}`;
          let textureFile = await projZip.folder("assets").file(texture[1]).async("blob");
          exportZip2.folder("textures").folder("entity").folder(elementFile.id).file(texture[1], textureFile);
        }
        if (parsedFile[1]["spawn_egg"]) {
          exportObj2["minecraft:client_entity"]["description"]["spawn_egg"] = parsedFile[1]["spawn_egg"];
        }

        let exportObj3 = {
          "format_version": formatVersion,
          "render_controllers": {}
        };
        exportObj3.render_controllers[`controller.render.${elementFile.id}`] = {
          "geometry": "geometry.default",
          "materials": [
            {
              "*": "material.default"
            }
          ],
          "textures": ["texture.default"]
        };

        exportedFile1 = JSON.stringify(exportObj1, null, 4);
        exportedFile2 = JSON.stringify(exportObj2, null, 4);
        exportedFile3 = JSON.stringify(exportObj3, null, 4);
        exportZip1.folder("entities").file(`${elementFile.id}.json`, exportedFile1);
        exportZip2.folder("entity").file(`${elementFile.id}.json`, exportedFile2);
        exportZip2.folder("render_controllers").file(`${elementFile.id}.rc.json`, exportedFile3);

        languageFile += `entity.${namespacedID}.name=${elementFile.displayName}\n`;
        languageFile += `action.hint.exit.${namespacedID}=Press SHIFT to dismount\n`;
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
          let ingredients = Object.values(parsedGrid[1]);
          let unlock = [];
          for (let j = 0; j < ingredients.length; j++) {
            unlock.push({
              "item": ingredients[j]
            });
          }
          exportObj["minecraft:recipe_shaped"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["crafting_table"],
            "pattern": parsedGrid[0],
            "key": parsedGrid[1],
            "unlock": unlock,
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
          let ingredients = craftingGrid.slice(0, -1).map(v => v[0]).filter(Boolean);
          let unlock = [];
          for (let j = 0; j < ingredients.length; j++) {
            unlock.push({
              "item": ingredients[j]
            });
          }
          exportObj["minecraft:recipe_shapeless"] = {
            "description": {
              "identifier": namespacedID
            },
            "tags": ["crafting_table"],
            "ingredients": ingredients,
            "unlock": unlock,
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
    /*} catch(err) {
      logExporter(err, "error");
    }*/
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
  loaderDlg.classList.add("is-active");
}
function closeLoader() {
  loaderDlg.classList.remove("is-active");
}

function encodeText(text) {
  return text.replaceAll(" ", "_space_").replaceAll(".", "_dot_").replaceAll("(", "_op_").replaceAll(")", "_cp_");
}
function decodeText(text) {
  return text.replaceAll("_space_", " ").replaceAll("_dot_", ".").replaceAll("_op_", "(").replaceAll("_cp_", ")");
}

function removeElementDropdown(elementID, type) {
  if (type == "element") {
    $(`#${elementID}_elementMenu`).remove();
  } else {
    $(`#${encodeText(elementID)}_assetMenu`).remove();
  }
}

function addElement(loadingProj) {
  const name = $("#addElementNameBox").val();
  const id = $("#addElementIDBox").val();

  const elementExists =
    fileListInFolder("elements").includes(name + ".json");

  const validName = isValidElementName(name);
  const validID = isValidElementID(id);

  if (elementExists && !loadingProj) {
    alert("That element already exists!");
  } else if (!validName) {
    if (name != ".DS_Store") {
      alert("The element name is invalid! Allowed characters: a-z, A-Z, 0-9, _");
    }
  } else if (!validID) {
    alert("The element ID is invalid! Allowed characters: a-z, 0-9, _");
  } else {
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
    elementBox.setAttribute("class", "card elementbox");
    let elementName = $("#addElementNameBox").val();
    elementBox.setAttribute("id", "elementbox" + elementName);
    elementBox.innerHTML = `
    <h5 class="title is-5" id="${"elementboxname" + elementName}">${elementName}</h5>
    <button class="button is-primary" onclick="editElement('${elementName}')" id="${elementName}_editBtn"><i class="fas fa-pencil"></i> Edit</button>
    <div class="dropdown">
      <div class="dropdown-trigger">
        <button class="button is-white veryBold" aria-haspopup="true" aria-controls="dropdown-menu" id="${elementName}_optionBtn">&#x22EF;</button>
      </div>
      <div class="dropdown-menu" id="${elementName}_optionsMenu">
        <div class="dropdown-content" style="color:var(--bulma-text);">
          <a class="dropdown-item" onclick="openElementInfo('${elementName}', 'element')"><i class="fas fa-circle-info"></i> Info</a>
          <a class="dropdown-item" onclick="openRenameElement('${elementName}', 'element')"><i class="fas fa-pencil"></i> Rename</a>
          <a class="dropdown-item" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${elementName}', 'element')"><i class="fas fa-trash"></i> Delete</a>
        </div>
      </div>
    </div>
    `;
    parentDiv.appendChild(elementBox);
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

document.addEventListener("click", (e) => {
  // Find the closest dropdown (if any)
  const dropdown = e.target.closest(".dropdown");

  // Close all dropdowns first
  document.querySelectorAll(".dropdown.is-active").forEach(d => {
    d.classList.remove("is-active");
  });

  // If the click was inside a dropdown trigger, toggle that one
  if (dropdown && e.target.closest(".dropdown-trigger")) {
    dropdown.classList.toggle("is-active");
  }
});


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
  const name = $("#addAssetNameBox").val();

  const assetExists =
    fileListInFolder("assets").includes(name);

  const validName = isValidAssetName(name);

  if (assetExists && !loadingProj) {
    alert("That asset already exists!");
  } else if (!validName) {
    if (name != ".DS_Store") {
      alert("The asset name is invalid! Allowed characters: a-z, 0-9, _");
    }
  } else {
    let file;
    let fileType;
    let fileName;
    if (loadingProj) {
      file = fileToLoad;
      fileName = fileToLoadName;
      fileType = afterLastDot(fileName);
    } else {
      if (addAssetMode == "upload") {
        file = addAssetUploadInput.files[0];
      } else if (addAssetMode == "blank") {
        file = await generateEmptyPNGBlob(addAssetBlankBoxW.value, addAssetBlankBoxH.value);
      }
      fileName = addAssetNameBox.value;
      fileType = afterLastDot(fileName);
    }
    let fileNameEncoded = encodeText(fileName);
    let previewBox;
    let preview;
    let editBtn;
    let optionsBtn;
    if (file) {
      if (!loadingProj) {
        projZip.folder("assets").file(fileName, file);
      }
      assetCount++;
      var parentDiv = document.getElementById("tabs-2");
      var assetBox = document.createElement("div");
      var center = document.createElement("center");
      assetBox.setAttribute("class", "card elementbox");
      assetBox.setAttribute("id", "elementbox" + fileNameEncoded);
      center.innerHTML = `<h5 class="title is-5" id="${"elementboxname" + fileNameEncoded}">${fileName}</h5>`;
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
        editBtn.setAttribute("class", "button is-primary");
        editBtn.innerHTML = `<i class="fas fa-pencil"></i> Edit`;
      }
      if (fileType == "wav") {
        editBtn = document.createElement("button");
        editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}', 'wav')`);
        editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
        editBtn.setAttribute("class", "button is-primary");
        editBtn.innerHTML = `<i class="fas fa-volume-low"></i> View`;
      }
      optionsBtn = document.createElement("div");
      optionsBtn.setAttribute("class", "dropdown");
      optionsBtn.innerHTML = `
      <div class="dropdown-trigger">
        <button class="button is-white veryBold" aria-haspopup="true" aria-controls="dropdown-menu" id="${fileNameEncoded}_assetOptionBtn">&#x22EF;</button>
      </div>
      <div class="dropdown-menu" id="${fileNameEncoded}_assetOptionsMenu">
        <div class="dropdown-content" style="color:var(--bulma-text);">
          <a class="dropdown-item" onclick="openElementInfo('${fileNameEncoded}', 'asset')"><i class="fas fa-circle-info"></i> Info</a>
          <a class="dropdown-item" onclick="openRenameElement('${fileNameEncoded}', 'asset')"><i class="fas fa-pencil"></i> Rename</a>
          <a class="dropdown-item" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${fileNameEncoded}', 'asset')"><i class="fas fa-trash"></i> Delete</a>
        </div>
      </div>
      `;
      if (fileType == "png" || fileType == "wav") {
        center.appendChild(editBtn);
        center.appendChild(document.createTextNode(" "));
      }
      center.appendChild(optionsBtn);
      assetBox.appendChild(center);
      parentDiv.appendChild(assetBox);
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

let idbPromise = null;

function openProjectDB() {
  if (idbPromise) return idbPromise;

  idbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open("projectStorage", 2);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains("projects")) {
        db.createObjectStore("projects", { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains("projectInfo")) {
        const infoStore = db.createObjectStore("projectInfo", { keyPath: "id" });
        infoStore.createIndex("by_name", "name", { unique: false });
        infoStore.createIndex("by_type", "type", { unique: false });
        infoStore.createIndex("by_lastSaved", "lastSaved", { unique: false });
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return idbPromise;
}

async function listProjectsDB() {
  const db = await openProjectDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("projectInfo", "readonly");
    const req = tx.objectStore("projectInfo").getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = reject;
  });
}

async function loadProjectDB(id) {
  const db = await openProjectDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("projects", "readonly");
    const req = tx.objectStore("projects").get(id);

    req.onsuccess = () => resolve(req.result?.blob);
    req.onerror = reject;
  });
}

async function deleteProjectDB(id) {
  const db = await openProjectDB();
  const tx = db.transaction(
    ["projects", "projectInfo"],
    "readwrite"
  );

  tx.objectStore("projects").delete(id);
  tx.objectStore("projectInfo").delete(id);

  return new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = reject;
  });
}

async function saveProject() {
  document.getElementById("savingText").innerHTML = "<i class='loadingSpinner'></i> Saving...";
  document.getElementById("savingFlyoutText").innerHTML = `Saving...`;
  $("#savingFlyout")
    .position({
      my: "right bottom",
      at: "right top",
      of: $("#savingBox")
    });
  savingFlyoutButton.classList.add("is-loading");

  if (storageMode == "file_system") {
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
  } else {
    const db = await openProjectDB();
    const blob = await projZip.generateAsync({ type: "blob" });

    const tx = db.transaction(
      ["projects", "projectInfo"],
      "readwrite"
    );

    // Store the actual project data
    tx.objectStore("projects").put({
      id: currentProjectId,
      blob
    });

    // Store lightweight metadata
    tx.objectStore("projectInfo").put({
      id: currentProjectId,
      name: projManifest.name,
      type: projManifest.type,
      namespace: projManifest.namespace,
      lastSaved: Date.now()
    });

    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = reject;
    });
  }

  console.log("Project saved!");
  document.getElementById("savingText").innerHTML = "<i class='fa-solid fa-circle-check'></i> Saved";
  document.getElementById("savingFlyoutText").innerHTML = `Last saved on ${getFormattedDateTime()}`;
  $("#savingFlyout")
    .position({
      my: "right bottom",
      at: "right top",
      of: $("#savingBox")
    });
  savingFlyoutButton.classList.remove("is-loading");
}
async function saveProjectAs() {
  if (storageMode == "file_system") {
    projFileHandle = await window.showSaveFilePicker({
      suggestedName: (projManifest?.name || "project") + ".zip",
      types: [{
        description: "Moddery Project",
        accept: { "application/zip": [".zip"] }
      }]
    });

    // After choosing location, save normally
    return await saveProject();
  } else {
    // IndexedDB / local storage mode → download ZIP

    const blob = await projZip.generateAsync({ type: "blob" });

    const filename =
      (projManifest?.name || "project") + ".zip";

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Also save to IndexedDB so it remains in the project list
    await saveProject();
  }
}

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
  elementInfoDlg.classList.add("is-active");
  let elementIdentifier;
  let elementType;
  if (type == "asset") {
    elementInfoDlgTitle.innerHTML = "Asset Info";
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
  } else {
    elementInfoDlgTitle.innerHTML = "Element Info";
    projZip.folder("elements").file(elementID + ".json").async("string").then(function (data) {
      elementIdentifier = JSON.parse(data).id;
      elementType = JSON.parse(data).type;
      elementInfoDlgContent.innerHTML = `
      Name: ${elementID}<br>
      ID: ${elementIdentifier}<br>
      Type: ${elementType}
      `;
    });
  }
}
function openRenameElement(elementID, type) {
  renameDlg.classList.add("is-active");
  renameElementID = elementID;
  renameElementType = type;
  if (type == "asset") {
    renameDlgTitle.innerHTML = "Rename Asset";
  } else {
    renameDlgTitle.innerHTML = "Rename Element";
  }
  renameDlgText.innerHTML = `Rename ${decodeText(elementID)} to:`;
  let renameBox = document.getElementById("renameDlgBox");
  renameBox.value = decodeText(elementID);
}
function openDeleteElement(elementID, type) {
  deleteDlg.classList.add("is-active");
  deleteElementID = elementID;
  deleteElementType = type;
  if (type == "asset") {
    deleteDlgTitle.innerHTML = "Delete Asset?";
    deleteDlgText.innerHTML = `Are you sure you want to delete the asset "${decodeText(elementID)}"?`;
  } else {
    deleteDlgTitle.innerHTML = "Delete Element?";
    deleteDlgText.innerHTML = `Are you sure you want to delete the element "${decodeText(elementID)}"?`;
  }
}

function closeElementInfo() {
  elementInfoDlg.classList.remove("is-active");
}
function closeRenameElement() {
  renameDlg.classList.remove("is-active");
}
function closeDeleteElement() {
  deleteDlg.classList.remove("is-active");
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
  if (renameDlgBox.value == renameElementID) {
    return;
  }
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
    let elementName = renameDlgBox.value;
    elementBox.id = "elementbox" + elementName;
    elementBox.innerHTML = `
    <h5 class="title is-5" id="${"elementboxname" + elementName}">${elementName}</h5>
    <button class="button is-primary" onclick="editElement('${elementName}')" id="${elementName}_editBtn"><i class="fas fa-pencil"></i> Edit</button>
    <div class="dropdown">
      <div class="dropdown-trigger">
        <button class="button is-white veryBold" aria-haspopup="true" aria-controls="dropdown-menu" id="${elementName}_optionBtn">&#x22EF;</button>
      </div>
      <div class="dropdown-menu" id="${elementName}_optionsMenu">
        <div class="dropdown-content" style="color:var(--bulma-text);">
          <a class="dropdown-item" onclick="openElementInfo('${elementName}', 'element')"><i class="fas fa-circle-info"></i> Info</a>
          <a class="dropdown-item" onclick="openRenameElement('${elementName}', 'element')"><i class="fas fa-pencil"></i> Rename</a>
          <a class="dropdown-item" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${elementName}', 'element')"><i class="fas fa-trash"></i> Delete</a>
        </div>
      </div>
    </div>
    `;
  } else {
    var assetBox = elementBox;
    var fileName = decodeText(renameDlgBox.value);
    var fileNameEncoded = encodeText(renameDlgBox.value);
    var fileType = afterLastDot(fileName);
    projZip.folder("assets").file(decodeText(fileName)).async("blob").then(async function (data) {
      var file = data;
      var center = document.createElement("center");
      assetBox.setAttribute("class", "card elementbox");
      assetBox.setAttribute("id", "elementbox" + fileNameEncoded);
      assetBox.innerHTML = "";
      center.innerHTML = `<h5 class="title is-5" id="${"elementboxname" + fileNameEncoded}">${fileName}</h5>`;
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
        editBtn.setAttribute("class", "button is-primary");
        editBtn.innerHTML = `<i class="fas fa-pencil"></i> Edit`;
      }
      if (fileType == "wav") {
        editBtn = document.createElement("button");
        editBtn.setAttribute("onclick", `editAsset('${fileNameEncoded}', 'wav')`);
        editBtn.setAttribute("id", `${fileNameEncoded}_assetEditBtn`);
        editBtn.setAttribute("class", "button is-primary");
        editBtn.innerHTML = `<i class="fas fa-volume-low"></i> View`;
      }
      optionsBtn = document.createElement("div");
      optionsBtn.setAttribute("class", "dropdown");
      optionsBtn.innerHTML = `
      <div class="dropdown-trigger">
        <button class="button is-white veryBold" aria-haspopup="true" aria-controls="dropdown-menu" id="${fileNameEncoded}_assetOptionBtn">&#x22EF;</button>
      </div>
      <div class="dropdown-menu" id="${fileNameEncoded}_assetOptionsMenu">
        <div class="dropdown-content" style="color:var(--bulma-text);">
          <a class="dropdown-item" onclick="openElementInfo('${fileNameEncoded}', 'asset')"><i class="fas fa-circle-info"></i> Info</a>
          <a class="dropdown-item" onclick="openRenameElement('${fileNameEncoded}', 'asset')"><i class="fas fa-pencil"></i> Rename</a>
          <a class="dropdown-item" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${fileNameEncoded}', 'asset')"><i class="fas fa-trash"></i> Delete</a>
        </div>
      </div>
      `;
      if (fileType == "png" || fileType == "wav") {
        center.appendChild(editBtn);
        center.appendChild(document.createTextNode(" "));
      }
      center.appendChild(optionsBtn);
      assetBox.appendChild(center);
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

async function addTab(role, elementID) {
  if (role == "Script") {
    editorScriptList = (await getScriptList(2)).filter(item => item[0] != elementID);
  }
  var label = `${getElementTabIcon(role)} ${decodeText(elementID)}`,
    id = "tabs-" + tabCounter,
    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
    tabContentHtml = getTabContent(role, elementID);

  li.addClass("has-close");
 
  tabs.find( ".ui-tabs-nav" ).append( li );
  if (shouldRemoveMargin(role)) {
    marginClass = 'class="noMargin elementTabArea" ';
  } else {
    marginClass = 'class="elementTabArea" ';
  }
  tabs.append( "<div " + marginClass + "id='" + id + "'>" + tabContentHtml + "</div>" );
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
  handleThemeChange();
  updateTabHeight();
}

tabs.on( "click", "span.ui-icon-close", function() {
  var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  saveElement(openElements[panelId]);
  delete openElements[panelId];
  $( "#" + panelId ).remove();
  tabs.tabs( "refresh" );
  if (projFileHandle || currentProjectId) {
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
  let list = fileListInFolder("assets", "png");
  list.unshift("None");
  return list;
}
function getStructureList() {
  let list = fileListInFolder("assets", "mcstructure");
  list.unshift("None");
  return list;
}
function getModelList(mode) {
  let vanillaList;
  if (mode == "entity") {
    vanillaList = ["None"];
  } else {
    vanillaList = ["None", "Full Block", "Plant"];
  }
  return vanillaList.concat(fileListInFolder("assets", "json"));
}
async function getScriptList(mode = 1) {
  let list;
  if (mode == 2) {
    list = (await getFilteredElements("Script")).map(obj => [obj.name, `${obj.id}.js`]);
  } else {
    list = (await getFilteredElements("Script")).map(obj => obj.name);
    list.unshift("None");
  }
  return list;
}
async function getLootTableList() {
  let list = (await getFilteredElements("Loot Table")).map(obj => obj.name);
  list.unshift("None");
  return list;
}
async function getTradeTableList() {
  let list = (await getFilteredElements("Trade Table")).map(obj => obj.name);
  list.unshift("None");
  return list;
}

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

function attachValidation(input, validator, ignoreEmpty = true) {
  input.addEventListener("input", () => {
    if (validator(input.value) || (ignoreEmpty && input.value == "")) {
      input.classList.remove("invalidTextBox");
    } else {
      input.classList.add("invalidTextBox");
    }
  });
}

attachValidation(newProjNamespaceBox, isValidElementID);
attachValidation(editProjNamespaceBox, isValidElementID);
attachValidation(addElementNameBox, isValidElementName);
attachValidation(addElementIDBox, isValidElementID);
attachValidation(addAssetNameBox, isValidAssetName);