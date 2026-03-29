import { useState, useEffect, useRef } from 'react';
import { Problem } from '../types';

interface Props {
  problems: Problem[];
  dueProblems: Problem[];
  onReview: (id: string, rating: number, minutes: number) => void;
  onEnd: () => void;
}

export default function StudySession({ problems, dueProblems, onReview, onEnd }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, totalTime: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  // Pick problems: due first, then not-started, then lowest confidence
  const queue = dueProblems.length > 0
    ? dueProblems
    : [...problems].filter(p => p.status === 'not-started' || p.confidence < 3)
        .sort((a, b) => a.confidence - b.confidence);

  const current = queue[currentIdx];

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleRate = (rating: number) => {
    const minutes = Math.round(seconds / 60) || 1;
    onReview(current.id, rating, minutes);
    setSessionStats(prev => ({ reviewed: prev.reviewed + 1, totalTime: prev.totalTime + minutes }));
    setShowRating(false);
    setSeconds(0);
    if (currentIdx + 1 < queue.length) {
      setCurrentIdx(i => i + 1);
    } else {
      onEnd();
    }
  };

  if (!current) {
    return (
      <div className="animate-in flex flex-col items-center justify-center min-h-[60vh]">
        <div className="glass p-12 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
          <p className="text-slate-400 mb-6">No problems need review right now.</p>
          <button onClick={onEnd} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 font-semibold">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🎯 Study Session</h2>
        <button onClick={onEnd} className="text-sm text-slate-400 hover:text-white transition">
          End Session →
        </button>
      </div>

      {/* Progress */}
      <div className="glass p-4 flex items-center justify-between text-sm">
        <span>Problem {currentIdx + 1} of {queue.length}</span>
        <span>Reviewed: {sessionStats.reviewed}</span>
        <span>Session: {sessionStats.totalTime}m</span>
      </div>

      {/* Timer */}
      <div className="glass p-8 text-center">
        <div className="text-6xl font-mono font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          {formatTime(seconds)}
        </div>
        <button onClick={() => setPaused(!paused)}
          className="text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
          {paused ? '▶ Resume' : '⏸ Pause'}
        </button>
      </div>

      {/* Current problem */}
      <div className="glass p-6 space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold">{current.name}</h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full difficulty-${current.difficulty} bg-white/5`}>
            {current.difficulty}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {current.tags.map(t => (
            <span key={t} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {t}
            </span>
          ))}
        </div>
        {current.notes && (
          <div className="glass-sm p-3 text-sm text-slate-300">
            <p className="text-xs text-slate-500 mb-1">Your notes:</p>
            {current.notes}
          </div>
        )}
        <div className="text-xs text-slate-500 flex gap-4">
          <span>Reviews: {current.reviewCount}</span>
          <span>Confidence: {'★'.repeat(current.confidence)}{'☆'.repeat(5 - current.confidence)}</span>
          {current.lastReviewed && <span>Last: {current.lastReviewed}</span>}
        </div>
      </div>

      {/* Rate */}
      {showRating ? (
        <div className="glass p-6 space-y-4 animate-in">
          <p className="text-center font-semibold">How well do you know this?</p>
          <div className="grid grid-cols-5 gap-2">
            {[
              { r: 1, label: 'Blank', color: 'bg-red-500/20 hover:bg-red-500/40 text-red-300' },
              { r: 2, label: 'Fuzzy', color: 'bg-orange-500/20 hover:bg-orange-500/40 text-orange-300' },
              { r: 3, label: 'Hard', color: 'bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300' },
              { r: 4, label: 'Good', color: 'bg-blue-500/20 hover:bg-blue-500/40 text-blue-300' },
              { r: 5, label: 'Easy', color: 'bg-green-500/20 hover:bg-green-500/40 text-green-300' },
            ].map(({ r, label, color }) => (
              <button key={r} onClick={() => handleRate(r)}
                className={`py-4 rounded-xl text-center transition-all ${color}`}>
                <div className="text-lg font-bold">{r}</div>
                <div className="text-xs">{label}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={() => setShowRating(true)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 font-semibold text-lg hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/20">
          Done Studying — Rate It
        </button>
      )}
    </div>
  );
}
