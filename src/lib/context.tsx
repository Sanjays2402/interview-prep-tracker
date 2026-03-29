import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { AppState, Problem, StudySession } from './types';
import { loadState, saveState, calculateNextReview } from './store';

interface AppContextType {
  state: AppState;
  updateProblem: (id: string, updates: Partial<Problem>) => void;
  addSession: (session: StudySession) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => { saveState(state); }, [state]);

  const updateProblem = useCallback((id: string, updates: Partial<Problem>) => {
    setState(prev => ({
      ...prev,
      problems: prev.problems.map(p => p.id === id ? { ...p, ...updates } : p),
    }));
  }, []);

  const addSession = useCallback((session: StudySession) => {
    setState(prev => {
      const problem = prev.problems.find(p => p.id === session.problemId);
      if (!problem) return prev;

      const newReview = { date: session.date.split('T')[0], confidence: session.confidenceAfter };
      const reviews = [...problem.reviews, newReview];
      const days = calculateNextReview(session.confidenceAfter, reviews.length);
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + days);

      let newStatus = problem.status;
      if (session.confidenceAfter >= 5) newStatus = 'mastered';
      else if (session.confidenceAfter >= 3) newStatus = 'reviewed';
      else newStatus = 'in_progress';

      const today = new Date().toISOString().split('T')[0];
      const isNewDay = prev.lastStudyDate !== today;

      return {
        ...prev,
        problems: prev.problems.map(p => p.id === session.problemId ? {
          ...p,
          confidence: session.confidenceAfter,
          status: newStatus,
          lastReviewed: today,
          nextReview: nextDate.toISOString().split('T')[0],
          reviews,
        } : p),
        sessions: [...prev.sessions, session],
        streak: isNewDay ? prev.streak + 1 : prev.streak,
        lastStudyDate: today,
      };
    });
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem('interview-prep-tracker-v2');
    setState(loadState());
  }, []);

  return (
    <AppContext.Provider value={{ state, updateProblem, addSession, resetData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
