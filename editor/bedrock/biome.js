var elementData = {};


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
    };
}
function loadProject(data) {
    elementData = data;

    biomeIDBox.value = data.id;
    nameBox.value = data.biomeName;
    dimensionBox.value = data.dimension;

    frozenWeight.value = data.locWeight.frozen;
    coldWeight.value = data.locWeight.cold;
    mediumWeight.value = data.locWeight.medium;
    lukewarmWeight.value = data.locWeight.lukewarm;
    warmWeight.value = data.locWeight.warm;
}

bulmaSelectmenu.attachMenu(dimensionBox);