import { useApp } from '@/lib/context';
import PageTransition, { StaggerContainer, StaggerItem } from '@/components/PageTransition';
import Card from '@/components/Card';
import { motion } from 'framer-motion';
import { Shapes } from 'lucide-react';

export default function Patterns() {
  const { state } = useApp();

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-2xl font-bold tracking-tight">Patterns</h1>

          <StaggerContainer className="grid grid-cols-2 gap-6">
            {state.patterns.map(pt => {
              const ptProblems = state.problems.filter(p => pt.problems.includes(p.id));
              const mastered = ptProblems.filter(p => p.status === 'mastered').length;
              return (
                <StaggerItem key={pt.id}>
                  <Card accentColor={pt.color}>
                    <div className="h-0.5 absolute top-0 left-4 right-4 rounded-b-full" style={{ backgroundColor: pt.color }} />
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${pt.color}15` }}>
                        <Shapes className="w-4 h-4" style={{ color: pt.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{pt.name}</h3>
                        <p className="text-xs text-zinc-600">{pt.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs tabular-nums font-medium" style={{ color: pt.color }}>{mastered}/{ptProblems.length}</span>
                      <div className="flex-1 h-1 bg-[#09090b] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: pt.color }}
                          initial={{ width: 0 }}
                          animate={{ width: ptProblems.length > 0 ? `${(mastered / ptProblems.length) * 100}%` : '0%' }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {ptProblems.map(p => (
                        <div key={p.id} className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">{p.title}</span>
                          <span className={`px-1.5 py-0.5 rounded ${
                            p.status === 'mastered' ? 'bg-emerald-500/10 text-emerald-400' :
                            p.status === 'reviewed' ? 'bg-sky-500/10 text-sky-400' :
                            p.status === 'in_progress' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-zinc-500/10 text-zinc-600'
                          }`}>{p.status.replace('_', ' ')}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
