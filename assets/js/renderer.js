
const {shell} = require('electron')
const webview = document.getElementById('webview')
webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    // 打开新窗口
    // shell.openExternal(e.url)
    // window.open(e.url)
    // 内容重新显示到webview
    // webview.reloadIgnoringCache(e.url);
    webview.src=e.url
    }
});

