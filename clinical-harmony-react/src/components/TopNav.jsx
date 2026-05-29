import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider.jsx';

export default function TopNav({ title, activeTab = 'my-care', onMenuClick = () => {}, navOpen = false }) {
  const { theme, toggleTheme } = useTheme();
  const tabs = [
    { id: 'my-care',   label: 'My Care',   to: '/dashboard' },
    { id: 'team-chat', label: 'Team Chat', to: '/chat' }
  ];

  return (
    <header className="flex justify-between items-center w-full px-container-padding-mobile sm:px-8 lg:px-container-padding-desktop py-stack-sm sticky top-0 bg-surface/85 backdrop-blur-md z-40 border-b border-surface-variant no-print">
      <div className="flex items-center gap-stack-md sm:gap-stack-lg min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-1 rounded-lg text-on-surface-variant hover:bg-surface-variant transition focus-bloom"
          aria-label="Open menu"
          aria-controls="main-content"
          aria-expanded={navOpen}
        >
          <span className="material-symbols-outlined" aria-hidden="true">menu</span>
        </button>
        <p className="text-headline-sm font-headline-sm font-bold text-primary gradient-text truncate">{title}</p>
        <nav aria-label="Section" className="hidden md:flex gap-stack-md">
          {tabs.map(t => (
            <NavLink
              key={t.id}
              to={t.to}
              className={() =>
                t.id === activeTab
                  ? 'text-primary border-b-2 border-primary pb-1 font-bold text-body-md focus-bloom'
                  : 'text-on-surface-variant hover:text-primary transition-colors text-body-md focus-bloom'
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-stack-sm sm:gap-stack-md">
        <label className="relative hidden sm:flex items-center bg-surface-container rounded-full px-stack-md py-1.5">
          <span className="material-symbols-outlined text-outline" aria-hidden="true">search</span>
          <span className="sr-only">Search records</span>
          <input
            type="search"
            className="bg-transparent border-none focus:ring-0 text-body-sm w-32 lg:w-48 ml-2 placeholder:text-on-surface-variant"
            placeholder="Search records..."
          />
        </label>

        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition focus-bloom"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={theme === 'dark'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          <span className="material-symbols-outlined" aria-hidden="true">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
        </button>

        <button className="relative p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition focus-bloom" aria-label="Notifications, 1 unread">
          <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" aria-hidden="true" />
        </button>
        <button className="p-2 text-error hover:bg-error-container/60 rounded-full transition focus-bloom" aria-label="Emergency assistance">
          <span className="material-symbols-outlined" aria-hidden="true">emergency_home</span>
        </button>

        <div className="hidden md:flex items-center gap-stack-sm ml-1 border-l pl-4 border-surface-variant">
          <div className="text-right">
            <p className="text-body-sm font-bold leading-tight">Sarah Mitchell</p>
            <p className="text-label-caps text-on-surface-variant">WH-9821</p>
          </div>
          <div className="w-10 h-10 rounded-full ring-2 ring-primary-container bg-primary-container/30 flex items-center justify-center text-primary font-bold" aria-hidden="true">SM</div>
        </div>
      </div>
    </header>
  );
}
