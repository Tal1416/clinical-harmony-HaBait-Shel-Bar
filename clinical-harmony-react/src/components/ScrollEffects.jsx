import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Mounts the animated gradient backdrop + scroll progress bar,
 * drives --scroll / --scroll-px on <html>, and runs an
 * IntersectionObserver that reveals tagged elements as they scroll in.
 *
 * Re-attaches the observer on every route change so newly-mounted
 * page elements participate.
 */
export default function ScrollEffects() {
  const { pathname, hash } = useLocation();

  // Scroll-tracking — runs once.
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      const max = (root.scrollHeight - window.innerHeight) || 1;
      const y = window.scrollY || root.scrollTop || 0;
      root.style.setProperty('--scroll', Math.max(0, Math.min(1, y / max)).toFixed(4));
      root.style.setProperty('--scroll-px', y + 'px');
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Reveal observer — reruns whenever the route changes.
  useEffect(() => {
    // Reset scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    const candidates = [
      'main section',
      'main h1', 'main h2', 'main h3',
      'main [data-lift]',
      'main .bento-grid > *',
      'main .card-lift',
      'main .clinical-shadow',
      'main .glass-card'
    ];
    const seen = new WeakSet();
    document.querySelectorAll(candidates.join(',')).forEach((el, i) => {
      if (seen.has(el)) return;
      if (el.classList.contains('reveal') || el.classList.contains('fade-in')) return;
      el.classList.add('reveal');
      if (i % 4 === 1) el.dataset.reveal = 'left';
      if (i % 4 === 3) el.dataset.reveal = 'right';
      seen.add(el);
    });
    document.querySelectorAll('.bento-grid, [data-reveal-group]').forEach(g => {
      g.classList.add('reveal');
      g.dataset.revealGroup = '';
    });

    // Promote big headlines to gradient text
    document.querySelectorAll('main h1.text-headline-lg, header h2.text-headline-sm')
      .forEach(h => h.classList.add('gradient-text'));

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [pathname, hash]);

  return (
    <>
      <div className="gradient-bg" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
