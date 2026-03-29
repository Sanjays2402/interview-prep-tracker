import { useState, useMemo } from 'react';
import { Problem } from '../types';

interface Props {
  title: string;
  subtitle: string;
  problems: Problem[];
  onReview: (id: string, rating: number, minutes: number) => void;
  onUpdate: (id: string, updates: Partial<Problem>) => void;
}

const statusColors: Record<string, string> = {
  'not-started': 'bg-slate-600/30 text-slate-400',
  'in-progress': 'bg-yellow-600/30 text-yellow-400',
  'reviewed': 'bg-blue-600/30 text-blue-400',
  'mastered': 'bg-green-600/30 text-green-400',
};

const statusLabels: Record<string, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'reviewed': 'Reviewed',
  'mastered': 'Mastered',
};

export default function ProblemList({ title, subtitle, problems, onReview, onUpdate }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState({ status: '', difficulty: '', tag: '', due: false });
  const [sort, setSort] = useState<'name' | 'difficulty' | 'confidence' | 'nextReview'>('name');
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  const allTags = useMemo(() => [...new Set(problems.flatMap(p => p.tags))].sort(), [problems]);

  const filtered = useMemo(() => {
    let list = [...problems];
    if (filter.status) list = list.filter(p => p.status === filter.status);
    if (filter.difficulty) list = list.filter(p => p.difficulty === filter.difficulty);
    if (filter.tag) list = list.filter(p => p.tags.includes(filter.tag));
    if (filter.due) {
      const today = new Date().toISOString().split('T')[0];
      list = list.filter(p => p.nextReview && p.nextReview <= today);
    }
    const diffOrder = { easy: 0, medium: 1, hard: 2 };
    list.sort((a, b) => {
      switch (sort) {
        case 'name': return a.name.localeCompare(b.name);
        case 'difficulty': return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case 'confidence': return b.confidence - a.confidence;
        case 'nextReview': return (a.nextReview || 'z').localeCompare(b.nextReview || 'z');
        default: return 0;
      }
    });
    return list;
  }, [problems, filter, sort]);

  return (
    <div className="animate-in space-y-6">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-slate-400 mt-1">{subtitle}</p>
      </div>

      {/* Filters */}
      <div className="glass p-4 flex flex-wrap gap-3 items-center">
        <select value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
          <option value="">All Status</option>
          {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filter.difficulty} onChange={e => setFilter(f => ({ ...f, difficulty: e.target.value }))}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
          <option value="">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {allTags.length > 0 && (
          <select value={filter.tag} onChange={e => setFilter(f => ({ ...f, tag: e.target.value }))}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
            <option value="">All Tags</option>
            {allTags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        )}
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={filter.due} onChange={e => setFilter(f => ({ ...f, due: e.target.checked }))}
            className="rounded accent-purple-500" />
          Due today
        </label>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500">Sort:</span>
          <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
            <option value="name">Name</option>
            <option value="difficulty">Difficulty</option>
            <option value="confidence">Confidence</option>
            <option value="nextReview">Next Review</option>
          </select>
        </div>
      </div>

      {/* Problem cards */}
      <div className="space-y-3">
        {filtered.map(problem => (
          <div key={problem.id} className="glass card-hover overflow-hidden">
            <div
              className="p-4 cursor-pointer flex items-center gap-4"
              onClick={() => setExpanded(expanded === problem.id ? null : problem.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold">{problem.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full difficulty-${problem.difficulty} bg-white/5`}>
                    {problem.difficulty}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[problem.status]}`}>
                    {statusLabels[problem.status]}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                  {problem.lastReviewed && <span>Last: {problem.lastReviewed}</span>}
                  {problem.nextReview && <span>Next: {problem.nextReview}</span>}
                  {problem.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">{t}</span>
                  ))}
                </div>
              </div>
              <div className="text-yellow-400 text-sm whitespace-nowrap">
                {problem.confidence > 0 ? '★'.repeat(problem.confidence) + '☆'.repeat(5 - problem.confidence) : '☆☆☆☆☆'}
              </div>
              <svg className={`w-5 h-5 text-slate-500 transition-transform ${expanded === problem.id ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {expanded === problem.id && (
              <div className="border-t border-white/5 p-4 space-y-4 animate-in">
                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-slate-400 block mb-2">📝 Notes</label>
                  <textarea
                    value={problem.notes}
                    onChange={e => onUpdate(problem.id, { notes: e.target.value })}
                    placeholder="Write your notes here..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm resize-y min-h-[100px] focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Review button */}
                {reviewingId === problem.id ? (
                  <div className="glass-sm p-4">
                    <p className="text-sm font-medium mb-3">Rate your confidence:</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(r => (
                        <button key={r} onClick={() => { onReview(problem.id, r, 5); setReviewingId(null); }}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            r <= 2 ? 'bg-red-500/20 hover:bg-red-500/40 text-red-300' :
                            r === 3 ? 'bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300' :
                            'bg-green-500/20 hover:bg-green-500/40 text-green-300'
                          }`}>
                          {'★'.repeat(r)} {r <= 2 ? 'Again' : r === 3 ? 'Hard' : r === 4 ? 'Good' : 'Easy'}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => setReviewingId(problem.id)}
                      className="px-4 py-2 rounded-lg bg-purple-600/50 hover:bg-purple-600/70 text-sm font-medium transition">
                      ✅ Mark Reviewed
                    </button>
                    {problem.status === 'not-started' && (
                      <button onClick={() => onUpdate(problem.id, { status: 'in-progress' })}
                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition">
                        Start Learning
                      </button>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex gap-6 text-xs text-slate-500">
                  <span>Reviews: {problem.reviewCount}</span>
                  <span>Study time: {problem.totalStudyTime}m</span>
                  <span>Interval: {problem.interval}d</span>
                  <span>Ease: {problem.easeFactor.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass p-8 text-center text-slate-500">
          No problems match your filters.
        </div>
      )}
    </div>
  );
}
