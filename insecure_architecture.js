// Main Process File (Insecure Architecture)
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

ipcMain.handle('app-media:delete-cache', async (event, targetFilename) => {
    // BUG: Direct string concatenation without path validation or containment check
    const storagePath = path.join(app.getPath('userData'), 'CacheClips', targetFilename);
    
    if (fs.existsSync(storagePath)) {
        fs.unlinkSync(storagePath); // Execution of the primitive
        return { success: true };
    }
    return { success: false };
});
