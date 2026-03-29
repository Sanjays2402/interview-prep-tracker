import type { Problem, Concept, Pattern, AppState } from './types';

const PROBLEMS: Problem[] = [
  { id: 'p1', title: 'Two Sum', difficulty: 'Easy', category: 'Array', pattern: 'Hash Map', status: 'mastered', confidence: 5, notes: '', lastReviewed: '2026-03-27', nextReview: '2026-04-10', reviews: [{ date: '2026-03-27', confidence: 5 }], tags: ['hash', 'array'], url: 'https://leetcode.com/problems/two-sum' },
  { id: 'p2', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Array', pattern: 'Sliding Window', status: 'mastered', confidence: 5, notes: '', lastReviewed: '2026-03-26', nextReview: '2026-04-09', reviews: [{ date: '2026-03-26', confidence: 5 }], tags: ['greedy', 'array'], url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock' },
  { id: 'p3', title: 'Contains Duplicate', difficulty: 'Easy', category: 'Array', pattern: 'Hash Map', status: 'mastered', confidence: 4, notes: '', lastReviewed: '2026-03-25', nextReview: '2026-04-01', reviews: [{ date: '2026-03-25', confidence: 4 }], tags: ['hash', 'set'], url: 'https://leetcode.com/problems/contains-duplicate' },
  { id: 'p4', title: 'Valid Anagram', difficulty: 'Easy', category: 'String', pattern: 'Hash Map', status: 'mastered', confidence: 5, notes: '', lastReviewed: '2026-03-28', nextReview: '2026-04-15', reviews: [{ date: '2026-03-28', confidence: 5 }], tags: ['hash', 'string'], url: 'https://leetcode.com/problems/valid-anagram' },
  { id: 'p5', title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack', pattern: 'Stack', status: 'reviewed', confidence: 4, notes: '', lastReviewed: '2026-03-28', nextReview: '2026-03-31', reviews: [{ date: '2026-03-28', confidence: 4 }], tags: ['stack'], url: 'https://leetcode.com/problems/valid-parentheses' },
  { id: 'p6', title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'LinkedList', pattern: 'Two Pointers', status: 'reviewed', confidence: 3, notes: '', lastReviewed: '2026-03-27', nextReview: '2026-03-29', reviews: [{ date: '2026-03-27', confidence: 3 }], tags: ['linked-list', 'recursion'], url: 'https://leetcode.com/problems/merge-two-sorted-lists' },
  { id: 'p7', title: 'Maximum Subarray', difficulty: 'Medium', category: 'Array', pattern: 'Greedy', status: 'reviewed', confidence: 3, notes: "Kadane's algorithm", lastReviewed: '2026-03-26', nextReview: '2026-03-29', reviews: [{ date: '2026-03-26', confidence: 3 }], tags: ['dp', 'greedy'], url: 'https://leetcode.com/problems/maximum-subarray' },
  { id: 'p8', title: '3Sum', difficulty: 'Medium', category: 'Array', pattern: 'Two Pointers', status: 'in_progress', confidence: 2, notes: 'Sort first, then two pointers', lastReviewed: '2026-03-28', nextReview: '2026-03-29', reviews: [{ date: '2026-03-28', confidence: 2 }], tags: ['two-pointers', 'sort'], url: 'https://leetcode.com/problems/3sum' },
  { id: 'p9', title: 'Group Anagrams', difficulty: 'Medium', category: 'String', pattern: 'Hash Map', status: 'in_progress', confidence: 2, notes: '', lastReviewed: '2026-03-27', nextReview: '2026-03-29', reviews: [{ date: '2026-03-27', confidence: 2 }], tags: ['hash', 'string', 'sort'], url: 'https://leetcode.com/problems/group-anagrams' },
  { id: 'p10', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'String', pattern: 'Sliding Window', status: 'in_progress', confidence: 2, notes: '', lastReviewed: '2026-03-25', nextReview: '2026-03-28', reviews: [{ date: '2026-03-25', confidence: 2 }], tags: ['sliding-window', 'hash'], url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters' },
  { id: 'p11', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Tree', pattern: 'BFS', status: 'reviewed', confidence: 4, notes: '', lastReviewed: '2026-03-28', nextReview: '2026-04-04', reviews: [{ date: '2026-03-28', confidence: 4 }], tags: ['tree', 'bfs'], url: 'https://leetcode.com/problems/binary-tree-level-order-traversal' },
  { id: 'p12', title: 'Validate Binary Search Tree', difficulty: 'Medium', category: 'Tree', pattern: 'DFS', status: 'in_progress', confidence: 2, notes: 'Use min/max bounds', lastReviewed: '2026-03-26', nextReview: '2026-03-29', reviews: [{ date: '2026-03-26', confidence: 2 }], tags: ['tree', 'dfs', 'bst'], url: 'https://leetcode.com/problems/validate-binary-search-tree' },
  { id: 'p13', title: 'Invert Binary Tree', difficulty: 'Easy', category: 'Tree', pattern: 'DFS', status: 'mastered', confidence: 5, notes: '', lastReviewed: '2026-03-24', nextReview: '2026-04-07', reviews: [{ date: '2026-03-24', confidence: 5 }], tags: ['tree', 'recursion'], url: 'https://leetcode.com/problems/invert-binary-tree' },
  { id: 'p14', title: 'Climbing Stairs', difficulty: 'Easy', category: 'DP', pattern: 'Dynamic Programming', status: 'mastered', confidence: 5, notes: 'Fibonacci pattern', lastReviewed: '2026-03-27', nextReview: '2026-04-10', reviews: [{ date: '2026-03-27', confidence: 5 }], tags: ['dp'], url: 'https://leetcode.com/problems/climbing-stairs' },
  { id: 'p15', title: 'Coin Change', difficulty: 'Medium', category: 'DP', pattern: 'Dynamic Programming', status: 'in_progress', confidence: 2, notes: 'Bottom-up DP with dp[amount+1]', lastReviewed: '2026-03-28', nextReview: '2026-03-30', reviews: [{ date: '2026-03-28', confidence: 2 }], tags: ['dp', 'bfs'], url: 'https://leetcode.com/problems/coin-change' },
  { id: 'p16', title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'DP', pattern: 'Dynamic Programming', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['dp', 'binary-search'], url: 'https://leetcode.com/problems/longest-increasing-subsequence' },
  { id: 'p17', title: 'Word Break', difficulty: 'Medium', category: 'DP', pattern: 'Dynamic Programming', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['dp', 'string'], url: 'https://leetcode.com/problems/word-break' },
  { id: 'p18', title: 'Number of Islands', difficulty: 'Medium', category: 'Graph', pattern: 'DFS', status: 'reviewed', confidence: 4, notes: '', lastReviewed: '2026-03-28', nextReview: '2026-04-04', reviews: [{ date: '2026-03-28', confidence: 4 }], tags: ['graph', 'dfs', 'matrix'], url: 'https://leetcode.com/problems/number-of-islands' },
  { id: 'p19', title: 'Clone Graph', difficulty: 'Medium', category: 'Graph', pattern: 'BFS', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['graph', 'hash', 'bfs'], url: 'https://leetcode.com/problems/clone-graph' },
  { id: 'p20', title: 'Course Schedule', difficulty: 'Medium', category: 'Graph', pattern: 'Topological Sort', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['graph', 'topological-sort'], url: 'https://leetcode.com/problems/course-schedule' },
  { id: 'p21', title: 'Merge Intervals', difficulty: 'Medium', category: 'Array', pattern: 'Greedy', status: 'reviewed', confidence: 3, notes: 'Sort by start, merge overlapping', lastReviewed: '2026-03-27', nextReview: '2026-03-30', reviews: [{ date: '2026-03-27', confidence: 3 }], tags: ['sort', 'greedy'], url: 'https://leetcode.com/problems/merge-intervals' },
  { id: 'p22', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', category: 'Binary Search', pattern: 'Binary Search', status: 'in_progress', confidence: 1, notes: 'Tricky edge cases', lastReviewed: '2026-03-25', nextReview: '2026-03-29', reviews: [{ date: '2026-03-25', confidence: 1 }], tags: ['binary-search'], url: 'https://leetcode.com/problems/search-in-rotated-sorted-array' },
  { id: 'p23', title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', category: 'Binary Search', pattern: 'Binary Search', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['binary-search'], url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array' },
  { id: 'p24', title: 'Top K Frequent Elements', difficulty: 'Medium', category: 'Heap', pattern: 'Heap', status: 'in_progress', confidence: 2, notes: 'Bucket sort approach is O(n)', lastReviewed: '2026-03-28', nextReview: '2026-03-30', reviews: [{ date: '2026-03-28', confidence: 2 }], tags: ['heap', 'hash', 'bucket-sort'], url: 'https://leetcode.com/problems/top-k-frequent-elements' },
  { id: 'p25', title: 'Implement Trie', difficulty: 'Medium', category: 'Tree', pattern: 'Trie', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['trie', 'design'], url: 'https://leetcode.com/problems/implement-trie-prefix-tree' },
  { id: 'p26', title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', category: 'Backtracking', pattern: 'Backtracking', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['backtracking', 'string'], url: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number' },
  { id: 'p27', title: 'Combination Sum', difficulty: 'Medium', category: 'Backtracking', pattern: 'Backtracking', status: 'not_started', confidence: 0, notes: '', lastReviewed: null, nextReview: null, reviews: [], tags: ['backtracking', 'recursion'], url: 'https://leetcode.com/problems/combination-sum' },
  { id: 'p28', title: 'Product of Array Except Self', difficulty: 'Medium', category: 'Array', pattern: 'Prefix Sum', status: 'in_progress', confidence: 2, notes: 'Left and right pass', lastReviewed: '2026-03-26', nextReview: '2026-03-29', reviews: [{ date: '2026-03-26', confidence: 2 }], tags: ['array', 'prefix'], url: 'https://leetcode.com/problems/product-of-array-except-self' },
];

const CONCEPTS: Concept[] = [
  { id: 'c1', name: 'Big-O Notation', category: 'Fundamentals', mastery: 90, notes: 'Time and space complexity analysis' },
  { id: 'c2', name: 'Hash Tables', category: 'Data Structures', mastery: 85, notes: 'Collision resolution, load factor' },
  { id: 'c3', name: 'Binary Trees', category: 'Data Structures', mastery: 75, notes: 'Traversals, balanced vs unbalanced' },
  { id: 'c4', name: 'Graph Representations', category: 'Data Structures', mastery: 60, notes: 'Adjacency list vs matrix' },
  { id: 'c5', name: 'Dynamic Programming', category: 'Algorithms', mastery: 40, notes: 'Top-down vs bottom-up' },
  { id: 'c6', name: 'Recursion & Backtracking', category: 'Algorithms', mastery: 55, notes: 'Base cases, pruning' },
  { id: 'c7', name: 'Sorting Algorithms', category: 'Algorithms', mastery: 80, notes: 'Quick, merge, heap sort' },
  { id: 'c8', name: 'Heap / Priority Queue', category: 'Data Structures', mastery: 50, notes: 'Min/max heap operations' },
  { id: 'c9', name: 'Bit Manipulation', category: 'Fundamentals', mastery: 30, notes: 'XOR tricks, bit masks' },
];

const PATTERNS: Pattern[] = [
  { id: 'pt1', name: 'Two Pointers', description: 'Use two pointers to traverse from different positions', problems: ['p6', 'p8'], color: '#a855f7' },
  { id: 'pt2', name: 'Sliding Window', description: 'Maintain a window that slides across the array', problems: ['p2', 'p10'], color: '#0ea5e9' },
  { id: 'pt3', name: 'Hash Map', description: 'Use hash maps for O(1) lookups', problems: ['p1', 'p3', 'p4', 'p9'], color: '#10b981' },
  { id: 'pt4', name: 'DFS/BFS', description: 'Depth-first or breadth-first search', problems: ['p11', 'p12', 'p13', 'p18', 'p19'], color: '#f59e0b' },
  { id: 'pt5', name: 'Dynamic Programming', description: 'Break problems into overlapping subproblems', problems: ['p14', 'p15', 'p16', 'p17'], color: '#f43f5e' },
  { id: 'pt6', name: 'Binary Search', description: 'Divide and conquer on sorted data', problems: ['p22', 'p23'], color: '#8b5cf6' },
  { id: 'pt7', name: 'Backtracking', description: 'Explore all possibilities with pruning', problems: ['p26', 'p27'], color: '#ec4899' },
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
    sessions: [
      { id: 's1', problemId: 'p1', date: '2026-03-27T10:00:00', duration: 900, confidenceBefore: 3, confidenceAfter: 5 },
      { id: 's2', problemId: 'p8', date: '2026-03-28T14:00:00', duration: 1800, confidenceBefore: 1, confidenceAfter: 2 },
      { id: 's3', problemId: 'p15', date: '2026-03-28T15:30:00', duration: 2400, confidenceBefore: 1, confidenceAfter: 2 },
      { id: 's4', problemId: 'p11', date: '2026-03-28T17:00:00', duration: 1200, confidenceBefore: 3, confidenceAfter: 4 },
      { id: 's5', problemId: 'p4', date: '2026-03-28T18:00:00', duration: 600, confidenceBefore: 4, confidenceAfter: 5 },
    ],
    streak: 3,
    lastStudyDate: '2026-03-28',
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
