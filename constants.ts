import { ResumeData } from './types';

export const RESUME: ResumeData = {
  profile: {
    name: "Shreeya S Methuku",
    role: "AI/ML Engineer & Product Manager",
    email: "ft.shreeyyymethuku@gmail.com",
    phone: "+91 8073393560",
    linkedin: "linkedin.com/in/shreeya-s-methuku",
    location: "Bengaluru, India",
    level: 21,
    class: "Technomancer"
  },
  education: [
    {
      school: "PES University",
      degree: "B.Tech in CS (AI & ML)",
      score: "CGPA: 8.76",
      period: "08/2023 – Present",
      details: "CNR Scholarship Awardee. Coursework: DSA, Web Tech, Computer Networks, OS, Advanced ML, Databases."
    },
    {
      school: "Vedanta PU College",
      degree: "Karnataka Pre-University Board",
      score: "97%",
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
      role: "Machine Learning Intern",
      company: "Guru Jana Chartered Accountants",
      period: "05/2025 – 06/2025",
      location: "Bengaluru",
      type: "Internship",
      points: [
        "Developed ARIMA, SARIMA, and XGBoost time-series forecasting models for sales, cashflow, and expense prediction (85% accuracy).",
        "Built intelligent RAG system using OpenAI API reducing manual support queries by 40%.",
        "Delivered scalable, data-driven business solutions."
      ]
    },
    {
      role: "Product Manager",
      company: "AIESEC in India",
      period: "02/2025 – 06/2025",
      location: "India",
      type: "Leadership",
      points: [
        "Oversaw global partnerships and performed data analysis on IR performance.",
        "Built regular performance reports using Python scripts to track trends.",
        "Ensured value delivery across 150+ partner organizations."
      ]
    },
    {
      role: "Vice President of Outgoing Social Sector",
      company: "AIESEC in Bengaluru",
      period: "02/2025 – 09/2025",
      location: "Bengaluru",
      type: "Leadership",
      points: [
        "Led market research using data-driven insights to raise ₹5 L in revenue.",
        "Maintained CRM system, leading a team of 20+ individuals achieving 180% product growth.",
        "Achieved #1 national and #7 global ranking."
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["Python", "C", "C++", "Java", "JavaScript", "SQL"]
    },
    {
      category: "Web Tech",
      items: ["React.js", "Node.js", "Express.js", "TypeScript", "Tailwind CSS", "HTML/CSS"]
    },
    {
      category: "AI / ML",
      items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "Deep Learning", "LLMs (RAG)"]
    },
    {
      category: "Tools",
      items: ["Firebase", "Git", "MLflow", "LangChain", "LLaMaIndex", "ROS"]
    }
  ],
  projects: [
    {
      name: "MOODIFY",
      description: "Web platform recommending content based on user mood with animated questionnaires.",
      stack: "HTML, CSS, JS, Spotify API",
      period: "09/2024 – 10/2024",
      link: "https://moodify-gray.vercel.app/",
      featured: true
    },
    {
      name: "Sleep Staging from Raw EEG",
      description: "Real-time sleep-staging model using causal convolutional neural networks on single channel EEG data.",
      stack: "Python, Causal Inference, Deep Learning",
      period: "09/2025 – Present",
      featured: true
    },
    {
      name: "Urban Crime Hotspots Analysis",
      description: "Causal Inference and Predictive Modeling framework for urban crime rates (R-squared 0.887). Analyzed 700+ data points.",
      stack: "Scikit-learn, XGBoost, SciPy, DoWhy",
      period: "08/2025 – 10/2025",
      link: "https://github.com/shreeya-methuku/Spatiotemporal-and-Causal-Analysis-of-Urban-Crime-Hotspots",
      featured: true
    },
    {
      name: "Interpretable AI for Medicine",
      description: "Class-Weighted GRU-D model with PARAFAC2 Tensor Decomposition to predict MCI-to-AD conversion (AUC 0.80).",
      stack: "GRU-D, PARAFAC2, Python",
      period: "08/2025 – 10/2025",
      link: "https://github.com/orgs/MINIONS-AFML/repositories",
      featured: false
    },
    {
      name: "Zoho Chat Automation",
      description: "Forecasting models for finance and intelligent RAG system for support queries.",
      stack: "Python, OpenAI API, XGBoost",
      period: "05/2025 – 06/2025",
      link: "https://github.com/shreeya-methuku/AI-Powered-Chatbot-for-Zoho-Support",
      featured: false
    },
    {
      name: "Modelforge",
      description: "Low-code platform to simplify and automate end-to-end machine learning workflows.",
      stack: "TensorFlow, PyTorch, MLflow",
      period: "05/2024 – 07/2024",
      link: "https://github.com/shreeya-methuku/ModelForge",
      featured: false
    },
    {
      name: "POS Simulator",
      description: "Secure Point-of-Sale simulator with RBAC and 100% test execution coverage.",
      stack: "Python Flask, MySQL",
      period: "09/2025 – 10/2025",
      link: "https://github.com/shreeya-methuku/POS-Simulator",
      featured: false
    },
    {
      name: "Grab and Go",
      description: "Scalable canteen management system with real-time ordering and inventory tracking.",
      stack: "Typescript, React.js, Tailwind, Node.js",
      period: "09/2025 – 10/2025",
      link: "https://github.com/shreeya-methuku/Grab-n-go-smart-canteen-dbms",
      featured: false
    }
  ],
  awards: [
    {
      title: "Prof. C N R Rao Merit Scholarship",
      organization: "PES University",
      description: "Top 20% distinction award for first 2 semesters."
    },
    {
      title: "Global Volunteer – Egypt",
      organization: "AIESEC International",
      description: "45-day international volunteering project aligned with UN SDGs."
    }
  ]
};