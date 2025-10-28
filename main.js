var projZip;
var projManifest;

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
$("#loaderDlg").dialog("close");
function openNewProjDlg() {
  $("#newProjDlg").dialog("open");
}
function closeNewProjDlg() {
  $("#newProjDlg").dialog("close");
}
function createProject() {
  closeNewProjDlg();
  alert($("#newProjNameBox").val() + "\n" + $("#newProjType").val() + "\n" + $("#newProjNamespaceBox").val());
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
function addElement() {
  var elementJSON = {
    "name": $("#addElementNameBox").val(),
    "id": $("#addElementIDBox").val(),
    "type": $("#addElementType").val()
  };
  projZip.folder("elements").file($("#addElementNameBox").val() + ".json", JSON.stringify(elementJSON));
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