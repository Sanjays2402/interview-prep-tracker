import { useApp } from '@/lib/context';
import { isDueToday } from '@/lib/store';
import { useAnimatedNumber } from '@/hooks/useAnimations';
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import { StatCard } from '@/components/Card';
import CircularProgress from '@/components/CircularProgress';
import Card from '@/components/Card';
import ConfidenceStars from '@/components/ConfidenceStars';
import { motion } from 'framer-motion';
import { Target, Clock, Flame, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { state } = useApp();
  const { problems, sessions, streak } = state;

  const mastered = problems.filter(p => p.status === 'mastered').length;
  const dueToday = problems.filter(p => isDueToday(p.nextReview));
  const inProgress = problems.filter(p => p.status === 'in_progress').length;
  const totalStudyTime = sessions.reduce((a, s) => a + s.duration, 0);

  const animMastered = useAnimatedNumber(mastered);
  const animDue = useAnimatedNumber(dueToday.length);
  const animStreak = useAnimatedNumber(streak);
  const animHours = useAnimatedNumber(Math.round(totalStudyTime / 3600));

  const recentSessions = [...sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const statusColor = (s: string) => {
    switch(s) {
      case 'mastered': return 'bg-emerald-500/10 text-emerald-400';
      case 'reviewed': return 'bg-sky-500/10 text-sky-400';
      case 'in_progress': return 'bg-amber-500/10 text-amber-400';
      default: return 'bg-zinc-500/10 text-zinc-500';
    }
  };

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto p-8">
        <StaggerContainer className="max-w-6xl mx-auto space-y-8">
          {/* Hero */}
          <StaggerItem>
            <div className="flex items-center gap-8">
              <CircularProgress value={mastered} max={problems.length} color="#a855f7" label={`of ${problems.length}`} />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Problems Mastered</h1>
                <p className="text-zinc-500 mt-1">Keep going — you're {Math.round((mastered / problems.length) * 100)}% there</p>
              </div>
            </div>
          </StaggerItem>

          {/* Stat Cards */}
          <StaggerItem>
            <div className="grid grid-cols-4 gap-4">
              <StatCard label="Mastered" value={animMastered} icon={<Target className="w-5 h-5" />} color="#a855f7" borderColor="#a855f7" />
              <StatCard label="Due Today" value={animDue} icon={<AlertCircle className="w-5 h-5" />} color="#f59e0b" borderColor="#f59e0b" />
              <StatCard label="Study Streak" value={`${animStreak} days`} icon={<Flame className="w-5 h-5" />} color="#f43f5e" borderColor="#f43f5e" />
              <StatCard label="Total Hours" value={animHours} icon={<Clock className="w-5 h-5" />} color="#0ea5e9" borderColor="#0ea5e9" />
            </div>
          </StaggerItem>

          <div className="grid grid-cols-5 gap-6">
            {/* Due Today */}
            <StaggerItem className="col-span-3">
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Due Today
                </h2>
                {dueToday.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500/30 mx-auto mb-2" />
                    <p className="text-zinc-600 text-sm">All caught up! Nothing due today.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dueToday.map((p, i) => (
                      <motion.div
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#09090b] border border-[#1a1a2e]/50"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-glow" />
                          <span className="text-sm font-medium">{p.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                            p.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-rose-500/10 text-rose-400'
                          }`}>{p.difficulty}</span>
                        </div>
                        <ConfidenceStars value={p.confidence} readonly size={14} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </StaggerItem>

            {/* Recent Activity + Streak */}
            <StaggerItem className="col-span-2 space-y-6">
              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-400" />
                  <span>Study Streak</span>
                </h2>
                <div className="flex items-center gap-4">
                  <motion.span
                    className="text-5xl"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  >🔥</motion.span>
                  <div>
                    <div className="text-3xl font-bold tabular-nums">{streak} days</div>
                    <div className="text-sm text-zinc-500">Don't break it!</div>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sky-400" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentSessions.map((s, i) => {
                    const problem = problems.find(p => p.id === s.problemId);
                    return (
                      <motion.div
                        key={s.id}
                        className="flex items-center gap-3 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="text-zinc-400 flex-1 truncate">{problem?.title ?? 'Unknown'}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${statusColor(problem?.status ?? '')}`}>
                          {s.confidenceBefore}→{s.confidenceAfter}
                        </span>
                        <span className="text-zinc-600 text-xs tabular-nums">{Math.round(s.duration / 60)}m</span>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
