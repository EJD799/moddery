var projectZip;
var projectZipElements;

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
  projectZip = new JSZip();
  projectZip.file("manifest.json", "{}");
  projectZipElements = projectZip.folder("elements");
  projectZipElements.file("test.txt", "test");
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
  alert("test");
}
function saveProject() {

}
$("#addElementBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");