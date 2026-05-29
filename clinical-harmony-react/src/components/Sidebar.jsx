import { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSymptoms } from '../context/AppDataProvider.jsx';
import { toast } from '../lib/toast.js';

const NAV = [
  { to: '/dashboard', id: 'dashboard', icon: 'dashboard',        label: 'Dashboard' },
  { to: '/log',       id: 'log',       icon: 'monitor_heart',    label: 'Symptom Log' },
  { to: '/history',   id: 'history',   icon: 'insights',         label: 'Pattern History' },
  { to: '/chat',      id: 'chat',      icon: 'medical_services', label: 'Clinical Team' },
  { to: '/report',    id: 'report',    icon: 'description',      label: 'Physician Report' }
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const { clearAll } = useSymptoms();
  const asideRef = useRef(null);

  // Basic focus trap while the mobile drawer is open.
  useEffect(() => {
    if (!open || !asideRef.current) return undefined;
    const node = asideRef.current;
    const focusables = () =>
      node.querySelectorAll(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
    const list = focusables();
    list[0]?.focus();
    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [open]);

  async function handleSignOut() {
    await clearAll();
    toast('Signed out · local data cleared');
    navigate('/');
  }

  return (
    <aside
      ref={asideRef}
      aria-label="Sidebar"
      className={
        'h-[100dvh] w-64 fixed left-0 top-0 flex flex-col py-unit px-stack-md ' +
        'bg-surface-container-low/95 backdrop-blur-md shadow-sm z-[60] ' +
        'transition-transform duration-300 ease-out will-change-transform ' +
        'lg:translate-x-0 lg:visible ' +
        (open ? 'translate-x-0 visible' : '-translate-x-full invisible')
      }
    >
      <div className="mb-stack-md px-unit pt-stack-sm flex items-center justify-between">
        <NavLink
          to="/"
          title="Back to landing"
          className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity focus-bloom"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">spa</span>
          <h1 className="text-headline-md font-headline-md font-bold">Clinical Harmony</h1>
        </NavLink>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 -mr-1 rounded-lg text-on-surface-variant hover:bg-surface-variant transition focus-bloom"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </div>

      <div className="flex items-center gap-stack-md p-stack-sm mb-stack-lg bg-surface-container rounded-xl">
        <div className="w-11 h-11 rounded-full bg-primary-container/30 border border-primary/20 flex items-center justify-center text-primary font-bold" aria-hidden="true">SM</div>
        <div className="min-w-0">
          <p className="text-body-md font-bold text-on-surface truncate">Sarah Mitchell</p>
          <p className="text-label-caps font-label-caps text-on-surface-variant">WH-9821</p>
        </div>
      </div>

      <nav aria-label="Primary" className="flex-1 space-y-1 overflow-y-auto pr-1">
        {NAV.map(item => (
          <NavLink
            key={item.id}
            to={item.to}
            end
            className={({ isActive }) =>
              'flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg transition-colors group focus-bloom ' +
              (isActive
                ? 'text-primary font-bold border-r-4 border-primary bg-surface-variant/50'
                : 'text-on-surface-variant hover:bg-surface-variant')
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-body-md">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => navigate('/log')}
        className="btn-shine mt-stack-md w-full bg-primary text-on-primary py-stack-md rounded-xl font-bold text-body-md flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition shadow-lg shadow-primary/25 focus-bloom"
      >
        <span className="material-symbols-outlined" aria-hidden="true">add_circle</span> Log Symptom
      </button>

      <div className="mt-stack-md pt-stack-md border-t border-surface-variant space-y-1">
        <button
          type="button"
          onClick={() => toast('Support — our care team will reach out shortly')}
          className="w-full flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition focus-bloom"
        >
          <span className="material-symbols-outlined" aria-hidden="true">help_outline</span>
          <span className="text-body-md">Support</span>
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition focus-bloom"
        >
          <span className="material-symbols-outlined" aria-hidden="true">logout</span>
          <span className="text-body-md">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
