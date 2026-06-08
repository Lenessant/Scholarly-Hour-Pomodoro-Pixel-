// Web Audio API — no external deps needed
let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function beep(freq: number, duration: number, gain = 0.3): void {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const vol = ac.createGain();

  osc.connect(vol);
  vol.connect(ac.destination);

  osc.frequency.value = freq;
  osc.type = "sine";
  vol.gain.setValueAtTime(gain, ac.currentTime);
  vol.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
}

// A short medieval-ish bell chime
export function playBell(): void {
  beep(660, 1.5, 0.4);
  setTimeout(() => beep(880, 1.2, 0.3), 300);
  setTimeout(() => beep(1100, 1.0, 0.2), 600);
  setTimeout(() => beep(880, 1.5, 0.15), 900);
  setTimeout(() => beep(660, 2.0, 0.1), 1200);
}

