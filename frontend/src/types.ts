export interface Profile {
  name: string
  role: string
  headline: string
  location: string
  status: string
  intro: string
  rotatingWords: string[]
  about: string[]
  links: { linkedin: string; linkedinLabel: string }
  softSkills: { name: string; note: string }[]
}

export interface Stat {
  value: string
  label: string
}

export interface SkillGroup {
  id: string
  title: string
  items: string[]
}

export interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  tags: string[]
  status: string
  statusTone: 'live' | 'progress' | 'neutral'
  description: string
  tech: string[]
  contribution: string
  links: { github?: string; demo?: string }
}

export interface Experience {
  id: string
  role: string
  org: string
  location: string
  period: string
  summary: string
  areas: string[]
  mentor: string
}

export interface Achievement {
  title: string
  org: string
  note: string
  icon: string
}

export interface LeadershipItem {
  title: string
  description: string
}

export interface Education {
  degree: string
  school: string
  period: string
  note: string
}

export interface Portfolio {
  profile: Profile
  stats: Stat[]
  skillGroups: SkillGroup[]
  projects: Project[]
  experience: Experience[]
  achievements: Achievement[]
  leadership: LeadershipItem[]
  education: Education[]
}
