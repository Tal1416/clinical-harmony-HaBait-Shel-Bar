import { NavLink, useNavigate } from 'react-router-dom';

const NAV = [
  { to: '/dashboard', id: 'dashboard', icon: 'dashboard',        label: 'Dashboard' },
  { to: '/log',       id: 'log',       icon: 'monitor_heart',    label: 'Symptom Log' },
  { to: '/history',   id: 'history',   icon: 'insights',         label: 'Pattern History' },
  { to: '/chat',      id: 'chat',      icon: 'medical_services', label: 'Clinical Team' },
  { to: '/report',    id: 'report',    icon: 'description',      label: 'Physician Report' }
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col py-unit px-stack-md bg-surface-container-low/85 backdrop-blur-md shadow-sm z-50">
      <div className="mb-stack-md px-unit pt-stack-sm">
        <NavLink to="/dashboard" className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          <h1 className="text-headline-md font-headline-md font-bold">Clinical Harmony</h1>
        </NavLink>
      </div>

      <div className="flex items-center gap-stack-md p-stack-sm mb-stack-lg bg-surface-container rounded-xl">
        <div className="w-11 h-11 rounded-full bg-primary-container/30 border border-primary/20 flex items-center justify-center text-primary font-bold">SM</div>
        <div className="min-w-0">
          <p className="text-body-md font-bold text-on-surface truncate">Sarah Mitchell</p>
          <p className="text-label-caps font-label-caps text-on-surface-variant">WH-9821</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {NAV.map(item => (
          <NavLink
            key={item.id}
            to={item.to}
            end
            className={({ isActive }) =>
              'flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg transition-colors group ' +
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
        className="mt-stack-md w-full bg-primary text-on-primary py-stack-md rounded-xl font-bold text-body-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition shadow-md shadow-primary/20"
      >
        <span className="material-symbols-outlined">add_circle</span> Log Symptom
      </button>

      <div className="mt-stack-md pt-stack-md border-t border-surface-variant space-y-1">
        <a href="#help" className="flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition">
          <span className="material-symbols-outlined">help_outline</span>
          <span className="text-body-md">Support</span>
        </a>
        <a href="#signout" className="flex items-center gap-stack-md px-stack-md py-stack-sm rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-body-md">Sign Out</span>
        </a>
      </div>
    </aside>
  );
}
