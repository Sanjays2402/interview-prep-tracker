import { useMemo } from 'react';
import { useApp } from '@/lib/context';
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import Card from '@/components/Card';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Activity } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

export default function Stats() {
  const { state } = useApp();

  // Category mastery for radar
  const radarData = useMemo(() => {
    const cats = [...new Set(state.problems.map(p => p.category))];
    return cats.map(cat => {
      const ps = state.problems.filter(p => p.category === cat);
      const avg = ps.reduce((a, p) => a + p.confidence, 0) / ps.length;
      return { category: cat, mastery: Math.round(avg * 20), fullMark: 100 };
    });
  }, [state.problems]);

  // Status distribution
  const statusData = useMemo(() => [
    { name: 'Mastered', count: state.problems.filter(p => p.status === 'mastered').length, color: '#10b981' },
    { name: 'Reviewed', count: state.problems.filter(p => p.status === 'reviewed').length, color: '#0ea5e9' },
    { name: 'In Progress', count: state.problems.filter(p => p.status === 'in_progress').length, color: '#f59e0b' },
    { name: 'Not Started', count: state.problems.filter(p => p.status === 'not_started').length, color: '#52525b' },
  ], [state.problems]);

  // Difficulty breakdown
  const diffData = useMemo(() => [
    { name: 'Easy', count: state.problems.filter(p => p.difficulty === 'Easy').length, color: '#10b981' },
    { name: 'Medium', count: state.problems.filter(p => p.difficulty === 'Medium').length, color: '#f59e0b' },
    { name: 'Hard', count: state.problems.filter(p => p.difficulty === 'Hard').length, color: '#f43f5e' },
  ], [state.problems]);

  // Weakest areas
  const weakest = useMemo(() => {
    const cats = [...new Set(state.problems.map(p => p.category))];
    return cats.map(cat => {
      const ps = state.problems.filter(p => p.category === cat);
      const avg = ps.reduce((a, p) => a + p.confidence, 0) / ps.length;
      return { category: cat, avg: Math.round(avg * 20), count: ps.length };
    }).sort((a, b) => a.avg - b.avg).slice(0, 5);
  }, [state.problems]);

  // Heatmap (last 12 weeks)
  const heatmap = useMemo(() => {
    const weeks: { date: string; count: number }[][] = [];
    const today = new Date();
    for (let w = 11; w >= 0; w--) {
      const week: { date: string; count: number }[] = [];
      for (let d = 6; d >= 0; d--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (w * 7 + d));
        const ds = date.toISOString().split('T')[0];
        const count = state.sessions.filter(s => s.date.startsWith(ds)).length;
        week.push({ date: ds, count });
      }
      weeks.push(week);
    }
    return weeks;
  }, [state.sessions]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.[0]) {
      return (
        <div className="bg-[#13131a] border border-[#1a1a2e] rounded-lg px-3 py-2 text-xs">
          <span className="text-zinc-400">{payload[0].payload.name || payload[0].payload.category}: </span>
          <span className="text-white font-medium">{payload[0].value}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold tracking-tight">Statistics</h1>

          <StaggerContainer className="grid grid-cols-2 gap-6">
            {/* Radar */}
            <StaggerItem>
              <Card accentColor="#0ea5e9">
                <h2 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" /> Topic Coverage
                </h2>
                <div className="h-[280px]">
                  <ResponsiveContainer>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#1a1a2e" />
                      <PolarAngleAxis dataKey="category" tick={{ fill: '#71717a', fontSize: 11 }} />
                      <Radar dataKey="mastery" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.15} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </StaggerItem>

            {/* Status Bar */}
            <StaggerItem>
              <Card accentColor="#a855f7">
                <h2 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" /> Status Distribution
                </h2>
                <div className="h-[280px]">
                  <ResponsiveContainer>
                    <BarChart data={statusData} barSize={36}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={false} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {statusData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </StaggerItem>

            {/* Heatmap */}
            <StaggerItem>
              <Card accentColor="#10b981">
                <h2 className="text-sm font-semibold text-zinc-400 mb-4">Study Heatmap (12 weeks)</h2>
                <div className="flex gap-1">
                  {heatmap.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1">
                      {week.map((day, di) => (
                        <motion.div
                          key={di}
                          className="w-3.5 h-3.5 rounded-[3px] relative group cursor-default"
                          style={{
                            backgroundColor: day.count === 0 ? '#1a1a2e'
                              : day.count === 1 ? '#10b98140'
                              : day.count === 2 ? '#10b98180'
                              : '#10b981',
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: (wi * 7 + di) * 0.005 }}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                            <div className="bg-[#13131a] border border-[#1a1a2e] rounded px-2 py-1 text-[10px] text-zinc-400 whitespace-nowrap">
                              {day.date}: {day.count} sessions
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>
            </StaggerItem>

            {/* Weakest Areas */}
            <StaggerItem>
              <Card accentColor="#f59e0b">
                <h2 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-400" /> Weakest Areas
                </h2>
                <div className="space-y-4">
                  {weakest.map((w, i) => (
                    <div key={w.category}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-zinc-300">{w.category}</span>
                        <span className="text-zinc-500 tabular-nums text-xs">{w.avg}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#09090b] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: w.avg < 40 ? '#f43f5e' : w.avg < 60 ? '#f59e0b' : '#10b981' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${w.avg}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
