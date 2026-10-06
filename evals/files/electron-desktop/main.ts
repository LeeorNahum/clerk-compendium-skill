import { createClerkBridge } from "@clerk/electron";
import { storage } from "@clerk/electron/storage";
import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";

createClerkBridge({ storage: storage() });

ipcMain.handle("memberships:list", async (_event, userId: string) => {
  const response = await fetch(
    `https://api.clerk.com/v1/users/${userId}/organization_memberships`,
    { headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` } },
  );
  return response.json();
});

app.whenReady().then(() => {
  const window = new BrowserWindow({
    webPreferences: { preload: path.join(__dirname, "preload.js") },
  });
  window.loadFile(path.join(__dirname, "../renderer/index.html"));
});
