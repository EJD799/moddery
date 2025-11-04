$("#categoryBox").selectmenu();
$("#itemTextureBtn").button();
$("#addComponentBtn").button();
$("#addComponentType").selectmenu();
$("#addComponentCancelBtn").button();
$("#addComponentAddBtn").button();
$("#selectTextureCancelBtn").button();
$("#selectTextureSelectBtn").button();
$('input').addClass("ui-widget ui-widget-content ui-corner-all");

$("#addComponentDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 200,
  width: 500
});
$("#addComponentDlg").dialog("close");
$("#selectTextureDlg").dialog({
  position: { my: "center", at: "center", of: $("body") },
  resizable: false,
  height: 200,
  width: 500
});
$("#selectTextureDlg").dialog("close");
function addComponent() {
  $("#addComponentDlg").dialog("open");
}
function closeAddComponentDlg() {
  $("#addComponentDlg").dialog("close");
}
function openSelectTextureDlg() {
  $("#selectTextureDlg").dialog("open");
}
function closeSelectTextureDlg() {
  $("#selectTextureDlg").dialog("close");
}
function createComponent() {
    alert("Coming Soon!");
    $("#addComponentDlg").dialog("close");
}
function selectTexture() {
    alert("Coming Soon!");
    $("#selectTextureDlg").dialog("close");
}