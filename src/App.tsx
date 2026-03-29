import { useState, useEffect, useCallback } from 'react';
import { Page, Problem, AppState } from './types';
import { loadState, saveState, updateProblem, applyReview, getDueProblems, recordStudySession } from './store';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProblemList from './components/ProblemList';
import Stats from './components/Stats';
import StudySession from './components/StudySession';

export default function App() {
  const [state, setState] = useState<AppState>(loadState);
  const [page, setPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { saveState(state); }, [state]);

  const handleReview = useCallback((id: string, rating: number, studyMinutes: number) => {
    setState(prev => {
      const problem = prev.problems.find(p => p.id === id)!;
      const updates = applyReview(problem, rating);
      let next = updateProblem(prev, id, updates);
      next = recordStudySession(next, id, studyMinutes);
      return next;
    });
  }, []);

  const handleUpdateProblem = useCallback((id: string, updates: Partial<Problem>) => {
    setState(prev => updateProblem(prev, id, updates));
  }, []);

  const problems = state.problems.filter(p => p.category === 'problem');
  const concepts = state.problems.filter(p => p.category === 'concept');
  const patterns = state.problems.filter(p => p.category === 'pattern');
  const dueProblems = getDueProblems(state.problems);

  return (
    <div className="flex min-h-screen w-full">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 glass rounded-lg lg:hidden"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <Sidebar page={page} setPage={(p) => { setPage(p); setSidebarOpen(false); }} dueCount={dueProblems.length} open={sidebarOpen} />

      <main className="flex-1 lg:ml-64 p-4 lg:p-8 min-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {page === 'dashboard' && (
            <Dashboard
              state={state}
              dueProblems={dueProblems}
              onStartSession={() => setPage('session')}
              onNavigate={setPage}
            />
          )}
          {page === 'problems' && (
            <ProblemList
              title="System Design Problems"
              subtitle="28 hellointerview problems"
              problems={problems}
              onReview={handleReview}
              onUpdate={handleUpdateProblem}
            />
          )}
          {page === 'concepts' && (
            <ProblemList
              title="Core Concepts"
              subtitle="9 fundamental concepts"
              problems={concepts}
              onReview={handleReview}
              onUpdate={handleUpdateProblem}
            />
          )}
          {page === 'patterns' && (
            <ProblemList
              title="Design Patterns"
              subtitle="7 key patterns"
              problems={patterns}
              onReview={handleReview}
              onUpdate={handleUpdateProblem}
            />
          )}
          {page === 'stats' && <Stats state={state} />}
          {page === 'session' && (
            <StudySession
              problems={state.problems}
              dueProblems={dueProblems}
              onReview={handleReview}
              onEnd={() => setPage('dashboard')}
            />
          )}
        </div>
      </main>
    </div>
  );
}
