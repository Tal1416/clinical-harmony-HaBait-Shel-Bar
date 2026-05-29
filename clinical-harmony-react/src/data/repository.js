import { createIndexedDbAdapter } from './adapters/indexeddb.js';
// import { createHttpAdapter } from './adapters/http.js';

/**
 * Single source of truth for data access.
 *
 * The rest of the app depends ONLY on the object returned here, never on the
 * underlying storage mechanism. To move to a real backend (Phase 2), swap the
 * adapter below — e.g.:
 *
 *   repo = import.meta.env.VITE_API_URL
 *     ? createHttpAdapter({ baseUrl: import.meta.env.VITE_API_URL })
 *     : createIndexedDbAdapter();
 *
 * The contract every adapter must implement:
 *   listSymptoms()            -> Promise<Symptom[]>   (newest first)
 *   addSymptom(symptom)       -> Promise<Symptom>     (assigns id + t)
 *   updateSymptom(id, patch)  -> Promise<Symptom|null>
 *   removeSymptom(id)         -> Promise<void>
 *   clearSymptoms()           -> Promise<void>
 *   countSymptoms()           -> Promise<number>
 *   getPref(key, fallback)    -> Promise<any>
 *   setPref(key, value)       -> Promise<any>
 */
let repo;

export function getRepository() {
  if (!repo) repo = createIndexedDbAdapter();
  return repo;
}
