const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const fs = require("fs");

// 菜单（用于标准键盘快捷键）
const { Menu } = require("electron");

const template = [
  {
    label: "编辑",
    submenu: [
      { label:'前进',role: "undo" },
      { label:'后退',role: "redo" },
      { type: "separator" },
      { label:'剪切', role: "cut" },
      { label:'复制',role: "copy" },
      { label:'粘贴', role: "paste" },
      { label:'粘贴样式', role: "pasteandmatchstyle" },
      { label:'删除', role: "delete" },
      { label:'全选', role: "selectall" }
    ]
  },
  {
    label: "查看",
    submenu: [
      {label:'加载', role: "reload" },
      {label:'预加载', role: "forcereload" },
      {label:'开发工具', role: "toggledevtools" },
      {type: "separator" },
      {label:'重设缩放', role: "resetzoom" },
      {label:'放大', role: "zoomin" },
      {label:'缩小', role: "zoomout" },
      {type: "separator" },
      {label:'切换全屏', role: "togglefullscreen" }
    ]
  },
  {
    label: "窗口",
    submenu: [{label:'最小化', role: "minimize" }, {label:'关闭', role: "close" }]
  }
];

if (process.platform === "darwin") {
  template.unshift({
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services", submenu: [] },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  });

  // Edit menu
  template[1].submenu.push(
    { type: "separator" },
    {
      label: "Speech",
      submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
    }
  );

  // Window menu
  template[3].submenu = [
    { role: "close" },
    { role: "minimize" },
    { role: "zoom" },
    { type: "separator" },
    { role: "front" }
  ];
}

// 保留窗口对象的全局引用，否则，当垃圾对象被垃圾回收时，窗口将自动关闭
let mainWindow;
let initPath;

// 当Electron完成初始化并准备创建浏览器窗口时，将调用此方法。
app.allowRendererProcessReuse = true;
app.on("ready", () => {
  initPath = path.join(app.getPath("userData"), "init.json");

  try {
    data = JSON.parse(fs.readFileSync(initPath, "utf8"));
  } catch (e) {}

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 779,
    // 不能改变窗口大小
    resizable:false,

    icon: path.join(__dirname, "assets/icons/png/64x64.png"),
    //titleBarStyle: 'hidden',
    //frame: false,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      zoomFactor: 1.0
    }
  });

  mainWindow.loadURL("file://" + __dirname + "/index.html");

  // Display Dev Tools
  // mainWindow.openDevTools();

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

// 关闭所有窗口后退出。
app.on("window-all-closed", () => {
  data = {
    bounds: mainWindow.getBounds()
  };
  fs.writeFileSync(initPath, JSON.stringify(data));
  app.quit();
});
