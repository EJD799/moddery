var elementData = {};
let currentTransformationSelecting;
let currentTransformations;


function saveProject() {
    return {
        name: elementData.name,
        id: biomeIDBox.value,
        type: "Biome",
        biomeName: nameBox.value,
        dimension: dimensionBox.value,
        locWeight: {
            frozen: frozenWeight.value,
            cold: coldWeight.value,
            medium: mediumWeight.value,
            lukewarm: lukewarmWeight.value,
            warm: warmWeight.value,
        },
        tags: tagsBox.value,
        transformations: currentTransformations,
    };
}
function loadProject(data) {
    elementData = data;

    elementIDBox.value = data.name;
    biomeIDBox.value = data.id;
    nameBox.value = data.biomeName ?? "";
    dimensionBox.value = data.dimension ?? "Overworld";
    tagsBox.value = data.tags ?? "None";

    if (data.locWeight) {
        frozenWeight.value = data.locWeight.frozen;
        coldWeight.value = data.locWeight.cold;
        mediumWeight.value = data.locWeight.medium;
        lukewarmWeight.value = data.locWeight.lukewarm;
        warmWeight.value = data.locWeight.warm;
    }

    currentTransformations = data.currentTransformations ?? {
        hills: "",
        shore: ""
    };
    transformationsKeys = Object.keys(currentTransformations);
    for (let i = 0; i < transformationsKeys.length; i++) {
        let selection = currentTransformations[transformationsKeys[i]];
        let textureNameText = document.getElementById("biomeNameText_" + transformationsKeys[i]);
        if (selection == "None") {
            currentTransformations[currentTransformationSelecting] = "";
            textureNameText.innerHTML = "No biome selected";
        } else {
            currentTransformations[currentTransformationSelecting] = selection;
            textureNameText.innerHTML = selection;
        }
    }
}

bulmaSelectmenu.attachMenu(dimensionBox);
bulmaSelectmenu.attachMenu(tagsBox);


async function openSelectBiomeDlg(transformation) {
    currentTransformationSelecting = transformation;
    let tables;
    openSelectBiomeDlg.classList.add("is-active");
    let selectBiomeMenu = document.getElementById("selectBiomeMenu");
    selectBiomeMenu.innerHTML = "";
    for (let i = 0; i < tables.length; i++) {
        let selectBiomeMenuItem;
        let previewBox;
        let preview;
        let itemTitle;
        let itemRadio;
        selectBiomeMenuItem = document.createElement("div");
        selectBiomeMenuItem.setAttribute("class", "card textureMenuItem");
        itemRadio = document.createElement("input");
        itemRadio.setAttribute("type", "radio");
        itemRadio.setAttribute("name", "selectedBiome");
        itemRadio.setAttribute("class", "textureRadio");
        itemRadio.setAttribute("value", tables[i]);
        selectBiomeMenuItem.appendChild(itemRadio);
        itemTitle = document.createElement("span");
        itemTitle.setAttribute("class", "textureMenuTitle");
        itemTitle.innerHTML = tables[i];
        selectBiomeMenuItem.appendChild(itemTitle);
        selectBiomeMenu.appendChild(selectBiomeMenuItem);
        selectBiomeMenuItem.addEventListener("click", () => {
            const itemRadio = selectBiomeMenuItem.querySelector('input[type="radio"]');
            if (itemRadio) {
                itemRadio.checked = true;  // select this radio
            }
        });
    }
}
function closeSelectBiomeDlg() {
    selectBiomeDlg.classList.remove("is-active");
}
function selectBiome() {
    const selected = document.querySelector('input[name="selectedBiome"]:checked');

    const textureNameText = document.getElementById("biomeNameText_" + currentTransformationSelecting);
    if (selected.value == "None") {
        currentTransformations[currentTransformationSelecting] = "";
        textureNameText.innerHTML = "No biome selected";
    } else {
        currentTransformations[currentTransformationSelecting] = selected.value;
        textureNameText.innerHTML = selected.value;
    }

    closeSelectBiomeDlg();
}