require("dotenv").config();
const { app, BrowserWindow } = require("electron");
const path = require("path");
const server = require("./backend/api/api_backend");

const isDev = process.env.NODE_ENV !== "production";
const isNotMac = process.platform !== "darwin";

const createWindow = () => {
  const win = new BrowserWindow({
    title: "WheatManager",
    width: 800,
    height: 600,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'self';",
    },
    icon: "./frontend/frontend_look/logo/icon.ico",
  });
  win.loadFile("index.html");

  if (isDev) {
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("active", () => {
    if (BrowserWindow.getAllWindows.length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (isNotMac) {
    app.quit();
  }
});
