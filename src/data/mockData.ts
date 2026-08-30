import {
  CandidateProfile,
  CompanyGuide,
  FeedbackReportData,
  Flashcard,
  QuestionItem,
  SalaryBenchmark,
  STARStory,
  CodingProblem,
} from "../types";

export const initialProfile: CandidateProfile = {
  name: "Alex Rivera",
  headline: "Senior Frontend & Full-Stack Engineer (7+ YOE)",
  email: "alex.rivera@example.com",
  targetRole: "Senior Full-Stack Engineer",
  targetCompanyTier: "Tier-1 Tech (Google, Meta, Stripe)",
  yearsOfExperience: 7,
  readinessScore: 78,
  streakDays: 14,
  completedMocksCount: 18,
  questionsSolvedCount: 142,
  preferredLanguage: "TypeScript",
  personaPreference: "bar-raiser",
  theme: "dark",
};

export const sampleProfile = initialProfile;

export const sampleFeedbackReport: FeedbackReportData = {
  sessionId: "mock-session-2026-088",
  date: "August 28, 2026",
  role: "Senior Full-Stack Engineer",
  company: "Google",
  seniority: "Senior (L5)",
  interviewType: "technical",
  overallScore: 84,
  technicalAccuracy: 88,
  starCompliance: 82,
  communicationClarity: 86,
  confidencePacing: 79,
  problemSolving: 85,
  wordsPerMinute: 138,
  fillerWordCount: 11,
  fillerWords: [
    { word: "um / uh", count: 5 },
    { word: "like", count: 3 },
    { word: "basically", count: 2 },
    { word: "you know", count: 1 },
  ],
  turns: [
    {
      id: "turn-1",
      questionNumber: 1,
      question: "How would you design a high-throughput distributed caching layer with consistency guarantees under heavy read-write bursts?",
      category: "System Design",
      idealAnswerHighlights: [
        "Explain Cache-Aside vs Write-Through vs Write-Back trade-offs",
        "Mention Cache Invalidation strategy (TTL, CDC via Debezium, Redis Cluster)",
        "Handle Cache Stampede (Probabilistic early expiration, distributed mutex locks)",
        "Define replica replication lag & eventual consistency handling"
      ],
      candidateAnswer: "I would implement a distributed Redis cluster using a Cache-Aside pattern. For burst traffic, we can use consistent hashing to distribute keys evenly across shards. To prevent cache stampede, I'd apply singleflight request coalescing and soft-expirations with background refreshes. For write consistency, we can push DB change events via Kafka/CDC.",
      score: 90,
      clarity: 88,
      depth: 92,
      strengths: ["Strong mention of singleflight request coalescing", "Solid CDC/Kafka architectural integration"],
      improvements: ["Elaborate on Redis replication failover edge cases (split-brain scenarios)"],
      modelAnswer: "An optimal L5 response articulates a tiered caching strategy: L1 in-process memoization (e.g. Guava/Caffeine with bounded memory) paired with L2 distributed Redis Cluster in a Cache-Aside pattern. Writes emit CDC events through Kafka to an invalidator worker. To neutralize cache stampede during high concurrency, use deterministic single-flight mutexes or probabilistic early expiration (XFetch algorithm).",
      timeSpentSeconds: 280,
    },
    {
      id: "turn-2",
      questionNumber: 2,
      question: "Tell me about a time you had a technical disagreement with a Staff Architect on schema design and how you influenced the outcome.",
      category: "Behavioral (STAR)",
      idealAnswerHighlights: [
        "Clearly describe the technical conflict without emotion",
        "Show data-driven decision making (benchmarks, POCs)",
        "Demonstrate high emotional intelligence and alignment with team goals",
        "Highlight measurable end results and post-launch stability"
      ],
      candidateAnswer: "During a major microservice decomposition, the Staff Architect proposed a centralized normalized Postgres schema, whereas our team needed ultra-low read latency for time-series telemetry. I gathered performance benchmarks simulating 50k RPS showing the normalized schema suffered high join contention. I built a 2-day proof of concept using a hybrid document store with indexed metadata. We reviewed the numbers together, agreed on the hybrid model, and reduced p99 latency by 64%.",
      score: 85,
      clarity: 89,
      depth: 82,
      strengths: ["Strong focus on empirical benchmarking instead of subjective debate", "Clear quantified outcome (-64% p99 latency)"],
      improvements: ["Mention how you maintained positive long-term working rapport and shared credit"],
      modelAnswer: "A high-scoring answer follows STAR: Situation: Microservice data modeling clash. Task: Reconcile query performance requirements against strict normalization guidelines. Action: Built reproducible load benchmarks, presented tradeoff matrix (storage cost vs. latency SLA), invited cross-functional feedback, and aligned on hybrid read-optimized views. Result: Zero query bottlenecks at launch, 64% latency drop, established new benchmark standards across the org.",
      timeSpentSeconds: 230,
    },
    {
      id: "turn-3",
      questionNumber: 3,
      question: "Implement a thread-safe Rate Limiter in TypeScript or Python supporting Token Bucket algorithm with per-user burst allowances.",
      category: "Coding & Concurrency",
      idealAnswerHighlights: [
        "Maintain token count, last refill timestamp, capacity, refill rate",
        "Calculate token replenishment mathematically without persistent timers",
        "Handle concurrency / atomic state mutations",
        "Support custom burst allowances and error status codes (429 Too Many Requests)"
      ],
      candidateAnswer: "I implemented a TokenBucketRateLimiter class storing tokens and lastRefill timestamp. On each allowRequest(userId, tokensRequested) call, it computes elapsed time multiplied by the refill rate, caps it at max capacity, checks if sufficient tokens exist, deducts them, and returns boolean.",
      score: 86,
      clarity: 88,
      depth: 84,
      strengths: ["Clean mathematical elapsed-time calculation", "O(1) time and space complexity per check"],
      improvements: ["Discuss distributed synchronization when running across multiple Node.js instances (e.g. Redis Lua script)"],
      modelAnswer: "The optimal design uses dynamic token calculation: (currentTime - lastRefill) * refillRate, bounded by maxCapacity. For distributed clusters, this is best executed inside an atomic Redis Lua script using sliding window counters or token buckets, preventing race conditions under horizontal pod scaling.",
      timeSpentSeconds: 310,
    }
  ],
  topStrengths: [
    "Precise architectural reasoning with concrete performance trade-offs",
    "Effective data-backed STAR behavioral narratives",
    "Confident, articulate pacing with zero awkward hesitations",
    "Solid grasp of high-scale system design patterns (CDC, singleflight, distributed cache)"
  ],
  criticalGrowthAreas: [
    "Address distributed race conditions and consensus mechanisms when running multi-node",
    "Explicitly highlight interpersonal rapport-building after resolving technical debates",
    "Reduce minor filler phrases ('like', 'um') during complex algorithmic brainstorming"
  ],
  actionPlan: [
    { day: "Day 1", task: "Review Distributed Consensus & Redis Lua Scripts in Question Bank", link: "question-bank" },
    { day: "Day 2", task: "Practice 3 System Design Scenarios with Bar Raiser Persona", link: "mock-setup" },
    { day: "Day 3", task: "Refine STAR stories with quantitative impact using STAR Builder", link: "star-builder" },
    { day: "Day 4", task: "Audit Resume for Distributed Systems & AWS keywords", link: "resume-analyzer" },
    { day: "Day 5", task: "Complete FAANG Flashcard Rapid Drill Deck", link: "flashcards" },
  ]
};

