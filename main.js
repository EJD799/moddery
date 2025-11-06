var projZip;
var projManifest;
var tabCounter = 3;
var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
var tabs = $("#tabs");
var elementCount = 0;
var assetCount = 0;
var openElements = {};

$("#toolbar").menu();
$("#tabs").tabs();
$("#newProjDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 400,
  width: 500
});
$("#newProjDlg").dialog("close");
$("#newProjType").selectmenu();
$("#newProjCancelBtn").button();
$("#newProjCreateBtn").button();
$("#editProjDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 400,
  width: 500
});
$("#editProjDlg").dialog("close");
$("#editProjCancelBtn").button();
$("#editProjSaveBtn").button();
$("#addElementDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 400,
  width: 500
});
$("#addElementDlg").dialog("close");
$("#addElementType").selectmenu();
$("#addElementCancelBtn").button();
$("#addElementAddBtn").button();
$("#addAssetDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 400,
  width: 500
});
$("#addAssetDlg").dialog("close");
$("#addAssetUploadBtn").button();
$("#addAssetCancelBtn").button();
$("#addAssetAddBtn").button();
$("#exportDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 400,
  width: 500
});
$("#exportDlg").dialog("close");
$("#loaderDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 150,
  width: 300,
  closeOnEscape: false
});
$("#aboutDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 300,
  width: 300,
  closeOnEscape: false
});
$("#aboutDlg").dialog("close");
$("#loaderDlg").dialog("close");
function openNewProjDlg() {
  $("#newProjDlg").dialog("open");
}
function closeNewProjDlg() {
  $("#newProjDlg").dialog("close");
}
function openEditProjDlg() {
  $("#editProjDlg").dialog("open");
}
function closeEditProjDlg() {
  $("#editProjDlg").dialog("close");
}
function createProject() {
  closeNewProjDlg();
  document.getElementById("tabs").hidden = false;
  document.getElementById("welcome").hidden = true;
  projZip = new JSZip();
  projManifest = {
    "name": $("#newProjNameBox").val(),
    "type": $("#newProjType").val(),
    "namespace": $("#newProjNamespaceBox").val(),
    "bp_uuid": crypto.randomUUID(),
    "rp_uuid": crypto.randomUUID()
  };
  projZip.file("manifest.json", JSON.stringify(projManifest));
  projZip.folder("elements");
  projZip.folder("assets");
  $("#newProjNameBox").val("");
  $("#newProjNamespaceBox").val("");
}
function saveProjectInfo() {
  alert("Coming Soon!");
  closeEditProjDlg();
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
function addElement() {
  var elementJSON = {
    "name": $("#addElementNameBox").val(),
    "id": $("#addElementIDBox").val(),
    "type": $("#addElementType").val()
  };
  projZip.folder("elements").file($("#addElementNameBox").val() + ".json", JSON.stringify(elementJSON));
  addTab($("#addElementType").val(), $("#addElementNameBox").val());
  elementCount++;
  var parentDiv = document.getElementById("tabs-1");
  var elementBox = document.createElement("div");
  elementBox.setAttribute("class", "elementbox");
  elementBox.innerHTML = `
  <h3>${$("#addElementNameBox").val()}</h3>
  <button onclick="editElement('${$("#addElementNameBox").val()}')" id="${$("#addElementNameBox").val()}_editBtn">Edit</button>
  <button onclick="elementDropdown('${$("#addElementNameBox").val()}')" id="${$("#addElementNameBox").val()}_optionBtn">&#x22EF;</button>
  `;
  parentDiv.appendChild(elementBox);
  if (elementCount % 4 === 0) {
    parentDiv.appendChild(document.createElement("br"));
  }
  $("#" + $("#addElementNameBox").val() + "_editBtn").button();
  $("#" + $("#addElementNameBox").val() + "_optionBtn").button();
  closeAddElementDlg();
  $("#addElementNameBox").val("");
  $("#addElementIDBox").val("");
}

function addAsset() {
  let file = addAssetUploadInput.files[0];
  let fileType = file.name.split(".")[1];
  let fileNameEncoded = file.name.replace(".", "_");
  let previewBox;
  let preview;
  let editBtn;
  let center;
  if (file) {
    projZip.folder("assets").file(file.name, file);
    assetCount++;
    var parentDiv = document.getElementById("tabs-2");
    var assetBox = document.createElement("div");
    var center = document.createElement("center");
    assetBox.setAttribute("class", "elementbox");
    center.innerHTML = `<h3>${file.name}</h3>`;
    if (fileType == "png") {
      previewBox = document.createElement("div");
      previewBox.setAttribute("class", "previewBox");
      preview = document.createElement("img");
      preview.setAttribute("src", URL.createObjectURL(file));
      previewBox.appendChild(preview);
    }
    assetBox.appendChild(previewBox);
    center.appendChild(document.createElement("br"));
    editBtn = document.createElement("button");
    editBtn.setAttribute("onclick", `assetDropdown('${fileNameEncoded}')`);
    editBtn.setAttribute("id", `${fileNameEncoded}_assetOptionBtn`);
    editBtn.innerHTML = "&#x22EF;";
    center.appendChild(editBtn);
    assetBox.appendChild(center);
    parentDiv.appendChild(assetBox);
    $(`#${fileNameEncoded}_assetOptionBtn`).button();
    if (assetCount % 4 === 0) {
      parentDiv.appendChild(document.createElement("br"));
    }
  }
  closeAddAssetDlg();
}

function saveProject() {
  projZip.generateAsync({type:"blob"})
  .then(function(content) {
      saveAs(content, projManifest.name + ".zip");
  });
}
$("#editProjBtn").button();
$("#addElementBtn").button();
$("#addAssetBtn").button();
$("#loaderProgress").progressbar({
  value: 50
});
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

function getTabContent(role, elementID) {
  if (role == "Function") {
    return '<iframe src="editor/bedrock/function.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Script") {
    return '<iframe src="editor/bedrock/script.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
  } else if (role == "Item") {
    return '<iframe src="editor/bedrock/item.html" class="elementFrame" id="' + elementID + '_frame"></iframe>';
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
    addTab(dataParsed.type, elementID);
  });
}

function elementDropdown(elementID) {
  alert("Coming soon!")
}

function addTab(role, elementID) {
  var label = elementID,
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
  if (role == "Function") {
    var frame = document.getElementById(elementID + "_frame");
    frame.onload = function() {
      setTimeout(function(){
        projZip.folder("elements").file(elementID + ".code.json").async("string").then(function (data) {
          frame.contentWindow.loadProject(JSON.parse(data));
        });
      }, 200);
    };
  }
}

tabs.on( "click", "span.ui-icon-close", function() {
  var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  saveElement(openElements[panelId]);
  delete openElements[panelId];
  $( "#" + panelId ).remove();
  tabs.tabs( "refresh" );
});

function saveElement(elementTab) {
  if (elementTab[0] == "Function") {
    var frame = document.getElementById(elementTab[1] + "_frame");
    projZip.folder("elements").file(elementTab[1] + ".code.json", JSON.stringify(frame.contentWindow.saveProject()));
  }
}

$("#newProjBtn").button();
$("#closeAboutBtn").button();
document.getElementById("tabs").hidden = true;