import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNav from './TopNav.jsx';

/**
 * App shell. Owns the responsive frame so pages only render their content:
 *  - lg+ : fixed 256px sidebar rail, content offset with lg:pl-64
 *  - <lg : sidebar becomes an off-canvas drawer toggled from the TopNav
 *
 * Pass `fullBleed` for screens that manage their own scroll/height (e.g. Chat).
 */
export default function Layout({ title, activeTab, children, fullBleed = false }) {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  // While the drawer is open: Escape closes it and the body scroll is locked.
  useEffect(() => {
    if (!navOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [navOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link focus-bloom">Skip to content</a>

      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      {/* Mobile backdrop (sits above content + FABs, below the drawer) */}
      <div
        onClick={() => setNavOpen(false)}
        className={
          'fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ' +
          (navOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        aria-hidden="true"
      />

      <div className={'lg:pl-64 flex flex-col ' + (fullBleed ? 'h-[100dvh]' : 'min-h-[100dvh]')}>
        <TopNav
          title={title}
          activeTab={activeTab}
          onMenuClick={() => setNavOpen(true)}
          navOpen={navOpen}
        />
        <main
          id="main-content"
          tabIndex={-1}
          className={
            fullBleed
              ? 'flex-1 min-h-0 overflow-hidden'
              : 'flex-1 px-container-padding-mobile sm:px-8 lg:px-container-padding-desktop py-stack-lg'
          }
        >
          {children}
        </main>
      </div>
    </>
  );
}
