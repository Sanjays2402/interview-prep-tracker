import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '@/lib/context';
import { isDueToday } from '@/lib/store';
import type { Problem } from '@/lib/types';
import ConfidenceStars from '@/components/ConfidenceStars';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, X, Timer, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Study() {
  const { state, addSession } = useApp();
  const navigate = useNavigate();

  const dueProblems = state.problems.filter(p => isDueToday(p.nextReview) || p.status === 'not_started' || p.status === 'in_progress');
  const [queue, setQueue] = useState<Problem[]>(dueProblems);
  const [current, setCurrent] = useState<Problem | null>(queue[0] ?? null);
  const [phase, setPhase] = useState<'idle' | 'studying' | 'rating'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rating, setRating] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === 'studying' && !paused) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, paused]);

  const startSession = useCallback(() => {
    if (!current) return;
    setSeconds(0);
    setPaused(false);
    setPhase('studying');
  }, [current]);

  const finishStudy = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('rating');
    setRating(current?.confidence ?? 3);
  }, [current]);

  const submitRating = useCallback(() => {
    if (!current) return;
    addSession({
      id: `s${Date.now()}`,
      problemId: current.id,
      date: new Date().toISOString(),
      duration: seconds,
      confidenceBefore: current.confidence,
      confidenceAfter: rating,
    });
    const remaining = queue.filter(p => p.id !== current.id);
    setQueue(remaining);
    setCurrent(remaining[0] ?? null);
    setPhase(remaining.length > 0 ? 'idle' : 'idle');
    setSeconds(0);
  }, [current, seconds, rating, queue, addSession]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const maxTime = 1800; // 30 min ring

  if (queue.length === 0 && phase === 'idle') {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CheckCircle className="w-16 h-16 text-emerald-500/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">All caught up!</h2>
          <p className="text-zinc-500 text-sm mb-6">No problems due for review right now.</p>
          <button
            onClick={() => navigate('/problems')}
            className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-colors"
          >
            Browse Problems
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center relative">
      <AnimatePresence mode="wait">
        {phase === 'idle' && current && (
          <motion.div
            key="idle"
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div>
              <p className="text-zinc-600 text-sm mb-2">{queue.length} problems in queue</p>
              <h1 className="text-3xl font-bold tracking-tight">{current.title}</h1>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  current.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                  current.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-rose-500/10 text-rose-400'
                }`}>{current.difficulty}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">{current.category}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-500/10 text-zinc-500">{current.pattern}</span>
              </div>
              {current.tags.length > 0 && (
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {current.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-[#1a1a2e] text-zinc-500">{t}</span>
                  ))}
                </div>
              )}
            </div>
            <motion.button
              onClick={startSession}
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-sm transition-colors"
              whileTap={{ scale: 0.97 }}
            >
              <Play className="w-4 h-4" /> Start Studying
            </motion.button>
          </motion.div>
        )}

        {phase === 'studying' && current && (
          <motion.div
            key="studying"
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="relative inline-flex items-center justify-center">
              <svg width="180" height="180" className="-rotate-90">
                <circle cx="90" cy="90" r={radius} fill="none" stroke="#1a1a2e" strokeWidth="6" />
                <motion.circle
                  cx="90" cy="90" r={radius}
                  fill="none" stroke="#a855f7" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  animate={{
                    strokeDashoffset: circumference * (1 - Math.min(seconds / maxTime, 1)),
                  }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tabular-nums tracking-tight">{formatTime(seconds)}</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold">{current.title}</h2>

            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => setPaused(!paused)}
                className="p-3 rounded-xl bg-[#1a1a2e] hover:bg-[#252538] transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {paused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              </motion.button>
              <motion.button
                onClick={finishStudy}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                Done
              </motion.button>
              <motion.button
                onClick={() => { if (timerRef.current) clearInterval(timerRef.current); const r = queue.filter(p => p.id !== current.id); setQueue(r); setCurrent(r[0] ?? null); setPhase('idle'); setSeconds(0); }}
                className="p-3 rounded-xl bg-[#1a1a2e] hover:bg-[#252538] transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <SkipForward className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 'rating' && current && (
          <motion.div
            key="rating"
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div>
              <Timer className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-500">Studied for {formatTime(seconds)}</p>
            </div>
            <h2 className="text-xl font-semibold">{current.title}</h2>
            <div>
              <p className="text-sm text-zinc-500 mb-3">How confident do you feel?</p>
              <div className="flex justify-center">
                <ConfidenceStars value={rating} onChange={setRating} size={32} />
              </div>
            </div>
            <motion.button
              onClick={submitRating}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold text-sm transition-colors"
              whileTap={{ scale: 0.97 }}
              disabled={rating === 0}
            >
              Submit & Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
