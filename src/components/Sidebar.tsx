import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Code2, BookOpen, Shapes, BarChart3, Play, Zap } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/problems', icon: Code2, label: 'Problems' },
  { to: '/concepts', icon: BookOpen, label: 'Concepts' },
  { to: '/patterns', icon: Shapes, label: 'Patterns' },
  { to: '/stats', icon: BarChart3, label: 'Statistics' },
  { to: '/study', icon: Play, label: 'Study' },
];

const accentColors: Record<string, string> = {
  '/': '#0ea5e9',
  '/problems': '#a855f7',
  '/concepts': '#10b981',
  '/patterns': '#f59e0b',
  '/stats': '#0ea5e9',
  '/study': '#f43f5e',
};

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[220px] h-screen flex flex-col border-r border-[#1a1a2e] bg-[#09090b] shrink-0">
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-sky-500 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[15px] tracking-tight">Interview Prep</span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          const color = accentColors[to];
          return (
            <NavLink key={to} to={to} className="block relative">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: `${color}10` }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-dot"
                    className="absolute -left-3 w-1 h-4 rounded-r-full"
                    style={{ backgroundColor: color }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-[18px] h-[18px]" style={isActive ? { color } : undefined} />
                {label}
              </div>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#1a1a2e]">
        <div className="text-[11px] text-zinc-600 font-medium">
          ⌘K Search · N New Session
        </div>
      </div>
    </aside>
  );
}
