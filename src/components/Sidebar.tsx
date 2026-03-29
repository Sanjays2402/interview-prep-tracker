import { Page } from '../types';

const nav: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'problems', label: 'Problems', icon: '🏗️' },
  { id: 'concepts', label: 'Concepts', icon: '💡' },
  { id: 'patterns', label: 'Patterns', icon: '🔄' },
  { id: 'stats', label: 'Statistics', icon: '📈' },
];

interface Props {
  page: Page;
  setPage: (p: Page) => void;
  dueCount: number;
  open: boolean;
}

export default function Sidebar({ page, setPage, dueCount, open }: Props) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 glass border-r border-white/10 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          📐 SD Prep Tracker
        </h1>
        <p className="text-xs text-slate-400 mt-1">System Design Interview Prep</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              page === item.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
            {item.id === 'dashboard' && dueCount > 0 && (
              <span className="ml-auto bg-red-500/80 text-white text-xs px-2 py-0.5 rounded-full">{dueCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => setPage('session')}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-sm hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/20"
        >
          🎯 Start Study Session
        </button>
      </div>
    </aside>
  );
}
