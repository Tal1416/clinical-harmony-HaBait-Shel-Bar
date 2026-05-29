import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useSymptoms } from '../context/AppDataProvider.jsx';

const TONES = ['bg-surface-container', 'bg-primary/10', 'bg-primary/30', 'bg-primary/55', 'bg-primary/80', 'bg-primary'];

function buildHeatmap(seed = 1) {
  const out = [];
  for (let i = 0; i < 180; i++) {
    const wave = Math.sin(i / 7) * 0.5 + 0.5;
    const noise = Math.random() * 0.5;
    const v = Math.min(5, Math.floor((wave * 0.6 + noise * 0.6 + seed * 0.07) * 5));
    out.push(v);
  }
  return out;
}

const STATIC_EVENTS = [
  { icon: 'medical_information', bg: 'bg-primary-container',    fg: 'text-on-primary-container',    h: 'Consultation with Dr. Aris',   d: 'Oct 18, 2026',  body: 'Reviewed pain patterns; adjusted supplement dosage to 200mg/daily. Noted improved sleep markers.' },
  { icon: 'assignment',          bg: 'bg-secondary-container',  fg: 'text-on-secondary-container',  h: 'Full Blood Panel Results',     d: 'Oct 09, 2026',  body: 'Inflammatory markers down by 15%. Iron levels stable. Data uploaded to clinical portal.' },
  { icon: 'warning',             bg: 'bg-error-container',      fg: 'text-on-error-container',      h: 'Symptom Flare Detected',       d: 'Sep 30, 2026',  body: 'Intensity 8/10 recorded · associated with travel and dietary changes · duration 48 hours.' }
];

