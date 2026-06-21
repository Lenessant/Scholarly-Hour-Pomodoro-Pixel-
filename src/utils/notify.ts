// ============================================================
// notify.ts — Native OS notifications via Tauri's notification plugin.
// Since we're a Tauri desktop app, we use Tauri's API instead of
// the browser's Notification API. This works even when the window
// is minimized, and doesn't require browser permission prompts.
// ============================================================

// Tauri's notification plugin is installed via: npm run tauri add notification
// It exposes two functions we need:
// - isPermissionGranted: checks if the OS has allowed notifications
// - requestPermission: asks the OS for permission (shows a system dialog)
// - sendNotification: fires the actual native toast
import {
  isPermissionGranted,
  requestPermission,
  sendNotification as tauriSendNotification,
} from "@tauri-apps/plugin-notification";

// Call this once when the app starts.
// It checks if we already have permission, and if not, asks for it.
// "async" means this function can pause and wait (for the OS dialog).
export async function requestNotificationPermission(): Promise<void> {
  const granted = await isPermissionGranted();

  // If the OS hasn't granted permission yet, request it now
  if (!granted) {
    await requestPermission();
  }
}

// Fires a native OS notification with a title and body.
// "async" because we need to check permission before sending.
export async function sendNotification(title: string, body?: string): Promise<void> {
  const granted = await isPermissionGranted();

  // Silently skip if the user denied permission
  if (!granted) return;

  // tauriSendNotification handles the OS toast — works on Windows, Mac, Linux
  tauriSendNotification({ title, body });
}