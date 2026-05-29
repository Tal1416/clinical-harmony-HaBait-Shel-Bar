import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useSymptoms } from '../context/AppDataProvider.jsx';
import { toast } from '../lib/toast.js';

const CATS = [
  { id: 'pain',      label: 'Pain',         icon: 'bolt' },
  { id: 'digestive', label: 'Digestive',    icon: 'gastroenterology' },
  { id: 'mood',      label: 'Mood',         icon: 'mood' },
  { id: 'neuro',     label: 'Neurological', icon: 'psychology' }
];

const REGIONS = [
  { id: 'head',    label: 'Head',        x: 74,  y: 14, w: 52,  h: 52, rx: 26 },
  { id: 'neck',    label: 'Neck',        x: 92,  y: 62, w: 16,  h: 20, rx: 6 },
  { id: 'chest',   label: 'Chest',       x: 60,  y: 82, w: 80,  h: 70, rx: 14 },
  { id: 'abdomen', label: 'Abdomen',     x: 62,  y: 150, w: 76, h: 60, rx: 14 },
  { id: 'pelvic',  label: 'Pelvic Area', x: 64,  y: 208, w: 72, h: 40, rx: 14 },
  { id: 'arms-l',  label: 'Arms',        x: 30,  y: 86,  w: 22, h: 90, rx: 10, group: 'arms' },
  { id: 'arms-r',  label: 'Arms',        x: 148, y: 86,  w: 22, h: 90, rx: 10, group: 'arms' },
  { id: 'legs-l',  label: 'Legs',        x: 68,  y: 248, w: 28, h: 100, rx: 12, group: 'legs' },
  { id: 'legs-r',  label: 'Legs',        x: 104, y: 248, w: 28, h: 100, rx: 12, group: 'legs' }
];

const severityWord = (v) => (v <= 3 ? 'mild' : v <= 6 ? 'moderate' : v <= 8 ? 'severe' : 'very severe');

