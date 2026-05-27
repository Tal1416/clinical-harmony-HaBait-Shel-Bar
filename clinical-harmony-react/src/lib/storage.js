const KEY = 'clinical-harmony.symptoms';

export function loadSymptoms() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSymptom(symptom) {
  try {
    const list = loadSymptoms();
    list.unshift({ ...symptom, t: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  } catch {
    /* ignore */
  }
}

let toastTimer;
export function toast(message) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}
