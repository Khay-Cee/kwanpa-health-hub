// Lightweight helper for doctor auth actions (client-only, localStorage)
export function getDoctor() {
  try {
    const raw = localStorage.getItem('doctor');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed to parse doctor from localStorage', e);
    return null;
  }
}

export function saveDoctor(doc: Record<string, any>) {
  try {
    localStorage.setItem('doctor', JSON.stringify(doc));
  } catch (e) {
    console.warn('Failed to save doctor to localStorage', e);
  }
}

export function logoutDoctor() {
  try {
    localStorage.removeItem('doctor');
  } catch (e) {
    console.warn('Failed to remove doctor from localStorage', e);
  }
}

export default { getDoctor, saveDoctor, logoutDoctor };
