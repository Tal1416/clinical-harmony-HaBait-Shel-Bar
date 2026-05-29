import { getRepository } from './repository.js';

const HOUR = 1000 * 60 * 60;
const DAY = HOUR * 24;

/** Build the first-run demo dataset relative to "now" so it always looks fresh. */
function seedSymptoms() {
  const now = Date.now();
  return [
    { name: 'Mild Joint Pain',     icon: 'flare',             intensity: 2, severity10: 3, tone: 'primary',        category: 'Pain',         t: now - 16 * HOUR },
    { name: 'Dizziness',           icon: 'device_thermostat', intensity: 1, severity10: 2, tone: 'secondary',      category: 'Neurological', t: now - 22 * HOUR },
    { name: 'Shortness of Breath', icon: 'air',               intensity: 4, severity10: 7, tone: 'error',          category: 'Pain',         t: now - 2 * DAY },
    { name: 'Morning Nausea',      icon: 'electric_bolt',     intensity: 2, severity10: 4, tone: 'secondary',      category: 'Digestive',    t: now - 3 * DAY },
    { name: 'Lower Back Pain',     icon: 'bolt',              intensity: 2, severity10: 3, tone: 'status-monitor', category: 'Pain',         t: now - 4 * DAY },
    { name: 'Severe Migraine',     icon: 'psychology',        intensity: 4, severity10: 8, tone: 'error',          category: 'Neurological', t: now - 6 * DAY },
  ];
}

let seedPromise;

/**
 * Insert demo data on first run only (when the store is empty), so every screen
 * looks populated out of the box. Real logged entries are never overwritten.
 *
 * Memoized so concurrent callers (e.g. React StrictMode's double-mount in dev)
 * share one operation and can never double-seed.
 */
export function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const repo = getRepository();
      const existing = await repo.countSymptoms();
      if (existing > 0) return;
      for (const s of seedSymptoms()) {
        // eslint-disable-next-line no-await-in-loop -- one-time first-run seed
        await repo.addSymptom(s);
      }
    })();
  }
  return seedPromise;
}
