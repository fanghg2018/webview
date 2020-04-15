const { remote } = require("electron");
const { BrowserWindow } = remote;
let print_win;

function navigateTo(url) {
  document.querySelector("webview").src = url;
}

function getControlsHeight() {
  let controls = document.querySelector("#controls");
  if (controls) {
    return controls.offsetHeight;
  }
  return 0;
}

function homeButton() {
  document.querySelector("#home").onclick = () => {
    let attribute = document.getElementById("webview");
    let home = attribute.getAttribute("data-home");
    navigateTo(home);
    // attribute.openDevTools()
  };
}

function goButton() {
  document.querySelector("#go_button").onclick = () => {
    let attribute = document.getElementById("input").value;
    navigateTo( attribute );
  };
}

function printButton() {
  document.getElementById("print_button").addEventListener("click", print);
}

function insertCSSButton() {
  document.getElementById("insertCSS_button").onclick =()=>{
  let attribute = document.getElementById("webview");
  attribute.insertCSS(`#su{background-color: red}`) 
}}

function print() {
  let webview = document.querySelector("webview");
  print_win = new BrowserWindow({ "auto-hide-menu-bar": true });
  print_win.loadURL(webview.src);
  print_win.webContents.on("did-finish-load", () => {
  print_win.webContents.print();
  });
}
