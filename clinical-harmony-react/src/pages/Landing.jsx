import { Link } from 'react-router-dom';

function MaterialIcon({ name, className = '', filled = false, style }) {
  return (
    <span
      className={'material-symbols-outlined ' + className}
      style={{ ...(filled ? { fontVariationSettings: "'FILL' 1" } : null), ...style }}
    >
      {name}
    </span>
  );
}

function NavBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-surface/70 border-b border-surface-variant/60">
      <div className="max-w-7xl mx-auto px-stack-md sm:px-container-padding-desktop py-stack-md flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <MaterialIcon name="spa" filled />
          <span className="text-headline-sm font-headline-sm font-bold">Clinical Harmony</span>
        </Link>
        <nav className="hidden md:flex items-center gap-stack-lg text-body-sm text-on-surface-variant">
          <a href="#features" className="hover:text-primary transition">Features</a>
          <a href="#how" className="hover:text-primary transition">How it works</a>
          <a href="#voices" className="hover:text-primary transition">Voices</a>
          <a href="#faq" className="hover:text-primary transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-stack-sm">
          <Link to="/dashboard" className="hidden sm:inline-block text-body-sm font-bold text-on-surface-variant hover:text-primary transition px-3 py-2">
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 bg-primary text-on-primary px-4 py-2 rounded-full font-bold text-body-sm hover:opacity-90 active:scale-95 transition shadow-lg shadow-primary/25"
          >
            Start free <MaterialIcon name="arrow_forward" className="text-base" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-stack-lg sm:pt-20 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-stack-md sm:px-container-padding-desktop">
        <div className="grid lg:grid-cols-12 gap-stack-lg items-center">

          {/* Copy */}
          <div className="lg:col-span-7 space-y-stack-lg">
            <span className="inline-flex items-center gap-2 bg-primary-container/15 text-primary px-3 py-1.5 rounded-full text-label-caps">
              <MaterialIcon name="favorite" className="text-base" filled />
              For women's health · clinical-grade
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline-lg leading-[1.05] tracking-tight">
              <span className="gradient-text">Patterns your body knows.</span><br />
              <span className="text-on-surface">Insights your team can act on.</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl">
              Clinical Harmony is a calm, private symptom tracker that turns daily check-ins into the kind of patterns your clinical team can read in seconds — not 30-minute appointments.
            </p>
            <div className="flex flex-wrap items-center gap-stack-md">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-4 rounded-2xl font-bold text-body-md hover:opacity-90 active:scale-95 transition shadow-lg shadow-primary/25"
              >
                Open the dashboard <MaterialIcon name="arrow_forward" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 border-2 border-primary/20 text-primary px-6 py-4 rounded-2xl font-bold text-body-md hover:bg-primary/5 transition"
              >
                <MaterialIcon name="play_circle" filled /> Watch demo · 90s
              </a>
            </div>

            {/* Trust strip */}
            <div className="pt-stack-lg flex flex-wrap items-center gap-stack-lg text-body-sm text-on-surface-variant">
              <div className="flex items-center gap-2"><MaterialIcon name="verified_user" className="text-primary" filled /> HIPAA compliant</div>
              <div className="flex items-center gap-2"><MaterialIcon name="lock" className="text-primary" /> End-to-end encrypted</div>
              <div className="flex items-center gap-2"><MaterialIcon name="health_and_safety" className="text-primary" filled /> Built with clinicians</div>
            </div>
          </div>

          {/* Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-6 bg-primary/10 rounded-[2rem] blur-2xl -z-10" />
            <div className="relative bg-surface-container-lowest rounded-2xl border border-surface-variant clinical-shadow p-stack-lg space-y-stack-md card-lift">
              {/* Mock top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-primary-container/30 flex items-center justify-center text-primary font-bold">SM</div>
                  <div>
                    <p className="text-body-sm font-bold leading-tight">Sarah · This week</p>
                    <p className="text-label-caps text-on-surface-variant">Cycle day 14</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary">spa</span>
              </div>

              {/* Status card */}
              <div className="status-card-stable bg-surface-container-low rounded-xl p-stack-md">
                <p className="text-label-caps text-primary uppercase tracking-widest">Global status</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-headline-md font-headline-md">Stable</p>
                  <MaterialIcon name="check_circle" className="text-primary" filled />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-stack-md">
                  <div><p className="text-label-caps text-on-surface-variant">Activity</p><p className="font-bold text-primary">84%</p></div>
                  <div><p className="text-label-caps text-on-surface-variant">Sleep</p><p className="font-bold text-secondary">7.2h</p></div>
                  <div><p className="text-label-caps text-on-surface-variant">HR</p><p className="font-bold">72</p></div>
                </div>
              </div>

              {/* Mini sparkline */}
              <div className="bg-surface-container-low rounded-xl p-stack-md">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-label-caps text-on-surface-variant">7-day pelvic pain</p>
                  <span className="text-label-caps text-secondary flex items-center gap-1"><MaterialIcon name="trending_down" className="text-sm" /> 22%</span>
                </div>
                <svg viewBox="0 0 200 50" className="w-full h-12" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8E3A5D" stopOpacity=".45" />
                      <stop offset="100%" stopColor="#8E3A5D" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,30 L30,28 L60,18 L90,22 L120,12 L150,16 L180,8 L200,10 L200,50 L0,50 Z" fill="url(#hero-area)" />
                  <path d="M0,30 L30,28 L60,18 L90,22 L120,12 L150,16 L180,8 L200,10"
                        stroke="#8E3A5D" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Quick chips */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-caps">Less fatigue</span>
                <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary text-label-caps">Better sleep</span>
                <span className="px-3 py-1 rounded-full bg-tertiary-container/60 text-on-tertiary-container text-label-caps">Caffeine ↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { value: '12.4k+', label: 'Symptoms logged daily' },
    { value: '94%',    label: 'AI pattern confidence' },
    { value: '7 min',  label: 'Average time per check-in' },
    { value: '23',     label: 'Clinics using Harmony' }
  ];
  return (
    <section className="border-y border-surface-variant/60 bg-surface-container-low/60">
      <div className="max-w-7xl mx-auto px-stack-md sm:px-container-padding-desktop py-stack-lg grid grid-cols-2 md:grid-cols-4 gap-stack-md">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-headline-md font-headline-md text-primary">{s.value}</p>
            <p className="text-body-sm text-on-surface-variant">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: 'monitor_heart',
      title: 'Track in 30 seconds',
      body: 'A body map, severity slider, and one-tap quick-log built for the days you have zero energy for forms.',
      accent: 'primary'
    },
    {
      icon: 'insights',
      title: 'See the patterns',
      body: 'AI surfaces what you couldn\'t — circadian shifts, food/symptom lag, hormonal-cycle alignment over 180 days.',
      accent: 'secondary'
    },
    {
      icon: 'medical_services',
      title: 'Share with your team',
      body: 'Encrypted chat with your clinicians, plus a one-click report ready for your next appointment or EHR.',
      accent: 'tertiary'
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-stack-md sm:px-container-padding-desktop">
        <div className="max-w-2xl mb-stack-lg">
          <p className="text-label-caps text-primary uppercase tracking-widest">What it does</p>
          <h2 className="text-headline-lg font-headline-lg mt-2">Made for the parts of your health that don't fit in a 15-minute visit.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-gutter">
          {features.map(f => (
            <div key={f.title} data-lift className="bg-surface-container-lowest rounded-2xl p-stack-lg border border-surface-variant clinical-shadow space-y-stack-md">
              <div className={`w-12 h-12 rounded-xl bg-${f.accent}-container/30 text-${f.accent} flex items-center justify-center`}>
                <MaterialIcon name={f.icon} className="text-3xl" filled />
              </div>
              <h3 className="text-headline-sm font-headline-sm">{f.title}</h3>
              <p className="text-body-md text-on-surface-variant">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Check in daily', d: 'A two-minute log that respects your time. Body map, intensity, notes if you want them.' },
    { n: '02', t: 'Let patterns surface', d: 'Harmony quietly correlates symptoms with sleep, cycle phase, stress, and your treatment plan.' },
    { n: '03', t: 'Walk into your visit prepared', d: 'A clean, clinical summary auto-builds itself for your next appointment or care team chat.' }
  ];
  return (
    <section id="how" className="py-20 bg-surface-container-low/70 border-y border-surface-variant/60">
      <div className="max-w-7xl mx-auto px-stack-md sm:px-container-padding-desktop">
        <div className="text-center max-w-2xl mx-auto mb-stack-lg">
          <p className="text-label-caps text-primary uppercase tracking-widest">How it works</p>
          <h2 className="text-headline-lg font-headline-lg mt-2">Three quiet steps. No data-entry guilt.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-gutter">
          {steps.map(s => (
            <div key={s.n} data-lift className="relative bg-surface-container-lowest rounded-2xl p-stack-lg border border-surface-variant clinical-shadow">
              <span className="absolute -top-3 -left-3 bg-primary text-on-primary text-label-caps font-bold px-3 py-1 rounded-full shadow-md shadow-primary/25">{s.n}</span>
              <h3 className="text-headline-sm font-headline-sm mt-2">{s.t}</h3>
              <p className="text-body-md text-on-surface-variant mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section id="voices" className="py-20">
      <div className="max-w-5xl mx-auto px-stack-md sm:px-container-padding-desktop">
        <figure data-lift className="bg-primary-container/15 rounded-2xl p-stack-lg sm:p-10 border border-primary-container/30 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/15 rounded-full blur-2xl" />
          <MaterialIcon name="format_quote" className="text-primary text-5xl absolute top-4 left-4 opacity-30" />
          <blockquote className="text-headline-md sm:text-headline-lg font-headline-md text-on-surface relative">
            "For the first time, my doctor didn't ask me to re-explain what I'd been feeling for months. She just opened the report. That was the appointment I cried in the parking lot for the right reason."
          </blockquote>
          <figcaption className="mt-stack-md flex items-center gap-stack-md">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">M.R.</div>
            <div>
              <p className="font-bold">Maya Rivera</p>
              <p className="text-body-sm text-on-surface-variant">Endometriosis patient · Harmony user since 2024</p>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: 'Who can see my data?', a: 'Only you — and any care team member you explicitly invite. Data is end-to-end encrypted at rest and in transit, and Harmony is HIPAA compliant.' },
    { q: 'Is this a replacement for medical advice?', a: 'No. Harmony is a tracking and communication tool that supports the conversation with your clinical team. It does not diagnose, treat, or replace professional care.' },
    { q: 'Do I have to log every day?', a: 'Nope. Harmony works best with even a few entries a week. The pattern engine adapts to whatever cadence is realistic for you.' },
    { q: 'Can my clinician join?', a: 'Yes. Care teams can be invited to the encrypted chat and granted view-only or comment access to your reports.' }
  ];
  return (
    <section id="faq" className="py-20 bg-surface-container-low/70 border-t border-surface-variant/60">
      <div className="max-w-3xl mx-auto px-stack-md sm:px-container-padding-desktop">
        <div className="text-center mb-stack-lg">
          <p className="text-label-caps text-primary uppercase tracking-widest">FAQ</p>
          <h2 className="text-headline-lg font-headline-lg mt-2">Questions we hear often.</h2>
        </div>
        <div className="space-y-stack-md">
          {items.map(it => (
            <details key={it.q} className="group bg-surface-container-lowest rounded-xl border border-surface-variant clinical-shadow open:border-primary/40 transition">
              <summary className="cursor-pointer list-none flex items-center justify-between p-stack-md font-bold text-body-md">
                {it.q}
                <MaterialIcon name="expand_more" className="text-primary group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-stack-md pb-stack-md text-body-md text-on-surface-variant">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-stack-md sm:px-container-padding-desktop">
        <div className="relative bg-primary text-on-primary rounded-3xl p-stack-lg sm:p-12 overflow-hidden text-center">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary-container/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary/30 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-headline-lg font-headline-lg mb-stack-md">Walk into your next appointment with a story, not a guess.</h2>
            <p className="text-body-lg opacity-90 max-w-xl mx-auto mb-stack-lg">
              Free to start. No credit card. Built with the patience your health actually deserves.
            </p>
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-surface text-primary px-8 py-4 rounded-2xl font-bold text-body-md hover:opacity-90 active:scale-95 transition shadow-xl">
              Open the dashboard <MaterialIcon name="arrow_forward" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-surface-variant/60 bg-surface-container-low/40">
      <div className="max-w-7xl mx-auto px-stack-md sm:px-container-padding-desktop py-stack-lg grid sm:grid-cols-4 gap-gutter">
        <div className="sm:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <MaterialIcon name="spa" filled />
            <span className="font-headline-sm font-bold">Clinical Harmony</span>
          </Link>
          <p className="text-body-sm text-on-surface-variant mt-2 max-w-sm">
            A women's symptom pattern tracker — built calm, encrypted, and shared on your terms.
          </p>
        </div>
        <div>
          <p className="text-label-caps text-on-surface-variant uppercase mb-stack-sm">Product</p>
          <ul className="space-y-1 text-body-sm">
            <li><a href="#features" className="hover:text-primary">Features</a></li>
            <li><a href="#how" className="hover:text-primary">How it works</a></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-label-caps text-on-surface-variant uppercase mb-stack-sm">Trust</p>
          <ul className="space-y-1 text-body-sm">
            <li><a className="hover:text-primary" href="#">Privacy</a></li>
            <li><a className="hover:text-primary" href="#">Security</a></li>
            <li><a className="hover:text-primary" href="#">Clinical advisors</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface-variant/60 py-4">
        <div className="max-w-7xl mx-auto px-stack-md sm:px-container-padding-desktop flex flex-wrap items-center justify-between text-label-caps text-on-surface-variant gap-2">
          <span>© 2026 Clinical Harmony · For informational purposes only · not a substitute for medical advice.</span>
          <span className="flex items-center gap-1"><MaterialIcon name="favorite" className="text-primary text-sm" filled /> Built with care</span>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <StatsStrip />
        <Features />
        <HowItWorks />
        <Voices />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
