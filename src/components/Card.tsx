import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  accentColor?: string;
}

export default function Card({ children, className = '', accentColor }: Props) {
  return (
    <motion.div
      className={`relative bg-[#0f0f13] border border-[#1a1a2e] rounded-xl p-6 ${className}`}
      whileHover={{
        rotateX: -1.5,
        rotateY: 1.5,
        y: -2,
        boxShadow: accentColor
          ? `0 8px 30px ${accentColor}15`
          : '0 8px 30px rgba(0,0,0,0.3)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ label, value, icon, color, borderColor }: {
  label: string; value: string | number; icon: ReactNode; color: string; borderColor: string;
}) {
  return (
    <Card accentColor={borderColor}>
      <div className="h-0.5 absolute top-0 left-4 right-4 rounded-b-full" style={{ backgroundColor: borderColor }} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-500 text-sm font-medium">{label}</span>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="text-2xl font-bold tabular-nums tracking-tight" style={{ color }}>
        {value}
      </div>
    </Card>
  );
}
