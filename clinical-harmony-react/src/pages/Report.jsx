import Layout from '../components/Layout.jsx';
import { toast } from '../lib/toast.js';

const HEIGHTS = [25, 30, 38, 28, 35, 50, 45, 55, 48, 60, 55, 70, 65, 75, 60, 80, 72, 65, 82, 70, 78, 88, 75, 85, 90, 78, 92, 82, 88, 95];
const COLORS = ['bg-primary/20', 'bg-primary/30', 'bg-primary/40', 'bg-primary/55', 'bg-primary/70', 'bg-primary/85', 'bg-primary'];

export default function Report() {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const time  = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <Layout title="Physician Export" activeTab="my-care">
      <div className="max-w-5xl mx-auto space-y-stack-lg">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-stack-md no-print fade-in">
          <div>
            <p className="text-label-caps text-on-surface-variant uppercase tracking-widest">Generated · {today}</p>
            <h1 className="text-headline-lg font-headline-lg">Physician Consultation Report</h1>
            <p className="text-body-md text-on-surface-variant max-w-2xl mt-1">A clinical summary of Sarah Mitchell's last 30 days, formatted for export to your attending physician's EHR.</p>
          </div>
          <button onClick={() => window.print()} className="self-start bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 clinical-shadow hover:opacity-90 active:scale-95 transition focus-bloom">
            <span className="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span> Export PDF
          </button>
        </div>

        <section className="bg-surface-container-lowest clinical-shadow rounded-xl overflow-hidden border border-surface-variant">
          <div className="print-canvas p-stack-lg sm:p-10">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-stack-md border-b-2 border-primary pb-stack-lg mb-stack-lg">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface mb-2">Patient Clinical Summary</h2>
                <p className="text-body-md text-on-surface-variant uppercase tracking-wider">Generated · {today} · {time}</p>
              </div>
              <div className="sm:text-right">
                <p className="font-bold text-primary text-headline-sm flex items-center gap-2 sm:justify-end">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">spa</span> Clinical Harmony
                </p>
                <p className="text-body-sm text-on-surface-variant">Protocol v2.4.1</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md mb-stack-lg">
              <div><p className="text-label-caps text-on-surface-variant">Patient</p><p className="text-body-md font-bold">Sarah Mitchell</p></div>
              <div><p className="text-label-caps text-on-surface-variant">Patient ID</p><p className="text-body-md font-bold font-data-mono">WH-9821</p></div>
              <div><p className="text-label-caps text-on-surface-variant">Age</p><p className="text-body-md font-bold">37</p></div>
              <div><p className="text-label-caps text-on-surface-variant">Window</p><p className="text-body-md font-bold">30 days</p></div>
            </div>

            <div className="grid grid-cols-12 gap-stack-lg">

              <div className="col-span-12 lg:col-span-7 space-y-stack-lg">
                <div className="p-stack-lg bg-surface-container-low rounded-lg status-card-alert">
                  <div className="flex items-center gap-2 mb-stack-md">
                    <span className="material-symbols-outlined text-error" aria-hidden="true">warning</span>
                    <h3 className="text-headline-sm font-headline-sm">Suspicious Patterns</h3>
                  </div>
                  <div className="space-y-stack-md">
                    <div className="flex gap-4"><div className="w-2 h-2 rounded-full bg-error mt-2 shrink-0" aria-hidden="true" /><p className="text-body-md"><span className="font-bold">Circadian Shift:</span> Symptom onset has shifted 4 hours earlier (from 16:00 → 12:00) over the last 7 days.</p></div>
                    <div className="flex gap-4"><div className="w-2 h-2 rounded-full bg-error mt-2 shrink-0" aria-hidden="true" /><p className="text-body-md"><span className="font-bold">Intensity Escalation:</span> Self-reported pain peaked at 8/10 for 3 consecutive days, exceeding the 30-day baseline.</p></div>
                    <div className="flex gap-4"><div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" aria-hidden="true" /><p className="text-body-md"><span className="font-bold">Medication Correlation:</span> "Dizziness" events occurred 45 minutes post-medication on 5 occasions.</p></div>
                  </div>
                </div>

                <div className="p-stack-lg bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-2 mb-stack-md">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">psychology</span>
                    <h3 className="text-headline-sm font-headline-sm">Patient's Top Concerns</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-stack-md">
                    <div className="p-4 bg-surface-container-lowest rounded border border-surface-variant">
                      <p className="text-label-caps text-primary mb-1">Primary Worry</p>
                      <p className="text-body-md italic">"I am worried about my ability to stay focused at work during the late afternoon fatigue spikes."</p>
                    </div>
                    <div className="p-4 bg-surface-container-lowest rounded border border-surface-variant">
                      <p className="text-label-caps text-primary mb-1">Functional Goal</p>
                      <p className="text-body-md">Wants to resume light jogging (2 miles) without significant joint inflammation the following day.</p>
                    </div>
                  </div>
                </div>

                <div className="p-stack-lg bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-2 mb-stack-md">
                    <span className="material-symbols-outlined text-status-safe" aria-hidden="true">eco</span>
                    <h3 className="text-headline-sm font-headline-sm">Positive Indicators</h3>
                  </div>
                  <ul className="space-y-2 text-body-md">
                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-status-safe text-base mt-1" aria-hidden="true">check_circle</span> Medication adherence: <strong className="ml-1">100%</strong> for 14 consecutive days.</li>
                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-status-safe text-base mt-1" aria-hidden="true">check_circle</span> Resting heart-rate variability improved by <strong className="ml-1">8%</strong>.</li>
                    <li className="flex items-start gap-3"><span className="material-symbols-outlined text-status-safe text-base mt-1" aria-hidden="true">check_circle</span> Hydration goal met on <strong className="ml-1">26/30</strong> days.</li>
                  </ul>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5 flex flex-col gap-stack-lg">
                <div className="p-stack-lg bg-surface-container-lowest border border-surface-variant rounded-lg flex-1">
                  <h3 className="text-headline-sm font-headline-sm mb-stack-md">30-Day Frequency</h3>
                  <div className="h-44 flex items-end justify-between gap-1" role="img" aria-label="30-day symptom frequency bar chart, rising over the period">
                    {HEIGHTS.map((h, i) => {
                      const c = COLORS[Math.min(COLORS.length - 1, Math.floor(h / 15))];
                      return <div key={i} className={`w-full rounded-t-sm ${c} transition-all hover:brightness-95`} style={{ height: h + '%' }} title={`${h}% intensity`} />;
                    })}
                  </div>
                  <div className="flex justify-between text-label-caps text-on-surface-variant mt-2">
                    <span>30 days ago</span><span>Today</span>
                  </div>
                  <div className="space-y-stack-md pt-stack-md border-t border-surface-variant mt-stack-md">
                    <div className="flex justify-between items-center"><span className="text-body-sm font-bold">Fatigue</span><span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-body-sm font-data-mono">24 entries</span></div>
                    <div className="flex justify-between items-center"><span className="text-body-sm font-bold">Joint Pain</span><span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-body-sm font-data-mono">18 entries</span></div>
                    <div className="flex justify-between items-center"><span className="text-body-sm font-bold">Migraine</span><span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-body-sm font-data-mono">8 entries</span></div>
                    <div className="flex justify-between items-center"><span className="text-body-sm font-bold">Dizziness</span><span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-body-sm font-data-mono">5 entries</span></div>
                  </div>
                </div>

                <div className="p-stack-lg bg-primary text-on-primary rounded-lg">
                  <p className="text-label-caps opacity-80">Recommended Discussion Points</p>
                  <ul className="text-body-md mt-2 space-y-2">
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-sm mt-1" aria-hidden="true">arrow_forward</span>Adjust late-afternoon caffeine cutoff to 1 PM.</li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-sm mt-1" aria-hidden="true">arrow_forward</span>Evaluate post-medication dizziness window.</li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-sm mt-1" aria-hidden="true">arrow_forward</span>Review supplement dose at next visit.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-stack-lg pt-stack-lg border-t border-surface-variant grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
              <div><p className="text-label-caps text-on-surface-variant">Attending Physician</p><p className="text-body-md font-bold">Dr. Helena Vance</p></div>
              <div><p className="text-label-caps text-on-surface-variant">Verification Hash</p><p className="text-body-sm font-data-mono">CH-8829-XJ-01</p></div>
              <div className="md:text-right"><p className="text-body-sm text-on-surface-variant">Confidential Patient Information · For Clinical Use Only</p></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row justify-end gap-stack-md pb-20 no-print">
          <button className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 transition focus-bloom">Modify Date Range</button>
          <button
            onClick={() => toast('Report transmitted to EHR · Confirmation #CH-8829')}
            className="px-10 py-3 bg-primary text-on-primary rounded-xl font-bold clinical-shadow hover:opacity-90 transition flex items-center justify-center gap-3 focus-bloom"
          >
            <span className="material-symbols-outlined" aria-hidden="true">send</span> Send to EHR
          </button>
        </div>
      </div>
    </Layout>
  );
}
