/**
 * Portfolio Data for Aakash Thapa
 * Strictly aligned with Product Requirements Document (PRD) v0.1
 */

export const personalInfo = {
  name: "Aakash Thapa",
  role: "Senior Full-Stack Software Engineer",
  experienceYears: "6+ years",
  location: "Lubbock (Texas), United States",
  phone: "+1 (806) 283-3741",
  directPdfUrl: `${import.meta.env.BASE_URL}Aakash_Thapa_Resume.pdf`,
  education: {
    degree: "M.S. in Computer Science (Expected)",
    institution: "Texas Tech University",
    department: "Edward E. Whitacre Jr. College of Engineering",
    expectedGraduation: "December 2027",
  },
  headline: "I build the interface. The engine. And everything between.",
  introduction: "I'm Aakash Thapa, a full-stack software engineer with 6+ years of experience building scalable web, mobile, and AI-powered applications using Python, React, Django, and AWS. Currently pursuing an M.S. in Computer Science at Texas Tech.",
  contacts: {
    email: "aakashthapa.work@gmail.com",
    github: "https://github.com/younameit01",
    linkedin: "https://www.linkedin.com/in/aakash-thapa-01/",
  },
};

export const macPulseData = {
  id: "macpulse",
  title: "MacPulse",
  tagline: "macOS Storage & System Fleet Observability Platform",
  summary: "A lightweight macOS observability system combining native launchd daemons, a high-throughput FastAPI coordinator, real-time Server-Sent Events (SSE) dashboard updates, and telemetry-grounded Gemini AI diagnosis for high-velocity storage anomalies.",
  status: "Featured Engineering Project",
  repoUrl: "https://github.com/younameit01/macpulse",
  caseStudyPath: "/projects/macpulse",
  architectureStack: [
    { category: "Client Daemon", tech: "macOS Agent (launchd, Swift/Python, APFS Metadata)" },
    { category: "Coordinator", tech: "FastAPI, Python 3.11, Pydantic, SQLite WAL" },
    { category: "Live Transport", tech: "Server-Sent Events (SSE), HTTP/2 Streaming" },
    { category: "Visualization", tech: "React 19, Recharts / Canvas, Vanilla CSS" },
    { category: "Root-Cause AI", tech: "Gemini API (Strict Telemetry-Grounded Inference)" },
  ],
  keyMetrics: [
    { label: "Sampling Interval", value: "1,000 ms", detail: "Low-overhead APFS stat collection" },
    { label: "Agent Footprint", value: "< 28 MB", detail: "Resident memory in daemon mode" },
    { label: "Update Transport", value: "SSE Stream", detail: "Sub-50ms latency vs polling" },
    { label: "Storage Engine", value: "SQLite WAL", detail: "Zero-dependency local persistence" },
  ],
  sampleFleetDevices: [
    {
      id: "device-studio-m2",
      name: "MacBook Pro M2 Max",
      hostname: "aakash-mbp-studio.local",
      os: "macOS Sonoma 14.5",
      role: "Workstation / Primary Dev",
      status: "normal",
      baselineStorage: { totalGB: 1000, usedGB: 412, freeGB: 588 },
      baselineWriteMBs: 18.4,
      baselineReadMBs: 42.1,
      anomalyScenario: {
        description: "Docker build runaway allocating orphaned layers in /var/folders",
        spikeWriteMBs: 462.8,
        spikeDeltaGB: 48.6,
        alertType: "HIGH_WRITE_VELOCITY_ANOMALY",
        explanation: "Telemetry indicates sustained write bursts at 462.8 MB/s on APFS container `/System/Volumes/Data/var/folders/daemon`. Anomaly matches high-churn ephemeral Docker build caching rather than slow organic user file creation.",
        recommendations: [
          "Execute 'docker system prune -f --volumes' to recover detached build containers",
          "Inspect cache-mount flags in local docker-compose.yml",
          "Check APFS local snapshot retention with 'tmutil listlocalsnapshots /'",
        ]
      }
    },
    {
      id: "device-m1-ultra",
      name: "Mac Studio M1 Ultra",
      hostname: "ci-build-runner-01.local",
      os: "macOS Sonoma 14.5",
      role: "CI Build & Compilation Node",
      status: "normal",
      baselineStorage: { totalGB: 2000, usedGB: 1240, freeGB: 760 },
      baselineWriteMBs: 34.2,
      baselineReadMBs: 98.4,
      anomalyScenario: {
        description: "Uncapped compiler build artifact retention across multiple concurrent git worktrees",
        spikeWriteMBs: 685.2,
        spikeDeltaGB: 82.4,
        alertType: "STORAGE_PRESSURE_ANOMALY",
        explanation: "Write velocity surged past 680 MB/s across Xcode derived data and Node.js node_modules compilation targets. Free capacity dropped by 82.4 GB over a 120-second sliding evaluation window.",
        recommendations: [
          "Configure Xcode DerivedData rotation script via launchd",
          "Enforce cc-cache / turborepo remote caching to avoid duplicate compilation outputs",
          "Enable disk volume low-watermark threshold alert at 15% remaining",
        ]
      }
    },
    {
      id: "device-air-m3",
      name: "MacBook Air M3",
      hostname: "test-node-mobile.local",
      os: "macOS Sonoma 14.4",
      role: "Staging Test Device",
      status: "normal",
      baselineStorage: { totalGB: 512, usedGB: 198, freeGB: 314 },
      baselineWriteMBs: 8.2,
      baselineReadMBs: 15.6,
      anomalyScenario: {
        description: "Background diagnostic log loop writing 120MB per minute unrotated",
        spikeWriteMBs: 215.0,
        spikeDeltaGB: 18.2,
        alertType: "LOG_RUNAWAY_ANOMALY",
        explanation: "Sustained write pressure detected on `/Library/Logs/DiagnosticReports`. Unrotated diagnostic dumps generated by crashing third-party background daemon.",
        recommendations: [
          "Identify offending daemon process using `sudo lsof +D /Library/Logs`",
          "Verify logrotate policy or disable noisy debug verbosity flags",
          "Clean old crash logs with `sudo rm -rf /Library/Logs/DiagnosticReports/*`",
        ]
      }
    }
  ]
};

