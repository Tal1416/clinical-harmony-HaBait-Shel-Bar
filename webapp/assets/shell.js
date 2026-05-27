// Clinical Harmony — app shell.
// Injects the shared side nav + top nav into every page.
// Each page declares: window.PAGE = { id, title, tabs: ['my-care'|'team-chat'] }

(function () {
  const NAV_ITEMS = [
    { id: 'dashboard', href: 'index.html',  icon: 'dashboard',      label: 'Dashboard' },
    { id: 'log',       href: 'log.html',    icon: 'monitor_heart',  label: 'Symptom Log' },
    { id: 'history',   href: 'history.html',icon: 'insights',       label: 'Pattern History' },
    { id: 'chat',      href: 'chat.html',   icon: 'medical_services',label:'Clinical Team' },
    { id: 'report',    href: 'report.html', icon: 'description',    label: 'Physician Report' }
  ];

  const PAGE = window.PAGE || { id: 'dashboard', title: 'Patient Dashboard' };

  function el(html) {
    const wrap = document.createElement('div');
    wrap.innerHTML = html.trim();
    return wrap.firstChild;
  }

  function buildSidebar() {
    const navHtml = NAV_ITEMS.map(item => {
      const active = item.id === PAGE.id;
      const base = 'flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg transition-colors group';
      const cls = active
        ? `${base} text-primary font-bold border-r-4 border-primary bg-surface-variant/50`
        : `${base} text-on-surface-variant hover:bg-surface-variant`;
      const fill = active ? `style="font-variation-settings:'FILL' 1;"` : '';
      return `
        <a class="${cls}" href="${item.href}">
          <span class="material-symbols-outlined" ${fill}>${item.icon}</span>
          <span class="text-body-md">${item.label}</span>
        </a>`;
    }).join('');

    return el(`
      <aside class="h-screen w-64 fixed left-0 top-0 flex flex-col py-unit px-stack-md bg-surface-container-low shadow-sm z-50">
        <div class="mb-stack-md px-unit pt-stack-sm">
          <a href="index.html" class="flex items-center gap-2 text-primary">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">spa</span>
            <h1 class="text-headline-md font-headline-md font-bold">Clinical Harmony</h1>
          </a>
        </div>

        <div class="flex items-center gap-stack-md p-stack-sm mb-stack-lg bg-surface-container rounded-xl">
          <div class="w-11 h-11 rounded-full bg-primary-container/30 border border-primary/20 flex items-center justify-center text-primary font-bold">SM</div>
          <div class="min-w-0">
            <p class="text-body-md font-bold text-on-surface truncate">Sarah Mitchell</p>
            <p class="text-label-caps font-label-caps text-on-surface-variant">WH-9821</p>
          </div>
        </div>

        <nav class="flex-1 space-y-1 overflow-y-auto pr-1">${navHtml}</nav>

        <button id="cta-log-symptom" class="mt-stack-md w-full bg-primary text-on-primary py-stack-md rounded-xl font-bold text-body-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition shadow-md shadow-primary/20">
          <span class="material-symbols-outlined">add_circle</span> Log Symptom
        </button>

        <div class="mt-stack-md pt-stack-md border-t border-surface-variant space-y-1">
          <a class="flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition" href="#">
            <span class="material-symbols-outlined">help_outline</span>
            <span class="text-body-md">Support</span>
          </a>
          <a class="flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition" href="#">
            <span class="material-symbols-outlined">logout</span>
            <span class="text-body-md">Sign Out</span>
          </a>
        </div>
      </aside>
    `);
  }

  function buildHeader() {
    const tabs = PAGE.tabs || ['my-care', 'team-chat'];
    const activeTab = PAGE.activeTab || 'my-care';
    const tabHtml = tabs.map(t => {
      const isActive = t === activeTab;
      const label = t === 'my-care' ? 'My Care' : 'Team Chat';
      const href = t === 'team-chat' ? 'chat.html' : 'index.html';
      return isActive
        ? `<a class="text-primary border-b-2 border-primary pb-1 font-bold text-body-md" href="${href}">${label}</a>`
        : `<a class="text-on-surface-variant hover:text-primary transition-colors text-body-md" href="${href}">${label}</a>`;
    }).join('');

    return el(`
      <header class="flex justify-between items-center w-full px-container-padding-desktop py-stack-sm ml-64 sticky top-0 bg-surface/85 backdrop-blur-md z-40 border-b border-surface-variant no-print">
        <div class="flex items-center gap-stack-lg">
          <h2 class="text-headline-sm font-headline-sm font-bold text-primary">${PAGE.title || ''}</h2>
          <nav class="hidden md:flex gap-stack-md">${tabHtml}</nav>
        </div>
        <div class="flex items-center gap-stack-md">
          <div class="relative hidden sm:flex items-center bg-surface-container rounded-full px-stack-md py-1.5">
            <span class="material-symbols-outlined text-outline">search</span>
            <input class="bg-transparent border-none focus:ring-0 text-body-sm w-48 ml-2 placeholder:text-on-surface-variant" placeholder="Search records..." />
          </div>
          <button class="relative p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition" aria-label="Notifications">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button class="p-2 text-error hover:bg-error-container/60 rounded-full transition" aria-label="Emergency">
            <span class="material-symbols-outlined">emergency_home</span>
          </button>
          <div class="hidden md:flex items-center gap-stack-sm ml-2 border-l pl-4 border-surface-variant">
            <div class="text-right">
              <p class="text-body-sm font-bold leading-tight">Sarah Mitchell</p>
              <p class="text-label-caps text-on-surface-variant opacity-70">WH-9821</p>
            </div>
            <div class="w-10 h-10 rounded-full ring-2 ring-primary-container bg-primary-container/30 flex items-center justify-center text-primary font-bold">SM</div>
          </div>
        </div>
      </header>
    `);
  }

  function showToast(msg) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(t._hideTimer);
    t._hideTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }
  window.toast = showToast;

  // ────────────────────────────────────────────────────────────
  // Animated gradient backdrop + scroll progress + scroll-reveal
  // ────────────────────────────────────────────────────────────
  function installGradientBackdrop() {
    if (document.querySelector('.gradient-bg')) return;
    const bg = document.createElement('div');
    bg.className = 'gradient-bg';
    document.body.prepend(bg);
  }
  function installScrollProgress() {
    if (document.querySelector('.scroll-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
  }

  // Drive --scroll (0→1) and --scroll-px on <html> so CSS can react.
  function trackScroll() {
    const root = document.documentElement;
    let ticking = false;
    function update() {
      const max = (root.scrollHeight - window.innerHeight) || 1;
      const y = window.scrollY || root.scrollTop || 0;
      root.style.setProperty('--scroll', Math.max(0, Math.min(1, y / max)).toFixed(4));
      root.style.setProperty('--scroll-px', y + 'px');
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  // Auto-tag candidates as scroll-reveal targets, then observe them.
  function installRevealObserver() {
    const candidates = [
      'main section',
      'main h1', 'main h2', 'main h3',
      'main [data-lift]',
      'main .bento-grid > *',
      'main .card-lift',
      'main .clinical-shadow',
      'main .glass-card',
      'main .status-card-stable',
      'main .status-card-alert',
      'main .status-card-monitor'
    ];
    const seen = new WeakSet();
    document.querySelectorAll(candidates.join(',')).forEach((el, i) => {
      if (seen.has(el)) return;
      // Avoid double-animating elements that already have the load-time .fade-in
      if (el.classList.contains('reveal') || el.classList.contains('fade-in')) return;
      el.classList.add('reveal');
      // Alternate direction for a gentle rhythm
      if (i % 4 === 1) el.dataset.reveal = 'left';
      if (i % 4 === 3) el.dataset.reveal = 'right';
      seen.add(el);
    });

    // Mark bento grids as reveal groups for staggered children
    document.querySelectorAll('.bento-grid, [data-reveal-group]').forEach(g => {
      g.classList.add('reveal');
      g.dataset.revealGroup = '';
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          // Once revealed, stop observing — animation is one-shot.
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  // Promote dashboard h1 to animated gradient text on each page.
  function gradientizeHeadlines() {
    document.querySelectorAll('main h1.text-headline-lg, header h2.text-headline-sm').forEach(h => {
      h.classList.add('gradient-text');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    installGradientBackdrop();
    installScrollProgress();
    trackScroll();

    document.body.prepend(buildSidebar());
    // Insert header right after sidebar, before main
    const main = document.querySelector('main');
    if (main) main.parentNode.insertBefore(buildHeader(), main);
    else document.body.appendChild(buildHeader());

    const cta = document.getElementById('cta-log-symptom');
    if (cta) cta.addEventListener('click', () => {
      if (PAGE.id !== 'log') window.location.href = 'log.html';
    });

    // Generic card lift behavior on any element with [data-lift]
    document.querySelectorAll('[data-lift]').forEach(card => {
      card.classList.add('card-lift');
    });

    gradientizeHeadlines();
    installRevealObserver();
  });
})();
