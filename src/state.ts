export type Phase = "work" | "shortBreak" | "longBreak";

export interface Settings {
  workDuration: number; //seconds
  shortBreakDuration: number; //seconds
  longtBreakDuration: number; //seconds
}

export interface AppState {
  time: number;
  isPaused: boolean;
  phase: Phase;
  settings: Settings;
}

const DEFAULT_SETTINGS: Settings = {
  workDuration: 25*60,
  shortBreakDuration: 5*60,
  longtBreakDuration: 15*60,
};

//this is the current state

export const state : AppState = {
  time: DEFAULT_SETTINGS.workDuration,
  isPaused: true,
  phase: "work",
  settings: {...DEFAULT_SETTINGS},
};

export function resetToPhase (phase:Phase): void {
  state.phase = phase;
  state.isPaused = true;

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