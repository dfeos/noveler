import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: false, // allow preload-less node access
      nodeIntegration: true    // allow using fs, path in renderer
    }
  });

  win.loadFile(path.resolve(__dirname, 'index.html')); // load compiled HTML
}

app.whenReady().then(createWindow);

// Handle macOS dock behavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
