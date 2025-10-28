var projZip;
var projManifest;
var tabCounter = 3;
var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
var tabs = $("#tabs");
var elementCount = 0;

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
  height: 200,
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
function openAddElementDlg() {
  $("#addElementDlg").dialog("open");
}
function closeAddElementDlg() {
  $("#addElementDlg").dialog("close");
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
  <h3>` + $("#addElementNameBox").val() + `</h3>
  <button onclick="editElement('` + $("#addElementNameBox").val() + `')">Edit</button>
  `;
  parentDiv.appendChild(elementBox);
  if (elementCount % 3 === 0) {
    parentDiv.appendChild(document.createElement("br"));
  }
  closeAddElementDlg();
  $("#addElementNameBox").val("");
  $("#addElementIDBox").val("");
}
function saveProject() {
  projZip.generateAsync({type:"blob"})
  .then(function(content) {
      saveAs(content, projManifest.name + ".zip");
  });
}
$("#addElementBtn").button();
$("#loaderProgress").progressbar({
  value: 50
});
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

function getTabContent(role, elementID) {
  if (role == "Function") {
    return '<iframe src="functioneditor.html" class="elementFrame"></iframe>';
  } else {
    return "Coming soon!";
  }
}

function shouldRemoveMargin(role) {
  if (role == "Function") {
    return true;
  } else {
    return false;
  }
}

function editElement(elementID) {
  projZip.folder("elements").file(elementID + ".json").async("string").then(function (data) {
    var dataParsed = JSON.parse(data);
    addTab(dataParsed.type, elementID);
  });
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
}

tabs.on( "click", "span.ui-icon-close", function() {
  var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
  $( "#" + panelId ).remove();
  tabs.tabs( "refresh" );
});

$("#newProjBtn").button();
$("#closeAboutBtn").button();
document.getElementById("tabs").hidden = true;