import { AppState, Problem, Page } from '../types';
import { getStreak } from '../store';

interface Props {
  state: AppState;
  dueProblems: Problem[];
  onStartSession: () => void;
  onNavigate: (p: Page) => void;
}

function CircularProgress({ value, max, size = 120 }: { value: number; max: number; size?: number }) {
  const pct = max === 0 ? 0 : (value / max) * 100;
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#grad)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-bold">{Math.round(pct)}%</div>
        <div className="text-xs text-slate-400">{value}/{max}</div>
      </div>
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-yellow-400 text-sm">
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

export default function Dashboard({ state, dueProblems, onStartSession, onNavigate }: Props) {
  const allProblems = state.problems;
  const studied = allProblems.filter(p => p.status !== 'not-started').length;
  const mastered = allProblems.filter(p => p.status === 'mastered').length;
  const needReview = dueProblems.length;
  const streak = getStreak(state.studySessions, state.lastStudyDate);
  const totalTime = allProblems.reduce((a, p) => a + p.totalStudyTime, 0);

  const statCards = [
    { label: 'Studied', value: `${studied}/${allProblems.length}`, color: 'from-purple-500 to-purple-700', icon: '📚' },
    { label: 'Mastered', value: mastered.toString(), color: 'from-green-500 to-green-700', icon: '✅' },
    { label: 'Due Today', value: needReview.toString(), color: 'from-red-500 to-red-700', icon: '🔔' },
    { label: 'Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, color: 'from-orange-500 to-orange-700', icon: '🔥' },
  ];

  return (
    <div className="animate-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-slate-400 mt-1">Your system design prep at a glance</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="glass card-hover p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress circle */}
        <div className="glass p-6 flex flex-col items-center justify-center">
          <CircularProgress value={studied} max={allProblems.length} size={160} />
          <p className="mt-4 text-sm text-slate-400">Overall Progress</p>
          <p className="text-xs text-slate-500 mt-1">{Math.round(totalTime)} min total study time</p>
        </div>

        {/* Due for review */}
        <div className="lg:col-span-2 glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">📅 Due for Review</h3>
            {dueProblems.length > 0 && (
              <button onClick={onStartSession} className="text-sm px-4 py-2 rounded-lg bg-purple-600/50 hover:bg-purple-600/70 transition">
                Start Session →
              </button>
            )}
          </div>
          {dueProblems.length === 0 ? (
            <p className="text-slate-500 text-sm">No problems due for review today! 🎉</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {dueProblems.slice(0, 8).map(p => (
                <div key={p.id} className="glass-sm p-3 flex items-center justify-between card-hover cursor-pointer"
                  onClick={() => onNavigate(p.category === 'problem' ? 'problems' : p.category === 'concept' ? 'concepts' : 'patterns')}>
                  <div>
                    <span className="font-medium">{p.name}</span>
                    <span className={`ml-2 text-xs difficulty-${p.difficulty}`}>{p.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Stars count={p.confidence} />
                    <span className="text-xs text-slate-500">Due {p.nextReview}</span>
                  </div>
                </div>
              ))}
              {dueProblems.length > 8 && <p className="text-xs text-slate-500 text-center">+{dueProblems.length - 8} more</p>}
            </div>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Problems', count: state.problems.filter(p => p.category === 'problem').length, page: 'problems' as Page, icon: '🏗️' },
          { label: 'Concepts', count: state.problems.filter(p => p.category === 'concept').length, page: 'concepts' as Page, icon: '💡' },
          { label: 'Patterns', count: state.problems.filter(p => p.category === 'pattern').length, page: 'patterns' as Page, icon: '🔄' },
        ].map(item => (
          <button key={item.label} onClick={() => onNavigate(item.page)} className="glass card-hover p-5 text-left">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-semibold">{item.label}</div>
            <div className="text-sm text-slate-400">{item.count} items</div>
          </button>
        ))}
      </div>
    </div>
  );
}
