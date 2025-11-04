$("#categoryBox").selectmenu();
$("#itemTextureBtn").button();
$("#addComponentBtn").button();
$("#addComponentType").selectmenu();
$("#addComponentCancelBtn").button();
$("#addComponentAddBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

$("#addComponentDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 200,
  width: 500
});
$("#addComponentDlg").dialog("close");
function addComponent() {
  $("#addComponentDlg").dialog("open");
}
function closeAddComponentDlg() {
  $("#addComponentDlg").dialog("close");
}