export const experienceData = [
  {
    company: "Vivpro",
    role: "Senior Full-Stack Software Engineer",
    period: "Nov 2023 – Jul 2026",
    location: "Pune, India",
    highlights: [
      "Architected an event-driven subscription reporting service generating PDF and DOCX reports for regulatory document updates on user-defined schedules using SQS-triggered Lambda containers hosted in ECR, S3 storage, and CloudWatch monitoring.",
      "Engineered LLM-powered document services using React and Flask, including document Q&A, news briefs, and configurable summaries across the top 10–100 relevant documents, increasing user engagement by 40%.",
      "Designed and deployed automated DAG-based pipelines that ingested 10,000–30,000 documents per source from 6+ global regulatory sources, stored content in Amazon S3, and indexed it in AWS Kendra, reducing manual ingestion effort by over 50%.",
      "Developed and maintained a notification service, delivering daily email and web alerts on document updates to 700+ users, increasing retention by 35%.",
      "Championed team adoption of Cursor and LLM-assisted engineering workflows through live demonstrations and practical guidance, accelerating feature delivery by approximately 35%.",
      "Migrated the entire frontend from React 17 to React 18, upgraded TypeScript and supporting libraries, resolved breaking changes, and upgraded AWS Amplify authentication modules using Amazon Cognito.",
      "Developed a reusable filter module with virtualized infinite scrolling, reducing frontend development effort by 80% and enabling reuse across 10+ core sections.",
      "Reduced reporting load times by 30–50% by optimizing backend queries, implementing Redis caching, and enforcing client-specific API rate limits.",
      "Implemented scalable full-text search across 30,000+ documents using Elasticsearch and AWS Kendra while maintaining 99.9% availability.",
      "Participated in production on-call rotations, resolving incidents and maintaining a mean time to recovery of under 2 hours."
    ],
    techStack: ["React 18", "TypeScript", "Python", "Flask", "AWS (Lambda, SQS, S3, Kendra)", "Elasticsearch", "Redis", "Docker", "Cursor"]
  },
  {
    company: "Fixcraft",
    role: "Full-Stack Software Engineer II",
    period: "Aug 2021 – Jul 2023",
    location: "Gurgaon, India",
    highlights: [
      "Implemented Django-based microservices for WhatsApp, email, SMS, and in-app notifications and integrated Razorpay payments..",
      "Built an e-commerce website from the ground up using Python, Django, and React, catering to both B2B and B2C demands for automobile spare parts.",
      "Led end-to-end development of React Native applications for Android and iOS, increasing the customer base by 28% and migrating web users to the mobile applications.",
      "Migrated a React website to Next.js with server-side rendering, increasing its Lighthouse SEO score by 30%.",
      "Created a private npm package that improved code reuse and reduced new-feature rollout time by 35%.",
      "Guided a team of 3 front-end developers, managing task prioritization and facilitating daily Scrum meetings."
    ],
    techStack: ["React", "Next.js", "React Native", "Python", "Django", "Razorpay", "PostgreSQL", "AWS", "npm"]
  },
  {
    company: "Innostax Software Labs",
    role: "Team Lead",
    period: "Sep 2020 – Aug 2021",
    location: "Gurgaon, India",
    highlights: [
      "Devised front-end architecture for 3+ projects using React with responsive design and reusable components, boosting user engagement by 16% and reducing bounce rates by 13%.",
      "Engineered backend structure for 2+ projects, establishing databases and relationships via Node.js, Express.js, and PostgreSQL.",
      "Managed a team of 2–4 engineers, supporting hiring, task allocation, technical reviews, and on-time delivery across multiple client projects.",
      "Led code reviews, offering constructive feedback and expediting new member training."
    ],
    techStack: ["React", "Node.js", "Express.js", "PostgreSQL", "Team Leadership", "Architecture"]
  },
  {
    company: "Innostax Software Labs",
    role: "Full-Stack Software Engineer I",
    period: "Aug 2019 – Sep 2020",
    location: "Gurgaon, India",
    highlights: [
      "Built frontend features and component libraries using React and Redux for 2+ client projects, reducing duplicate UI work and accelerating page delivery.",
      "Created and optimized database tables, REST APIs, and query performance (including index creation), enhancing application speed and efficiency.",
      "Implemented unit Testing and end-to-end Testing using frameworks such as Jest, Mocha, and Playwright to improve code reliability."
    ],
    techStack: ["React", "Redux", "REST APIs", "PostgreSQL", "Jest", "Playwright", "Mocha"]
  }
];

