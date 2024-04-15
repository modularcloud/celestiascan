const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  ipcRenderer.on("navigate", (event, route) => {
    window.location.href = route;
  });
});
