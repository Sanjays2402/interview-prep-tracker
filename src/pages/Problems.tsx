import { useState, useMemo } from 'react';
import { useApp } from '@/lib/context';
import { isDueToday } from '@/lib/store';
import type { Status, Difficulty } from '@/lib/types';
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import ConfidenceStars from '@/components/ConfidenceStars';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronRight, ExternalLink, StickyNote } from 'lucide-react';

const statusLabels: Record<Status, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  reviewed: 'Reviewed',
  mastered: 'Mastered',
};

const statusColors: Record<Status, string> = {
  not_started: 'bg-zinc-500/10 text-zinc-500',
  in_progress: 'bg-amber-500/10 text-amber-400',
  reviewed: 'bg-sky-500/10 text-sky-400',
  mastered: 'bg-emerald-500/10 text-emerald-400',
};

const diffColors: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/10 text-emerald-400',
  Medium: 'bg-amber-500/10 text-amber-400',
  Hard: 'bg-rose-500/10 text-rose-400',
};

type SortField = 'title' | 'difficulty' | 'status' | 'confidence';

export default function Problems() {
  const { state, updateProblem } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortField>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = state.problems;
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== 'all') list = list.filter(p => p.status === statusFilter);
    if (diffFilter !== 'all') list = list.filter(p => p.difficulty === diffFilter);
    list = [...list].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortBy === 'confidence') return (a.confidence - b.confidence) * dir;
      return a[sortBy].localeCompare(b[sortBy]) * dir;
    });
    return list;
  }, [state.problems, search, statusFilter, diffFilter, sortBy, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortDir('asc'); }
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
    >
      {children}
      {sortBy === field && <span className="text-purple-400">{sortDir === 'asc' ? '↑' : '↓'}</span>}
    </button>
  );

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Problems</h1>
            <span className="text-sm text-zinc-500 tabular-nums">{filtered.length} of {state.problems.length}</span>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search problems..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#0f0f13] border border-[#1a1a2e] rounded-lg text-sm outline-none focus:border-purple-500/50 transition-colors placeholder:text-zinc-700"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'not_started', 'in_progress', 'reviewed', 'mastered'] as const).map(s => (
                <motion.button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === s
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'text-zinc-600 hover:text-zinc-400 border border-transparent'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {s === 'all' ? 'All' : statusLabels[s]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#0f0f13] border border-[#1a1a2e] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_100px_120px_120px_100px] gap-4 px-6 py-3 border-b border-[#1a1a2e]">
              <SortHeader field="title">Problem</SortHeader>
              <SortHeader field="difficulty">Difficulty</SortHeader>
              <SortHeader field="status">Status</SortHeader>
              <SortHeader field="confidence">Confidence</SortHeader>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Due</span>
            </div>

            {/* Rows */}
            <div>
              {filtered.map((p, i) => {
                const isExpanded = expanded === p.id;
                const due = isDueToday(p.nextReview);
                return (
                  <div key={p.id}>
                    <motion.div
                      className={`grid grid-cols-[1fr_100px_120px_120px_100px] gap-4 px-6 py-3.5 items-center cursor-pointer transition-colors ${
                        isExpanded ? 'bg-[#13131a]' : 'hover:bg-[#0d0d11]'
                      } ${i > 0 ? 'border-t border-[#1a1a2e]/50' : ''}`}
                      onClick={() => setExpanded(isExpanded ? null : p.id)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.15 }}>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                        </motion.div>
                        <span className="text-sm font-medium">{p.title}</span>
                        {p.url && <ExternalLink className="w-3 h-3 text-zinc-700" />}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${diffColors[p.difficulty]}`}>{p.difficulty}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${statusColors[p.status]}`}>{statusLabels[p.status]}</span>
                      <ConfidenceStars value={p.confidence} readonly size={14} />
                      <span className={`text-xs ${due ? 'text-amber-400 font-medium' : 'text-zinc-600'}`}>
                        {due && <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 pulse-glow mr-1.5" />}
                        {p.nextReview ?? '—'}
                      </span>
                    </motion.div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-[#0b0b0f] border-t border-[#1a1a2e]/30 space-y-4">
                            <div className="flex gap-2 flex-wrap">
                              <span className="text-xs text-zinc-600 mr-1">Tags:</span>
                              {p.tags.map(t => (
                                <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400">{t}</span>
                              ))}
                              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-500/10 text-zinc-500">{p.pattern}</span>
                            </div>
                            <div>
                              <label className="text-xs text-zinc-600 block mb-1.5">Notes</label>
                              <textarea
                                value={p.notes}
                                onChange={e => updateProblem(p.id, { notes: e.target.value })}
                                placeholder="Add notes..."
                                className="w-full bg-[#09090b] border border-[#1a1a2e] rounded-lg p-3 text-sm resize-none h-20 outline-none focus:border-purple-500/30 placeholder:text-zinc-700"
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-zinc-600">Confidence:</span>
                              <ConfidenceStars value={p.confidence} onChange={v => updateProblem(p.id, { confidence: v })} />
                            </div>
                            {p.reviews.length > 0 && (
                              <div>
                                <span className="text-xs text-zinc-600 block mb-1.5">Review History</span>
                                <div className="flex gap-2">
                                  {p.reviews.map((r, ri) => (
                                    <span key={ri} className="text-xs px-2 py-1 rounded bg-[#09090b] border border-[#1a1a2e]/50 text-zinc-500">
                                      {r.date}: ★{r.confidence}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
