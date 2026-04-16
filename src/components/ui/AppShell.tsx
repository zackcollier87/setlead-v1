import { NavLink, Outlet } from 'react-router-dom';
// use Vite runtime URL for public assets
const logoUrl = new URL('/logo.svg', import.meta.url).href;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`;

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="SetLead" className="h-10" />
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/library" className={navLinkClass}>Library</NavLink>
            <NavLink to="/setlists" className={navLinkClass}>Setlists</NavLink>
            <NavLink to="/stand" className={navLinkClass}>Music Stand</NavLink>
            <NavLink to="/sync" className={navLinkClass}>Sync</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