export const sampleQuestions: QuestionItem[] = [
  {
    id: "q-1",
    title: "Design a Global Real-Time Collaborative Document Editor (like Google Docs)",
    category: "System Design",
    difficulty: "Hard",
    companies: ["Google", "Meta", "Microsoft", "Notion"],
    frequency: "High",
    description: "Design an architecture enabling thousands of simultaneous users to edit rich documents with sub-100ms latency, conflict resolution, offline synchronization, and document history.",
    hints: [
      "Compare Operational Transformation (OT) vs Conflict-free Replicated Data Types (CRDTs).",
      "How will WebSockets or WebRTC manage active peer connections?",
      "Consider snapshotting checkpoints to prevent unbounded log growth in database storage."
    ],
    modelAnswer: "Core architecture consists of: 1) Client with local CRDT engine (e.g. Yjs / Automerge) for zero-latency optimistic rendering. 2) Gateway layer with sticky WebSocket sessions managed by Redis PubSub. 3) Document server maintaining append-only operation logs with periodic Delta snapshotting to S3/DynamoDB. 4) Cursor tracking via lightweight ephemeral socket broadcasting.",
    status: "in-progress"
  },
  {
    id: "q-2",
    title: "LRU (Least Recently Used) Cache Implementation with O(1) Operations",
    category: "Data Structures",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Apple", "Uber", "Bloomberg"],
    frequency: "High",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache. It should support get and put operations in O(1) time complexity.",
    hints: [
      "Combine a Hash Map with a Doubly Linked List.",
      "The Hash Map provides O(1) lookup to nodes in the linked list.",
      "The Doubly Linked List allows O(1) node removal and insertion to the front (most recent) or eviction from the tail (least recent)."
    ],
    starterCode: `class LRUCache {\n  constructor(capacity: number) {\n    // Initialize data structures\n  }\n  get(key: number): number {\n    // O(1) fetch\n    return -1;\n  }\n  put(key: number, value: number): void {\n    // O(1) insert/update with eviction\n  }\n}`,
    modelAnswer: "Use a Hash Map mapping keys to Doubly Linked List Node pointers. On `get(key)`: if found, splice node to the head of the list and return value. On `put(key, value)`: if key exists, update value and move to head. If capacity exceeded, remove node from tail (least recently used) and delete from map. Insert new node at head.",
    status: "mastered"
  },
  {
    id: "q-3",
    title: "Tell me about a time you handled a critical production outage under high pressure.",
    category: "Behavioral (STAR)",
    difficulty: "Medium",
    companies: ["Amazon", "Netflix", "Google", "Stripe"],
    frequency: "High",
    description: "Evaluates composure, systematic root cause analysis, stakeholder communication, and post-mortem execution during severity-1 production failures.",
    hints: [
      "Start with the business impact (e.g. 15% payment transaction drops).",
      "Describe how you triaged the issue without panicking (rollbacks, circuit breakers).",
      "Explain the communication cadence to executive stakeholders.",
      "Highlight the blameless post-mortem and automated prevention mechanisms installed."
    ],
    modelAnswer: "Structure: S: Black Friday traffic spike caused payment gateway timeouts. T: Restore transaction flow within 15-minute SLA. A: Declared incident, assumed Incident Commander role, isolated culprit database query contention, engaged fallback circuit breaker to queue payments asynchronously, updated stakeholders every 5 mins. R: Restored 100% processing in 9 minutes, authored blameless post-mortem, implemented automated query circuit breakers.",
    status: "mastered"
  },
  {
    id: "q-4",
    title: "Optimize React Web Vitals (LCP, INP, CLS) on a Heavy Single Page App",
    category: "Frontend",
    difficulty: "Hard",
    companies: ["Meta", "Airbnb", "Netflix", "Vercel"],
    frequency: "High",
    description: "Walk through diagnosing and resolving poor Interaction to Next Paint (INP) and Largest Contentful Paint (LCP) in an enterprise React SPA.",
    hints: [
      "Use Chrome DevTools Performance Profiler and React DevTools Profiler.",
      "Address main thread blocking tasks (>50ms) using `startTransition` or Web Workers.",
      "Optimize critical rendering path: image preloading, SSR/streaming HTML, code splitting."
    ],
    modelAnswer: "1) LCP optimization: Preload hero assets with `rel=preload`, inline critical CSS, implement streaming SSR with Suspense boundaries, and utilize AVIF/WebP image formats on edge CDN. 2) INP optimization: Break long CPU-bound tasks (>50ms) using React 18 `useTransition`, debounce heavy user input handlers, decouple analytics tracking into Web Workers, and eliminate layout thrashing caused by reading DOM properties immediately after writes.",
    status: "in-progress"
  },
  {
    id: "q-5",
    title: "Design a Scalable Distributed URL Shortener (like TinyURL/Bitly)",
    category: "System Design",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Meta", "Adobe"],
    frequency: "High",
    description: "Design a service that takes long URLs and generates a unique, compact 7-character alias with 100M new URLs/month and 100:1 read/write ratio.",
    hints: [
      "Calculate storage and QPS requirements (100M writes/month = ~40 writes/sec, 4000 reads/sec).",
      "Explore Base62 encoding of a distributed 64-bit unique ID generator (e.g. Snowflake or pre-generated KGS keys).",
      "Design database schema (NoSQL key-value like DynamoDB/Cassandra or Redis cache)."
    ],
    modelAnswer: "Key components: 1) Pre-allocated Key Generation Service (KGS) storing unused Base62 7-character tokens in memory. 2) Read path: CDN + Redis Cluster (90% cache hit rate for top URLs). 3) Persistent storage: DynamoDB partitioned by `shortKey`. 4) Write path takes pre-generated token from KGS, stores mapping in DynamoDB, and warms Redis cache.",
    status: "unattempted"
  },
  {
    id: "q-6",
    title: "Explain Event Loop, Microtasks, and Macrotasks in Node.js and Browser",
    category: "Backend",
    difficulty: "Medium",
    companies: ["Google", "Netflix", "Uber", "Stripe"],
    frequency: "Medium",
    description: "Explain how JavaScript executes asynchronous code, the difference between process.nextTick, Promise jobs, MutationObservers, and setTimeout/setImmediate.",
    hints: [
      "Draw the execution phases of Node's libuv: Timers, Pending I/O, Idle, Poll, Check, Close.",
      "Microtasks (Promises, process.nextTick) drain completely between every single macrotask.",
      "How this impacts UI rendering frames in browser."
    ],
    modelAnswer: "The event loop orchestrates non-blocking I/O. In browsers, executing a task drains all queued microtasks (Promise reactions, queueMicrotask, MutationObserver) before paint and next macrotask (setTimeout, setInterval). In Node.js (libuv), phases include Timers, Poll, Check (setImmediate). Microtasks drain after each phase. `process.nextTick` takes precedence over standard Promise microtask queues.",
    status: "mastered"
  }
];

