window.onresize = doLayout;

onload = () => {
  // doLayout();
  // Topbar functions
  homeButton();
  printButton();
  goButton();
  insertCSSButton()
  
};

function doLayout() {
  let webview = document.querySelector("webview");
  let windowWidth = document.documentElement.clientWidth;
  let windowHeight = document.documentElement.clientHeight;
  let controlsHeight = getControlsHeight();
  let webviewHeight = windowHeight - controlsHeight;

  webview.style.width = windowWidth + "px";
  webview.style.height = webviewHeight + "px";
}
