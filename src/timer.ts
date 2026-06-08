import { state } from "./state";
type TimerCallBack = () => void;

let interval : number | null= null;
let onTick : TimerCallBack | null = null;
let onComplete : TimerCallBack | null = null;

export function setCallbacks(callbacks: {
  onTick?: TimerCallBack;
  onComplete?: TimerCallBack;
}): void {
  onTick = callbacks.onTick ?? null;
  onComplete = callbacks.onComplete ?? null;
}

export function start (): void {
  if (interval !== null) return; //guard against double start
  state.isPaused = false;

  interval=setInterval(()=> {
    state.time --;
    onTick?.();

    if (state.time <= 0){
      stop();
      onComplete?.();
    }
  }, 1000)
}

export function stop(): void {
  if (interval!== null){
    clearInterval(interval);
    interval = null;
  }
  state.isPaused = true;
}

export function reset(): void {
  stop();
  switch (state.phase) {
    case "work":
      state.time = state.settings.workDuration;
      break;
    case "shortBreak":
      state.time = state.settings.shortBreakDuration;
      break
    case "longBreak":
      state.time = state.settings.longtBreakDuration
      break;
  }
}

export function toggle(): void {
  state.isPaused ?start() : stop();
}
 