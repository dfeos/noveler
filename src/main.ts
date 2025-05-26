import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: false, // allow preload-less node access
      nodeIntegration: true    // allow using fs, path in renderer
    }
  });
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

// Handle macOS dock behavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
