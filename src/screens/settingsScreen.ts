import { state, resetToPhase } from "../state";
import { saveSettings } from "../utils/storage";
import { stop } from "../timer";
import { navigate } from "../router";
import "./settings.css";

export function showSettingsScreen(app: HTMLDivElement): void {
  const workMin = Math.floor(state.settings.workDuration / 60);
  const shortBreakMin = Math.floor(state.settings.shortBreakDuration / 60);
  const longBreakMin = Math.floor(state.settings.longtBreakDuration / 60);

  app.innerHTML = `
    <div class="screen">
      <h2>Mechanisms</h2>

      <div class="settings-fields">
        <label>
          Focus 
          <input id="workInput" type="number" min="1" max="99" value="${workMin}" />
        </label>

        <label>
          Short break 
          <input id="shortbreakInput" type="number" min="1" max="99" value="${shortBreakMin}" />
        </label>

        <label>
          Long break
          <input id="longbreakInput" type="number" min="1" max="99" value="${longBreakMin}" />
        </label>
      </div>

      <div class="settings-controls">
        <button id="cancelBtn">Cancel</button>
        <button id="saveBtn">Save</button>
      </div>
    </div>
  `;

  document.getElementById("saveBtn")!.addEventListener("click", () => {
    const workVal = parseInt((document.getElementById("workInput") as HTMLInputElement).value);
    const shortBreakVal = parseInt((document.getElementById("shortbreakInput") as HTMLInputElement).value);
    const longBreakVal = parseInt((document.getElementById("longbreakInput") as HTMLInputElement).value);

    if (
      isNaN(workVal) || isNaN(shortBreakVal) || isNaN(longBreakVal) ||
      workVal < 1 || shortBreakVal < 1 || longBreakVal < 1
    ) return;

    stop();
    state.settings.workDuration = workVal * 60;
    state.settings.shortBreakDuration = shortBreakVal * 60;
    state.settings.longtBreakDuration = longBreakVal * 60;
    saveSettings(state.settings);
    resetToPhase("work");
    navigate("timer");
  });

  document.getElementById("cancelBtn")!.addEventListener("click", () => {
    navigate("timer");
  });
}