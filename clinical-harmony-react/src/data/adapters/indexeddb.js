import { getAll, get, put, del, clear, count } from '../../lib/db.js';

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);

/**
 * IndexedDB-backed implementation of the repository contract
 * (see src/data/repository.js). Records are plain serializable objects, so the
 * exact same shapes round-trip through a future HTTP/SQL backend unchanged.
 */
export function createIndexedDbAdapter() {
  return {
    async listSymptoms() {
      const all = await getAll('symptoms');
      return all.sort((a, b) => (b.t || 0) - (a.t || 0));
    },

    async addSymptom(symptom) {
      // Respect a provided id/t (used by the seeder) but generate when absent.
      const record = { ...symptom, id: symptom.id ?? uid(), t: symptom.t ?? Date.now() };
      await put('symptoms', record);
      return record;
    },

    async updateSymptom(id, patch) {
      const existing = await get('symptoms', id);
      if (!existing) return null;
      const updated = { ...existing, ...patch, id };
      await put('symptoms', updated);
      return updated;
    },

    async removeSymptom(id) {
      await del('symptoms', id);
    },

    async clearSymptoms() {
      await clear('symptoms');
    },

    async countSymptoms() {
      return count('symptoms');
    },

    async getPref(key, fallback = null) {
      const row = await get('prefs', key);
      return row ? row.value : fallback;
    },

    async setPref(key, value) {
      await put('prefs', { key, value });
      return value;
    },
  };
}
