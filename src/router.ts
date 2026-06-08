import {showStartScreen} from "./screens/startScreen";
import {showTimerScreen} from "./screens/timerScreen";
import {showSettingsScreen} from "./screens/settingsScreen";


export type Screen = "start" | "timer" | "settings";

const app = document.querySelector("#app") as HTMLDivElement;

export function navigate (screen:Screen): void {
  app.innerHTML = "";

  switch (screen){
    case "start": return showStartScreen(app);
    case "timer": return showTimerScreen(app);
    case "settings": return showSettingsScreen(app);
  }
}