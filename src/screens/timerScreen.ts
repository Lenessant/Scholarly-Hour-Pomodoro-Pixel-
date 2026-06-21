import { navigate } from "../router";
import { state, resetToPhase } from "../state";
import { toggle, reset, stop, setCallbacks } from "../timer";
import { formatTime } from "../utils/formatTime";
import { playBell } from "../utils/sound";
import { sendNotification } from "../utils/notify";
import "./timer.css";

export function showTimerScreen (app: HTMLDivElement): void {
  app.innerHTML = `
    <div class="screen">
      <div class="mode-tabs">
        <button id="workTab">Focus</button>
        <button id="sBreakTab">Short Break</button>
        <button id="lBreakTab">Long Break</button>
      </div>

      <div class="timer-display">
        <img src="/assets/images/hourglass.gif" id="hourglass"/>
        <h1 id="timer">${formatTime(state.time)}</h1>
      </div>

      <div class="controls">
        <button id="restartBtn"><img src="/assets/images/refreshBtn.png" alt="Restart"/></button>
        <button id="pauseBtn"><img src="/assets/images/${state.isPaused ? 'playBtn.png' : 'pauseBtn.png'}" alt="Pause"/></button>
        <button id="settingsBtn"><img src="/assets/images/settings-icon.png" alt="Settings"/></button>
      </div>
    </div>
  `;

  const timerEl = document.getElementById("timer")!;
  const pauseBtn = document.getElementById("pauseBtn")!;
  const restartBtn = document.getElementById("restartBtn")!;
  const settingsBtn = document.getElementById("settingsBtn")!;
  
  const workTab = document.getElementById("workTab")!;
  const sBreakTab = document.getElementById("sBreakTab")!;
  const lBreakTab = document.getElementById("lBreakTab")!;

  function updateDisplay(): void {
    timerEl.textContent = formatTime(state.time);
    const pauseImg = pauseBtn.querySelector("img") as HTMLImageElement;
    pauseImg.src = state.isPaused ? "/assets/images/playBtn.png" : "/assets/images/pauseBtn.png";
    updateTabs();
  }

  setCallbacks({
    onTick: updateDisplay,
    onComplete: async () => {
      playBell();

      if (state.phase === "work") {
        // Work session ended — tell the scholar to rest
        await sendNotification("⚔️ Focus session complete!", "Well done, scholar. Take your rest.");
        resetToPhase("shortBreak");
      } else {
        // Break ended — time to get back to work
        await sendNotification("📜 Break over!", "Back to the scrolls, scholar.");
        resetToPhase("work");
      }

      stop();
      updateDisplay();
    },
  });

  workTab.addEventListener("click", () => {
    resetToPhase("work");
    updateDisplay();
  });

  sBreakTab.addEventListener("click", () => {
    resetToPhase("shortBreak");
    updateDisplay();
  });

  lBreakTab.addEventListener("click", () => {
    resetToPhase("longBreak");
    updateDisplay();
  });

  pauseBtn.addEventListener("click", () => {
    toggle();
    updateDisplay();
  });

  restartBtn.addEventListener("click", () => {
    reset();
    updateDisplay();
  });

  settingsBtn.addEventListener("click", () => {
    navigate("settings");
  });

  function updateTabs() {
    workTab.classList.toggle("active", state.phase === "work");
    sBreakTab.classList.toggle("active", state.phase === "shortBreak");
    lBreakTab.classList.toggle("active", state.phase === "longBreak");
  }

  updateTabs();
}