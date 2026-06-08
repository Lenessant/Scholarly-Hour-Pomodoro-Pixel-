import { navigate } from "./router";
import { state } from "./state";
import { loadSettings } from "./utils/storage";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { playBell } from "./utils/sound";
import "./styles.css";

const saved = loadSettings();
if (saved) {
  state.settings = saved;
  state.time = saved.workDuration;
}

window.addEventListener("DOMContentLoaded", async () => {
  navigate("start");

  document.getElementById("closeBtn")!.addEventListener("click", async () => {
    await getCurrentWindow().close();
  });
  document.getElementById("minimizeBtn")!.addEventListener("click", async () => {
  await getCurrentWindow().minimize();
  });

  document.addEventListener("keydown", (e) => {
  if (e.key === "b") playBell();
});
});