export const sampleCodingProblems: CodingProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays & Hash Tables",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    starterCode: {
      TypeScript: `function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement)!, i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      Python: `def two_sum(nums: list[int], target: int) -> list[int]:\n    lookup = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in lookup:\n            return [lookup[diff], i]\n        lookup[num] = i\n    return []`,
      JavaScript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) {\n      return [map.get(comp), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`
    },
    testCases: [
      { input: "[2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "[3, 2, 4], target = 6", expected: "[1, 2]" },
      { input: "[3, 3], target = 6", expected: "[0, 1]" }
    ]
  },
  {
    id: "lru-cache",
    title: "LRU Cache (Least Recently Used)",
    difficulty: "Medium",
    category: "Linked Lists & Design",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\nImplement the `LRUCache` class with `get(key)` and `put(key, value)` both running in average `O(1)` time.",
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]"
      }
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put."
    ],
    starterCode: {
      TypeScript: `class LRUCacheNode {\n  key: number;\n  val: number;\n  prev: LRUCacheNode | null = null;\n  next: LRUCacheNode | null = null;\n  constructor(key: number, val: number) {\n    this.key = key;\n    this.val = val;\n  }\n}\n\nclass LRUCache {\n  private capacity: number;\n  private map: Map<number, LRUCacheNode>;\n  private head: LRUCacheNode;\n  private tail: LRUCacheNode;\n\n  constructor(capacity: number) {\n    this.capacity = capacity;\n    this.map = new Map();\n    this.head = new LRUCacheNode(0, 0);\n    this.tail = new LRUCacheNode(0, 0);\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n\n  get(key: number): number {\n    if (!this.map.has(key)) return -1;\n    const node = this.map.get(key)!;\n    this.remove(node);\n    this.insertHead(node);\n    return node.val;\n  }\n\n  put(key: number, value: number): void {\n    if (this.map.has(key)) {\n      this.remove(this.map.get(key)!);\n    }\n    const newNode = new LRUCacheNode(key, value);\n    this.map.set(key, newNode);\n    this.insertHead(newNode);\n    if (this.map.size > this.capacity) {\n      const lru = this.tail.prev!;\n      this.remove(lru);\n      this.map.delete(lru.key);\n    }\n  }\n\n  private remove(node: LRUCacheNode) {\n    node.prev!.next = node.next;\n    node.next!.prev = node.prev;\n  }\n\n  private insertHead(node: LRUCacheNode) {\n    node.next = this.head.next;\n    node.prev = this.head;\n    this.head.next!.prev = node;\n    this.head.next = node;\n  }\n}`,
      Python: `class Node:\n    def __init__(self, key=0, val=0):\n        self.key, self.val = key, val\n        self.prev = self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}\n        self.head, self.tail = Node(), Node()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            node = self.cache[key]\n            self._remove(node)\n            self._insert(node)\n            return node.val\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self._remove(self.cache[key])\n        node = Node(key, value)\n        self.cache[key] = node\n        self._insert(node)\n        if len(self.cache) > self.cap:\n            lru = self.tail.prev\n            self._remove(lru)\n            del self.cache[lru.key]\n\n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def _insert(self, node):\n        node.next = self.head.next\n        node.prev = self.head\n        self.head.next.prev = node\n        self.head.next = node`,
      JavaScript: `// JS implementation here`
    },
    testCases: [
      { input: "cap=2, put(1,1), put(2,2), get(1)", expected: "1" },
      { input: "put(3,3), get(2) [evicted]", expected: "-1" },
      { input: "get(3)", expected: "3" }
    ]
  }
];

