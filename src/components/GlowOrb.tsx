import { useMouseGlow } from '@/hooks/useAnimations';

export default function GlowOrb() {
  const { x, y } = useMouseGlow();
  return (
    <div
      className="fixed pointer-events-none z-0 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[120px] transition-all duration-[2000ms] ease-out"
      style={{
        background: 'radial-gradient(circle, #a855f7, #0ea5e9, transparent)',
        left: x - 300,
        top: y - 300,
      }}
    />
  );
}
