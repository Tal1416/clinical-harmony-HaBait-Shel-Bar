/**
 * Tiny dependency-free IndexedDB wrapper for Clinical Harmony.
 *
 * Exposes a flat promise-based key/store API. Falls back transparently to an
 * in-memory backend when IndexedDB is unavailable (SSR, very old browsers, or
 * private-mode lockdowns) so the app never hard-crashes on storage access.
 *
 * The repository layer (src/data/) is the only consumer — UI code never imports
 * this directly. That indirection is what makes the app "backend-ready": a real
 * backend adapter implements the same repository contract without touching this.
 */

const DB_NAME = 'clinical-harmony';
const DB_VERSION = 1;

// store name -> keyPath
const STORES = { symptoms: 'id', messages: 'id', prefs: 'key' };
// store name -> [[indexName, keyPath], ...]
const INDEXES = { symptoms: [['by_t', 't']], messages: [['by_t', 't']] };

let backendPromise;

function memoryBackend() {
  const data = { symptoms: new Map(), messages: new Map(), prefs: new Map() };
  return {
    getAll: (s) => Promise.resolve([...data[s].values()]),
    get: (s, k) => Promise.resolve(data[s].get(k)),
    put: (s, v) => { data[s].set(v[STORES[s]], v); return Promise.resolve(v[STORES[s]]); },
    add: (s, v) => { data[s].set(v[STORES[s]], v); return Promise.resolve(v[STORES[s]]); },
    del: (s, k) => { data[s].delete(k); return Promise.resolve(); },
    clear: (s) => { data[s].clear(); return Promise.resolve(); },
    count: (s) => Promise.resolve(data[s].size),
  };
}

function idbBackend(db) {
  const run = (store, mode, fn) =>
    new Promise((resolve, reject) => {
      const req = fn(db.transaction(store, mode).objectStore(store));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  return {
    getAll: (s) => run(s, 'readonly', (os) => os.getAll()),
    get: (s, k) => run(s, 'readonly', (os) => os.get(k)),
    put: (s, v) => run(s, 'readwrite', (os) => os.put(v)),
    add: (s, v) => run(s, 'readwrite', (os) => os.add(v)),
    del: (s, k) => run(s, 'readwrite', (os) => os.delete(k)),
    clear: (s) => run(s, 'readwrite', (os) => os.clear()),
    count: (s) => run(s, 'readonly', (os) => os.count()),
  };
}

function openBackend() {
  if (backendPromise) return backendPromise;
  backendPromise = new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') return resolve(memoryBackend());
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        for (const [name, keyPath] of Object.entries(STORES)) {
          if (!db.objectStoreNames.contains(name)) {
            const os = db.createObjectStore(name, { keyPath });
            (INDEXES[name] || []).forEach(([iname, ipath]) => os.createIndex(iname, ipath));
          }
        }
      };
      req.onsuccess = () => resolve(idbBackend(req.result));
      req.onerror = () => resolve(memoryBackend());
      req.onblocked = () => resolve(memoryBackend());
    } catch {
      resolve(memoryBackend());
    }
  });
  return backendPromise;
}

export async function getAll(store) { return (await openBackend()).getAll(store); }
export async function get(store, key) { return (await openBackend()).get(store, key); }
export async function put(store, value) { return (await openBackend()).put(store, value); }
export async function add(store, value) { return (await openBackend()).add(store, value); }
export async function del(store, key) { return (await openBackend()).del(store, key); }
export async function clear(store) { return (await openBackend()).clear(store); }
export async function count(store) { return (await openBackend()).count(store); }