export const sampleSTARStories: STARStory[] = [
  {
    id: "star-1",
    title: "Scaling Video Streaming Ingestion by 400% Under Peak Load",
    category: "Technical Innovation",
    situation: "During an international sports streaming broadcast event, our live transcoding cluster experienced 35% packet drops due to CPU saturation and unthrottled concurrent ingest streams.",
    task: "Lead an emergency task force to re-architect stream worker autoscaling and buffer pipelines without terminating ongoing broadcasts within a 3-week deadline.",
    action: "I profiled worker bottlenecks using eBPF flamegraphs, implemented dynamic GOP (Group of Pictures) rate adaptors, migrated ffmpeg pipelines to GPU-accelerated Kubernetes nodes with custom HPA metrics, and instituted intelligent backpressure queues in Go.",
    result: "Slashed end-to-end ingest latency from 14s to 2.1s, supported 4.2M simultaneous viewers with zero dropped streams, and saved $85,000/month in cloud infrastructure costs.",
    score: 94,
    tags: ["High Scale", "Distributed Systems", "Cost Optimization", "Emergency"],
    deliveryTips: [
      "Emphasize the eBPF profiling finding early to show deep technical rigor.",
      "Keep the explanation of ffmpeg vs GPU migration structured.",
      "Highlight the $85k/mo cost savings alongside the 4.2M viewer concurrency."
    ],
    potentialFollowUps: [
      "What trade-offs did you make regarding video quality compression when under intense load?",
      "How did you validate stability before deploying to live streams?"
    ],
    refinedStory: "At my previous streaming startup, our live video ingestion service faced a critical 35% packet drop crisis during high-concurrency peak broadcasts. As Tech Lead, I drove a cross-functional initiative to overhaul our transcoding pipeline within three weeks. I leveraged eBPF kernel profiling to identify thread-locking bottlenecks in CPU transcoding, engineered dynamic GOP adaptors in Go, and transitioned our encoding workloads to GPU-accelerated Kubernetes nodes with custom Prometheus-driven autoscaling. This reduced ingestion latency from 14s to 2.1s, accommodated 4.2 million concurrent viewers with zero stream drops, and trimmed monthly AWS spend by $85,000.",
    lastEdited: "2026-08-25"
  },
  {
    id: "star-2",
    title: "Mediating a High-Stakes Microservice vs Modular Monolith Dispute",
    category: "Conflict Resolution",
    situation: "Our engineering division was fractured between splitting our monolithic core into 14 distinct microservices versus refactoring as an optimized modular monolith, delaying product roadmap by 2 months.",
    task: "As Staff Engineer, unite the 25-person team, resolve architectural deadlock, and establish a pragmatic roadmap aligned with upcoming enterprise customer launch.",
    action: "I conducted a structured Tradeoff Matrix workshop evaluating deployment velocity, distributed transaction costs, and operational observability overhead. I built a working prototype of a Domain-Driven Modular Monolith with isolated bounded contexts, proving it met our throughput requirements with 1/5th the infrastructure complexity.",
    result: "Achieved unanimous team consensus within 10 days, delivered the enterprise release 3 weeks ahead of schedule, and onboarded 4 Fortune 500 clients with 99.99% uptime.",
    score: 91,
    tags: ["Leadership", "Architecture", "Consensus", "Team Alignment"],
    deliveryTips: [
      "Demonstrate emotional intelligence and deep respect for both sides of the debate.",
      "Highlight the empirical prototype as the decisive catalyst for alignment."
    ],
    potentialFollowUps: [
      "How did you address the concerns of the engineers who were passionate about microservices?",
      "Would you make the same architectural choice today as the company continues to scale?"
    ],
    refinedStory: "When our engineering organization faced a polarizing debate between fragmenting into 14 microservices versus consolidating as a modular monolith, I stepped in to break the 2-month deadlock. Rather than letting subjective preferences dominate, I facilitated a structured Tradeoff Matrix session and rapidly developed a working Domain-Driven Modular Monolith prototype. By demonstrating that isolated domain boundaries satisfied our performance and velocity goals without distributed transaction overhead, I united the team in 10 days, allowing us to ship 3 weeks ahead of schedule and successfully onboard 4 Fortune 500 customers.",
    lastEdited: "2026-08-27"
  }
];

