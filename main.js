const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let win = null;

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) { if (win.isMinimized()) win.restore(); win.focus(); }
  });

  app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    win = new BrowserWindow({
      width: 1400,
      height: 920,
      minWidth: 420,
      minHeight: 600,
      show: false,
      backgroundColor: '#07090b',
      title: 'PartVault',
      icon: path.join(__dirname, 'icon.png'),
      webPreferences: { contextIsolation: true, sandbox: true, spellcheck: false }
    });

    win.once('ready-to-show', () => win.show());
    win.loadFile(path.join(__dirname, 'index.html'));

    // Links to websites (datasheets) open in the default browser.
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (/^https?:\/\//i.test(url)) shell.openExternal(url);
      return { action: 'deny' };
    });
    win.webContents.on('will-navigate', (e, url) => {
      if (url !== win.webContents.getURL()) {
        e.preventDefault();
        if (/^https?:\/\//i.test(url)) shell.openExternal(url);
      }
    });

    // No menu bar, so provide zoom and fullscreen shortcuts.
    win.webContents.on('before-input-event', (e, input) => {
      if (input.type !== 'keyDown') return;
      const wc = win.webContents;
      if (input.control && (input.key === '=' || input.key === '+')) { wc.setZoomLevel(wc.getZoomLevel() + 0.5); e.preventDefault(); }
      else if (input.control && input.key === '-') { wc.setZoomLevel(wc.getZoomLevel() - 0.5); e.preventDefault(); }
      else if (input.control && input.key === '0') { wc.setZoomLevel(0); e.preventDefault(); }
      else if (input.key === 'F11') { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    });

    win.on('closed', () => { win = null; });
  });

  app.on('window-all-closed', () => app.quit());
}
