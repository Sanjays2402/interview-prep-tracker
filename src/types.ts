export interface Problem {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'problem' | 'concept' | 'pattern';
  tags: string[];
  status: 'not-started' | 'in-progress' | 'reviewed' | 'mastered';
  confidence: number;
  notes: string;
  lastReviewed: string | null;
  nextReview: string | null;
  interval: number;
  easeFactor: number;
  reviewCount: number;
  totalStudyTime: number;
}

export interface StudySession {
  date: string;
  minutesStudied: number;
  problemsReviewed: string[];
}

export interface AppState {
  problems: Problem[];
  studySessions: StudySession[];
  streak: number;
  lastStudyDate: string | null;
}

export type Page = 'dashboard' | 'problems' | 'concepts' | 'patterns' | 'stats' | 'session';