export const sampleSalaryBenchmarks: SalaryBenchmark[] = [
  {
    role: "Senior Software Engineer (L5 / IC4)",
    location: "San Francisco Bay Area / Remote US",
    experienceYears: "5 - 8 Years",
    p25: 285000,
    p50: 345000,
    p75: 410000,
    p90: 485000,
    baseSalary: 215000,
    annualBonus: 35000,
    equityPerYear: 95000,
    topPayingCompanies: [
      { name: "Meta", totalComp: "$420,000 / yr" },
      { name: "Google", totalComp: "$390,000 / yr" },
      { name: "Stripe", totalComp: "$415,000 / yr" },
      { name: "Netflix", totalComp: "$460,000 / yr (All Cash)" },
      { name: "Apple", totalComp: "$375,000 / yr" }
    ],
    negotiationTips: [
      "Always negotiate on total compensation (Base + Equity + Sign-on Bonus) rather than base alone.",
      "Leverage competing offers by sharing total numbers without sending proprietary PDF attachments immediately.",
      "Ask recruiters for the maximum band threshold for your leveling bracket."
    ]
  },
  {
    role: "Staff Software Engineer (L6 / IC5)",
    location: "San Francisco / New York / Seattle",
    experienceYears: "8 - 12 Years",
    p25: 420000,
    p50: 510000,
    p75: 620000,
    p90: 750000,
    baseSalary: 260000,
    annualBonus: 55000,
    equityPerYear: 195000,
    topPayingCompanies: [
      { name: "OpenAI", totalComp: "$820,000 / yr (PPU / Equity)" },
      { name: "Meta", totalComp: "$640,000 / yr" },
      { name: "Google", totalComp: "$580,000 / yr" },
      { name: "Databricks", totalComp: "$610,000 / yr" }
    ],
    negotiationTips: [
      "Staff offers carry substantial equity upside; negotiate for annual refresher grants.",
      "Ask for signing bonus escalations to compensate for unvested cliff equity at your current firm.",
      "Highlight organizational impact: cross-team mentorship, RFC leadership, and system design stewardship."
    ]
  },
  {
    role: "Engineering Manager (M1)",
    location: "US Remote / Tier 1 Hubs",
    experienceYears: "7 - 10 Years",
    p25: 310000,
    p50: 380000,
    p75: 460000,
    p90: 540000,
    baseSalary: 230000,
    annualBonus: 45000,
    equityPerYear: 105000,
    topPayingCompanies: [
      { name: "Uber", totalComp: "$430,000 / yr" },
      { name: "Amazon", totalComp: "$390,000 / yr" },
      { name: "Stripe", totalComp: "$440,000 / yr" },
      { name: "Coinbase", totalComp: "$410,000 / yr" }
    ],
    negotiationTips: [
      "Highlight team retention metrics, hiring velocity, and developer productivity KPIs.",
      "Negotiate performance bonus multipliers tied to org-wide delivery milestones."
    ]
  }
];

