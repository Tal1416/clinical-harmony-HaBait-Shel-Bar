import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useSymptoms } from '../context/AppDataProvider.jsx';

function Dot({ active, tone }) {
  return <div className={`w-3 h-3 rounded-full ${active ? `bg-${tone}` : 'bg-surface-variant'}`} />;
}

function SymptomCard({ s }) {
  const tone = s.tone || 'primary';
  const filled = Math.max(1, Math.min(3, Math.ceil((s.intensity || 1) / 2)));
  return (
    <div className="p-stack-md rounded-xl bg-surface-container-lowest border border-surface-variant flex flex-col justify-between min-h-[8rem] card-lift">
      <div className="flex justify-between items-start">
        <span className="text-label-caps text-on-surface-variant">{s.whenLabel || s.when}</span>
        <span className={`material-symbols-outlined text-${tone}`} aria-hidden="true">{s.icon || 'flare'}</span>
      </div>
      <div>
        <p className="text-body-md font-bold">{s.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex gap-0.5" aria-hidden="true">
            {[0, 1, 2].map(i => <Dot key={i} active={i < filled} tone={tone} />)}
          </div>
          <span className="text-label-caps text-on-surface-variant">Intensity {s.intensity || 1}/5</span>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return <div className="skeleton min-h-[8rem]" aria-hidden="true" />;
}

export default function Dashboard() {
  const { symptoms, loading } = useSymptoms();
  const latest = symptoms.slice(0, 3);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <Layout title="Patient Dashboard" activeTab="my-care">
      <div className="max-w-7xl mx-auto space-y-gutter">

        <section className="fade-in">
          <div className="flex items-baseline justify-between mb-stack-md gap-4">
            <div>
              <p className="text-label-caps text-on-surface-variant uppercase tracking-widest">{today}</p>
              <h1 className="text-headline-lg font-headline-lg">Good morning, Sarah.</h1>
            </div>
            <Link to="/log" className="hidden md:inline-flex items-center gap-2 text-primary font-bold text-label-caps hover:underline focus-bloom">
              <span className="material-symbols-outlined text-base" aria-hidden="true">add</span> QUICK LOG
            </Link>
          </div>

          <div className="bg-surface-container-lowest p-stack-lg rounded-2xl clinical-shadow status-card-stable flex flex-col lg:flex-row gap-stack-lg items-start lg:items-center justify-between fade-in relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/8 rounded-full blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="text-label-caps text-primary uppercase tracking-widest">Global Health Status</span>
              <div className="flex items-center gap-2 mt-1">
                <h2 className="text-headline-lg font-headline-lg text-on-surface">Stable</h2>
                <span className="glow-pulse grid place-items-center w-10 h-10" aria-hidden="true">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </span>
              </div>
              <p className="text-body-md text-on-surface-variant mt-2 max-w-xl">
                Your vitals and reported symptoms are within your baseline range. No urgent interventions are required from your clinical team at this time.
              </p>
            </div>
            <div className="relative grid grid-cols-3 gap-4 w-full lg:w-auto lg:gap-8">
              <div className="text-center card-lift p-3 rounded-xl">
                <p className="text-label-caps text-on-surface-variant">Activity</p>
                <p className="text-headline-md font-headline-md text-primary">84<span className="text-body-sm">%</span></p>
              </div>
              <div className="text-center card-lift p-3 rounded-xl">
                <p className="text-label-caps text-on-surface-variant">Sleep</p>
                <p className="text-headline-md font-headline-md text-secondary">7.2<span className="text-body-sm">h</span></p>
              </div>
              <div className="text-center card-lift p-3 rounded-xl">
                <p className="text-label-caps text-on-surface-variant">Resting HR</p>
                <p className="text-headline-md font-headline-md text-on-surface">72 <span className="text-body-sm">bpm</span></p>
              </div>
            </div>
          </div>
        </section>

        <div className="bento-grid">
          {/* AI Insights */}
          <div data-lift className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-gutter rounded-xl clinical-shadow border border-surface-variant/50 flex flex-col gap-stack-lg">
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-stack-md">
                <span className="material-symbols-outlined text-primary bg-primary-container/20 p-2 rounded-lg" aria-hidden="true">psychology</span>
                <h2 className="text-headline-sm font-headline-sm">AI Health Patterns</h2>
              </div>
              <span className="text-label-caps text-on-surface-variant bg-surface-variant px-3 py-1 rounded-full whitespace-nowrap">Last 7 Days</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="bg-surface-container-low p-stack-md rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-body-md text-on-surface">Increased Fatigue</p>
                  <span className="material-symbols-outlined text-secondary" aria-hidden="true">trending_up</span>
                </div>
                <p className="text-body-sm text-on-surface-variant">3-day trend identified. Reported energy is 15% lower than your 30-day average, correlating with late-night activity.</p>
                <div className="w-full bg-surface-variant h-1.5 rounded-full mt-4" aria-hidden="true">
                  <div className="bg-secondary h-1.5 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="bg-surface-container-low p-stack-md rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-body-md text-on-surface">Medication Adherence</p>
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">verified</span>
                </div>
                <p className="text-body-sm text-on-surface-variant">Perfect consistency maintained over the last 14 days. Physiological response shows improved stabilization.</p>
                <div className="flex gap-1 mt-4" aria-hidden="true">
                  {[0,1,2,3,4].map(i => <div key={i} className="h-2 w-full bg-primary rounded-full" />)}
                </div>
              </div>
            </div>

            <div className="relative h-44 w-full bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/40 p-4">
              <p className="text-label-caps text-on-surface-variant">7-Day Symptom Intensity</p>
              <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none" role="img" aria-label="Line chart trending downward over seven days">
                <defs>
                  <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" style={{ stopColor: 'rgb(var(--c-secondary))', stopOpacity: 0.35 }}/>
                    <stop offset="100%" style={{ stopColor: 'rgb(var(--c-secondary))', stopOpacity: 0 }}/>
                  </linearGradient>
                </defs>
                <path d="M0,70 L60,55 L120,60 L180,40 L240,50 L300,30 L360,42 L400,38 L400,100 L0,100 Z" fill="url(#area)"/>
                <path d="M0,70 L60,55 L120,60 L180,40 L240,50 L300,30 L360,42 L400,38" style={{ stroke: 'rgb(var(--c-secondary))' }} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link to="/history" className="absolute right-4 bottom-3 text-primary font-bold text-label-caps hover:underline flex items-center gap-1 focus-bloom">
                VIEW FULL ANALYSIS <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
              </Link>
            </div>
          </div>

          {/* Clinical Actions */}
          <div data-lift className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-gutter rounded-xl clinical-shadow border border-surface-variant/50">
            <div className="flex items-center gap-stack-md mb-stack-lg">
              <span className="material-symbols-outlined text-secondary bg-secondary-container/30 p-2 rounded-lg" aria-hidden="true">calendar_today</span>
              <h2 className="text-headline-sm font-headline-sm">Clinical Actions</h2>
            </div>
            <div className="space-y-stack-md">
              <div className="group flex gap-stack-md p-stack-md hover:bg-surface-container-low rounded-xl transition-all border border-transparent hover:border-surface-variant">
                <div className="bg-primary-container/20 text-primary w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0" aria-hidden="true">
                  <span className="text-label-caps font-bold">OCT</span>
                  <span className="text-headline-sm font-headline-sm -mt-1">26</span>
                </div>
                <div className="min-w-0">
                  <p className="text-body-md font-bold text-on-surface">Cardiology Telehealth</p>
                  <p className="text-body-sm text-on-surface-variant truncate">Dr. Aris Thorne · 10:30 AM</p>
                  <Link to="/chat" className="mt-2 inline-block text-primary font-bold text-label-caps hover:underline focus-bloom">JOIN CALL →</Link>
                </div>
              </div>
              <div className="group flex gap-stack-md p-stack-md hover:bg-surface-container-low rounded-xl transition-all border border-transparent hover:border-surface-variant">
                <div className="bg-secondary-container/30 text-secondary w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0" aria-hidden="true">
                  <span className="text-label-caps font-bold">OCT</span>
                  <span className="text-headline-sm font-headline-sm -mt-1">29</span>
                </div>
                <div className="min-w-0">
                  <p className="text-body-md font-bold text-on-surface">Lab Blood Work</p>
                  <p className="text-body-sm text-on-surface-variant truncate">City General Labs · 08:00 AM</p>
                  <p className="text-label-caps text-secondary mt-1">FASTING REQUIRED</p>
                </div>
              </div>
              <div className="group flex gap-stack-md p-stack-md hover:bg-surface-container-low rounded-xl transition-all border border-transparent hover:border-surface-variant">
                <div className="bg-surface-variant text-on-surface-variant w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0" aria-hidden="true">
                  <span className="text-label-caps font-bold">NOV</span>
                  <span className="text-headline-sm font-headline-sm -mt-1">03</span>
                </div>
                <div className="min-w-0">
                  <p className="text-body-md font-bold text-on-surface">Symptom Review</p>
                  <p className="text-body-sm text-on-surface-variant">Self-guided logging task</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-stack-lg border border-primary text-primary py-stack-md rounded-xl font-bold text-label-caps hover:bg-primary/5 transition-colors focus-bloom">
              VIEW FULL SCHEDULE
            </button>
          </div>

          {/* Latest Symptoms */}
          <div data-lift className="col-span-12 bg-surface-container-lowest p-gutter rounded-xl clinical-shadow border border-surface-variant/50">
            <div className="flex justify-between items-center mb-stack-lg gap-3">
              <div className="flex items-center gap-stack-md">
                <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed/40 p-2 rounded-lg" aria-hidden="true">history</span>
                <h2 className="text-headline-sm font-headline-sm">Latest Logged Symptoms</h2>
              </div>
              <Link to="/history" className="text-primary font-bold text-label-caps hover:underline flex items-center gap-1 focus-bloom whitespace-nowrap">
                FULL HISTORY <span className="material-symbols-outlined text-sm" aria-hidden="true">chevron_right</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
              {loading
                ? [0, 1, 2].map(i => <SkeletonCard key={i} />)
                : latest.map((s) => <SymptomCard key={s.id} s={s} />)}
              <Link to="/log" className="flex items-center justify-center border-2 border-dashed border-surface-variant rounded-xl group cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors min-h-[8rem] focus-bloom" aria-label="Log a new symptom">
                <div className="text-center">
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-3xl" aria-hidden="true">add_circle</span>
                  <p className="text-label-caps text-outline font-bold mt-1 group-hover:text-primary transition-colors">LOG NEW</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/log"
        className="fixed bottom-gutter right-gutter bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition flex items-center justify-center z-50 group focus-bloom"
        aria-label="Quick log a symptom"
      >
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform" aria-hidden="true">add</span>
        <span className="absolute right-16 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg text-label-caps opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Quick Log Symptom</span>
      </Link>
    </Layout>
  );
}
