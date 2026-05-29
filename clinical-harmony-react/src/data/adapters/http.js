/**
 * Phase 2 swap point.
 *
 * Implement the SAME contract as the IndexedDB adapter, but against a real
 * backend (REST endpoints, Supabase, etc.). When that day comes, point
 * createRepository() in ../repository.js at this adapter and NOTHING in the UI
 * has to change — every screen depends only on the repository contract.
 *
 * Until configured it throws loudly so accidental use is obvious.
 */
const notConfigured = () => {
  throw new Error('HTTP data adapter is not configured yet (planned for Phase 2).');
};

export function createHttpAdapter(/* { baseUrl, getToken } = {} */) {
  return {
    listSymptoms: notConfigured,
    addSymptom: notConfigured,
    updateSymptom: notConfigured,
    removeSymptom: notConfigured,
    clearSymptoms: notConfigured,
    countSymptoms: notConfigured,
    getPref: notConfigured,
    setPref: notConfigured,
  };
}
