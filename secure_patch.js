// Main Process File (Remediated Architecture)
const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

ipcMain.handle('app-media:delete-cache', async (event, targetFilename) => {
    const baseDirectory = path.join(app.getPath('userData'), 'CacheClips');
    
    // 1. Resolve absolute path to clear relative traversal vectors
    const resolvedPath = path.resolve(baseDirectory, targetFilename);
    
    // 2. Strict Boundary Verification
    if (!resolvedPath.startsWith(baseDirectory)) {
        throw new Error('Security Violation: Unauthorized Directory Traversal Attempt Detected.');
    }
    
    // 3. Safe Execution
    if (fs.existsSync(resolvedPath)) {
        fs.unlinkSync(resolvedPath);
        return { success: true };
    }
    return { success: false };
});
