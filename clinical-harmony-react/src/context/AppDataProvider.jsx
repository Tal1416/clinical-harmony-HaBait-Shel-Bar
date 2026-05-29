import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getRepository } from '../data/repository.js';
import { ensureSeeded } from '../data/seed.js';
import { relativeTime } from '../lib/format.js';

const AppDataContext = createContext(null);

/** Decorate stored records with a freshly-computed relative-time label. */
function decorate(list) {
  return list.map((s) => ({ ...s, whenLabel: s.t ? relativeTime(s.t) : s.when || '' }));
}

export function AppDataProvider({ children }) {
  const repo = useMemo(() => getRepository(), []);
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await ensureSeeded();
        const list = await repo.listSymptoms();
        if (active) setSymptoms(decorate(list));
      } catch (err) {
        console.error('Clinical Harmony: data load failed', err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [repo]);

  const addSymptom = useCallback(
    async (symptom) => {
      const record = await repo.addSymptom(symptom);
      setSymptoms((prev) => decorate([record, ...prev.map((s) => ({ ...s }))]));
      return record;
    },
    [repo]
  );

  const removeSymptom = useCallback(
    async (id) => {
      await repo.removeSymptom(id);
      setSymptoms((prev) => prev.filter((s) => s.id !== id));
    },
    [repo]
  );

  const refresh = useCallback(async () => {
    const list = await repo.listSymptoms();
    setSymptoms(decorate(list));
  }, [repo]);

  const clearAll = useCallback(async () => {
    await repo.clearSymptoms();
    setSymptoms([]);
  }, [repo]);

  const value = useMemo(
    () => ({ symptoms, loading, addSymptom, removeSymptom, refresh, clearAll }),
    [symptoms, loading, addSymptom, removeSymptom, refresh, clearAll]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useSymptoms() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useSymptoms must be used within <AppDataProvider>');
  return ctx;
}