export const sampleCompanyGuides: CompanyGuide[] = [
  {
    id: "google",
    name: "Google",
    logo: "G",
    tagline: "Organizing the world's information and making it universally accessible and useful.",
    hiringBar: "High Technical Rigor + Googleyness (Navigating ambiguity, doing what's right for the user, collaborative ownership).",
    salaryTier: "$350k - $420k (L5 Senior SWE)",
    prepStrategy: "Heavy emphasis on clean data structures, Big-O analysis, distributed systems scalability, and Googleyness behavioral rounds. Interviewers expect you to ask clarifying questions before writing code.",
    interviewRounds: [
      { roundName: "Recruiter Screen", duration: "30 min", focus: "Resume walkthrough & role alignment", tips: "Know your technical highlights and target leveling (L4/L5/L6)." },
      { roundName: "Technical Phone Screen", duration: "45 min", focus: "Data Structures & Algorithmic Problem Solving in Google Docs", tips: "Write clean, runnable syntax; vocalize your thought process constantly." },
      { roundName: "Onsite Round 1: Coding (DSA)", duration: "45 min", focus: "Graphs, DP, Trees, Hash Tables", tips: "State time and space complexity before and after coding." },
      { roundName: "Onsite Round 2: Coding (Concurrency/Design)", duration: "45 min", focus: "System modeling & object-oriented design", tips: "Anticipate edge cases: null inputs, integer overflows, concurrency." },
      { roundName: "Onsite Round 3: System Design (L5+)", duration: "45 min", focus: "Global scale distributed systems (e.g. YouTube, Maps)", tips: "Follow Framework: Scoping -> Calculations -> High Level -> Deep Dives." },
      { roundName: "Onsite Round 4: Googleyness & Leadership", duration: "45 min", focus: "Handling ambiguity, bias for action, team ethics", tips: "Use STAR method with humility and clear personal contribution." }
    ],
    coreValues: [
      { title: "Focus on the user and all else will follow", description: "Prioritize user experience and product excellence above short-term shortcuts." },
      { title: "Fast is better than slow", description: "Iterate quickly, optimize latency, and respect candidate/user time." },
      { title: "Democracy on the web works", description: "Peer review, data-driven decisions, and open technical discourse." },
      { title: "You can be serious without a suit", description: "Collaborative, humble, intellectually curious culture." }
    ],
    frequentlyAsked: [
      "Implement a thread-safe distributed rate limiter across multiple regions.",
      "Serialize and deserialize a Binary Tree with minimal memory footprint.",
      "Design a real-time collaborative map tracking millions of fleet vehicles.",
      "Tell me about a time you noticed an ethical or safety concern in a project and spoke up."
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "A",
    tagline: "Earth's most customer-centric company and Earth's best employer.",
    hiringBar: "Obsession with 16 Leadership Principles (LPs) + Bar Raiser veto authority.",
    salaryTier: "$330k - $395k (SDE III / L6)",
    prepStrategy: "Every single interview round (even coding rounds) evaluates 2 specific Leadership Principles. Prepare 2-3 unique STAR stories for Customer Obsession, Ownership, Bias for Action, Dive Deep, and Disagree & Commit.",
    interviewRounds: [
      { roundName: "Online Assessment (OA)", duration: "90 min", focus: "2 LeetCode Mediums + Work Style Simulation", tips: "Pass all hidden test cases and pick customer-first choices in simulation." },
      { roundName: "Onsite Round 1: Coding + LP", duration: "60 min", focus: "Data Structures (20m LP + 40m Coding)", tips: "Answer LPs in crisp STAR format with exact metrics." },
      { roundName: "Onsite Round 2: System Design + LP", duration: "60 min", focus: "High throughput service architecture (e.g. Prime Video)", tips: "Demonstrate 'Frugality' and 'Are Right, A Lot' trade-offs." },
      { roundName: "Onsite Round 3: OOP / Logical Maintainability", duration: "60 min", focus: "Design extensible classes & unit tests", tips: "Apply SOLID principles and modular clean code." },
      { roundName: "Onsite Round 4: Bar Raiser Round", duration: "60 min", focus: "Cultural fit & Highest Amazonian Bar", tips: "This interviewer is from an outside team; they evaluate long-term trajectory." }
    ],
    coreValues: [
      { title: "Customer Obsession", description: "Leaders start with the customer and work backwards." },
      { title: "Ownership", description: "Leaders act on behalf of the entire company, beyond just their own team." },
      { title: "Bias for Action", description: "Speed matters in business. Many decisions are two-way doors." },
      { title: "Have Backbone; Disagree and Commit", description: "Respectfully challenge decisions when you disagree, then commit fully." }
    ],
    frequentlyAsked: [
      "Tell me about a time you made a critical decision without sufficient data (Bias for Action).",
      "Design Amazon Locker pickup network with offline fallback lockers.",
      "Find the median of a continuous stream of integer purchase values.",
      "Tell me about your most significant failure and what you learned (Ownership)."
    ]
  },
  {
    id: "meta",
    name: "Meta",
    logo: "M",
    tagline: "Give people the power to build community and bring the world closer together.",
    hiringBar: "Blazing Speed (2 medium coding problems in 40 mins) + High-Scale Product Architecture.",
    salaryTier: "$370k - $440k (E5 Senior Software Engineer)",
    prepStrategy: "Meta tests for rapid execution. You must solve 2 coding questions in 45 minutes with bug-free code. In System Design, focus heavily on caching, database sharding, and real-time feeds.",
    interviewRounds: [
      { roundName: "Screening Round", duration: "45 min", focus: "2 algorithmic problems (Arrays, Graphs, Strings)", tips: "Target solving Problem 1 in 15 mins, Problem 2 in 20 mins." },
      { roundName: "Onsite Coding 1", duration: "45 min", focus: "Dynamic Programming, Trees, Binary Search", tips: "Explain intuition in 2 mins, write code immediately, dry-run with test input." },
      { roundName: "Onsite Coding 2", duration: "45 min", focus: "Hash Maps, Heaps, Sliding Window", tips: "Zero hesitation on boilerplate code." },
      { roundName: "Product Architecture (System Design)", duration: "45 min", focus: "Instagram Feed, Messenger, Live Comments", tips: "Structure client-server protocol, fanout on write vs fanout on read." },
      { roundName: "Behavioral (Jedi)", duration: "45 min", focus: "Navigating conflict, rapid pivots, direct feedback", tips: "Highlight autonomy and fast execution velocity." }
    ],
    coreValues: [
      { title: "Move Fast", description: "Build and learn faster than anyone else." },
      { title: "Focus on Long-Term Impact", description: "Emphasize transformative long-range projects over incremental gains." },
      { title: "Build Awesome Things", description: "Craft delightful, world-class products that inspire." },
      { title: "Live in the Future", description: "Pioneer tomorrow's AI and Metaverse computing platforms." }
    ],
    frequentlyAsked: [
      "Design Facebook News Feed with personalized ranking and fan-out.",
      "Valid Palindrome II (allowing at most 1 deletion).",
      "Lowest Common Ancestor of a Binary Tree III (with parent pointers).",
      "Tell me about a time you had to pivot your entire project due to shifting business priorities."
    ]
  }
];

export const sampleFlashcards: Flashcard[] = [
  {
    id: "fc-1",
    deck: "System Design",
    category: "System Design",
    difficulty: "Medium",
    question: "What is the key difference between Strong Consistency vs Eventual Consistency, and when do you choose each?",
    answer: "Strong Consistency ensures that any read request returns the most recent write (e.g. Two-Phase Commit, Raft/Paxos), sacrificing latency and availability during network partitions (CAP Theorem). Eventual Consistency allows temporary replicas to return stale data with the guarantee that all replicas will converge given time (e.g. Cassandra, DynamoDB), maximizing write availability and ultra-low latency.",
    front: "What is the key difference between Strong Consistency vs Eventual Consistency, and when do you choose each?",
    back: "Strong Consistency ensures any read returns the latest write (Two-Phase Commit, Raft), trading off latency & availability during partitions (CAP). Eventual Consistency allows temporary stale reads while converging across replicas (Cassandra, DynamoDB), maximizing throughput and fault tolerance.",
    keyTakeaway: "Use Strong Consistency for financial balances, inventory counts, and auth tokens. Use Eventual Consistency for social media feeds, view counts, and telemetry logs.",
    isMastered: true,
    mastered: true
  },
  {
    id: "fc-2",
    deck: "JavaScript & React",
    category: "Frontend",
    difficulty: "Medium",
    question: "How does React 18 Concurrent Rendering work and what problem does useTransition solve?",
    answer: "Concurrent Rendering allows React to pause, interrupt, and resume rendering work on the fiber tree without blocking the browser main thread. `useTransition` marks specific state updates as low-priority transitions (e.g. filtering a 10,000 item list), keeping high-priority urgent updates (e.g. user typing in an input) responsive and fluid.",
    front: "How does React 18 Concurrent Rendering work and what problem does useTransition solve?",
    back: "Concurrent Rendering allows React to pause and resume work on the fiber tree without blocking the main thread. `useTransition` marks expensive state updates (like filtering 10k items) as non-blocking transitions, keeping user keystrokes and animations at 60 FPS.",
    keyTakeaway: "Wrap expensive search results or chart re-renders in `startTransition(() => setSearchTerm(val))` to keep input fields at 60 FPS.",
    isMastered: false,
    mastered: false
  },
  {
    id: "fc-3",
    deck: "Algorithms",
    category: "Algorithms",
    difficulty: "Hard",
    question: "Explain the Dijkstra vs A* Search Algorithm difference and when to use each.",
    answer: "Dijkstra is a greedy shortest-path algorithm for weighted graphs with non-negative edges, exploring nodes uniformly in all directions (O((V + E) log V)). A* enhances Dijkstra by adding an admissible heuristic function h(n) estimating the cost from current node to the target, guiding the search directly toward the goal and pruning unnecessary path explorations.",
    front: "Explain the Dijkstra vs A* Search Algorithm difference and when to use each.",
    back: "Dijkstra searches in all directions uniformly (O((V+E)logV)). A* augments Dijkstra with an admissible heuristic h(n) estimating distance to goal, directing search toward target coordinates and pruning irrelevant paths.",
    keyTakeaway: "Use Dijkstra when the target destination is unknown in advance. Use A* when coordinates/heuristics exist (e.g., GPS navigation, game pathfinding).",
    isMastered: false,
    mastered: false
  },
  {
    id: "fc-4",
    deck: "CS Core",
    category: "Concurrency",
    difficulty: "Medium",
    question: "What happens under the hood during a TCP 3-Way Handshake and 4-Way Teardown?",
    answer: "Handshake: 1. Client sends SYN (Synchronize Sequence Number). 2. Server responds with SYN-ACK. 3. Client replies with ACK. Connection established. Teardown: 1. Initiator sends FIN. 2. Responder sends ACK. 3. Responder sends FIN when ready. 4. Initiator sends ACK and enters TIME_WAIT (2MSL) before closing.",
    front: "What happens under the hood during a TCP 3-Way Handshake and 4-Way Teardown?",
    back: "Handshake: SYN -> SYN-ACK -> ACK. Teardown: FIN -> ACK -> FIN -> ACK -> TIME_WAIT (2MSL) on initiator. TIME_WAIT ensures lost packets don't corrupt subsequent new connections.",
    keyTakeaway: "TIME_WAIT ensures late duplicate packets don't corrupt subsequent new connections on the same port.",
    isMastered: true,
    mastered: true
  },
  {
    id: "fc-5",
    deck: "Behavioral Traps",
    category: "Behavioral",
    difficulty: "Medium",
    question: "How should you answer: 'What is your greatest weakness?' without sounding cliched or uncoachable?",
    answer: "Never use fake strengths ('I work too hard', 'I am a perfectionist'). Choose a genuine, non-fatal operational skill (e.g. delegating early when leading projects, saying no to tangential requests, or speaking up earlier during initial scope definition). Structure: 1) Acknowledge the tendency, 2) Explain how you noticed its impact, 3) Share the active systems and habits you put in place to manage it.",
    front: "How should you answer: 'What is your greatest weakness?' without sounding cliched?",
    back: "Pick a real non-fatal operational area (e.g. delegating earlier on large initiatives or asserting boundary trade-offs during scope creep). Structure: 1. Acknowledge habit, 2. Share past lesson, 3. Highlight concrete systems/tools you actively practice to stay ahead.",
    keyTakeaway: "Demonstrate self-awareness, personal accountability, and concrete ongoing growth systems.",
    isMastered: true,
    mastered: true
  }
];

export const sampleSalaryData = sampleSalaryBenchmarks;
export const sampleStarStories = sampleSTARStories;
