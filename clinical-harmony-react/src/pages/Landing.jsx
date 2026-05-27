import { useEffect, useRef, useState } from 'react';
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-surface/70 border-b border-surface-variant/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary group">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary-container/20 group-hover:bg-primary-container/40 transition">
            <MaterialIcon name="spa" filled />
          </span>
          <span className="text-headline-sm font-headline-sm font-bold tracking-tight">Clinical Harmony</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-body-sm text-on-surface-variant">
          {[
            ['Features', '#features'],
            ['How it works', '#how'],
            ['Voices', '#voices'],
            ['FAQ', '#faq']
          ].map(([label, href]) => (
            <a key={href} href={href} className="relative hover:text-primary transition focus-bloom
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
              after:bg-primary after:transition-all hover:after:w-full">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="hidden sm:inline-flex text-body-sm font-bold text-on-surface-variant hover:text-primary transition px-3 py-2 rounded-lg focus-bloom">
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="btn-shine inline-flex items-center gap-1.5 bg-primary text-on-primary px-4 py-2.5 rounded-full font-bold text-body-sm hover:bg-primary-container active:scale-95 transition shadow-lg shadow-primary/30 focus-bloom"
          >
            Start free <MaterialIcon name="arrow_forward" className="text-base" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      {/* Decorative orbs */}
      <div className="absolute -top-12 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10 spin-slow" />
      <div className="absolute -bottom-12 -right-10 w-48 h-48 bg-secondary/25 rounded-full blur-3xl -z-10" />

      <div className="float relative bg-surface-container-lowest rounded-3xl border border-surface-variant clinical-shadow p-6 space-y-4">
        {/* Mock top */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary-container/40 flex items-center justify-center text-primary font-bold">SM</div>
              <span className="glow-pulse absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-status-safe border-2 border-surface-container-lowest" />
            </div>
            <div>
              <p className="text-body-sm font-bold leading-tight">Sarah · This week</p>
              <p className="text-label-caps text-on-surface-variant">Cycle day 14</p>
            </div>
          </div>
          <MaterialIcon name="spa" className="text-primary" filled />
        </div>

        {/* Status card */}
        <div className="status-card-stable bg-surface-container-low rounded-2xl p-4">
          <p className="text-label-caps text-primary uppercase tracking-widest">Global status</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-headline-md font-headline-md">Stable</p>
            <MaterialIcon name="check_circle" className="text-primary" filled />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div><p className="text-label-caps text-on-surface-variant">Activity</p><p className="font-bold text-primary">84%</p></div>
            <div><p className="text-label-caps text-on-surface-variant">Sleep</p><p className="font-bold text-secondary">7.2h</p></div>
            <div><p className="text-label-caps text-on-surface-variant">HR</p><p className="font-bold">72</p></div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="bg-surface-container-low rounded-2xl p-4">
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-label-caps text-on-surface-variant">7-day pelvic pain</p>
            <span className="text-label-caps text-secondary flex items-center gap-1 font-bold">
              <MaterialIcon name="trending_down" className="text-sm" /> 22%
            </span>
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
            <circle cx="180" cy="8" r="3" fill="#8E3A5D" />
            <circle cx="180" cy="8" r="6" fill="#8E3A5D" opacity=".25">
              <animate attributeName="r" values="3;9;3" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values=".5;0;.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-caps">Less fatigue</span>
          <span className="px-3 py-1 rounded-full bg-primary-container/20 text-primary text-label-caps">Better sleep</span>
          <span className="px-3 py-1 rounded-full bg-tertiary-container/60 text-on-tertiary-container text-label-caps">Caffeine ↓</span>
        </div>
      </div>

      {/* Floating side card */}
      <div className="float-slow hidden lg:block absolute -bottom-6 -left-10 bg-surface-container-lowest rounded-2xl border border-surface-variant p-3 clinical-shadow flex items-center gap-3 w-56">
        <div className="grid place-items-center w-10 h-10 rounded-xl bg-secondary-container text-secondary">
          <MaterialIcon name="medical_services" filled />
        </div>
        <div className="text-left">
          <p className="text-body-sm font-bold leading-tight">Dr. Aris reviewed</p>
          <p className="text-label-caps text-on-surface-variant">2 minutes ago</p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-12 sm:pt-20 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          <div className="lg:col-span-7 entrance space-y-7">
            <span className="entrance-item inline-flex items-center gap-2 bg-primary-container/15 text-primary px-3 py-1.5 rounded-full text-label-caps">
              <MaterialIcon name="favorite" className="text-base" filled />
              For women's health · clinical-grade
            </span>
            <h1 className="entrance-item text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-headline-lg leading-[1.05] tracking-tight">
              <span className="gradient-text">Patterns your body knows.</span><br />
              <span className="text-on-surface">Insights your team can act on.</span>
            </h1>
            <p className="entrance-item text-body-lg text-on-surface-variant max-w-xl">
              Clinical Harmony is a calm, private symptom tracker that turns daily check-ins into the kind of patterns your clinical team can read in seconds — not 30-minute appointments.
            </p>
            <div className="entrance-item flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="btn-shine inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-4 rounded-2xl font-bold text-body-md hover:bg-primary-container active:scale-95 transition shadow-xl shadow-primary/30 focus-bloom"
              >
                Open the dashboard <MaterialIcon name="arrow_forward" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 border-2 border-primary/25 text-primary px-7 py-4 rounded-2xl font-bold text-body-md hover:bg-primary/5 hover:border-primary/50 transition focus-bloom"
              >
                <MaterialIcon name="play_circle" filled /> Watch demo · 90s
              </a>
            </div>

            <div className="entrance-item pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-on-surface-variant">
              <div className="flex items-center gap-1.5"><MaterialIcon name="verified_user" className="text-primary text-base" filled /> HIPAA compliant</div>
              <div className="flex items-center gap-1.5"><MaterialIcon name="lock" className="text-primary text-base" /> End-to-end encrypted</div>
              <div className="flex items-center gap-1.5"><MaterialIcon name="health_and_safety" className="text-primary text-base" filled /> Built with clinicians</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function CountUp({ to, suffix = '', duration = 1400 }) {
  const [ref, seen] = useInView();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  const formatted = to >= 1000 ? value.toFixed(1) : Math.round(value);
  return <span ref={ref}>{formatted}{suffix}</span>;
}

function StatsStrip() {
  const stats = [
    { value: 12.4, suffix: 'k+', label: 'Symptoms logged daily' },
    { value: 94,   suffix: '%',  label: 'AI pattern confidence' },
    { value: 7,    suffix: ' min', label: 'Average time per check-in' },
    { value: 23,   suffix: '',   label: 'Clinics using Harmony' }
  ];
  return (
    <section className="border-y border-surface-variant/50 bg-surface-container-low/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-headline-md sm:text-4xl font-headline-md text-primary tracking-tight">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="text-body-sm text-on-surface-variant mt-1">{s.label}</p>
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
      accent: 'primary',
      tag: 'INPUT'
    },
    {
      icon: 'insights',
      title: 'See the patterns',
      body: 'AI surfaces what you couldn\'t — circadian shifts, food/symptom lag, hormonal-cycle alignment over 180 days.',
      accent: 'secondary',
      tag: 'PATTERN'
    },
    {
      icon: 'medical_services',
      title: 'Share with your team',
      body: 'Encrypted chat with your clinicians, plus a one-click report ready for your next appointment or EHR.',
      accent: 'tertiary',
      tag: 'OUTPUT'
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-12">
          <p className="text-label-caps text-primary uppercase tracking-widest">What it does</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline-lg mt-2 tracking-tight">Made for the parts of your health that don't fit in a 15-minute visit.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} data-lift className={`tilt bg-surface-container-lowest rounded-3xl p-7 border border-surface-variant clinical-shadow space-y-4 relative overflow-hidden`}>
              <span className="absolute top-5 right-5 text-label-caps text-on-surface-variant/60">{f.tag}</span>
              <div className={`w-14 h-14 rounded-2xl bg-${f.accent}-container/40 text-${f.accent} flex items-center justify-center`}>
                <MaterialIcon name={f.icon} className="text-3xl" filled />
              </div>
              <h3 className="text-2xl font-headline-sm tracking-tight">{f.title}</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">{f.body}</p>
              <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-${f.accent}/10 rounded-full blur-2xl`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Check in daily',           d: 'A two-minute log that respects your time. Body map, intensity, notes if you want them.', icon: 'edit_calendar' },
    { n: '02', t: 'Let patterns surface',     d: 'Harmony quietly correlates symptoms with sleep, cycle phase, stress, and your treatment plan.', icon: 'insights' },
    { n: '03', t: 'Walk in prepared',         d: 'A clean clinical summary auto-builds itself for your next appointment or care team chat.', icon: 'description' }
  ];
  return (
    <section id="how" className="py-24 bg-surface-container-low/70 border-y border-surface-variant/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-label-caps text-primary uppercase tracking-widest">How it works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline-lg mt-2 tracking-tight">Three quiet steps. No data-entry guilt.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.n} data-lift className="relative bg-surface-container-lowest rounded-3xl p-7 border border-surface-variant clinical-shadow tilt">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary text-on-primary text-label-caps font-bold w-10 h-10 rounded-full grid place-items-center shadow-lg shadow-primary/30">{s.n}</span>
                <MaterialIcon name={s.icon} className="text-primary" filled />
              </div>
              <h3 className="text-xl font-headline-sm mt-2 tracking-tight">{s.t}</h3>
              <p className="text-body-md text-on-surface-variant mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section id="voices" className="py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <figure data-lift className="bg-primary-container/15 rounded-3xl p-8 sm:p-12 border border-primary-container/30 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-secondary/20 rounded-full blur-3xl spin-slow" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/15 rounded-full blur-3xl" />
          <MaterialIcon name="format_quote" className="text-primary text-6xl absolute top-4 left-4 opacity-25" />
          <blockquote className="relative text-2xl sm:text-3xl lg:text-4xl font-headline-md text-on-surface leading-tight tracking-tight">
            "For the first time, my doctor didn't ask me to re-explain what I'd been feeling for months. She just opened the report. That was the appointment I cried in the parking lot for the right reason."
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-lg shadow-primary/30">M.R.</div>
            <div>
              <p className="font-bold text-body-md">Maya Rivera</p>
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
    <section id="faq" className="py-24 bg-surface-container-low/70 border-t border-surface-variant/50">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-label-caps text-primary uppercase tracking-widest">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-headline-lg mt-2 tracking-tight">Questions we hear often.</h2>
        </div>
        <div className="space-y-3">
          {items.map(it => (
            <details key={it.q} className="smooth group bg-surface-container-lowest rounded-2xl border border-surface-variant clinical-shadow open:border-primary/40 transition-colors">
              <summary className="cursor-pointer list-none flex items-center justify-between p-5 font-bold text-body-md focus-bloom">
                <span className="flex items-center gap-3">
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-primary-container/20 text-primary group-open:bg-primary group-open:text-on-primary transition-colors">
                    <MaterialIcon name="help" className="text-base" />
                  </span>
                  {it.q}
                </span>
                <MaterialIcon name="expand_more" className="text-primary group-open:rotate-180 transition-transform" />
              </summary>
              <div>
                <div className="px-5 pb-5 text-body-md text-on-surface-variant leading-relaxed">{it.a}</div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="relative bg-primary text-on-primary rounded-[2rem] p-10 sm:p-16 overflow-hidden text-center">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary-container/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/35 rounded-full blur-3xl spin-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,217,226,.25),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headline-lg mb-4 tracking-tight">Walk into your next appointment with a story, not a guess.</h2>
            <p className="text-body-lg opacity-90 max-w-xl mx-auto mb-8">
              Free to start. No credit card. Built with the patience your health actually deserves.
            </p>
            <Link to="/dashboard" className="btn-shine inline-flex items-center gap-2 bg-surface text-primary px-8 py-4 rounded-2xl font-bold text-body-md hover:bg-primary-fixed/40 active:scale-95 transition shadow-2xl focus-bloom">
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
    <footer className="border-t border-surface-variant/50 bg-surface-container-low/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 grid sm:grid-cols-4 gap-8">
        <div className="sm:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary-container/20">
              <MaterialIcon name="spa" filled />
            </span>
            <span className="text-headline-sm font-headline-sm font-bold tracking-tight">Clinical Harmony</span>
          </Link>
          <p className="text-body-sm text-on-surface-variant mt-3 max-w-sm leading-relaxed">
            A women's symptom pattern tracker — built calm, encrypted, and shared on your terms.
          </p>
        </div>
        <div>
          <p className="text-label-caps text-on-surface-variant uppercase mb-3">Product</p>
          <ul className="space-y-2 text-body-sm">
            <li><a href="#features" className="hover:text-primary transition">Features</a></li>
            <li><a href="#how" className="hover:text-primary transition">How it works</a></li>
            <li><Link to="/dashboard" className="hover:text-primary transition">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-label-caps text-on-surface-variant uppercase mb-3">Trust</p>
          <ul className="space-y-2 text-body-sm">
            <li><a className="hover:text-primary transition" href="#">Privacy</a></li>
            <li><a className="hover:text-primary transition" href="#">Security</a></li>
            <li><a className="hover:text-primary transition" href="#">Clinical advisors</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface-variant/50 py-5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between text-label-caps text-on-surface-variant gap-2">
          <span>© 2026 Clinical Harmony · For informational purposes only · not a substitute for medical advice.</span>
          <span className="flex items-center gap-1.5"><MaterialIcon name="favorite" className="text-primary text-sm" filled /> Built with care</span>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  // Smooth-scroll for anchor links (works around React-Router's hash handling)
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

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
