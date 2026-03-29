import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/context';
import { useKeyboardShortcut } from '@/hooks/useAnimations';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { state } = useApp();

  const toggle = useCallback(() => setOpen(o => !o), []);
  useKeyboardShortcut('k', true, toggle);

  useEffect(() => {
    if (open) { setQuery(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const results = query.length > 0
    ? state.problems.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  const pages = [
    { label: 'Dashboard', path: '/' },
    { label: 'Problems', path: '/problems' },
    { label: 'Concepts', path: '/concepts' },
    { label: 'Patterns', path: '/patterns' },
    { label: 'Statistics', path: '/stats' },
    { label: 'Study Session', path: '/study' },
  ].filter(p => !query || p.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => { navigate(path); setOpen(false); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const total = results.length + pages.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => (s + 1) % total); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => (s - 1 + total) % total); }
    if (e.key === 'Enter') {
      if (selected < pages.length) handleSelect(pages[selected].path);
      else navigate(`/problems`);
      setOpen(false);
    }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative w-full max-w-[560px] bg-[#0f0f13] border border-[#1a1a2e] rounded-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 border-b border-[#1a1a2e]">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search problems, navigate..."
                className="flex-1 py-3.5 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />
              <button onClick={() => setOpen(false)} className="text-zinc-600 hover:text-zinc-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {pages.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">Pages</div>
                  {pages.map((p, i) => (
                    <button
                      key={p.path}
                      onClick={() => handleSelect(p.path)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selected === i ? 'bg-[#1a1a2e] text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >{p.label}</button>
                  ))}
                </div>
              )}
              {results.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">Problems</div>
                  {results.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => { navigate('/problems'); setOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                        selected === i + pages.length ? 'bg-[#1a1a2e] text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span>{p.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                        p.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>{p.difficulty}</span>
                    </button>
                  ))}
                </div>
              )}
              {query && results.length === 0 && pages.length === 0 && (
                <div className="text-center text-zinc-600 py-8 text-sm">No results found</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
