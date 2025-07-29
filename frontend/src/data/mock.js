// Mock data for Aakash Thapa's 3D Portfolio

export const personalInfo = {
  name: "Aakash Thapa",
  title: "Senior Software Engineer",
  location: "Kathmandu, Nepal",
  email: "aakash.thapa@example.com",
  linkedin: "https://linkedin.com/in/aakash-thapa",
  github: "https://github.com/aakash-thapa",
  summary: "Experienced Senior Software Engineer with 4+ years of expertise in full-stack development, leading cross-functional teams, and building scalable applications. Proven track record in Python, React, AWS, and modern web technologies with a passion for creating innovative solutions."
};

export const experience = [
  {
    id: 1,
    title: "Senior Fullstack SDE",
    company: "Vivpro",
    location: "Pune, India",
    duration: "Nov 2023 – Current",
    achievements: [
      "Led the development of microservices architecture using Python and FastAPI",
      "Implemented real-time features using WebSocket and improved system performance by 40%",
      "Mentored junior developers and established coding standards across the team",
      "Integrated AWS services including Lambda, S3, and RDS for scalable solutions"
    ],
    technologies: ["Python", "FastAPI", "React", "AWS", "Docker", "Kubernetes"]
  },
  {
    id: 2,
    title: "Fullstack SDE II",
    company: "Fixcraft",
    location: "Gurgaon, India", 
    duration: "Aug 2021 – Jul 2023",
    achievements: [
      "Developed and maintained complex web applications serving 50K+ users",
      "Optimized database queries and reduced response time by 60%",
      "Implemented CI/CD pipelines using Docker and Jenkins",
      "Built responsive mobile applications using React Native"
    ],
    technologies: ["Django", "React", "PostgreSQL", "React Native", "Docker", "Jenkins"]
  },
  {
    id: 3,
    title: "Team Lead & Fullstack SDE I",
    company: "Innostax Software Labs",
    location: "Gurgaon, India",
    duration: "Aug 2019 – Aug 2021", 
    achievements: [
      "Led a team of 5 developers in delivering client projects on time",
      "Architected and developed 10+ web applications from scratch",
      "Established agile development processes and improved team productivity by 30%",
      "Integrated third-party APIs and payment gateways for e-commerce solutions"
    ],
    technologies: ["Python", "Django", "React", "Node.js", "MongoDB", "Express.js"]
  }
];

export const projects = [
  {
    id: 1,
    title: "Real-time Analytics Dashboard",
    description: "Built a comprehensive analytics platform with real-time data visualization and reporting capabilities",
    technologies: ["React", "D3.js", "Python", "FastAPI", "WebSocket", "Redis"],
    highlights: ["Real-time data streaming", "Interactive charts", "Custom dashboards"],
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "E-commerce Microservices Platform",
    description: "Designed and implemented a scalable microservices architecture for an e-commerce platform",
    technologies: ["Python", "Django", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    highlights: ["Microservices architecture", "Auto-scaling", "Payment integration"],
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Mobile App for Task Management",
    description: "Cross-platform mobile application for team collaboration and task management",
    technologies: ["React Native", "Node.js", "Express", "MongoDB", "Socket.io"],
    highlights: ["Cross-platform", "Real-time collaboration", "Offline support"],
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "AI-Powered Content Management",
    description: "CMS with AI integration for content generation and optimization",
    technologies: ["Next.js", "Python", "TensorFlow", "AWS", "Lambda", "S3"],
    highlights: ["AI content generation", "Auto-optimization", "Cloud deployment"],
    image: "/api/placeholder/400/250"
  }
];

export const skills = {
  languages: [
    { name: "JavaScript", level: 95, icon: "🟨" },
    { name: "Python", level: 90, icon: "🐍" },
    { name: "HTML", level: 95, icon: "🌐" },
    { name: "CSS", level: 90, icon: "🎨" }
  ],
  frameworks: [
    { name: "Django", level: 85, icon: "🚀" },
    { name: "Flask", level: 80, icon: "⚡" },
    { name: "FastAPI", level: 90, icon: "⚡" },
    { name: "React.js", level: 95, icon: "⚛️" },
    { name: "Node.js", level: 85, icon: "💚" },
    { name: "React Native", level: 80, icon: "📱" },
    { name: "Next.js", level: 85, icon: "▲" },
    { name: "Express.js", level: 85, icon: "🚂" }
  ],
  tools: [
    { name: "PostgreSQL", level: 85, icon: "🐘" },
    { name: "MongoDB", level: 80, icon: "🍃" },
    { name: "Redis", level: 75, icon: "🔴" },
    { name: "Docker", level: 85, icon: "🐳" },
    { name: "Kubernetes", level: 75, icon: "☸️" },
    { name: "AWS", level: 80, icon: "☁️" },
    { name: "Git", level: 90, icon: "📚" },
    { name: "Jenkins", level: 70, icon: "🔧" }
  ]
};

export const education = [
  {
    id: 1,
    degree: "Bachelor of Computer Engineering",
    institution: "Tribhuvan University",
    location: "Kathmandu, Nepal",
    duration: "2015 – 2019",
    score: "First Division (75%)",
    type: "degree"
  },
  {
    id: 2,
    degree: "Higher Secondary Education (+2)",
    institution: "National College",
    location: "Kathmandu, Nepal", 
    duration: "2013 – 2015",
    score: "First Division (78%)",
    type: "diploma"
  }
];

export const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-SA-2023-001"
  },
  {
    id: 2,
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "2022",
    credentialId: "PSM-I-2022-002"
  }
];