export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Status = 'not_started' | 'in_progress' | 'reviewed' | 'mastered';
export type Category = 
  | 'Array' | 'String' | 'Tree' | 'Graph' | 'DP' | 'LinkedList' | 'Stack' | 'Hash' | 'Binary Search' | 'Heap' | 'Backtracking' | 'Greedy' | 'Sliding Window' | 'Two Pointers'
  | 'URL Shortener' | 'Search' | 'Social' | 'Real-time' | 'Finance' | 'Delivery' | 'Fitness' | 'Infrastructure' | 'Analytics' | 'Monitoring' | 'Aggregation' | 'Platform' | 'Commerce' | 'Collaboration' | 'Messaging' | 'Streaming' | 'Booking' | 'Marketplace' | 'Storage' | 'Location' | 'Ride-sharing' | 'Video' | 'Matching';

export interface ReviewEntry {
  date: string;
  confidence: number;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: Category;
  pattern: string;
  status: Status;
  confidence: number; // 1-5
  notes: string;
  lastReviewed: string | null;
  nextReview: string | null;
  reviews: ReviewEntry[];
  tags: string[];
  url?: string;
}

export interface Concept {
  id: string;
  name: string;
  category: string;
  mastery: number; // 0-100
  notes: string;
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  problems: string[]; // problem ids
  color: string;
}

export interface StudySession {
  id: string;
  problemId: string;
  date: string;
  duration: number; // seconds
  confidenceBefore: number;
  confidenceAfter: number;
}

export interface AppState {
  problems: Problem[];
  concepts: Concept[];
  patterns: Pattern[];
  sessions: StudySession[];
  streak: number;
  lastStudyDate: string | null;
}
