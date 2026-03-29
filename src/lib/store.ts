import type { Problem, Concept, Pattern, AppState } from './types';

const PROBLEMS: Problem[] = [
  { id: 'p1', title: 'WhatsApp', difficulty: 'Medium', category: 'Messaging', pattern: 'Real-time Updates', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['websocket', 'pub-sub', 'messaging', 'redis'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/whatsapp' },
  { id: 'p2', title: 'Uber', difficulty: 'Hard', category: 'Ride-sharing', pattern: 'Real-time Updates', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['geospatial', 'matching', 'real-time', 'redis'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/uber' },
  { id: 'p3', title: 'YouTube', difficulty: 'Hard', category: 'Video', pattern: 'Large Blobs', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['cdn', 'transcoding', 'blob-storage', 'streaming'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/youtube' },
  { id: 'p4', title: 'Instagram', difficulty: 'Medium', category: 'Social', pattern: 'Scaling Reads', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['feed', 'cdn', 'caching', 'fan-out'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/instagram' },
  { id: 'p5', title: 'Dropbox', difficulty: 'Hard', category: 'Storage', pattern: 'Large Blobs', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['file-sync', 'chunking', 'dedup', 'blob-storage'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/dropbox' },
  { id: 'p6', title: 'Tinder', difficulty: 'Medium', category: 'Matching', pattern: 'Real-time Updates', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['geospatial', 'matching', 'recommendation'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/tinder' },
  { id: 'p7', title: 'Ticketmaster', difficulty: 'Hard', category: 'Booking', pattern: 'Dealing with Contention', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['locking', 'queue', 'consistency', 'high-contention'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/ticketmaster' },
  { id: 'p8', title: 'Google Docs', difficulty: 'Hard', category: 'Collaboration', pattern: 'Real-time Updates', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['crdt', 'ot', 'websocket', 'collaboration'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/google-docs' },
  { id: 'p9', title: 'Bitly', difficulty: 'Easy', category: 'URL Shortener', pattern: 'Scaling Writes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['hashing', 'key-generation', 'redirect', 'analytics'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/bitly' },
  { id: 'p10', title: 'Yelp', difficulty: 'Medium', category: 'Search', pattern: 'Scaling Reads', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['geospatial', 'search', 'elasticsearch', 'caching'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/yelp' },
  { id: 'p11', title: 'Facebook News Feed', difficulty: 'Hard', category: 'Social', pattern: 'Scaling Reads', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['feed', 'fan-out', 'ranking', 'caching'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/fb-news-feed' },
  { id: 'p12', title: 'Facebook Live Comments', difficulty: 'Medium', category: 'Real-time', pattern: 'Real-time Updates', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['websocket', 'pub-sub', 'streaming'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/fb-live-comments' },
  { id: 'p13', title: 'Facebook Post Search', difficulty: 'Medium', category: 'Search', pattern: 'Scaling Reads', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['elasticsearch', 'indexing', 'search'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/fb-post-search' },
  { id: 'p14', title: 'Robinhood', difficulty: 'Hard', category: 'Finance', pattern: 'Scaling Writes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['trading', 'consistency', 'queue', 'real-time'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/robinhood' },
  { id: 'p15', title: 'GoPuff', difficulty: 'Medium', category: 'Delivery', pattern: 'Multi-step Processes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['delivery', 'geospatial', 'order-management'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/gopuff' },
  { id: 'p16', title: 'Strava', difficulty: 'Medium', category: 'Fitness', pattern: 'Scaling Writes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['geospatial', 'time-series', 'activity-tracking'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/strava' },
  { id: 'p17', title: 'Top-K', difficulty: 'Hard', category: 'Infrastructure', pattern: 'Scaling Writes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['counting', 'approximation', 'streaming', 'heavy-hitters'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/top-k' },
  { id: 'p18', title: 'Ad Click Aggregator', difficulty: 'Hard', category: 'Analytics', pattern: 'Scaling Writes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['stream-processing', 'flink', 'aggregation', 'kafka'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/ad-click-aggregator' },
  { id: 'p19', title: 'CamelCamelCamel', difficulty: 'Medium', category: 'Monitoring', pattern: 'Long Running Tasks', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['web-scraping', 'scheduling', 'price-tracking'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/camelcamelcamel' },
  { id: 'p20', title: 'Distributed Cache', difficulty: 'Hard', category: 'Infrastructure', pattern: 'Scaling Reads', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['caching', 'consistent-hashing', 'eviction', 'redis'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/distributed-cache' },
  { id: 'p21', title: 'Distributed Rate Limiter', difficulty: 'Medium', category: 'Infrastructure', pattern: 'Dealing with Contention', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['rate-limiting', 'token-bucket', 'sliding-window', 'redis'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/distributed-rate-limiter' },
  { id: 'p22', title: 'Google News', difficulty: 'Medium', category: 'Aggregation', pattern: 'Scaling Reads', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['aggregation', 'ranking', 'dedup', 'crawling'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/google-news' },
  { id: 'p23', title: 'Job Scheduler', difficulty: 'Hard', category: 'Infrastructure', pattern: 'Long Running Tasks', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['scheduling', 'queue', 'cron', 'distributed'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/job-scheduler' },
  { id: 'p24', title: 'LeetCode', difficulty: 'Hard', category: 'Platform', pattern: 'Multi-step Processes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['code-execution', 'sandboxing', 'queue', 'judge'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/leetcode' },
  { id: 'p25', title: 'Metrics Monitoring', difficulty: 'Hard', category: 'Infrastructure', pattern: 'Scaling Writes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['time-series', 'aggregation', 'alerting', 'dashboards'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/metrics-monitoring' },
  { id: 'p26', title: 'Online Auction', difficulty: 'Hard', category: 'Commerce', pattern: 'Dealing with Contention', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['bidding', 'consistency', 'real-time', 'locking'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/online-auction' },
  { id: 'p27', title: 'Payment System', difficulty: 'Hard', category: 'Finance', pattern: 'Multi-step Processes', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['idempotency', 'saga', 'consistency', 'ledger'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/payment-system' },
  { id: 'p28', title: 'Web Crawler', difficulty: 'Medium', category: 'Infrastructure', pattern: 'Long Running Tasks', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['crawling', 'dedup', 'politeness', 'distributed'], url: 'https://www.hellointerview.com/learn/system-design/problem-breakdowns/web-crawler' },
];

const CONCEPTS: Concept[] = [
  { id: 'c1', name: 'Caching', category: 'Core Concepts', mastery: 0, notes: 'Redis, Memcached, CDN, cache invalidation strategies' },
  { id: 'c2', name: 'Sharding', category: 'Core Concepts', mastery: 0, notes: 'Horizontal partitioning, shard key selection, rebalancing' },
  { id: 'c3', name: 'CAP Theorem', category: 'Core Concepts', mastery: 0, notes: 'Consistency, Availability, Partition tolerance tradeoffs' },
  { id: 'c4', name: 'Consistent Hashing', category: 'Core Concepts', mastery: 0, notes: 'Virtual nodes, ring-based distribution, minimal redistribution' },
  { id: 'c5', name: 'API Design', category: 'Core Concepts', mastery: 0, notes: 'REST, GraphQL, gRPC, versioning, rate limiting' },
  { id: 'c6', name: 'Data Modeling', category: 'Core Concepts', mastery: 0, notes: 'Normalization, denormalization, schema design, NoSQL patterns' },
  { id: 'c7', name: 'Database Indexing', category: 'Core Concepts', mastery: 0, notes: 'B-tree, LSM tree, composite indexes, covering indexes' },
  { id: 'c8', name: 'Networking Essentials', category: 'Core Concepts', mastery: 0, notes: 'DNS, TCP/UDP, HTTP/2, TLS, WebSocket, CDN' },
  { id: 'c9', name: 'Numbers to Know', category: 'Core Concepts', mastery: 0, notes: 'Latency numbers, throughput estimates, storage calculations' },
];

const PATTERNS: Pattern[] = [
  { id: 'pt1', name: 'Real-time Updates', description: 'WebSocket, SSE, long-polling for live data delivery', problems: ['p1', 'p2', 'p6', 'p8', 'p12'], color: '#a855f7' },
  { id: 'pt2', name: 'Scaling Reads', description: 'Caching, CDN, read replicas, fan-out on write', problems: ['p4', 'p10', 'p11', 'p13', 'p20', 'p22'], color: '#0ea5e9' },
  { id: 'pt3', name: 'Scaling Writes', description: 'Sharding, partitioning, write-ahead logs, batching', problems: ['p14', 'p16', 'p17', 'p18', 'p25'], color: '#10b981' },
  { id: 'pt4', name: 'Dealing with Contention', description: 'Distributed locks, optimistic concurrency, queuing', problems: ['p7', 'p21', 'p26'], color: '#f59e0b' },
  { id: 'pt5', name: 'Large Blobs', description: 'Chunking, CDN, pre-signed URLs, blob storage', problems: ['p3', 'p5'], color: '#f43f5e' },
  { id: 'pt6', name: 'Long Running Tasks', description: 'Job queues, schedulers, async processing', problems: ['p19', 'p23', 'p28'], color: '#8b5cf6' },
  { id: 'pt7', name: 'Multi-step Processes', description: 'Saga pattern, state machines, durable execution', problems: ['p15', 'p24', 'p27'], color: '#ec4899' },
];

const STORAGE_KEY = 'interview-prep-tracker-v2';

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return getDefaultState();
}

export function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDefaultState(): AppState {
  return {
    problems: PROBLEMS,
    concepts: CONCEPTS,
    patterns: PATTERNS,
    sessions: [],
    streak: 0,
    lastStudyDate: null,
  };
}

// SM-2 Algorithm
export function calculateNextReview(confidence: number, reviews: number): number {
  if (confidence < 3) return 1;
  if (reviews === 1) return 1;
  if (reviews === 2) return 6;
  const ef = Math.max(1.3, 2.5 - 0.8 * (5 - confidence));
  return Math.round(6 * Math.pow(ef, reviews - 2));
}

export function isDueToday(nextReview: string | null): boolean {
  if (!nextReview) return false;
  const today = new Date().toISOString().split('T')[0];
  return nextReview <= today;
}
