const appVersion = "2.2.308";
const buildDate = "2/20/2026";
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
let defaultThemes = ["system", "light", "dark"];
let customThemes = {};
let builtInThemes = {
  "sunrise": {
    name: "Sunrise",
    url: "https://ejd799.github.io/moddery/themes/sunrise.json",
  },
  "sunset": {
    name: "Sunset",
    url: "https://ejd799.github.io/moddery/themes/sunset.json"
  },
  "minecraft": {
    name: "Minecraft",
    url: "https://ejd799.github.io/moddery/themes/minecraft.json"
  },
  "rainbow": {
    name: "Rainbow",
    url: "https://ejd799.github.io/moddery/themes/rainbow.json"
  }
};
let themeIcons = {

};
var generalThemeType;
let currentProjectId = null;
let projDeleteID;

var editorScriptList;
var editorTextureList;

let addElementMode = "blank";
let addAssetMode = "upload";

let progressBarMax;

let projectTypeMenuOptions = {
  "Bedrock Edition": [
    ["Addon", "be_addon"],
    ["Resource Pack", "be_rp"]
  ],
  "Java Edition": [
    ["Datapack", "je_dp"],
    ["Resource Pack", "je_rp"],
    ["Forge Mod", "je_forge"],
    ["Fabric Mod", "je_fabric"],
    ["Spigot Plugin", "je_spigot"],
  ],
  "Other": [
    ["MTR3 Content (Java)", "mtr3_je"],
    ["MTR4 Content (Java)", "mtr4_je"],
    ["MTR Content (Bedrock)", "mtr_be"]
  ]
}
let projectTypes = {
  "be_addon": {
    name: "Bedrock Addon",
    shortname: "Addon",
    exportOptions: [
      ["Addon (.mcaddon)", "1mcaddon"],
      ["Addon (.zip)", "1zip"],
      ["Packs (.mcpack)", "2mcpack"],
      ["Packs (.zip)", "2zip"]
    ],
    features: ["scriptEntry"],
    supportedVersions: [
      "1.21.90",
      "1.21.100",
      "1.21.110",
      "1.21.120",
      "1.21.130"
    ],
    disabled: false,
    editors: {
      "Function": {
        url: "editor/bedrock/function.html",
        icon: "fas fa-terminal",
        saveType: "code",
        show: 1
      },
      "Script": {
        url: "editor/bedrock/script.html",
        icon: "fas fa-code",
        saveType: "code",
        show: 1
      },
      "Item": {
        url: "editor/bedrock/item.html",
        icon: "fa-regular fa-gem",
        saveType: "regular",
        show: 1
      },
      "Block": {
        url: "editor/bedrock/block.html",
        icon: "fas fa-cube",
        saveType: "regular",
        show: 1
      },
      "Biome": {
        url: "editor/bedrock/biome.html",
        icon: "fas fa-tree",
        saveType: "regular",
        show: 1
      },
      "Structure": {
        url: "editor/bedrock/structure.html",
        icon: "fas fa-cubes",
        saveType: "regular",
        show: 1
      },
      "Recipe": {
        url: "editor/bedrock/recipe.html",
        icon: "fas fa-table-cells",
        saveType: "regular",
        show: 1
      },
      "Entity": {
        url: "editor/bedrock/entity.html",
        icon: "fas fa-paw",
        saveType: "regular",
        show: 1
      },
      "Loot Table": {
        url: "editor/bedrock/loot_table.html",
        icon: "fas fa-coins",
        saveType: "regular",
        show: 1
      },
      "Trade Table": {
        url: "editor/bedrock/trade_table.html",
        icon: "fas fa-right-left",
        saveType: "regular",
        show: 1
      },
      "Image": {
        url: "editor/image.html",
        icon: "fas fa-image",
        saveType: "media",
        show: 0
      },
      "Audio": {
        url: "editor/audio.html",
        icon: "fas fa-volume-high",
        saveType: "media",
        show: 0
      },
      "Text": {
        url: "editor/text.html",
        icon: "fa-regular fa-file",
        saveType: "media",
        show: 0
      },
      "default": {
        url: "about:blank",
        icon: "fa-regular fa-file",
        saveType: "regular",
        show: 0
      }
    }
  },
  "be_rp": {
    name: "Bedrock Resource Pack",
    shortname: "Resource Pack",
    features: [],
    supportedVersions: [
      "1.21.90",
      "1.21.100",
      "1.21.110",
      "1.21.120",
      "1.21.130"
    ],
    disabled: true,
    exportOptions: [
      ["Pack (.mcpack)", "mcpack"],
      ["Pack (.zip)", "zip"]
    ],
  },
  "je_dp": {
    name: "Java Datapack",
    shortname: "Datapack",
    features: [],
    supportedVersions: [
      "1.20.3/1.20.4",
      "1.20.5/1.20.6",
      "1.21",
      "1.21.1",
      "1.21.2/1.21.3",
      "1.21.4",
      "1.21.5",
      "1.21.6",
      "1.21.7/1.21.8",
      "1.21.9/1.21.10",
      "1.21.11"
    ],
    disabled: false,
    exportOptions: [
      ["Packs (.zip)", "2zip"]
    ],
    editors: {
      "Function": {
        url: "editor/javadp/function.html",
        icon: "fas fa-terminal",
        saveType: "code",
        show: 1
      },
      "Item": {
        url: "editor/javadp/item.html",
        icon: "fa-regular fa-gem",
        saveType: "regular",
        show: 1
      },
      "Block": {
        url: "editor/javadp/block.html",
        icon: "fas fa-cube",
        saveType: "regular",
        show: 1
      },
      "Biome": {
        url: "editor/javadp/biome.html",
        icon: "fas fa-tree",
        saveType: "regular",
        show: 1
      },
      "Structure": {
        url: "editor/javadp/structure.html",
        icon: "fas fa-cubes",
        saveType: "regular",
        show: 1
      },
      "Recipe": {
        url: "editor/javadp/recipe.html",
        icon: "fas fa-table-cells",
        saveType: "regular",
        show: 1
      },
      "Entity": {
        url: "editor/javadp/entity.html",
        icon: "fas fa-paw",
        saveType: "regular",
        show: 1
      },
      "Loot Table": {
        url: "editor/javadp/loot_table.html",
        icon: "fas fa-coins",
        saveType: "regular",
        show: 1
      },
      "Dimension": {
        url: "editor/javadp/dimension.html",
        icon: "fas fa-earth-americas",
        saveType: "regular",
        show: 1
      },
      "Advancement": {
        url: "editor/javadp/advancement.html",
        icon: "fas fa-circle-up",
        saveType: "regular",
        show: 1
      },
      "Enchantment": {
        url: "editor/javadp/enchantment.html",
        icon: "fas fa-wand-magic-sparkles",
        saveType: "regular",
        show: 1
      },
      "Armor Trim": {
        url: "editor/javadp/armor_trim.html",
        icon: "fas fa-shirt",
        saveType: "regular",
        show: 1
      },
      "Painting": {
        url: "editor/javadp/painting.html",
        icon: "fas fa-palette",
        saveType: "regular",
        show: 1
      },
      "Banner Pattern": {
        url: "editor/javadp/banner_pattern.html",
        icon: "fas fa-scroll",
        saveType: "regular",
        show: 1
      },
      "Music Disc": {
        url: "editor/javadp/music_disc.html",
        icon: "fas fa-compact-disc",
        saveType: "regular",
        show: 1
      },
      "Dialog": {
        url: "editor/javadp/dialog.html",
        icon: "fas fa-window-maximize",
        saveType: "regular",
        show: 1
      },
      "Image": {
        url: "editor/image.html",
        icon: "fas fa-image",
        saveType: "media",
        show: 0
      },
      "Audio": {
        url: "editor/audio.html",
        icon: "fas fa-volume-high",
        saveType: "media",
        show: 0
      },
      "Text": {
        url: "editor/text.html",
        icon: "fa-regular fa-file",
        saveType: "media",
        show: 0
      },
      "default": {
        url: "about:blank",
        icon: "fa-regular fa-file",
        saveType: "regular",
        show: 0
      }
    }
  },
  "je_rp": {
    name: "Java Resource Pack",
    shortname: "Resource Pack",
    features: [],
    supportedVersions: [
      "1.20",
      "1.20.1",
      "1.20.2",
      "1.20.3/1.20.4",
      "1.20.5/1.20.6",
      "1.21",
      "1.21.1",
      "1.21.2/1.21.3",
      "1.21.4",
      "1.21.5",
      "1.21.6",
      "1.21.7/1.21.8",
      "1.21.9/1.21.10",
      "1.21.11"
    ],
    disabled: true,
    exportOptions: [
      ["Pack (.zip)", "zip"]
    ],
  },
  "je_forge": {
    name: "Java Forge Mod",
    shortname: "Forge Mod",
    features: ["scriptEntry"],
    supportedVersions: [
      "1.20",
      "1.20.1",
      "1.20.2",
      "1.20.3/1.20.4",
      "1.20.5/1.20.6",
      "1.21",
      "1.21.1",
      "1.21.2/1.21.3",
      "1.21.4",
      "1.21.5",
      "1.21.6",
      "1.21.7/1.21.8",
      "1.21.9/1.21.10",
      "1.21.11"
    ],
    disabled: true,
    exportOptions: [
      ["Mod (.jar)", "jar"]
    ],
  },
  "je_fabric": {
    name: "Java Fabric Mod",
    shortname: "Fabric Mod",
    features: ["scriptEntry"],
    supportedVersions: [
      "1.20",
      "1.20.1",
      "1.20.2",
      "1.20.3/1.20.4",
      "1.20.5/1.20.6",
      "1.21",
      "1.21.1",
      "1.21.2/1.21.3",
      "1.21.4",
      "1.21.5",
      "1.21.6",
      "1.21.7/1.21.8",
      "1.21.9/1.21.10",
      "1.21.11"
    ],
    disabled: true,
    exportOptions: [
      ["Mod (.jar)", "jar"]
    ],
  },
  "je_spigot": {
    name: "Java Spigot Plugin",
    shortname: "Spigot Plugin",
    features: ["scriptEntry"],
    supportedVersions: [
      "1.20",
      "1.20.1",
      "1.20.2",
      "1.20.3/1.20.4",
      "1.20.5/1.20.6",
      "1.21",
      "1.21.1",
      "1.21.2/1.21.3",
      "1.21.4",
      "1.21.5",
      "1.21.6",
      "1.21.7/1.21.8",
      "1.21.9/1.21.10",
      "1.21.11"
    ],
    disabled: true,
    exportOptions: [
      ["Plugin (.jar)", "jar"]
    ],
  },
  "mtr3_je": {
    name: "MTR3 Content (Java)",
    shortname: "MTR3 Content",
    features: [],
    supportedVersions: [
      "1.16.2-1.16.5",
      "1.17.x",
      "1.18.x",
      "1.19",
      "1.19.2-1.19.4",
      "1.20-1.20.1",
      "1.20.4"
    ],
    disabled: true,
    exportOptions: [
      ["Pack (.zip)", "zip"]
    ],
    editors: {
      "Vehicle": {
        url: "editor/mtr3je/vehicle.html",
        icon: "fas fa-train-subway",
        saveType: "regular",
        show: 1
      },
      "Sign": {
        url: "editor/mtr3je/sign.html",
        icon: "fas fa-signs-post",
        saveType: "regular",
        show: 1
      },
      "PIDS": {
        url: "editor/mtr3je/pids.html",
        icon: "fas fa-sign-hanging",
        saveType: "regular",
        show: 1
      },
      "Image": {
        url: "editor/image.html",
        icon: "fas fa-image",
        saveType: "media",
        show: 0
      },
      "Audio": {
        url: "editor/audio.html",
        icon: "fas fa-volume-high",
        saveType: "media",
        show: 0
      },
      "Sound": {
        url: "editor/mtr3je/sound.html",
        icon: "fas fa-volume-high",
        saveType: "regular",
        show: 1
      },
      "default": {
        url: "about:blank",
        icon: "fa-regular fa-file",
        saveType: "regular",
        show: 0
      }
    }
  },
  "mtr4_je": {
    name: "MTR4 Content (Java)",
    shortname: "MTR4 Content",
    features: [],
    supportedVersions: [
      "1.16.2-1.16.5",
      "1.17.x",
      "1.18.x",
      "1.19",
      "1.19.2-1.19.4",
      "1.20-1.20.1",
      "1.20.4"
    ],
    disabled: true,
    exportOptions: [
      ["Pack (.zip)", "zip"]
    ],
    editors: {
      "Vehicle": {
        url: "editor/mtr4je/vehicle.html",
        icon: "fas fa-train-subway",
        saveType: "regular",
        show: 1
      },
      "Sign": {
        url: "editor/mtr4je/sign.html",
        icon: "fas fa-signs-post",
        saveType: "regular",
        show: 1
      },
      "PIDS": {
        url: "editor/mtr4je/pids.html",
        icon: "fas fa-sign-hanging",
        saveType: "regular",
        show: 1
      },
      "Image": {
        url: "editor/image.html",
        icon: "fas fa-image",
        saveType: "media",
        show: 0
      },
      "Audio": {
        url: "editor/audio.html",
        icon: "fas fa-volume-high",
        saveType: "media",
        show: 0
      },
      "Sound": {
        url: "editor/mtr4je/sound.html",
        icon: "fas fa-volume-high",
        saveType: "regular",
        show: 1
      },
      "default": {
        url: "about:blank",
        icon: "fa-regular fa-file",
        saveType: "regular",
        show: 0
      }
    }
  },
  "mtr_be": {
    name: "MTR Content (Bedrock)",
    shortname: "MTR Content",
    features: [],
    supportedVersions: [
      "1.21.130"
    ],
    disabled: true,
    exportOptions: [
      ["Addon (.mcaddon)", "1mcaddon"],
      ["Addon (.zip)", "1zip"],
      ["Packs (.mcpack)", "2mcpack"],
      ["Packs (.zip)", "2zip"]
    ],
    editors: {
      "Vehicle": {
        url: "editor/mtrbe/vehicle.html",
        icon: "fas fa-train-subway",
        saveType: "regular",
        show: 1
      },
      "Sign": {
        url: "editor/mtrbe/sign.html",
        icon: "fas fa-signs-post",
        saveType: "regular",
        show: 1
      },
      "PIDS": {
        url: "editor/mtrbe/pids.html",
        icon: "fas fa-sign-hanging",
        saveType: "regular",
        show: 1
      },
      "Image": {
        url: "editor/image.html",
        icon: "fas fa-image",
        saveType: "media",
        show: 0
      },
      "Audio": {
        url: "editor/audio.html",
        icon: "fas fa-volume-high",
        saveType: "media",
        show: 0
      },
      "Sound": {
        url: "editor/mtrbe/sound.html",
        icon: "fas fa-volume-high",
        saveType: "regular",
        show: 1
      },
      "default": {
        url: "about:blank",
        icon: "fa-regular fa-file",
        saveType: "regular",
        show: 0
      }
    }
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

  projectTypeMenuKeys = Object.keys(projectTypeMenuOptions)
  for (let i = 0; i < projectTypeMenuKeys.length; i++) {
    let optgroup = document.createElement("optgroup");
    optgroup.setAttribute("label", projectTypeMenuKeys[i]);
    let groupOptions = projectTypeMenuOptions[projectTypeMenuKeys[i]];
    for (let j = 0; j < groupOptions.length; j++) {
      let option = document.createElement("option");
      option.innerHTML = groupOptions[j][0];
      option.setAttribute("value", groupOptions[j][1]);
      if (projectTypes[groupOptions[j][1]].disabled) {
        option.setAttribute("disabled", "true");
      }
      optgroup.appendChild(option);
    }
    newProjType.appendChild(optgroup);
  }

  $("#navbarSave").hide();
  $("#navbarSaveAs").hide();
  $("#navbarExport").hide();

  bulmaSelectmenu.attachMenu(newProjType);
  bulmaSelectmenu.attachMenu(editProjMCVersionBox);
  bulmaSelectmenu.attachMenu(addElementType);
  bulmaSelectmenu.attachMenu(exportDlgModeBox);
  bulmaSelectmenu.attachMenu(storageModeBox);
});
function removeOptionByValue(selectEl, value) {
  for (let i = selectEl.options.length - 1; i >= 0; i--) {
    if (selectEl.options[i].value === value) {
      selectEl.remove(i);
      return; // remove only first match
    }
  }
}
async function getURLContents(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const contents = await response.text(); // or .json()
  return contents;
}

