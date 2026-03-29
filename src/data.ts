import { Problem } from './types';

const problems: Omit<Problem, 'status' | 'confidence' | 'notes' | 'lastReviewed' | 'nextReview' | 'interval' | 'easeFactor' | 'reviewCount' | 'totalStudyTime'>[] = [
  { id: 'whatsapp', name: 'WhatsApp', difficulty: 'hard', category: 'problem', tags: ['Real-time Updates', 'Scaling Writes'] },
  { id: 'uber', name: 'Uber', difficulty: 'hard', category: 'problem', tags: ['Real-time Updates', 'Scaling Reads'] },
  { id: 'youtube', name: 'YouTube', difficulty: 'hard', category: 'problem', tags: ['Large Blobs', 'Scaling Reads'] },
  { id: 'instagram', name: 'Instagram', difficulty: 'medium', category: 'problem', tags: ['Large Blobs', 'Scaling Reads'] },
  { id: 'dropbox', name: 'Dropbox', difficulty: 'hard', category: 'problem', tags: ['Large Blobs', 'Long Running Tasks'] },
  { id: 'tinder', name: 'Tinder', difficulty: 'medium', category: 'problem', tags: ['Scaling Reads', 'Real-time Updates'] },
  { id: 'ticketmaster', name: 'Ticketmaster', difficulty: 'hard', category: 'problem', tags: ['Dealing with Contention', 'Scaling Writes'] },
  { id: 'google-docs', name: 'Google Docs', difficulty: 'hard', category: 'problem', tags: ['Real-time Updates', 'Multi-step Processes'] },
  { id: 'bitly', name: 'Bitly', difficulty: 'easy', category: 'problem', tags: ['Scaling Reads', 'Scaling Writes'] },
  { id: 'yelp', name: 'Yelp', difficulty: 'medium', category: 'problem', tags: ['Scaling Reads'] },
  { id: 'fb-news-feed', name: 'FB News Feed', difficulty: 'hard', category: 'problem', tags: ['Scaling Reads', 'Real-time Updates'] },
  { id: 'fb-live-comments', name: 'FB Live Comments', difficulty: 'medium', category: 'problem', tags: ['Real-time Updates', 'Scaling Writes'] },
  { id: 'fb-post-search', name: 'FB Post Search', difficulty: 'medium', category: 'problem', tags: ['Scaling Reads'] },
  { id: 'robinhood', name: 'Robinhood', difficulty: 'hard', category: 'problem', tags: ['Real-time Updates', 'Dealing with Contention'] },
  { id: 'gopuff', name: 'GoPuff', difficulty: 'medium', category: 'problem', tags: ['Scaling Reads', 'Long Running Tasks'] },
  { id: 'strava', name: 'Strava', difficulty: 'medium', category: 'problem', tags: ['Large Blobs', 'Scaling Writes'] },
  { id: 'top-k', name: 'Top-K', difficulty: 'medium', category: 'problem', tags: ['Scaling Reads', 'Scaling Writes'] },
  { id: 'ad-click', name: 'Ad Click Aggregator', difficulty: 'hard', category: 'problem', tags: ['Scaling Writes', 'Long Running Tasks'] },
  { id: 'camelcamelcamel', name: 'CamelCamelCamel', difficulty: 'medium', category: 'problem', tags: ['Long Running Tasks', 'Scaling Reads'] },
  { id: 'distributed-cache', name: 'Distributed Cache', difficulty: 'hard', category: 'problem', tags: ['Scaling Reads', 'Dealing with Contention'] },
  { id: 'distributed-rate-limiter', name: 'Distributed Rate Limiter', difficulty: 'hard', category: 'problem', tags: ['Dealing with Contention', 'Scaling Writes'] },
  { id: 'google-news', name: 'Google News', difficulty: 'medium', category: 'problem', tags: ['Scaling Reads'] },
  { id: 'job-scheduler', name: 'Job Scheduler', difficulty: 'hard', category: 'problem', tags: ['Long Running Tasks', 'Multi-step Processes'] },
  { id: 'leetcode', name: 'LeetCode', difficulty: 'medium', category: 'problem', tags: ['Multi-step Processes', 'Long Running Tasks'] },
  { id: 'metrics-monitoring', name: 'Metrics Monitoring', difficulty: 'hard', category: 'problem', tags: ['Scaling Writes', 'Scaling Reads'] },
  { id: 'online-auction', name: 'Online Auction', difficulty: 'hard', category: 'problem', tags: ['Dealing with Contention', 'Real-time Updates'] },
  { id: 'payment-system', name: 'Payment System', difficulty: 'hard', category: 'problem', tags: ['Multi-step Processes', 'Dealing with Contention'] },
  { id: 'web-crawler', name: 'Web Crawler', difficulty: 'medium', category: 'problem', tags: ['Long Running Tasks', 'Scaling Writes'] },
];