export default function SymptomLog() {
  const { addSymptom } = useSymptoms();
  const [category, setCategory] = useState('pain');
  const [region, setRegion] = useState('abdomen');
  const [severity, setSeverity] = useState(4);
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('Hours');
  const [frequency, setFrequency] = useState('Intermittent');
  const [notes, setNotes] = useState('');

  const groupOf = id => REGIONS.find(r => r.id === id)?.group || id;
  const activeGroup = groupOf(region);

  const severityColor = severity <= 3 ? 'text-primary' : severity <= 6 ? 'text-secondary' : severity <= 8 ? 'text-status-monitor' : 'text-error';

  const distinctRegions = [...new Map(REGIONS.map(r => [r.group || r.id, r])).values()];

  // Roving keyboard selection for the body-region radiogroup.
  function onRegionKeyDown(e) {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const idx = distinctRegions.findIndex(r => (r.group || r.id) === activeGroup);
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = distinctRegions[(idx + dir + distinctRegions.length) % distinctRegions.length];
    setRegion(next.id);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cat = CATS.find(c => c.id === category);
    const reg = REGIONS.find(r => (r.group || r.id) === activeGroup);
    const intensity5 = Math.max(1, Math.min(5, Math.ceil(severity / 2)));
    const tone = severity <= 3 ? 'primary' : severity <= 6 ? 'secondary' : severity <= 8 ? 'status-monitor' : 'error';
    await addSymptom({
      name: `${cat.label} · ${reg?.label || activeGroup}`,
      icon: cat.icon,
      intensity: intensity5,
      severity10: severity,
      tone,
      category: cat.label,
      when: 'Just now',
      notes,
      duration: `${duration || '—'} ${durationUnit}`,
      frequency
    });
    toast('Symptom entry saved · synced with your clinical team');
    setNotes(''); setDuration('');
  }

  async function quickLog(name, icon) {
    await addSymptom({ name, icon, intensity: 3, severity10: 5, tone: 'secondary', category: 'Quick log', when: 'Just now' });
    toast(`Quick-logged: ${name}`);
  }

  return (
    <Layout title="Symptom Logger" activeTab="my-care">
      <div className="max-w-[1200px] mx-auto">

        <section className="mb-stack-lg fade-in">
          <h1 className="text-headline-lg font-headline-lg text-on-surface">How are you feeling, Sarah?</h1>
          <p className="text-body-lg text-on-surface-variant">Log your daily wellness and symptoms to help your clinical team provide personalized care.</p>
        </section>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-gutter">

          <div className="col-span-12 lg:col-span-8 space-y-stack-lg">

            {/* 1. Category */}
            <fieldset className="bg-surface-container-lowest rounded-xl p-stack-lg border border-surface-container clinical-shadow">
              <legend className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2 float-none">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">category</span> 1. Select Category
              </legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack-md">
                {CATS.map(c => {
                  const active = category === c.id;
                  return (
                    <button key={c.id} type="button" onClick={() => setCategory(c.id)}
                      aria-pressed={active}
                      className={'flex flex-col items-center justify-center p-stack-md rounded-xl border-2 transition-all focus-bloom ' +
                        (active
                          ? 'border-primary bg-primary-container/10 text-primary'
                          : 'border-surface-variant text-on-surface-variant hover:border-primary/50')}>
                      <span className="material-symbols-outlined text-3xl mb-1" aria-hidden="true">{c.icon}</span>
                      <span className="font-body-sm font-bold">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 2. Body map */}
            <div className="bg-surface-container-lowest rounded-xl border border-surface-container clinical-shadow overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-stack-lg flex flex-col justify-center">
                <h2 className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">accessibility_new</span> 2. Target Area
                </h2>
                <p className="text-body-md text-on-surface-variant mb-stack-md" id="region-help">Choose the body region where the symptom is felt. Use arrow keys to move between regions.</p>
                <div role="radiogroup" aria-label="Body region" aria-describedby="region-help" className="space-y-unit" onKeyDown={onRegionKeyDown}>
                  {distinctRegions.map(r => {
                    const active = (r.group || r.id) === activeGroup;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        tabIndex={active ? 0 : -1}
                        onClick={() => setRegion(r.id)}
                        className={`w-full flex items-center gap-unit py-1 px-2 rounded-lg text-left transition-colors focus-bloom ${active ? 'text-primary bg-primary-container/10' : 'text-on-surface-variant hover:bg-surface-variant'}`}
                      >
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">{active ? 'check_circle' : 'radio_button_unchecked'}</span>
                        <span className={`text-body-sm ${active ? 'font-bold' : ''}`}>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-surface-container relative min-h-[280px] flex items-center justify-center p-stack-lg">
                <svg viewBox="0 0 200 360" className="h-72" aria-hidden="true">
                  {REGIONS.map(r => {
                    const active = (r.group || r.id) === activeGroup;
                    const shared = {
                      style: {
                        fill: 'rgb(var(--c-primary))',
                        fillOpacity: active ? 0.45 : 0.12,
                        stroke: 'rgb(var(--c-primary))',
                        strokeOpacity: active ? 0.9 : 0.3,
                        strokeWidth: active ? 3 : 2
                      },
                      className: 'cursor-pointer transition-all',
                      onClick: () => setRegion(r.id)
                    };
                    if (r.rx === r.w / 2) {
                      return <circle key={r.id} cx={r.x + r.w / 2} cy={r.y + r.h / 2} r={r.w / 2} {...shared} />;
                    }
                    return <rect key={r.id} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx} {...shared} />;
                  })}
                </svg>
              </div>
            </div>

            {/* 3. Severity + details */}
            <div className="bg-surface-container-lowest rounded-xl p-stack-lg border border-surface-container clinical-shadow space-y-stack-lg">
              <div>
                <h2 className="text-headline-sm font-headline-sm mb-stack-md flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">thermostat</span> 3. Severity Level
                  </span>
                  <span className={`text-headline-sm font-bold transition-colors ${severityColor}`} aria-hidden="true">{severity}</span>
                </h2>
                <div className="relative h-12 flex items-center px-2">
                  <div className="absolute inset-x-0 h-2 top-1/2 -translate-y-1/2 rounded-full severity-gradient opacity-25" aria-hidden="true" />
                  <input
                    className="severity-slider relative z-10"
                    type="range" min={1} max={10}
                    value={severity}
                    onChange={e => setSeverity(+e.target.value)}
                    aria-label="Severity level"
                    aria-valuetext={`${severity} of 10, ${severityWord(severity)}`}
                  />
                </div>
                <div className="flex justify-between text-label-caps text-on-surface-variant mt-2 px-1" aria-hidden="true">
                  <span>Mild</span><span>Moderate</span><span>Severe</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                <div>
                  <label htmlFor="duration-value" className="block text-label-caps mb-stack-sm text-on-surface-variant">Duration</label>
                  <div className="flex gap-2">
                    <input id="duration-value" value={duration} onChange={e => setDuration(e.target.value)} className="w-full h-12 rounded-lg border border-outline-variant bg-surface px-4 focus:border-primary focus:ring-0" placeholder="2" type="number" min="0"/>
                    <select aria-label="Duration unit" value={durationUnit} onChange={e => setDurationUnit(e.target.value)} className="w-full h-12 rounded-lg border border-outline-variant bg-surface px-4 focus:border-primary focus:ring-0">
                      <option>Hours</option><option>Minutes</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="frequency" className="block text-label-caps mb-stack-sm text-on-surface-variant">Frequency</label>
                  <select id="frequency" value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full h-12 rounded-lg border border-outline-variant bg-surface px-4 focus:border-primary focus:ring-0">
                    <option>Intermittent</option><option>Constant</option><option>Worsening over time</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-label-caps mb-stack-sm text-on-surface-variant">Clinical Notes & Observations</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} className="w-full min-h-[120px] rounded-lg border border-outline-variant bg-surface p-4 focus:border-primary focus:ring-0" placeholder="Describe any triggers, food, sleep changes, or unusual observations..." />
              </div>

              <button type="submit" className="w-full bg-primary text-on-primary h-14 rounded-xl font-bold text-body-lg hover:bg-primary-container transition flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[.98] focus-bloom">
                <span className="material-symbols-outlined" aria-hidden="true">save</span> Log Symptom Entry
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-4 space-y-stack-lg">
            <div className="bg-secondary-container/30 rounded-xl p-stack-lg border border-secondary-container/50">
              <h2 className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">bolt</span> Quick Log
              </h2>
              <p className="text-body-sm text-on-secondary-container mb-stack-md">One-tap log for recurring symptoms.</p>
              <div className="space-y-stack-sm">
                {[
                  { name: 'Abdominal Cramp', icon: 'water_drop',    last: 'Last log: 2 days ago' },
                  { name: 'Morning Nausea',  icon: 'electric_bolt', last: 'Last log: Yesterday' }
                ].map(q => (
                  <button key={q.name} type="button" onClick={() => quickLog(q.name, q.icon)}
                    className="w-full flex items-center justify-between p-stack-md bg-surface-container-lowest rounded-lg border border-secondary-container/30 hover:border-secondary transition-all clinical-shadow group focus-bloom">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary" aria-hidden="true">
                        <span className="material-symbols-outlined">{q.icon}</span>
                      </span>
                      <div className="text-left">
                        <p className="font-bold text-on-surface">{q.name}</p>
                        <p className="text-label-caps text-on-surface-variant">{q.last}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity text-secondary" aria-hidden="true">add_circle</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-outline-variant/40 p-stack-lg clinical-shadow relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl" aria-hidden="true" />
              <h2 className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" aria-hidden="true">auto_awesome</span> Clinical Insight
              </h2>
              <p className="text-body-md text-on-surface-variant italic border-l-4 border-primary/30 pl-4 py-2">
                "We've noticed your abdominal pain usually occurs 2 hours after meals. Consider logging your diet in the next step."
              </p>
              <div className="mt-stack-md pt-stack-md border-t border-surface-variant flex items-center justify-between">
                <Link to="/chat" className="text-primary font-bold text-label-caps hover:underline focus-bloom">DISCUSS WITH TEAM →</Link>
              </div>
            </div>

            <div className="bg-surface-container-highest rounded-xl p-stack-lg">
              <div className="flex justify-between items-center mb-stack-md">
                <h2 className="font-bold text-on-surface">Recent History</h2>
                <Link to="/history" className="text-primary font-bold text-label-caps hover:underline focus-bloom">View All</Link>
              </div>
              <div className="space-y-stack-sm">
                {[
                  { tone: 'error',          name: 'Severe Migraine',  when: 'Oct 22, 8:30 PM', score: '8/10' },
                  { tone: 'status-monitor', name: 'Lower Back Pain',  when: 'Oct 21, 2:15 PM', score: '3/10' },
                  { tone: 'primary',        name: 'Mild Joint Pain',  when: 'Oct 20, 9:00 AM', score: '2/10' }
                ].map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-${h.tone}`} aria-hidden="true" />
                    <div className="flex-1"><p className="text-body-sm font-bold">{h.name}</p><p className="text-label-caps text-on-surface-variant">{h.when}</p></div>
                    <span className="text-body-sm font-data-mono bg-surface px-2 py-0.5 rounded">{h.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>

      <Link to="/chat" className="fixed bottom-10 right-10 w-16 h-16 bg-error text-on-error rounded-full clinical-shadow flex items-center justify-center hover:scale-110 active:scale-95 transition group z-50 focus-bloom" aria-label="Call your care team — emergency">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">emergency</span>
        <span className="absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg text-label-caps opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap clinical-shadow">Call Care Team</span>
      </Link>
    </Layout>
  );
}
