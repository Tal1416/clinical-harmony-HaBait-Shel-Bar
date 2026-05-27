import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

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

export default function History() {
  const [range, setRange] = useState('6m');
  const cells = useMemo(() => buildHeatmap({ '1m': 3, '3m': 2, '6m': 1 }[range] || 1), [range]);

  const RANGES = [
    { id: '6m', label: 'Last 6 Months', icon: 'calendar_month' },
    { id: '3m', label: 'Last 3 Months' },
    { id: '1m', label: 'Last 30 Days' }
  ];

  return (
    <Layout title="Pattern History" activeTab="my-care">
      <main className="ml-64 p-container-padding-desktop min-h-screen">
        <div className="max-w-7xl mx-auto">

          <section className="flex flex-wrap items-center justify-between gap-gutter mb-stack-lg fade-in">
            <div className="flex flex-wrap gap-3">
              {RANGES.map(r => {
                const active = range === r.id;
                return (
                  <button key={r.id} onClick={() => setRange(r.id)}
                    className={'px-4 py-2 rounded-full text-label-caps flex items-center gap-2 transition ' +
                      (active
                        ? 'bg-primary text-on-primary clinical-shadow'
                        : 'bg-white border border-surface-variant text-on-surface-variant hover:bg-surface-container')}>
                    {r.icon && <span className="material-symbols-outlined text-base">{r.icon}</span>}
                    {r.label}
                  </button>
                );
              })}
              <button className="px-4 py-2 bg-white border border-surface-variant text-on-surface-variant rounded-full text-label-caps flex items-center gap-2 hover:bg-surface-container transition-colors">
                Symptom Type: All
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-body-sm">
              <span className="material-symbols-outlined">info</span>
              Confidence level in data: <span className="font-bold text-primary ml-1">High (94%)</span>
            </div>
          </section>

          <div className="grid grid-cols-12 gap-gutter">

            <div className="col-span-12 lg:col-span-8 space-y-gutter">
              <div data-lift className="bg-white rounded-xl clinical-shadow border border-surface-variant p-gutter">
                <div className="flex justify-between items-start mb-stack-lg">
                  <div>
                    <h2 className="text-headline-sm font-headline-sm">Symptom Correlation Heatmap</h2>
                    <p className="text-body-sm text-on-surface-variant">Mapping Pelvic Pain vs. Sleep Quality · last 180 days</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-surface-container rounded-lg hover:bg-surface-variant transition" title="Share"><span className="material-symbols-outlined">share</span></button>
                    <button className="p-2 bg-surface-container rounded-lg hover:bg-surface-variant transition" title="Download"><span className="material-symbols-outlined">file_download</span></button>
                  </div>
                </div>

                <div className="w-full bg-surface-container-low rounded-lg p-stack-md">
                  <div className="grid-cols-30 gap-1" style={{ gridAutoRows: '14px' }}>
                    {cells.map((v, i) => (
                      <div key={i} className={`h-3 rounded-sm ${TONES[v]} opacity-90 hover:scale-125 transition-transform cursor-pointer`} title={`Day ${i + 1} · intensity ${v}/5`} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-label-caps text-on-surface-variant">
                    <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
                  </div>
                  <div className="flex items-center gap-stack-md mt-stack-md text-label-caps text-on-surface-variant">
                    <span>Low</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-3 rounded bg-primary/10" />
                      <div className="w-4 h-3 rounded bg-primary/30" />
                      <div className="w-4 h-3 rounded bg-primary/55" />
                      <div className="w-4 h-3 rounded bg-primary/80" />
                      <div className="w-4 h-3 rounded bg-primary" />
                    </div>
                    <span>High</span>
                  </div>
                </div>

                <div className="mt-gutter grid grid-cols-3 gap-gutter">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-primary rounded-full" />
                    <div><p className="text-label-caps text-on-surface-variant">Peak Intensity</p><p className="text-data-mono font-data-mono">Day 14–16</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-secondary rounded-full" />
                    <div><p className="text-label-caps text-on-surface-variant">Sleep Impact</p><p className="text-data-mono font-data-mono">−2.4 hrs avg</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-tertiary rounded-full" />
                    <div><p className="text-label-caps text-on-surface-variant">Correlation</p><p className="text-data-mono font-data-mono">0.82 (Strong)</p></div>
                  </div>
                </div>
              </div>

              <div data-lift className="bg-white rounded-xl clinical-shadow border border-surface-variant p-gutter">
                <h3 className="text-headline-sm font-headline-sm mb-stack-md">Longitudinal Cycle Alignment</h3>
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
                            <span className="material-symbols-outlined text-[12px] text-on-surface">medical_services</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-6 text-label-caps text-on-surface-variant">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-error/30 rounded-full" /> Menstrual</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-primary/40 rounded-full" /> Ovulation</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-secondary/60 rounded-full" /> Appointment</div>
                </div>
              </div>
            </div>

            {/* Side panel */}
            <div className="col-span-12 lg:col-span-4 space-y-gutter">
              <div className="bg-primary-container text-on-primary-container rounded-xl p-gutter clinical-shadow relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                    <h3 className="font-bold text-headline-sm">Clinical Insight</h3>
                  </div>
                  <p className="text-body-md mb-4 opacity-95">Based on your last 3 months, your symptoms show a 70% correlation with high-stress work weeks. Flare-ups typically peak 2 days after caffeine intake exceeds 300mg.</p>
                  <Link to="/chat" className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-label-caps transition">Discuss with Doctor</Link>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
              </div>

              <div data-lift className="bg-white rounded-xl clinical-shadow border border-surface-variant p-gutter">
                <h3 className="text-headline-sm font-headline-sm mb-stack-md">Lifestyle Context</h3>
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
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full bg-${m.tone}`} style={{ width: `${m.w}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-highest/40 border-2 border-dashed border-outline-variant rounded-xl p-gutter text-center">
                <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">clinical_notes</span>
                <p className="text-label-caps text-on-surface-variant mb-4">No recent doctor notes on this view</p>
                <Link to="/chat" className="text-primary font-bold hover:underline">Request Professional Review →</Link>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <section className="mt-gutter">
            <div data-lift className="bg-white rounded-xl clinical-shadow border border-surface-variant p-gutter">
              <div className="flex justify-between items-center mb-stack-lg">
                <h3 className="text-headline-sm font-headline-sm">Appointment & Event History</h3>
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
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-surface-variant" />
                <div className="space-y-stack-lg relative">
                  {[
                    { icon: 'medical_information', bg: 'bg-primary-container',    fg: 'text-on-primary-container',    h: 'Consultation with Dr. Aris',   d: 'Oct 18, 2026',  body: 'Reviewed pain patterns; adjusted supplement dosage to 200mg/daily. Noted improved sleep markers.' },
                    { icon: 'assignment',          bg: 'bg-secondary-container',  fg: 'text-on-secondary-container',  h: 'Full Blood Panel Results',     d: 'Oct 09, 2026',  body: 'Inflammatory markers down by 15%. Iron levels stable. Data uploaded to clinical portal.' },
                    { icon: 'warning',             bg: 'bg-error-container',      fg: 'text-on-error-container',      h: 'Symptom Flare Detected',       d: 'Sep 30, 2026',  body: 'Intensity 8/10 recorded · associated with travel and dietary changes · duration 48 hours.' },
                    { icon: 'monitor_heart',       bg: 'bg-primary-container/40', fg: 'text-primary',                 h: 'Logged 14 Symptoms This Cycle',d: 'Sep 24, 2026',  body: 'Pelvic discomfort recurred during follicular phase. Patterns sent to clinical team for review.' }
                  ].map((t, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className={`z-10 w-12 h-12 rounded-full ${t.bg} flex items-center justify-center border-4 border-background`}>
                        <span className={`material-symbols-outlined ${t.fg}`}>{t.icon}</span>
                      </div>
                      <div className="flex-1 bg-surface-container-low p-4 rounded-xl card-lift">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-on-surface">{t.h}</h4>
                          <span className="text-label-caps text-on-surface-variant">{t.d}</span>
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
      </main>
    </Layout>
  );
}
