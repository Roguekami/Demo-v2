// ===========================================================
// Alimo EduCloud Portal — Router & Auth State
// ===========================================================

const STORAGE_KEY = 'alimo-educloud:user';

function loadUser() {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY)); } catch { return null; }
}

let _user = loadUser();

export function navigate(path) {
  window.location.hash = path;
}

// Re-render the current route (after data changes)
export function rerender() {
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function getUser() {
  return _user;
}

export function setUser(user) {
  _user = user;
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user)); } catch {}
}

export function clearUser() {
  _user = null;
  try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
}
