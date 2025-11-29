export interface ResumeData {
  profile: {
    name: string;
    role: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    level: number;
    class: string;
  };
  education: {
    school: string;
    degree: string;
    score: string;
    period: string;
    details?: string;
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    location: string;
    points: string[];
    type: "Internship" | "Leadership" | "Work";
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: {
    name: string;
    description: string;
    stack: string;
    period: string;
    link?: string;
    featured: boolean;
  }[];
  awards: {
    title: string;
    organization: string;
    description: string;
  }[];
}

export type ViewState = 'BOOT' | 'HOME' | 'STATS' | 'QUESTS' | 'INVENTORY' | 'ARCHIVES';
