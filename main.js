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
function openNewProjDlg() {
  $("#newProjDlg").dialog("open");
}
function closeNewProjDlg() {
  $("#newProjDlg").dialog("close");
}
function createProject() {
  closeNewProjDlg();
  alert($("#newProjNameBox").val() + "\n" + $("#newProjType").val() + "\n" + $("#newProjNamespaceBox").val());
}
function openAddElementDlg() {
  $("#addElementDlg").dialog("open");
}
function closeAddElementDlg() {
  $("#addElementDlg").dialog("close");
}
function addElement() {
  alert("test");
}
$("#addElementBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");