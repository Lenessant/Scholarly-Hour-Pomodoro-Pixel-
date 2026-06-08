import { state, resetToPhase } from "../state";
import { saveSettings } from "./storage";
import { stop } from "../timer";

let onSaved: (() => void) | null = null;

export function openSettingsModal(callbacks?: { onSaved?: () => void }): void {
  if (document.getElementById("settings-modal")) return;

  onSaved = callbacks?.onSaved ?? null;

  const workMin  = Math.floor(state.settings.workDuration / 60);
  const shortbreakMin = Math.floor(state.settings.shortBreakDuration / 60);
  const longbkreaMin = Math.floor (state.settings.longtBreakDuration/60);

  const overlay = document.createElement("div");
  overlay.id = "settings-modal";
  overlay.innerHTML = `
    <div id="modal-box">
      <h2>Tome of Settings</h2>

      <label>
        Work duration (minutes)
        <input id="workInput" type="number" min="1" max="99" value="${workMin}" />
      </label>

      <label>
        Short break duration (minutes)
        <input id="shortbreakInput" type="number" min="1" max="99" value="${shortbreakMin}" />
      </label>
      
      <label>
        Long break duration (minutes)
        <input id="longbreakInput" type="number" min="1" max="99" value="${longbkreaMin}" />
      </label>

      <div class="modal-controls">
        <button id="modalSaveBtn">Save</button>
        <button id="modalCancelBtn">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("modalSaveBtn")!.addEventListener("click", () => {
    const workVal  = parseInt((document.getElementById("workInput")  as HTMLInputElement).value);
    const shortbreakVal = parseInt((document.getElementById("shortbreakInput") as HTMLInputElement).value);
    const longbreakVal = parseInt((document.getElementById("longbreakInput") as HTMLInputElement).value);

    if (
      isNaN(workVal) || 
      isNaN(shortbreakVal) || 
      isNaN (longbreakVal) ||
      workVal < 1 || 
      shortbreakVal < 1 ||
      longbreakVal < 1 

    ) return;
    stop();
    state.settings.workDuration  = workVal  * 60;
    state.settings.shortBreakDuration = shortbreakVal * 60;
    state.settings.longtBreakDuration = longbreakVal * 60;
    saveSettings(state.settings);
    resetToPhase("work");
    closeSettingsModal();
    onSaved?.();
  });

  document.getElementById("modalCancelBtn")!.addEventListener("click", closeSettingsModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSettingsModal();
  });
}

export function closeSettingsModal(): void {
  document.getElementById("settings-modal")?.remove();
}