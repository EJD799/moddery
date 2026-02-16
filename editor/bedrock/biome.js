var elementData = {};


function saveProject() {
    return {
        name: elementData.name,
        id: $("#biomeIDBox").val(),
        type: "Biome",
    };
}
function loadProject(data) {
    elementData = data;
    $("#biomeIDBox").val(data.id);
}

bulmaSelectmenu.attachMenu(dimensionBox);