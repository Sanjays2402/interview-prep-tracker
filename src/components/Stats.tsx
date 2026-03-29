import { useMemo } from 'react';
import { AppState } from '../types';

interface Props {
  state: AppState;
}

export default function Stats({ state }: Props) {
  const { problems, studySessions } = state;

  const totalTime = problems.reduce((a, p) => a + p.totalStudyTime, 0);
  const totalReviews = problems.reduce((a, p) => a + p.reviewCount, 0);

  const byDifficulty = useMemo(() => {
    const counts = { easy: 0, medium: 0, hard: 0 };
    const studied = { easy: 0, medium: 0, hard: 0 };
    problems.forEach(p => {
      counts[p.difficulty]++;
      if (p.status !== 'not-started') studied[p.difficulty]++;
    });
    return { counts, studied };
  }, [problems]);

  const byStatus = useMemo(() => {
    const counts = { 'not-started': 0, 'in-progress': 0, reviewed: 0, mastered: 0 };
    problems.forEach(p => counts[p.status]++);
    return counts;
  }, [problems]);

  const confidenceDist = useMemo(() => {
    const dist = [0, 0, 0, 0, 0, 0]; // 0-5
    problems.forEach(p => dist[p.confidence]++);
    return dist;
  }, [problems]);

  const weakest = useMemo(() =>
    [...problems]
      .filter(p => p.status !== 'not-started')
      .sort((a, b) => a.confidence - b.confidence)
      .slice(0, 5),
    [problems]
  );

  // Heatmap: last 16 weeks
  const heatmap = useMemo(() => {
    const sessionMap = new Map(studySessions.map(s => [s.date, s.minutesStudied]));
    const days: { date: string; minutes: number }[] = [];
    for (let i = 111; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const ds = d.toISOString().split('T')[0];
      days.push({ date: ds, minutes: sessionMap.get(ds) || 0 });
    }
    return days;
  }, [studySessions]);

  const maxMinutes = Math.max(1, ...heatmap.map(d => d.minutes));

  const getHeatColor = (minutes: number) => {
    if (minutes === 0) return 'bg-white/5';
    const intensity = minutes / maxMinutes;
    if (intensity < 0.25) return 'bg-purple-900/50';
    if (intensity < 0.5) return 'bg-purple-700/50';
    if (intensity < 0.75) return 'bg-purple-500/60';
    return 'bg-purple-400/70';
  };

  return (
    <div className="animate-in space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Statistics</h2>
        <p className="text-slate-400 mt-1">Your study analytics</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Study Time', value: `${totalTime}m`, icon: '⏱️' },
          { label: 'Total Reviews', value: totalReviews.toString(), icon: '🔁' },
          { label: 'Problems Studied', value: `${problems.filter(p => p.status !== 'not-started').length}`, icon: '📚' },
          { label: 'Mastered', value: `${byStatus.mastered}`, icon: '🏆' },
        ].map(s => (
          <div key={s.label} className="glass p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Difficulty breakdown */}
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">📊 By Difficulty</h3>
          <div className="space-y-4">
            {(['easy', 'medium', 'hard'] as const).map(d => {
              const pct = byDifficulty.counts[d] ? (byDifficulty.studied[d] / byDifficulty.counts[d]) * 100 : 0;
              return (
                <div key={d}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={`difficulty-${d} capitalize font-medium`}>{d}</span>
                    <span className="text-slate-400">{byDifficulty.studied[d]}/{byDifficulty.counts[d]}</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${d === 'easy' ? 'bg-green-500' : d === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confidence distribution */}
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">⭐ Confidence Distribution</h3>
          <div className="flex items-end gap-2 h-40">
            {confidenceDist.map((count, i) => {
              const maxCount = Math.max(1, ...confidenceDist);
              const h = (count / maxCount) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-slate-400">{count}</span>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-cyan-500 transition-all duration-1000"
                    style={{ height: `${h}%`, minHeight: count > 0 ? '8px' : '0' }} />
                  <span className="text-xs text-slate-500">{i === 0 ? 'N/A' : `${i}★`}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">📋 By Status</h3>
          <div className="space-y-3">
            {[
              { key: 'mastered', label: 'Mastered', color: 'bg-green-500', emoji: '✅' },
              { key: 'reviewed', label: 'Reviewed', color: 'bg-blue-500', emoji: '📖' },
              { key: 'in-progress', label: 'In Progress', color: 'bg-yellow-500', emoji: '🔄' },
              { key: 'not-started', label: 'Not Started', color: 'bg-slate-600', emoji: '⬜' },
            ].map(s => (
              <div key={s.key} className="flex items-center gap-3">
                <span>{s.emoji}</span>
                <span className="text-sm flex-1">{s.label}</span>
                <span className="text-sm font-medium">{byStatus[s.key as keyof typeof byStatus]}</span>
                <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`}
                    style={{ width: `${(byStatus[s.key as keyof typeof byStatus] / problems.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weakest areas */}
        <div className="glass p-6">
          <h3 className="text-lg font-semibold mb-4">🎯 Weakest Areas</h3>
          {weakest.length === 0 ? (
            <p className="text-slate-500 text-sm">Start studying to see your weak areas!</p>
          ) : (
            <div className="space-y-2">
              {weakest.map(p => (
                <div key={p.id} className="glass-sm p-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm">{p.name}</span>
                    <span className={`ml-2 text-xs difficulty-${p.difficulty}`}>{p.difficulty}</span>
                  </div>
                  <span className="text-yellow-400 text-sm">
                    {'★'.repeat(p.confidence)}{'☆'.repeat(5 - p.confidence)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Heatmap */}
      <div className="glass p-6">
        <h3 className="text-lg font-semibold mb-4">📅 Study Activity (16 weeks)</h3>
        <div className="grid grid-cols-16 gap-1" style={{ gridTemplateColumns: 'repeat(16, 1fr)', gridTemplateRows: 'repeat(7, 1fr)' }}>
          {heatmap.map((day, i) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.minutes}m`}
              className={`aspect-square rounded-sm ${getHeatColor(day.minutes)} hover:ring-1 hover:ring-purple-400 transition-colors`}
              style={{ gridRow: (i % 7) + 1, gridColumn: Math.floor(i / 7) + 1 }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 justify-end">
          <span>Less</span>
          {['bg-white/5', 'bg-purple-900/50', 'bg-purple-700/50', 'bg-purple-500/60', 'bg-purple-400/70'].map(c => (
            <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
