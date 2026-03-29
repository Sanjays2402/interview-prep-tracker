import { useApp } from '@/lib/context';
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import Card from '@/components/Card';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function Concepts() {
  const { state } = useApp();
  const categories = [...new Set(state.concepts.map(c => c.category))];

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Concepts</h1>
            <span className="text-sm text-zinc-500">{state.concepts.length} concepts tracked</span>
          </div>

          {categories.map(cat => (
            <StaggerContainer key={cat} className="space-y-4">
              <StaggerItem>
                <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">{cat}</h2>
              </StaggerItem>
              <div className="grid grid-cols-3 gap-4">
                {state.concepts.filter(c => c.category === cat).map(c => (
                  <StaggerItem key={c.id}>
                    <Card accentColor="#10b981">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-emerald-400" />
                          <span className="font-semibold text-sm">{c.name}</span>
                        </div>
                        <span className="text-sm font-bold tabular-nums text-emerald-400">{c.mastery}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#09090b] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-emerald-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${c.mastery}%` }}
                          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                        />
                      </div>
                      <p className="text-xs text-zinc-600 mt-3">{c.notes}</p>
                    </Card>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
