import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { saveSymptom, toast } from '../lib/storage.js';

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

export default function SymptomLog() {
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

  function handleSubmit(e) {
    e.preventDefault();
    const cat = CATS.find(c => c.id === category);
    const reg = REGIONS.find(r => (r.group || r.id) === activeGroup);
    const intensity5 = Math.max(1, Math.min(5, Math.ceil(severity / 2)));
    const tone = severity <= 3 ? 'primary' : severity <= 6 ? 'secondary' : severity <= 8 ? 'status-monitor' : 'error';
    saveSymptom({
      name: `${cat.label} · ${reg?.label || activeGroup}`,
      icon: cat.icon,
      intensity: intensity5,
      severity10: severity,
      tone,
      when: 'Just now',
      notes, duration: `${duration || '—'} ${durationUnit}`, frequency
    });
    toast('Symptom entry saved · synced with your clinical team');
    setNotes(''); setDuration('');
  }

  function quickLog(name, icon) {
    saveSymptom({ name, icon, intensity: 3, tone: 'secondary', when: 'Just now' });
    toast(`Quick-logged: ${name}`);
  }

  return (
    <Layout title="Symptom Logger" activeTab="my-care">
      <main className="ml-64 p-container-padding-desktop min-h-screen">
        <div className="max-w-[1200px] mx-auto">

          <section className="mb-stack-lg fade-in">
            <h3 className="text-headline-lg font-headline-lg text-on-surface">How are you feeling, Sarah?</h3>
            <p className="text-body-lg text-on-surface-variant">Log your daily wellness and symptoms to help your clinical team provide personalized care.</p>
          </section>

          <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-gutter">

            <div className="col-span-12 lg:col-span-8 space-y-stack-lg">

              {/* 1. Category */}
              <div className="bg-surface-container-lowest rounded-xl p-stack-lg border border-surface-container clinical-shadow">
                <h4 className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">category</span> 1. Select Category
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-stack-md">
                  {CATS.map(c => {
                    const active = category === c.id;
                    return (
                      <button key={c.id} type="button" onClick={() => setCategory(c.id)}
                        className={'flex flex-col items-center justify-center p-stack-md rounded-xl border-2 transition-all ' +
                          (active
                            ? 'border-primary bg-primary-container/10 text-primary'
                            : 'border-surface-variant text-on-surface-variant hover:border-primary/50')}>
                        <span className="material-symbols-outlined text-3xl mb-1">{c.icon}</span>
                        <span className="font-body-sm font-bold">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Body map */}
              <div className="bg-surface-container-lowest rounded-xl border border-surface-container clinical-shadow overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-stack-lg flex flex-col justify-center">
                  <h4 className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">accessibility_new</span> 2. Target Area
                  </h4>
                  <p className="text-body-md text-on-surface-variant mb-stack-md">Tap a body region to mark where the symptom is felt.</p>
                  <div className="space-y-unit">
                    {distinctRegions.map(r => {
                      const active = (r.group || r.id) === activeGroup;
                      return (
                        <div key={r.id} className={`flex items-center gap-unit ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
                          <span className="material-symbols-outlined text-sm">{active ? 'check_circle' : 'radio_button_unchecked'}</span>
                          <span className={`text-body-sm ${active ? 'font-bold' : ''}`}>{r.label}{active ? ' selected' : ''}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full md:w-1/2 bg-surface-container relative min-h-[280px] flex items-center justify-center p-stack-lg">
                  <svg viewBox="0 0 200 360" className="h-72">
                    {REGIONS.map(r => {
                      const active = (r.group || r.id) === activeGroup;
                      const shared = {
                        fill: '#006168',
                        fillOpacity: active ? .45 : .12,
                        stroke: '#006168',
                        strokeOpacity: active ? .9 : .3,
                        strokeWidth: active ? 3 : 2,
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
                  <h4 className="text-headline-sm font-headline-sm mb-stack-md flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">thermostat</span> 3. Severity Level
                    </span>
                    <span className={`text-headline-sm font-bold transition-colors ${severityColor}`}>{severity}</span>
                  </h4>
                  <div className="relative h-12 flex items-center px-2">
                    <div className="absolute inset-x-0 h-2 top-1/2 -translate-y-1/2 rounded-full severity-gradient opacity-25" />
                    <input
                      className="severity-slider relative z-10"
                      type="range" min={1} max={10}
                      value={severity}
                      onChange={e => setSeverity(+e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between text-label-caps text-on-surface-variant mt-2 px-1">
                    <span>Mild</span><span>Moderate</span><span>Severe</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  <div>
                    <label className="block text-label-caps mb-stack-sm text-on-surface-variant">Duration</label>
                    <div className="flex gap-2">
                      <input value={duration} onChange={e => setDuration(e.target.value)} className="w-full h-12 rounded-lg border border-outline-variant bg-surface px-4 focus:border-primary focus:ring-0" placeholder="2" type="number" min="0"/>
                      <select value={durationUnit} onChange={e => setDurationUnit(e.target.value)} className="w-full h-12 rounded-lg border border-outline-variant bg-surface px-4 focus:border-primary focus:ring-0">
                        <option>Hours</option><option>Minutes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-label-caps mb-stack-sm text-on-surface-variant">Frequency</label>
                    <select value={frequency} onChange={e => setFrequency(e.target.value)} className="w-full h-12 rounded-lg border border-outline-variant bg-surface px-4 focus:border-primary focus:ring-0">
                      <option>Intermittent</option><option>Constant</option><option>Worsening over time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-label-caps mb-stack-sm text-on-surface-variant">Clinical Notes & Observations</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full min-h-[120px] rounded-lg border border-outline-variant bg-surface p-4 focus:border-primary focus:ring-0" placeholder="Describe any triggers, food, sleep changes, or unusual observations..." />
                </div>

                <button type="submit" className="w-full bg-primary text-on-primary h-14 rounded-xl font-bold text-body-lg hover:bg-primary-container transition flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[.98]">
                  <span className="material-symbols-outlined">save</span> Log Symptom Entry
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="col-span-12 lg:col-span-4 space-y-stack-lg">
              <div className="bg-secondary-container/30 rounded-xl p-stack-lg border border-secondary-container/50">
                <h4 className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span> Quick Log
                </h4>
                <p className="text-body-sm text-on-secondary-container mb-stack-md">One-tap log for recurring symptoms.</p>
                <div className="space-y-stack-sm">
                  {[
                    { name: 'Abdominal Cramp', icon: 'water_drop',    last: 'Last log: 2 days ago' },
                    { name: 'Morning Nausea',  icon: 'electric_bolt', last: 'Last log: Yesterday' }
                  ].map(q => (
                    <button key={q.name} type="button" onClick={() => quickLog(q.name, q.icon)}
                      className="w-full flex items-center justify-between p-stack-md bg-white rounded-lg border border-secondary-container/30 hover:border-secondary transition-all clinical-shadow group">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined">{q.icon}</span>
                        </span>
                        <div className="text-left">
                          <p className="font-bold text-on-surface">{q.name}</p>
                          <p className="text-label-caps text-on-surface-variant">{q.last}</p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity text-secondary">add_circle</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-white/50 p-stack-lg clinical-shadow relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                <h4 className="text-headline-sm font-headline-sm mb-stack-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span> Clinical Insight
                </h4>
                <p className="text-body-md text-on-surface-variant italic border-l-4 border-primary/30 pl-4 py-2">
                  "We've noticed your abdominal pain usually occurs 2 hours after meals. Consider logging your diet in the next step."
                </p>
                <div className="mt-stack-md pt-stack-md border-t border-surface-variant flex items-center justify-between">
                  <Link to="/chat" className="text-primary font-bold text-label-caps hover:underline">DISCUSS WITH TEAM →</Link>
                </div>
              </div>

              <div className="bg-surface-container-highest rounded-xl p-stack-lg">
                <div className="flex justify-between items-center mb-stack-md">
                  <h4 className="font-bold text-on-surface">Recent History</h4>
                  <Link to="/history" className="text-primary font-bold text-label-caps hover:underline">View All</Link>
                </div>
                <div className="space-y-stack-sm">
                  {[
                    { tone: 'error',          name: 'Severe Migraine',  when: 'Oct 22, 8:30 PM', score: '8/10' },
                    { tone: 'status-monitor', name: 'Lower Back Pain',  when: 'Oct 21, 2:15 PM', score: '3/10' },
                    { tone: 'primary',        name: 'Mild Joint Pain',  when: 'Oct 20, 9:00 AM', score: '2/10' }
                  ].map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${h.tone}`} />
                      <div className="flex-1"><p className="text-body-sm font-bold">{h.name}</p><p className="text-label-caps text-on-surface-variant">{h.when}</p></div>
                      <span className="text-body-sm font-data-mono bg-surface px-2 py-0.5 rounded">{h.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Link to="/chat" className="fixed bottom-10 right-10 w-16 h-16 bg-error text-on-error rounded-full clinical-shadow flex items-center justify-center hover:scale-110 active:scale-95 transition group z-50">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
        <span className="absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg text-label-caps opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap clinical-shadow">Call Care Team</span>
      </Link>
    </Layout>
  );
}
