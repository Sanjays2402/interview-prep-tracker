import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { AppProvider } from '@/lib/context';
import Sidebar from '@/components/Sidebar';
import CommandPalette from '@/components/CommandPalette';
import GlowOrb from '@/components/GlowOrb';
import { useKonami, useKeyboardShortcut } from '@/hooks/useAnimations';
import Dashboard from '@/pages/Dashboard';
import Problems from '@/pages/Problems';
import Concepts from '@/pages/Concepts';
import Patterns from '@/pages/Patterns';
import Stats from '@/pages/Stats';
import Study from '@/pages/Study';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function CelebrationOverlay({ show, onDone }: { show: boolean; onDone: () => void }) {
  if (!show) return null;
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onDone}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-center"
      >
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold">You found the Easter egg!</h2>
        <p className="text-zinc-500 mt-2">↑↑↓↓←→←→BA</p>
      </motion.div>
    </motion.div>
  );
}

function AppInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [celebration, setCelebration] = useState(false);
  const isStudying = location.pathname === '/study';

  useKonami(useCallback(() => {
    setCelebration(true);
    toast('🥚 Konami code activated!');
    setTimeout(() => setCelebration(false), 3000);
  }, []));

  useKeyboardShortcut('n', false, useCallback(() => {
    if (location.pathname !== '/study') navigate('/study');
  }, [location, navigate]));

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b]">
      <GlowOrb />
      <CommandPalette />
      <CelebrationOverlay show={celebration} onDone={() => setCelebration(false)} />

      {!isStudying && <Sidebar />}

      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/patterns" element={<Patterns />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/study" element={<Study />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