const concepts: Omit<Problem, 'status' | 'confidence' | 'notes' | 'lastReviewed' | 'nextReview' | 'interval' | 'easeFactor' | 'reviewCount' | 'totalStudyTime'>[] = [
  { id: 'caching', name: 'Caching', difficulty: 'medium', category: 'concept', tags: ['Scaling Reads'] },
  { id: 'sharding', name: 'Sharding', difficulty: 'hard', category: 'concept', tags: ['Scaling Writes'] },
  { id: 'cap-theorem', name: 'CAP Theorem', difficulty: 'medium', category: 'concept', tags: [] },
  { id: 'consistent-hashing', name: 'Consistent Hashing', difficulty: 'hard', category: 'concept', tags: ['Scaling Reads', 'Scaling Writes'] },
  { id: 'api-design', name: 'API Design', difficulty: 'easy', category: 'concept', tags: [] },
  { id: 'data-modeling', name: 'Data Modeling', difficulty: 'medium', category: 'concept', tags: [] },
  { id: 'db-indexing', name: 'DB Indexing', difficulty: 'medium', category: 'concept', tags: ['Scaling Reads'] },
  { id: 'networking', name: 'Networking', difficulty: 'medium', category: 'concept', tags: [] },
  { id: 'numbers-to-know', name: 'Numbers to Know', difficulty: 'easy', category: 'concept', tags: [] },
];

const patterns: Omit<Problem, 'status' | 'confidence' | 'notes' | 'lastReviewed' | 'nextReview' | 'interval' | 'easeFactor' | 'reviewCount' | 'totalStudyTime'>[] = [
  { id: 'pat-realtime', name: 'Real-time Updates', difficulty: 'hard', category: 'pattern', tags: ['Real-time Updates'] },
  { id: 'pat-scaling-reads', name: 'Scaling Reads', difficulty: 'medium', category: 'pattern', tags: ['Scaling Reads'] },
  { id: 'pat-scaling-writes', name: 'Scaling Writes', difficulty: 'hard', category: 'pattern', tags: ['Scaling Writes'] },
  { id: 'pat-contention', name: 'Dealing with Contention', difficulty: 'hard', category: 'pattern', tags: ['Dealing with Contention'] },
  { id: 'pat-large-blobs', name: 'Large Blobs', difficulty: 'medium', category: 'pattern', tags: ['Large Blobs'] },
  { id: 'pat-long-running', name: 'Long Running Tasks', difficulty: 'medium', category: 'pattern', tags: ['Long Running Tasks'] },
  { id: 'pat-multi-step', name: 'Multi-step Processes', difficulty: 'hard', category: 'pattern', tags: ['Multi-step Processes'] },
];

const defaults = {
  status: 'not-started' as const,
  confidence: 0,
  notes: '',
  lastReviewed: null,
  nextReview: null,
  interval: 0,
  easeFactor: 2.5,
  reviewCount: 0,
  totalStudyTime: 0,
};

export const defaultProblems: Problem[] = [
  ...problems.map(p => ({ ...p, ...defaults })),
  ...concepts.map(p => ({ ...p, ...defaults })),
  ...patterns.map(p => ({ ...p, ...defaults })),
];
