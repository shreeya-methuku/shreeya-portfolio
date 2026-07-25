import { ResumeData } from './types';

export const RESUME: ResumeData = {
  profile: {
    name: "Shreeya S Methuku",
    role: "Systems & Software Engineer",
    email: "ft.shreeyyymethuku@gmail.com",
    phone: "+91 8073393560",
    linkedin: "linkedin.com/in/shreeya-s-methuku",
    github: "github.com/shreeya-methuku",
    location: "Bengaluru, India",
    level: 21,
    class: "Technomancer"
  },
  education: [
    {
      school: "PES University",
      degree: "B.Tech in CS (AI & ML)",
      score: "CGPA: 8.80",
      period: "08/2023 – Present",
      details: "CNR Rao Merit Scholarship Awardee (3x). Coursework: DSA, System Design, Computer Networks, OS, Advanced ML, Databases."
    },
    {
      school: "Vedanta PU College",
      degree: "Karnataka Pre-University Board",
      score: "96%",
      period: "06/2021 – 05/2023",
      details: "Distinction award winner."
    },
    {
      school: "Swargarani School",
      degree: "10th ICSE",
      score: "99.6%",
      period: "06/2011 – 03/2021",
      details: "3x Proficiency award winner."
    }
  ],
  experience: [
    {
      role: "Data Engineering Intern",
      company: "G2.com",
      period: "06/2026 – Present",
      location: "Bengaluru",
      type: "Internship",
      points: [
        "Automated a **12-hour, 3-tool cross-team workflow** into one-click execution by building an end-to-end pipeline (Python, Snowflake, Clay API, Streamlit) shipped to **production on AWS EKS** via GitOps CI/CD and peer code reviews",
        "Achieved **99.9% domain coverage across 17K companies** by root-causing wrong-domain failures and redesigning the enrichment waterfall (ZoomInfo, Clay providers, AI-agent consensus); raised LinkedIn profile coverage **from 50% to 70%** across 29K+ contacts"
      ]
    },
    {
      role: "Machine Learning Intern",
      company: "Guru Jana Chartered Accountants",
      period: "05/2025 – 06/2025",
      location: "Bengaluru",
      type: "Internship",
      points: [
        "Improved financial forecast accuracy to **96%** across 3 enterprise datasets (300K+ rows) by engineering 30+ features and benchmarking ARIMA, SARIMA, and XGBoost",
        "Reduced manual support queries by **40%** by building a RAG chatbot with the OpenAI API, LangChain, and semantic search, A/B testing fixed-size vs. semantic chunking"
      ]
    },
    {
      role: "Product Manager",
      company: "AIESEC in India",
      period: "02/2025 – 06/2025",
      location: "India",
      type: "Leadership",
      points: [
        "Improved conversions by **15%** by building automated Python dashboards tracking conversion funnels across 150+ partner organizations",
        "Surfaced a **22% onboarding drop-off** that drove a revised outreach strategy"
      ]
    },
    {
      role: "Vice President — Outgoing Social Sector",
      company: "AIESEC in Bengaluru",
      period: "02/2025 – 09/2025",
      location: "Bengaluru",
      type: "Leadership",
      points: [
        "Drove **INR 5L in revenue** and **180% product growth** (#1 national ranking) by leading a 20+ member team",
        "Global Volunteer, Egypt (2025) — 45-day international project aligned with UN SDGs"
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "C++", "C", "Java", "Go", "JavaScript/TypeScript", "SQL"]
    },
    {
      category: "Backend & Cloud",
      items: ["Flask", "Node.js", "Express.js", "REST APIs", "PostgreSQL", "AWS", "Snowflake", "Docker", "Kubernetes", "Git", "CI/CD"]
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"]
    },
    {
      category: "AI / ML",
      items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "NLP", "Generative AI", "RAG", "LangChain"]
    }
  ],
  projects: [
    {
      name: "KeystoneDB",
      description: "Embedded LSM-Tree Storage Engine. Scaled write throughput ~9x (1→16 threads) with CRC32-checksummed WAL, group commit, skiplist memtable, SSTables with bloom filters, LRU block cache, and MVCC snapshots. Zero acknowledged write loss under crashes.",
      stack: "C++17",
      period: "2026",
      link: "https://github.com/shreeya-methuku/KeystoneDB",
      featured: true
    },
    {
      name: "RaftKV",
      description: "Distributed Replicated Key-Value Store. Implemented Raft consensus from scratch — leader election, log replication, crash-safe persistence. Sub-second failover, linearizable reads/writes. Zero data loss proven: 1,299/1,299 acked writes verified under chaos testing.",
      stack: "Go, Raft",
      period: "2026",
      link: "https://github.com/shreeya-methuku/RaftKV",
      featured: true
    },
    {
      name: "CacheWire",
      description: "Redis-Compatible In-Memory Cache Server. Sustained ~397K GET req/s with full RESP2 protocol compatibility, sharded hash-map storage, per-shard LRU eviction, and TTL expiry. Runs unmodified against redis-cli and redis-benchmark.",
      stack: "Go",
      period: "2026",
      link: "https://github.com/shreeya-methuku/CacheWire",
      featured: true
    },
    {
      name: "Yojna-Setu",
      description: "Voice-First Multilingual GenAI Assistant. Voice-to-voice discovery of 21 welfare schemes across 5 Indian languages with 100% availability under AWS outages. Caching cut LLM calls by 40%. AI for Bharat Hackathon 2026.",
      stack: "Next.js, AWS Bedrock, Polly, Transcribe, DynamoDB",
      period: "2026",
      link: "https://yojna-setu.vercel.app",
      featured: false
    },
    {
      name: "Point of Sale Simulator",
      description: "Full-Stack Retail System with secure coding practices (bcrypt auth, RBAC, input validation) across 14+ REST APIs. Achieved 100% execution across 111+ unit and integration tests.",
      stack: "React 19, TypeScript, Flask",
      period: "2025",
      link: "https://github.com/shreeya-methuku/POS-Simulator",
      featured: false
    },
    {
      name: "Sleep Staging from Raw EEG",
      description: "Real-time sleep-staging model using causal convolutional neural networks on single channel EEG data.",
      stack: "Python, Causal Inference, Deep Learning",
      period: "2025",
      featured: false
    },
    {
      name: "Urban Crime Hotspots Analysis",
      description: "Causal Inference and Predictive Modeling framework for urban crime rates (R-squared 0.887). Analyzed 700+ data points.",
      stack: "Scikit-learn, XGBoost, SciPy, DoWhy",
      period: "2025",
      link: "https://github.com/shreeya-methuku/Spatiotemporal-and-Causal-Analysis-of-Urban-Crime-Hotspots",
      featured: false
    },
    {
      name: "MOODIFY",
      description: "Web platform recommending content based on user mood with animated questionnaires.",
      stack: "HTML, CSS, JS, Spotify API",
      period: "2024",
      link: "https://moodify-gray.vercel.app/",
      featured: false
    }
  ],
  awards: [
    {
      title: "Prof. C N R Rao Merit Scholarship",
      organization: "PES University",
      description: "Top 20% of cohort — awarded 3x (2024, 2025, 2026)."
    },
    {
      title: "Global Volunteer – Egypt",
      organization: "AIESEC International",
      description: "45-day international volunteering project aligned with UN SDGs (2025)."
    }
  ]
};