export const capabilitiesData = [
  {
    category: "Web & Mobile Systems",
    description: "Crafting intuitive, highly responsive client-side architectures with obsessive attention to performance, layout stability, and accessibility.",
    technologies: [
      "React 19 / 18",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript (ESNext)",
      "Zustand / Redux",
      "Three.js / WebGL",
      "CSS Architecture & Tokens",
      "Accessibility (WCAG AA)"
    ]
  },
  {
    category: "Backend & Data Engineering",
    description: "Architecting resilient distributed systems, real-time event streaming protocols, and low-latency API layers.",
    technologies: [
      "Python 3.11+",
      "FastAPI",
      "Django",
      "Node.js / Express",
      "Server-Sent Events (SSE)",
      "WebSockets",
      "PostgreSQL",
      "SQLite / WAL Mode",
      "Redis Caching & PubSub",
      "RESTful & GraphQL APIs"
    ]
  },
  {
    category: "Cloud, Systems & Reliability",
    description: "Building production cloud infrastructure, container orchestration, daemon lifecycle management, and telemetry pipelines.",
    technologies: [
      "Google Cloud Platform (GCP)",
      "Amazon Web Services (AWS)",
      "Docker & Containerization",
      "Kubernetes Basics",
      "macOS launchd Daemons",
      "Linux Systems & Shell",
      "CI/CD (GitHub Actions)",
      "System Observability & APM",
      "APFS & Storage Telemetry"
    ]
  },
  {
    category: "Applied AI & LLM Systems",
    description: "Integrating intelligent reasoning engines grounded in verified system data, structured outputs, and semantic document retrieval.",
    technologies: [
      "Gemini API (Interactions / 1.5)",
      "Document AI & OCR",
      "Retrieval-Augmented Generation (RAG)",
      "Telemetry-Grounded Prompts",
      "Structured JSON Output Schemas",
      "Vector Embeddings & Semantic Search",
      "Local AI Workflows"
    ]
  }
];

export const aboutData = {
  biography: [
    "I'm a full-stack software engineer with over 6 years of experience engineering production software across web, mobile, distributed backend services, and applied AI systems.",
    "My engineering philosophy centers on end-to-end craft: from designing fluid, accessible browser interactions to architecting low-overhead daemons, resilient event streams, and verifiable data pipelines.",
    "Currently based in Lubbock, Texas, I am pursuing my Master of Science in Computer Science at Texas Tech University (expected completion December 2027) while continually pushing forward projects at the intersection of developer tools, systems observability, and AI."
  ],
  education: [
    {
      institution: "Texas Tech University",
      degree: "M.S. in Computer Science (Expected)",
      duration: "Aug 2026 – Dec 2027",
      location: "Lubbock (Texas), United States",
      level: "Graduate Education",
      details: "Edward E. Whitacre Jr. College of Engineering"
    },
    {
      institution: "Kurukshetra University",
      degree: "B.Tech in Computer Science - 71.64%",
      duration: "Aug 2015 – Jun 2019",
      location: "Haryana, India",
      level: "Undergraduate Education",
      details: "E-Max Group of Institutions"
    }
  ],
  principles: [
    {
      title: "Verifiable Systems",
      desc: "Observability must be grounded in raw truth. We build telemetry tools that explain exactly what happened at the byte and syscall level."
    },
    {
      title: "Seamless Ergonomics",
      desc: "An interface should feel alive, instantaneous, and purposeful without sacrificing accessibility or system efficiency."
    },
    {
      title: "Full-Stack Ownership",
      desc: "True reliability comes from understanding every layer of the cake: kernel daemons, database WAL files, API transports, and browser layout passes."
    }
  ]
};