function isThemeInstalled(id) {
  return defaultThemes.includes(id) || customThemes[id];
}

function selectTheme(id) {
  if (editorTheme === id) return;

  editorTheme = id;
  setCookie("editorTheme", id, 399);

  if (id === "system") {
    autoThemeChange();
    document.documentElement.classList.remove("theme-dark");
  } else if (defaultThemes.includes(id)) {
    loadDefaultTheme(id);
    document.documentElement.classList.remove("theme-dark");
  } else {
    applyThemeCss(customThemes[id].stylesheet);
    document.documentElement.setAttribute("data-theme", id);
    if (customThemes[id].generalType == "dark") {
      document.documentElement.classList.add("theme-dark");
      document.documentElement.classList.remove("theme-light");
    } else {
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.classList.add("theme-light");
    }
  }
  handleFrameThemeChange();
  updateThemeSelector();
}

function loadDefaultTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  if (mode == "system") {
    autoThemeChange();
  }
  handleFrameThemeChange();
  themeStyleElement.innerHTML = "";
}

function applyThemeCss(cssText) {
  let styleEl = document.getElementById("themeStyleElement");
  styleEl.innerHTML = cssText;
  handleFrameThemeChange();
}

function createThemeBox(id, name, isBuiltIn = false) {
  if (!document.getElementById(`themeBox_${id}`)) {
    const box = document.createElement("div");
    box.className = "card themeBox";
    box.id = `themeBox_${id}`;

    box.innerHTML = `
      <h5 class="title is-5">${name}</h5>

      <div class="buttons">
        <button
          class="button is-primary"
          id="themeBoxBtn1_${id}"
          onclick="themeSelectorBtnAction('${id}', 1)">
          ${isThemeInstalled(id) ? "Select" : "Install"}
        </button>

        <button
          class="button is-danger newDeleteBtn2"
          id="themeBoxDelete_${id}"
          onclick="removeTheme('${id}')"
          style="display:none">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    document.getElementById("themesContainer").appendChild(box);
  }
}

async function addCustomTheme(input) {
  const data = typeof input === "string" ? JSON.parse(input) : input;
  const id = data.id;

  let cssFile;
  if (data.stylesheet.startsWith("http")) {
    cssFile = await getURLContents(data.stylesheet);
  } else {
    cssFile = data.stylesheet;
  }

  customThemes[id] = {
    name: data.name,
    stylesheet: cssFile,
    generalType: data.generalType
  };

  createThemeBox(id, data.name, {
    installed: true,
    isCustom: true
  });

  // Add to select menu
  /*if (!themeMenu.querySelector(`option[value="${id}"]`)) {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = data.name;
    themeMenu.appendChild(opt);
  }*/

  localStorage.setItem("customThemes", JSON.stringify(customThemes));
  updateThemeSelector();
}

function removeTheme(id) {
  if (defaultThemes.includes(id)) return;

  if (editorTheme === id) {
    selectTheme("system");
  }

  if (customThemes[id]) {
    delete customThemes[id];
    //removeOptionByValue(themeMenu, id);
  }

  document.getElementById(`themeBox_${id}`)?.remove();

  localStorage.setItem("customThemes", JSON.stringify(customThemes));
  updateThemeSelector();
}


async function themeSelectorBtnAction(themeId, btnIndex) {
  const btn = document.getElementById(`themeBoxBtn${btnIndex}_${themeId}`);

  // Already installed → select
  if (isThemeInstalled(themeId)) {
    themeStyleElement.innerHTML = "";
    selectTheme(themeId);
    return;
  }

  // Install built-in theme
  btn.classList.add("is-loading");

  try {
    const jsonText = await getURLContents(builtInThemes[themeId].url);
    await addCustomTheme(jsonText);
    selectTheme(themeId);
  } catch (err) {
    console.error("Theme install failed:", err);
  } finally {
    btn.classList.remove("is-loading");
  }
}

/*async function addCustomTheme(input) {
  const data = typeof input === "string" ? JSON.parse(input) : input;
  const id = data.id;

  let cssFile;
  if (data.stylesheet.startsWith("http")) {
    cssFile = await getURLContents(data.stylesheet);
  } else {
    cssFile = data.stylesheet;
  }

  customThemes[id] = {
    name: data.name,
    stylesheet: cssFile,
    generalType: data.generalType
  };

  // Add to select menu
  if (!themeMenu.querySelector(`option[value="${id}"]`)) {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = data.name;
    themeMenu.appendChild(opt);
  }

  localStorage.setItem("customThemes", JSON.stringify(customThemes));
  updateThemeSelector();
}*/

async function addThemePrompt() {
  const url = prompt("Enter the theme JSON URL:");
  if (!url) return;

  try {
    const jsonText = await getURLContents(url);
    const data = JSON.parse(jsonText);

    await addCustomTheme(data);
    selectTheme(data.id);
  } catch (err) {
    alert("Failed to add theme");
    console.error(err);
  }
}

function removeTheme(id) {
  // Default themes cannot be removed
  if (defaultThemes.includes(id)) return;

  // If selected, revert to system
  if (editorTheme === id) {
    selectTheme("system");
  }

  // Built-in → uninstall
  if (builtInThemes[id]) {
    delete customThemes[id];
  }

  // Custom → remove entirely
  if (customThemes[id]) {
    delete customThemes[id];
    //removeOptionByValue(themeMenu, id);
  }

  localStorage.setItem("customThemes", JSON.stringify(customThemes));
  updateThemeSelector();
}

function updateThemeSelector() {
  const allThemeIds = [
    ...defaultThemes,
    ...Object.keys(builtInThemes),
    ...Object.keys(customThemes)
  ];

  for (const id of allThemeIds) {
    const btn = document.getElementById(`themeBoxBtn1_${id}`);
    const deleteBtn = document.getElementById(`themeBoxDelete_${id}`);

    if (!btn) continue;

    const installed = isThemeInstalled(id);
    const selected = editorTheme === id;

    // Button label & state
    if (selected) {
      btn.textContent = "Selected";
      btn.disabled = true;
    } else {
      btn.disabled = false;
      btn.textContent = installed ? "Select" : "Install";
    }

    // Delete button
    if (deleteBtn) {
      deleteBtn.style.display =
        installed && !defaultThemes.includes(id)
          ? ""
          : "none";
    }
  }
}


/*async function themeSelectorBtnAction(theme, id) {
  let btn = document.getElementById(`themeBoxBtn${id}_${theme}`);
  if (defaultThemes.includes(theme) || Object.keys(customThemes).includes(theme)) {
    if (editorTheme != theme) {
      selectTheme(theme);
    }
  } else {
    btn.classList.add("is-loading");
    let data = await getURLContents(builtInThemes[theme].url);
    addCustomTheme(data);
    btn.classList.remove("is-loading");
    updateThemeSelector();
  }
}
function updateThemeSelector() {
  let allThemes = defaultThemes + Object.keys(customThemes);
  for (let i = 0; i < allThemes.length; i++) {
    if (allThemes[i] == editorTheme) {

    } else {

    }
  }
}
function selectTheme(name) {
  updateThemeSelector();
}

async function addThemePrompt() {
  let themeURL = prompt("Enter the theme URL:");
  if (themeURL) {
    let file = await getURLContents(themeURL);
    addCustomTheme(file);
  }
}

function removeCustomTheme(name) {
  if (editorTheme == name) {
    editorTheme = "system";
    setCookie("editorTheme", "system", 399);
    themeMenu.value = "system";
    autoThemeChange();
  }
  delete customThemes[name];
  localStorage.setItem("customThemes", JSON.stringify(customThemes));
  removeOptionByValue(themeMenu, name);
}
async function addCustomTheme(input) {
  let data;
  if (typeof data == "string") {
    data = JSON.parse(input);
  } else {
    data = input;
  }
  let id = data.id;
  let cssFile;
  if (data.stylesheet.startsWith("http")) {
    cssFile = await getURLContents(data.stylesheet);
  } else {
    cssFile = data.stylesheet;
  }
  customThemes[id] = {
    name: data.name,
    stylesheet: cssFile,
    generalType: data.generalType
  };

  let menuOption = document.createElement("option");
  menuOption.setAttribute("value", data.id);
  menuOption.innerHTML = data.name;
  themeMenu.appendChild(menuOption);

  localStorage.setItem("customThemes", JSON.stringify(customThemes));
}*/

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
$("#addElementUploadDiv").hide();
$("#addAssetBlankDiv").hide();

function addElementTabChange(tab) {
  if (tab == 1) {
    $("#addElementUploadDiv").hide();
    $("#addElementBlankDiv").show();
    addElementTab1.classList.add("is-active");
    addElementTab2.classList.remove("is-active");
    addElementMode = "blank";
  } else {
    $("#addElementUploadDiv").show();
    $("#addElementBlankDiv").hide();
    addElementTab1.classList.remove("is-active");
    addElementTab2.classList.add("is-active");
    addElementMode = "upload";
  }
}

function addAssetTabChange(tab) {
  if (tab == 1) {
    $("#addAssetUploadDiv").show();
    $("#addAssetBlankDiv").hide();
    addAssetTab1.classList.add("is-active");
    addAssetTab2.classList.remove("is-active");
    addAssetMode = "upload";
  } else {
    $("#addAssetUploadDiv").hide();
    $("#addAssetBlankDiv").show();
    addAssetTab1.classList.remove("is-active");
    addAssetTab2.classList.add("is-active");
    addAssetMode = "blank";
  }
}

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
$("#optionsContent6").hide();
function switchOptionsTab(tab) {
  optionsTab1.classList.remove("is-active");
  optionsTab2.classList.remove("is-active");
  optionsTab3.classList.remove("is-active");
  optionsTab4.classList.remove("is-active");
  optionsTab5.classList.remove("is-active");
  optionsTab6.classList.remove("is-active");
  $("#optionsContent1").hide();
  $("#optionsContent2").hide();
  $("#optionsContent3").hide();
  $("#optionsContent4").hide();
  $("#optionsContent5").hide();
  $("#optionsContent6").hide();
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
    $("#navbarNew").hide();
    $("#navbarOpen").hide();
    $("#navbarSave").show();
    $("#navbarSaveAs").show();
    $("#navbarExport").show();
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
    projZip.folder("auxiliaryData");
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
    updateMenusForProjectType();
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


//let themeMenu = document.getElementById("themeMenu");

if (localStorage.getItem("customThemes")) {
  customThemes = JSON.parse(localStorage.getItem("customThemes") || "{}");
  for (const id in customThemes) {
    createThemeBox(id, customThemes[id].name, {
      installed: true,
      isCustom: true
    });
  }
  for (const id in builtInThemes) {
    if (!document.getElementById(`themeBox_${id}`)) {
      createThemeBox(id, builtInThemes[id].name, true);
    }
  }

  updateThemeSelector();
  /*let themeList = Object.keys(customThemes);
  for (let i = 0; i < themeList.length; i++) {
    let data = customThemes[themeList[i]];
    let menuOption = document.createElement("option");
    menuOption.setAttribute("value", themeList[i]);
    menuOption.innerHTML = data.name;
    themeMenu.appendChild(menuOption);
  }*/
}

if (getCookie("editorTheme")) {
  editorTheme = getCookie("editorTheme");
  //$("#themeMenu").val(getCookie("editorTheme"));
  if (editorTheme == "system") {
    autoThemeChange();
  } else {
    document.documentElement.setAttribute("data-theme", editorTheme);
    if (!["light", "dark", "system"].includes(editorTheme) && customThemes[editorTheme].generalType == "dark") {
      document.documentElement.classList.add("theme-dark");
      document.documentElement.classList.remove("theme-light");
    } else {
      document.documentElement.classList.remove("theme-dark");
      if (!["light", "dark", "system"].includes(editorTheme)) {
        document.documentElement.classList.add("theme-light");
      }
    }
    handleFrameThemeChange();
  }
  selectTheme(editorTheme);
  updateThemeSelector();
} else {
  editorTheme = "system";
  //$("#themeMenu").val("system");
  setCookie("editorTheme", "system", 399);
  autoThemeChange();
  selectTheme("system");
}

/*themeMenu.addEventListener("change", function(e) {
  editorTheme = themeMenu.value;
  setCookie("editorTheme", editorTheme, 399);
  if (editorTheme == "system") {
    autoThemeChange();
    selectTheme(editorTheme);
  } else {
    document.documentElement.setAttribute("data-theme", editorTheme);
    selectTheme(editorTheme);
    handleFrameThemeChange();
  }
});*/

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
      generalThemeType = "dark";
    } else {
      themeName = "light";
      importTheme = false;
      generalThemeType = "light";
    }
  } else if (editorTheme == "light") {
    themeName = "light";
    importTheme = false;
    generalThemeType = "light";
  } else if (editorTheme == "dark") {
    themeName = "dark";
    importTheme = false;
    generalThemeType = "dark";
  } else {
    themeName = editorTheme;
    if (customThemes[editorTheme]) {
      importTheme = customThemes[editorTheme].stylesheet;
      generalThemeType = customThemes[editorTheme].generalType;
    } else {
      editorTheme = "system";
      setCookie("editorTheme", "system", 399);
      //themeMenu.value = "system";
      autoThemeChange();
    }
  }
  if (importTheme) {
    themeStyleElement.innerHTML = importTheme;
  }
  let iframes = document.querySelectorAll("iframe");
  for (let i = 0; i < iframes.length; i++) {
    let iframe = iframes[i];
    if (iframe?.contentWindow?.themeStyleElement ?? false) {
      if (importTheme) {
        iframe.contentWindow.themeStyleElement.innerHTML = importTheme;
      }
      iframe.contentWindow.document.documentElement.setAttribute("data-theme", themeName);
      if (customThemes[editorTheme]) {
        if (customThemes[editorTheme].generalType == "dark") {
          iframe.contentWindow.document.documentElement.classList.add("theme-dark");
          iframe.contentWindow.document.documentElement.classList.remove("theme-light");
        } else {
          iframe.contentWindow.document.documentElement.classList.remove("theme-dark");
          iframe.contentWindow.document.documentElement.classList.add("theme-light");
        }
      } else {
        iframe.contentWindow.document.documentElement.classList.remove("theme-dark");
        iframe.contentWindow.document.documentElement.classList.remove("theme-light");
      }
      if (iframe.contentWindow.onThemeChange) {
        iframe.contentWindow.onThemeChange(themeName, importTheme, generalThemeType);
      }
    }
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
          accept: { "application/zip": [".mdry", ".zip"] }
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

document.getElementById("importProjectInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Basic validation
  if (!file.name.match(/\.(mdry|zip)$/i)) {
    alert("Please select a Moddery project (.mdry)");
    return;
  }

  // 1️⃣ Load project
  await openProj(file); // your existing function

  // 2️⃣ Store in IndexedDB
  const db = await openProjectDB();

  const tx = db.transaction(
    ["projects", "projectInfo"],
    "readwrite"
  );

  tx.objectStore("projects").put({
    id: currentProjectId,
    blob: file
  });

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

  // Reset input so same file can be imported again
  e.target.value = "";
});

function importProject() {
  document.getElementById("importProjectInput").click();
}

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
    (info?.name || "project") + ".mdry";

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
        $("#navbarNew").hide();
        $("#navbarOpen").hide();
        $("#navbarSave").show();
        $("#navbarSaveAs").show();
        $("#navbarExport").show();
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
        updateMenusForProjectType();
        document.getElementById("ui-id-1").click();
      } else {
        alert("The uploaded file is not a valid Moddery project!");
        closeLoader();
        document.getElementById("savingBox").style.display = "none";
      }
    });
  });
}

function updateMenusForProjectType() {
  let projectType = projectTypes[projManifest.type];

  let editors = projectType.editors;
  let editorList = Object.keys(editors);

  for (let i = 0; i < editorList.length; i++) {
    let editorItem = editors[editorList[i]];
    let editorName = editorList[i];
    let editorFormattedName = `<i class="${editorItem.icon}"></i> ${editorName}`;
    if (editorItem.show > 0) {
      let option = document.createElement("option");
      option.innerHTML = editorFormattedName;
      option.value = editorName;
      if (editorItem.show == 2) {
        option.setAttribute("disabled", "true");
      }
      addElementType.appendChild(option);
    }
  }

  if (projectType.features.includes("scriptEntry")) {
    $("#scriptEntryDiv").show();
  } else {
    $("#scriptEntryDiv").hide();
  }

  let versions = projectType.supportedVersions;

  for (let i = 0; i < versions.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = versions[i];
    editProjMCVersionBox.appendChild(option);
  }

  let exportModes = projectType.exportOptions;

  for (let i = 0; i < exportModes.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = exportModes[i][0];
    option.value = exportModes[i][1];
    exportDlgModeBox.appendChild(option);
  }
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
  exportLoaderText.innerHTML = "Exporting Project...";
  exportLoaderProgress.setAttribute("max", "0"),
  exportLoaderProgress.value = "0";
  exportLog.innerHTML = "";
  
  if (projManifest.type == "be_addon") {
    await bedrockExporter.runExport();
  } else if (projManifest.type == "je_dp") {
    await javaDPExporter.runExport();
  }

  exportLoaderText.innerHTML = `Exporting Project... (100%)`;
  exportLoaderProgress.value = progressBarMax;

  window.setTimeout(function(){
    exportLoaderText.innerHTML = 'Click "Export" to export the project.';
    exportLoaderProgress.setAttribute("max", "0"),
    exportLoaderProgress.value = "0";
  }, 500);
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

async function addElement(loadingProj) {
  const name = $("#addElementNameBox").val();
  const id = $("#addElementIDBox").val();

  const elementExists =
    fileListInFolder("elements").includes(name + ".json");


  let validName;
  let validID;
  if (addElementMode == "upload") {
    validName = true;
    validID = true;
  } else {
    validName = isValidElementName(name);
    validID = isValidElementID(id);
  }

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
      if (addElementMode == "upload") {
        let elementZip = new JSZip();
        await elementZip.loadAsync(addElementUploadInput.files[0]);
        let fileList = fileListInFolder("", "", elementZip).filter(n => !n.startsWith("__MACOSX") && !n.endsWith(".DS_Store"));
        console.log(fileList);
        for (let i = 0; i < fileList.length; i++) {
          let file = await elementZip.file(fileList[i]).async("string");
          console.log(file);
          projZip.folder("elements").file(fileList[i], file);
          if (fileList[i].endsWith(".json") && !fileList[i].endsWith(".code.json")) {
            let fileData = JSON.parse(file);
            $("#addElementNameBox").val(fileData.name);
            $("#addElementIDBox").val(fileData.id);
            $("#addElementType").val(fileData.type);
          }
        }
      } else {
        var elementJSON = {
          "name": $("#addElementNameBox").val(),
          "id": $("#addElementIDBox").val(),
          "type": $("#addElementType").val()
        };
        projZip.folder("elements").file($("#addElementNameBox").val() + ".json", JSON.stringify(elementJSON));
        addTab($("#addElementType").val(), $("#addElementNameBox").val());
      }
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
          <a class="dropdown-item" onclick="downloadElement('${elementName}', 'element')"><i class="fas fa-download"></i> Download</a>
          <a class="dropdown-item dropdownDelete" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${elementName}', 'element')"><i class="fas fa-trash"></i> Delete</a>
        </div>
      </div>
    </div>
    `;
    parentDiv.appendChild(elementBox);
  }
  closeAddElementDlg();
  $("#addElementNameBox").val("");
  $("#addElementIDBox").val("");
  addElementNameText.innerHTML = "Select a file";
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

addElementUploadInput.addEventListener("change", (event) => {
  addElementNameText.innerHTML = addElementUploadInput.files[0].name;
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
        editBtn.innerHTML = `<i class="fas fa-volume-low"></i> Edit`;
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
          <a class="dropdown-item" onclick="downloadElement('${fileNameEncoded}', 'asset')"><i class="fas fa-download"></i> Download</a>
          <a class="dropdown-item dropdownDelete" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${fileNameEncoded}', 'asset')"><i class="fas fa-trash"></i> Delete</a>
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
      suggestedName: (projManifest?.name || "project") + ".mdry",
      types: [{
        description: "Moddery Project",
        accept: { "application/zip": [".mdry"] }
      }]
    });

    // After choosing location, save normally
    return await saveProject();
  } else {
    // IndexedDB / local storage mode → download ZIP

    const blob = await projZip.generateAsync({ type: "blob" });

    const filename =
      (projManifest?.name || "project") + ".mdry";

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
  if (Object.keys(projectTypes[projManifest.type].editors).includes(role)) {
    return `<iframe src="${projectTypes[projManifest.type].editors[role].url}" class="elementFrame" id="${elementID}_frame"></iframe>`;
  } else {
    return "Coming Soon!";
  }
  /*if (role == "Function") {
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
  }*/
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

async function downloadElement(elementID, type) {
  if (type == "asset") {
    let file = await projZip.folder("assets").file(decodeText(elementID)).async("arraybuffer");
    downloadArrayBuffer(file, decodeText(elementID));
  } else {
    let elementZip = new JSZip();
    let file1 = await projZip.folder("elements").file(`${elementID}.json`).async("string");
    let file1Data = JSON.parse(file1);
    let file2 = false;
    if (file1Data.type == "Script" || file1Data.type == "Function") {
      file2 = await projZip.folder("elements").file(`${elementID}.code.json`).async("string");
      elementZip.file(`${elementID}.code.json`, file2);
    }
    elementZip.file(`${elementID}.json`, file1);

    const zipBlob = await elementZip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = `${elementID}.mdryelem`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  }
}

async function downloadArrayBuffer(arrayBuffer, filename, mimeType = "application/octet-stream") {
  const blob = new Blob([arrayBuffer], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Cleanup
  a.remove();
  URL.revokeObjectURL(url);
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
          <a class="dropdown-item" onclick="downloadElement('${elementName}', 'element')"><i class="fas fa-download"></i> Download</a>
          <a class="dropdown-item dropdownDelete" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${elementName}', 'element')"><i class="fas fa-trash"></i> Delete</a>
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
        editBtn.innerHTML = `<i class="fas fa-volume-low"></i> Edit`;
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
          <a class="dropdown-item" onclick="downloadElement('${fileNameEncoded}', 'asset')"><i class="fas fa-download"></i> Download</a>
          <a class="dropdown-item dropdownDelete" style="color:var(--bulma-danger)!important;" onclick="openDeleteElement('${fileNameEncoded}', 'asset')"><i class="fas fa-trash"></i> Delete</a>
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
  if (Object.keys(projectTypes[projManifest.type].editors).includes(type)) {
    return `<i class="${projectTypes[projManifest.type].editors[type].icon}"></i>`;
  } else {
    return `<i class="fa-regular fa-file"></i>`;
  }
  /*if (type == "Image") {
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
  }*/
}

async function addTab(role, elementID) {
  if (role == "Script") {
    editorScriptList = (await getScriptList(2)).filter(item => item[0] != elementID);
    editorTextureList = getTextureList().filter(n => n != "None");
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
    if (projectTypes[projManifest.type].editors[role].saveType == "code") {
      projZip.folder("elements").file(elementID + ".code.json").async("string").then(function (data) {
        frame.contentWindow.loadProject(JSON.parse(data));
      });
    } else if (projectTypes[projManifest.type].editors[role].saveType == "regular") {
      projZip.folder("elements").file(elementID + ".json").async("string").then(function (data) {
        frame.contentWindow.loadProject(JSON.parse(data));
      });
    } else if (projectTypes[projManifest.type].editors[role].saveType == "media") {
      projZip.folder("assets").file(decodeText(elementID)).async("blob").then(async function (data) {
        if (role == "Audio") {
          let auxiliary;
          try {
            auxiliary = await projZip.folder("auxiliaryData").file(decodeText(elementID).replace(".wav", ".json")).async("string");
          } catch(e) {
            auxiliary = JSON.stringify({
              id: "",
              category: "neutral"
            });
          }
          frame.contentWindow.loadProject([(await fileToDataURL(data)), JSON.parse(auxiliary)]);
        } else {
          frame.contentWindow.loadProject(await fileToDataURL(data));
        }
      });
    }
    handleFrameThemeChange();
    $(frame.contentWindow.document).on("click", function () {
      $("#savingFlyout").hide();
    });
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
  if (projectTypes[projManifest.type].editors[elementTab[0]].saveType == "code") {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("elements").file(elementTab[1] + ".code.json", JSON.stringify(frame.contentWindow.saveProject()));
  } else if (projectTypes[projManifest.type].editors[elementTab[0]].saveType == "regular") {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("elements").file(elementTab[1] + ".json", JSON.stringify(frame.contentWindow.saveProject()));
  } else if (projectTypes[projManifest.type].editors[elementTab[0]].saveType == "media" && elementTab[0] != "Audio") {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("assets").file(decodeText(elementTab[1]), dataURItoFile(frame.contentWindow.saveProject(), elementTab[1] + ".png"));
    var preview = document.getElementById(elementTab[1] + "_preview");
    preview.src = frame.contentWindow.saveProject();
  }

  if (elementTab[0] == "Audio") {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("auxiliaryData").file(decodeText(elementTab[1]).replace(".wav", ".json"), JSON.stringify(frame.contentWindow.saveProject()));
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
async function getFunctionList() {
  let list = (await getFilteredElements("Function")).map(obj => obj.name);
  list.unshift("None");
  return list;
}
async function getBiomeList() {
  let list = (await getFilteredElements("Biome")).map(obj => obj.name);
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

for (const id in builtInThemes) {
  if (!document.getElementById(`themeBox_${id}`)) {
    createThemeBox(id, builtInThemes[id].name, true);
  }
}