import { NavLink } from 'react-router-dom';

export default function TopNav({ title, activeTab = 'my-care' }) {
  const tabs = [
    { id: 'my-care',   label: 'My Care',   to: '/dashboard' },
    { id: 'team-chat', label: 'Team Chat', to: '/chat' }
  ];
  return (
    <header className="flex justify-between items-center w-full px-container-padding-desktop py-stack-sm ml-64 sticky top-0 bg-surface/85 backdrop-blur-md z-40 border-b border-surface-variant no-print">
      <div className="flex items-center gap-stack-lg">
        <h2 className="text-headline-sm font-headline-sm font-bold text-primary">{title}</h2>
        <nav className="hidden md:flex gap-stack-md">
          {tabs.map(t => (
            <NavLink
              key={t.id}
              to={t.to}
              className={() =>
                t.id === activeTab
                  ? 'text-primary border-b-2 border-primary pb-1 font-bold text-body-md'
                  : 'text-on-surface-variant hover:text-primary transition-colors text-body-md'
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-stack-md">
        <div className="relative hidden sm:flex items-center bg-surface-container rounded-full px-stack-md py-1.5">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-sm w-48 ml-2 placeholder:text-on-surface-variant"
            placeholder="Search records..."
          />
        </div>
        <button className="relative p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </button>
        <button className="p-2 text-error hover:bg-error-container/60 rounded-full transition" aria-label="Emergency">
          <span className="material-symbols-outlined">emergency_home</span>
        </button>
        <div className="hidden md:flex items-center gap-stack-sm ml-2 border-l pl-4 border-surface-variant">
          <div className="text-right">
            <p className="text-body-sm font-bold leading-tight">Sarah Mitchell</p>
            <p className="text-label-caps text-on-surface-variant opacity-70">WH-9821</p>
          </div>
          <div className="w-10 h-10 rounded-full ring-2 ring-primary-container bg-primary-container/30 flex items-center justify-center text-primary font-bold">SM</div>
        </div>
      </div>
    </header>
  );
}
