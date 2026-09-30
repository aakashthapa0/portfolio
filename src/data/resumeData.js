/**
 * Verified Resume Data for Aakash Thapa
 * Matched verbatim with official resume PDF
 */

export const resumeData = {
  name: "Aakash Thapa",
  location: "Lubbock (Texas), United States",
  email: "aakashthapa.work@gmail.com",
  phone: "+1 (806) 283-3741",
  linkedin: "https://www.linkedin.com/in/aakash-thapa-01/",
  directPdfUrl: `${import.meta.env.BASE_URL}Aakash_Thapa_Resume.pdf`,
  summary: "M.S. in Computer Science candidate and Senior Full-Stack Software Engineer with 6+ years of experience building scalable web, mobile, and AI-powered applications using Python, React, Django, and AWS. Experienced in LLM-powered document platforms and AI-assisted development using Cursor for implementation, refactoring, testing, and debugging.",
  education: [
    {
      institution: "Texas Tech University",
      degree: "M.S. in Computer Science (Expected)",
      location: "Lubbock (Texas), United States",
      dates: "Aug 2026 – Dec 2027",
      details: "Edward E. Whitacre Jr. College of Engineering"
    },
    {
      institution: "Kurukshetra University",
      degree: "B.Tech in Computer Science - 71.64%",
      location: "Haryana, India",
      dates: "Aug 2015 – Jun 2019",
      details: "E-Max Group of Institutions"
    }
  ],
  experience: [
    {
      role: "Senior Full-Stack Software Engineer",
      company: "Vivpro",
      location: "Pune, India",
      period: "Nov 2023 – Jul 2026",
      bullets: [
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
      ]
    },
    {
      role: "Full-Stack Software Engineer II",
      company: "Fixcraft",
      location: "Gurgaon, India",
      period: "Aug 2021 – Jul 2023",
      bullets: [
        "Implemented Django-based microservices for WhatsApp, email, SMS, and in-app notifications and integrated Razorpay payments..",
        "Built an e-commerce website from the ground up using Python, Django, and React, catering to both B2B and B2C demands for automobile spare parts.",
        "Led end-to-end development of React Native applications for Android and iOS, increasing the customer base by 28% and migrating web users to the mobile applications.",
        "Migrated a React website to Next.js with server-side rendering, increasing its Lighthouse SEO score by 30%.",
        "Created a private npm package that improved code reuse and reduced new-feature rollout time by 35%.",
        "Guided a team of 3 front-end developers, managing task prioritization and facilitating daily Scrum meetings."
      ]
    },
    {
      role: "Team Lead",
      company: "Innostax Software Labs",
      location: "Gurgaon, India",
      period: "Sep 2020 – Aug 2021",
      bullets: [
        "Devised front-end architecture for 3+ projects using React with responsive design and reusable components, boosting user engagement by 16% and reducing bounce rates by 13%.",
        "Engineered backend structure for 2+ projects, establishing databases and relationships via Node.js, Express.js, and PostgreSQL.",
        "Managed a team of 2–4 engineers, supporting hiring, task allocation, technical reviews, and on-time delivery across multiple client projects.",
        "Led code reviews, offering constructive feedback and expediting new member training."
      ]
    },
    {
      role: "Full-Stack Software Engineer I",
      company: "Innostax Software Labs",
      location: "Gurgaon, India",
      period: "Aug 2019 – Sep 2020",
      bullets: [
        "Built frontend features and component libraries using React and Redux for 2+ client projects, reducing duplicate UI work and accelerating page delivery.",
        "Created and optimized database tables, REST APIs, and query performance (including index creation), enhancing application speed and efficiency.",
        "Implemented unit Testing and end-to-end Testing using frameworks such as Jest, Mocha, and Playwright to improve code reliability."
      ]
    }
  ],
  technologies: [
    { category: "Languages", list: "JavaScript, TypeScript, Python, HTML, CSS, C++" },
    { category: "Frontend", list: "React, Next.js, React Native, Redux" },
    { category: "Backend", list: "Django, Flask, FastAPI, Node.js, Express.js, REST APIs, Celery" },
    { category: "Data & Messaging", list: "PostgreSQL, Redis, Elasticsearch, Kafka" },
    { category: "Cloud & DevOps", list: "AWS (EC2, S3, SQS, Lambda, ECR, Kendra, Cloudwatch), Docker, Kubernetes, Git, GitHub, UNIX/Linux" },
    { category: "AI Tools", list: "Cursor, LLMs (GPT-4, Claude), Prompt Engineering, Claude Skills" },
    { category: "Core Concepts", list: "Data Structures and Algorithms, System Design, Object-Oriented Programming" },
    { category: "Testing & Observability", list: "Datadog, Jest, Mocha, Playwright, Selenium, SonarCloud, Sentry" }
  ],
  featuredProjects: [
    {
      name: "MacPulse",
      role: "Sole Creator & Architect",
      stack: "FastAPI, macOS launchd daemon, React 19, Server-Sent Events (SSE), SQLite WAL, Gemini API",
      highlights: [
        "Architected an event-driven macOS storage and system fleet observability platform featuring native launchd background daemons (<28MB memory).",
        "Engineered an asynchronous FastAPI coordinator with SQLite WAL mode and Server-Sent Events (SSE) streaming real-time filesystem metrics.",
        "Implemented telemetry-grounded Gemini AI diagnosis to identify runaway write bursts and output actionable root-cause recommendations."
      ],
      github: "https://github.com/younameit01/macpulse"
    }
  ]
};
