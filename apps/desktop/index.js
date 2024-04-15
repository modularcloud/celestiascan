/* eslint-disable turbo/no-undeclared-env-vars */
// @ts-check
const {
  app,
  Menu,
  BrowserWindow,
  dialog,
  MenuItem,
  ipcMain,
} = require("electron");
const todesktop = require("@todesktop/runtime");
const log = require("electron-log/main");
const path = require("path");

log.initialize();
log.transports.ipc.level = "verbose";
Object.assign(console, log.functions);

log.errorHandler.startCatching({
  showDialog: true,
  onError({ error, processType }) {
    if (processType === "renderer") {
      return;
    }

    dialog
      .showMessageBox({
        title: "An error occurred",
        message: error.message,
        detail: error.stack,
        type: "error",
        buttons: ["Ignore", "Exit"],
      })
      .then((result) => {
        if (result.response === 1) {
          app.quit();
        }
      });
  },
});

function getRandomPort() {
  return Math.floor(Math.random() * (65535 - 49152 + 1)) + 49152;
}

let hasServerStarted = false;
let totalAttempsLeft = 10;
process.env.ROOT_USER_PATH = app.getPath("userData");
while (!hasServerStarted && totalAttempsLeft > 0) {
  try {
    process.env.PORT = getRandomPort().toString();
    require("./apps/web/server.js");
    hasServerStarted = true;
  } catch (error) {
    totalAttempsLeft--;
  }
}

todesktop.init();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    title: "Explorer",
    titleBarStyle: "hidden",
    trafficLightPosition: {
      x: 16,
      y: 16,
    },
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  /** @type any */
  const template = [
    {
      label: "File",
      submenu: [{ label: "Exit", role: "quit" }],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", role: "undo" },
        { label: "Redo", role: "redo" },
        { type: "separator" },
        { label: "Cut", role: "cut" },
        { label: "Copy", role: "copy" },
        { label: "Paste", role: "paste" },
      ],
    },
    {
      label: "View",
      submenu: [
        { label: "Reload", role: "reload" },
        { label: "Toggle Developer Tools", role: "toggleDevTools" },
      ],
    },
    {
      label: "Develop",
      submenu: [
        {
          label: "Add Local Chain",
          click: () => {
            mainWindow.webContents.send("navigate", "/register/local-chain");
          },
        },
        {
          label: "Go home",
          click: () => {
            mainWindow.webContents.send("navigate", "/");
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // this is to override the title set by `./apps/web/server.js`
  // so that the window will show `Explorer` instead of `next-server`
  process.title = mainWindow.title;

  // and load the index.html of the app.
  mainWindow.loadURL(`http://localhost:${process.env.PORT}`);
  mainWindow.on("closed", () => {
    app.quit();
  });
  ipcMain.on("navigate", (event, route) => {
    mainWindow.webContents.send("navigate", route);
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  app.quit();
});
