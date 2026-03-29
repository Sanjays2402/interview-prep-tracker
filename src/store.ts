import { Problem, AppState, StudySession } from './types';
import { defaultProblems } from './data';

const STORAGE_KEY = 'interview-prep-tracker';

export function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const state = JSON.parse(raw) as AppState;
      // Merge any new problems that might have been added
      const existingIds = new Set(state.problems.map(p => p.id));
      const newProblems = defaultProblems.filter(p => !existingIds.has(p.id));
      if (newProblems.length) state.problems = [...state.problems, ...newProblems];
      return state;
    } catch { /* fall through */ }
  }
  return {
    problems: defaultProblems,
    studySessions: [],
    streak: 0,
    lastStudyDate: null,
  };
}

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function updateProblem(state: AppState, id: string, updates: Partial<Problem>): AppState {
  return {
    ...state,
    problems: state.problems.map(p => p.id === id ? { ...p, ...updates } : p),
  };
}

export function applyReview(problem: Problem, rating: number): Partial<Problem> {
  const now = new Date().toISOString().split('T')[0];
  let { easeFactor, interval, reviewCount } = problem;

  // SM-2 algorithm
  if (rating <= 2) {
    interval = 1;
  } else if (rating === 3) {
    interval = 3;
  } else {
    if (reviewCount === 0) interval = 1;
    else if (reviewCount === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);

    if (rating === 4) interval = Math.max(7, interval);
    if (rating === 5) interval = Math.max(14, interval);
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)));

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  let status: Problem['status'] = 'reviewed';
  if (rating >= 4 && reviewCount >= 2) status = 'mastered';
  else if (rating <= 2) status = 'in-progress';

  return {
    lastReviewed: now,
    nextReview: nextDate.toISOString().split('T')[0],
    interval,
    easeFactor,
    reviewCount: reviewCount + 1,
    confidence: rating,
    status,
  };
}

export function getStreak(sessions: StudySession[], lastStudyDate: string | null): number {
  if (!lastStudyDate) return 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (lastStudyDate !== today && lastStudyDate !== yesterday) return 0;

  let streak = 0;
  const sessionDates = new Set(sessions.map(s => s.date));
  const d = new Date(lastStudyDate);
  while (sessionDates.has(d.toISOString().split('T')[0])) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function getDueProblems(problems: Problem[]): Problem[] {
  const today = new Date().toISOString().split('T')[0];
  return problems.filter(p =>
    p.nextReview && p.nextReview <= today && p.status !== 'not-started'
  ).sort((a, b) => (a.nextReview || '').localeCompare(b.nextReview || ''));
}

export function recordStudySession(state: AppState, problemId: string, minutes: number): AppState {
  const today = new Date().toISOString().split('T')[0];
  const existing = state.studySessions.find(s => s.date === today);
  let sessions: StudySession[];
  if (existing) {
    sessions = state.studySessions.map(s =>
      s.date === today
        ? { ...s, minutesStudied: s.minutesStudied + minutes, problemsReviewed: [...new Set([...s.problemsReviewed, problemId])] }
        : s
    );
  } else {
    sessions = [...state.studySessions, { date: today, minutesStudied: minutes, problemsReviewed: [problemId] }];
  }
  return {
    ...state,
    studySessions: sessions,
    lastStudyDate: today,
    streak: getStreak(sessions, today),
  };
}