export default function History() {
  const { symptoms } = useSymptoms();
  const [range, setRange] = useState('6m');
  const cells = useMemo(() => buildHeatmap({ '1m': 3, '3m': 2, '6m': 1 }[range] || 1), [range]);

  // Real logged entries lead the timeline; curated clinical events follow.
  const realEvents = symptoms.slice(0, 4).map((s) => ({
    icon: 'monitor_heart',
    bg: 'bg-primary-container/40',
    fg: 'text-primary',
    h: `Logged: ${s.name}`,
    d: s.whenLabel || s.when || '',
    body: `Severity ${s.severity10 ?? s.intensity ?? '—'}/10 · ${s.category || 'Symptom'} entry recorded${s.notes ? ` · "${s.notes}"` : ''}.`
  }));
  const events = [...realEvents, ...STATIC_EVENTS];

  const RANGES = [
    { id: '6m', label: 'Last 6 Months', icon: 'calendar_month' },
    { id: '3m', label: 'Last 3 Months' },
    { id: '1m', label: 'Last 30 Days' }
  ];

  return (
    <Layout title="Pattern History" activeTab="my-care">
      <div className="max-w-7xl mx-auto">

        <h1 className="sr-only">Pattern History</h1>

        <section className="flex flex-wrap items-center justify-between gap-gutter mb-stack-lg fade-in">
          <div className="flex flex-wrap gap-3" role="group" aria-label="Time range">
            {RANGES.map(r => {
              const active = range === r.id;
              return (
                <button key={r.id} onClick={() => setRange(r.id)} aria-pressed={active}
                  className={'px-4 py-2 rounded-full text-label-caps flex items-center gap-2 transition focus-bloom ' +
                    (active
                      ? 'bg-primary text-on-primary clinical-shadow'
                      : 'bg-surface-container-lowest border border-surface-variant text-on-surface-variant hover:bg-surface-container')}>
                  {r.icon && <span className="material-symbols-outlined text-base" aria-hidden="true">{r.icon}</span>}
                  {r.label}
                </button>
              );
            })}
            <button className="px-4 py-2 bg-surface-container-lowest border border-surface-variant text-on-surface-variant rounded-full text-label-caps flex items-center gap-2 hover:bg-surface-container transition-colors focus-bloom">
              Symptom Type: All
              <span className="material-symbols-outlined text-base" aria-hidden="true">expand_more</span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant text-body-sm">
            <span className="material-symbols-outlined" aria-hidden="true">info</span>
            <span className="font-bold text-primary">{symptoms.length}</span> entries logged · Confidence: <span className="font-bold text-primary">High (94%)</span>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-gutter">

          <div className="col-span-12 lg:col-span-8 space-y-gutter">
            <div data-lift className="bg-surface-container-lowest rounded-xl clinical-shadow border border-surface-variant p-gutter">
              <div className="flex justify-between items-start mb-stack-lg gap-3">
                <div>
                  <h2 className="text-headline-sm font-headline-sm">Symptom Correlation Heatmap</h2>
                  <p className="text-body-sm text-on-surface-variant">Mapping Pelvic Pain vs. Sleep Quality · last 180 days</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-surface-container rounded-lg hover:bg-surface-variant transition focus-bloom" aria-label="Share heatmap"><span className="material-symbols-outlined" aria-hidden="true">share</span></button>
                  <button className="p-2 bg-surface-container rounded-lg hover:bg-surface-variant transition focus-bloom" aria-label="Download heatmap"><span className="material-symbols-outlined" aria-hidden="true">file_download</span></button>
                </div>
              </div>

              <div className="w-full bg-surface-container-low rounded-lg p-stack-md">
                <div className="grid-cols-30 gap-1" style={{ gridAutoRows: '14px' }} role="img" aria-label="180-day symptom intensity heatmap, generally higher around mid-cycle">
                  {cells.map((v, i) => (
                    <div key={i} className={`h-3 rounded-sm ${TONES[v]} opacity-90 hover:scale-125 transition-transform cursor-pointer`} title={`Day ${i + 1} · intensity ${v}/5`} />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-label-caps text-on-surface-variant" aria-hidden="true">
                  <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                </div>
                <div className="flex items-center gap-stack-md mt-stack-md text-label-caps text-on-surface-variant">
                  <span>Low</span>
                  <div className="flex gap-1" aria-hidden="true">
                    <div className="w-4 h-3 rounded bg-primary/10" />
                    <div className="w-4 h-3 rounded bg-primary/30" />
                    <div className="w-4 h-3 rounded bg-primary/55" />
                    <div className="w-4 h-3 rounded bg-primary/80" />
                    <div className="w-4 h-3 rounded bg-primary" />
                  </div>
                  <span>High</span>
                </div>
              </div>

              <div className="mt-gutter grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-primary rounded-full" aria-hidden="true" />
                  <div><p className="text-label-caps text-on-surface-variant">Peak Intensity</p><p className="text-data-mono font-data-mono">Day 14–16</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-secondary rounded-full" aria-hidden="true" />
                  <div><p className="text-label-caps text-on-surface-variant">Sleep Impact</p><p className="text-data-mono font-data-mono">−2.4 hrs avg</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-tertiary rounded-full" aria-hidden="true" />
                  <div><p className="text-label-caps text-on-surface-variant">Correlation</p><p className="text-data-mono font-data-mono">0.82 (Strong)</p></div>
                </div>
              </div>
            </div>

            <div data-lift className="bg-surface-container-lowest rounded-xl clinical-shadow border border-surface-variant p-gutter">
              <h2 className="text-headline-sm font-headline-sm mb-stack-md">Longitudinal Cycle Alignment</h2>
              <div className="space-y-stack-md">
                {[
                  { m: 'MAY', menstrual: [10, 15], ovulation: [40, 5] },
                  { m: 'JUN', menstrual: [12, 14], ovulation: [42, 5], appt: 60 },
                  { m: 'JUL', menstrual: [15, 12], ovulation: [45, 5] },
                  { m: 'AUG', menstrual: [8, 14],  ovulation: [38, 5], appt: 68 }
                ].map(row => (
                  <div key={row.m} className="flex items-center gap-4">
                    <span className="w-16 text-label-caps text-on-surface-variant">{row.m}</span>
                    <div className="flex-1 h-8 bg-surface-container rounded-full relative overflow-hidden">
                      <div className="absolute h-full bg-error/30 border-x border-error/50" style={{ left: `${row.menstrual[0]}%`, width: `${row.menstrual[1]}%` }} />
                      <div className="absolute h-full bg-primary/40 border-x border-primary/50" style={{ left: `${row.ovulation[0]}%`, width: `${row.ovulation[1]}%` }} />
                      {row.appt != null && (
                        <div className="absolute h-full bg-secondary/60 flex items-center justify-center" style={{ left: `${row.appt}%`, width: '3%' }} title="Appointment">
                          <span className="material-symbols-outlined text-[12px] text-on-surface" aria-hidden="true">medical_services</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-6 text-label-caps text-on-surface-variant">
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-error/30 rounded-full" aria-hidden="true" /> Menstrual</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-primary/40 rounded-full" aria-hidden="true" /> Ovulation</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 bg-secondary/60 rounded-full" aria-hidden="true" /> Appointment</div>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="col-span-12 lg:col-span-4 space-y-gutter">
            <div className="bg-primary-container text-on-primary-container rounded-xl p-gutter clinical-shadow relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">lightbulb</span>
                  <h2 className="font-bold text-headline-sm">Clinical Insight</h2>
                </div>
                <p className="text-body-md mb-4 opacity-95">Based on your last 3 months, your symptoms show a 70% correlation with high-stress work weeks. Flare-ups typically peak 2 days after caffeine intake exceeds 300mg.</p>
                <Link to="/chat" className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-label-caps transition focus-bloom">Discuss with Doctor</Link>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" aria-hidden="true" />
            </div>

            <div data-lift className="bg-surface-container-lowest rounded-xl clinical-shadow border border-surface-variant p-gutter">
              <h2 className="text-headline-sm font-headline-sm mb-stack-md">Lifestyle Context</h2>
              <div className="space-y-stack-md">
                {[
                  { label: 'Activity Level',   meta: '+12%',        tone: 'primary',        w: 65 },
                  { label: 'Caffeine Intake',  meta: 'Moderate',    tone: 'status-monitor', w: 40 },
                  { label: 'Hydration',        meta: 'Target Met',  tone: 'primary',        w: 90 },
                  { label: 'Sleep Quality',    meta: '7.2 h avg',   tone: 'secondary',      w: 72 }
                ].map(m => (
                  <div key={m.label} className="p-4 bg-surface-container-low rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-label-caps">{m.label}</span>
                      <span className={`text-data-mono font-data-mono text-${m.tone}`}>{m.meta}</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden" aria-hidden="true">
                      <div className={`h-full bg-${m.tone}`} style={{ width: `${m.w}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-highest/40 border-2 border-dashed border-outline-variant rounded-xl p-gutter text-center">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2" aria-hidden="true">clinical_notes</span>
              <p className="text-label-caps text-on-surface-variant mb-4">No recent doctor notes on this view</p>
              <Link to="/chat" className="text-primary font-bold hover:underline focus-bloom">Request Professional Review →</Link>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <section className="mt-gutter">
          <div data-lift className="bg-surface-container-lowest rounded-xl clinical-shadow border border-surface-variant p-gutter">
            <div className="flex justify-between items-center mb-stack-lg gap-3">
              <h2 className="text-headline-sm font-headline-sm">Appointment & Event History</h2>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input defaultChecked type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                  <span className="text-label-caps">Clinicals</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input defaultChecked type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                  <span className="text-label-caps">Logs</span>
                </label>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-surface-variant" aria-hidden="true" />
              <div className="space-y-stack-lg relative">
                {events.map((t, i) => (
                  <div key={i} className="flex gap-4 sm:gap-6 items-start">
                    <div className={`z-10 w-12 h-12 rounded-full ${t.bg} flex items-center justify-center border-4 border-background shrink-0`}>
                      <span className={`material-symbols-outlined ${t.fg}`} aria-hidden="true">{t.icon}</span>
                    </div>
                    <div className="flex-1 bg-surface-container-low p-4 rounded-xl card-lift min-w-0">
                      <div className="flex justify-between items-start gap-3">
                        <h3 className="font-bold text-on-surface">{t.h}</h3>
                        <span className="text-label-caps text-on-surface-variant whitespace-nowrap">{t.d}</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant mt-1">{t.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
