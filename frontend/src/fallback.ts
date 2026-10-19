import type { Portfolio } from './types'

// Fallback copy of backend/portfolio_data.py so the site still renders
// if the FastAPI server is unreachable. The API response always wins.
export const FALLBACK: Portfolio = {
  profile: {
    name: 'Shreeyansh Mahamuni',
    role: 'AI & Data Science Student · Developer · Hackathon Builder',
    headline:
      'AI & Data Science Student | Full-Stack Developer | AI/ML Enthusiast | Building Practical, Impact-Driven Solutions',
    location: 'Pune, Maharashtra, India',
    status: 'Third Year B.Tech · Open to internships & collaborations',
    intro: "Hi, I'm",
    rotatingWords: [
      'an AI & Data Science Student',
      'a Full-Stack Developer',
      'an AI/ML Enthusiast',
      'a Hackathon Builder',
    ],
    about: [
      "I'm Shreeyansh Mahamuni, a B.Tech student specializing in Artificial Intelligence and Data Science at Zeal College of Engineering and Research, Pune.",
      "I'm interested in building practical technology solutions that combine AI, software engineering, and thoughtful user experiences. My experience spans computer vision projects, web development, backend integration, and collaborative hackathon projects.",
      "I've worked with technologies including Python, React, FastAPI, Next.js, TypeScript, and machine learning frameworks such as YOLO. Through hands-on projects, I've explored real-time detection systems, AI-powered applications, and full-stack platforms that connect frontend interfaces with backend services.",
      "Beyond development, I've participated in hackathons, contributed to technical projects, and taken on responsibilities as a Student Placement Coordinator. These experiences have helped me develop skills in teamwork, communication, coordination, and solving problems under time constraints.",
      "I'm continuously improving my engineering skills, learning to build more reliable and maintainable applications, and looking for opportunities to work on challenging projects with real-world impact.",
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/shreeyansh-mahamuni',
      linkedinLabel: 'shreeyansh-mahamuni',
    },
    softSkills: [
      { name: 'Problem-solving', note: 'Debugging development issues and integrating separate application components.' },
      { name: 'Team collaboration', note: 'Working with teammates during hackathons and technical projects.' },
      { name: 'Communication', note: 'Coordinating with students, peers, and placement stakeholders.' },
      { name: 'Adaptability', note: 'Working across AI/ML, frontend development, and backend integration.' },
      { name: 'Time management', note: 'Delivering project work under hackathon and academic deadlines.' },
      { name: 'Creative thinking', note: 'Combining visual design, animation, and technical implementation.' },
    ],
  },
  stats: [
    { value: '5', label: 'Featured projects' },
    { value: '2x', label: 'Hackathon — 2nd place' },
    { value: '2', label: 'Industry internships' },
    { value: 'TY', label: 'B.Tech AI & DS' },
  ],
  skillGroups: [
    {
      id: 'ai',
      title: 'AI & Machine Learning',
      items: ['Python', 'YOLOv8', 'OpenCV', 'Computer Vision', 'Data Annotation', 'Generative AI', 'Prompt Engineering', 'Autoencoders'],
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: 'backend',
      title: 'Backend & Databases',
      items: ['FastAPI', 'REST APIs', 'Supabase', 'PostgreSQL', 'API Integration', 'Authentication', 'Row-Level Security'],
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      items: ['Git', 'GitHub', 'GitLab', 'VS Code', 'Visual Studio', 'Blender', 'Streamlit', 'Vercel'],
    },
    {
      id: 'more',
      title: 'Additional Technologies',
      items: ['C', 'C++', 'Node.js fundamentals', 'Tripo3D', 'Alpha3D', 'Google Analytics', 'SEO fundamentals'],
    },
  ],
  projects: [
    {
      id: 'agni',
      index: '01',
      title: 'Agni',
      subtitle: 'AI-Powered Fire Detection',
      tags: ['Computer Vision', 'Deep Learning', 'Real-Time Detection'],
      status: 'Featured',
      statusTone: 'live',
      description:
        'Agni is an AI-powered fire detection system developed using computer vision techniques. The project explores real-time fire detection using YOLOv8, with OpenCV for image and video processing and Streamlit for the user interface. The system is designed to identify potential fire incidents from visual input and support timely alerts through an integrated notification workflow.',
      tech: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit', 'Telegram'],
      contribution: 'Computer vision development, detection workflow integration, and project implementation.',
      links: {},
    },
    {
      id: 'cargovision',
      index: '02',
      title: 'CargoVision AI',
      subtitle: 'X-Ray Image Analysis · Object Detection',
      tags: ['AI/ML', 'X-Ray Image Analysis', 'Object Detection'],
      status: 'In Progress',
      statusTone: 'progress',
      description:
        'CargoVision AI explores the use of artificial intelligence to assist in suspicious-item detection within cargo X-ray imagery. The planned technical approach includes YOLO-based object detection, autoencoder-based anomaly detection, segmentation techniques, and density-related analysis, using the PIDray dataset as a relevant benchmark for this problem domain.',
      tech: ['Python', 'YOLOv8', 'Autoencoders', 'OpenCV', 'SAM', 'PIDray'],
      contribution: 'Objective: explore how AI can support security screening through automated visual analysis.',
      links: {},
    },
    {
      id: 'yukti',
      index: '03',
      title: 'Yukti / OPS',
      subtitle: 'Hackathon · Frontend Engineering',
      tags: ['Hackathon', 'Frontend Engineering', 'Full-Stack Integration'],
      status: 'Hackathon Build',
      statusTone: 'live',
      description:
        'A collaborative hackathon project focused on delivering a distinctive, interactive web experience. My primary responsibility was frontend development: the visual design system, page layouts, typography, animations, and user interface consistency — plus planning the integration of the frontend with the backend developed by my teammates.',
      tech: ['React', 'Michroma', 'Geist Sans', 'Geist Mono', 'Animations'],
      contribution: 'Frontend development, UI implementation, animation design, and integration planning.',
      links: {},
    },
    {
      id: 'spnix',
      index: '04',
      title: 'SPNIX',
      subtitle: 'Client Management Platform',
      tags: ['SaaS', 'Full-Stack Development', 'Business Analytics'],
      status: 'In Development',
      statusTone: 'progress',
      description:
        'SPNIX is a digital-service platform concept designed to help businesses manage their websites and monitor their online performance through a centralized dashboard — client-specific dashboards, business profile management, visitor and QR-scan statistics, booking management, subscription information, and administrative workflows. Built for small businesses such as restaurants, salons, and other service providers.',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
      contribution: 'Dashboard UI, business profiles, analytics visualizations, booking interfaces, and secure client data access.',
      links: {},
    },
    {
      id: 'model2d3d',
      index: '05',
      title: 'AI-Assisted 2D-to-3D',
      subtitle: 'Generative AI · 3D Modeling Workflow',
      tags: ['Generative AI', '3D Modeling', 'Digital Content'],
      status: 'Exploration',
      statusTone: 'neutral',
      description:
        'An exploration of workflows for converting 2D visual references into 3D models using AI-assisted modeling tools and conventional 3D software — Tripo3D and Alpha3D for generation, Blender for refinement, and an examination of how CAD-related projects are organized and compiled.',
      tech: ['Blender', 'Tripo3D', 'Alpha3D', 'GitLab', 'CADbase', 'Node.js'],
      contribution: 'Understanding how generative AI can accelerate 3D asset creation in practical digital workflows.',
      links: {},
    },
  ],
  experience: [
    {
      id: 'primathink',
      role: 'Web Development Intern',
      org: 'PrimaThink Technologies Pvt. Ltd.',
      location: 'Pune',
      period: '1 Month',
      summary:
        'During my one-month internship at PrimaThink Technologies Pvt. Ltd., I gained practical exposure to web development and digital marketing workflows. My work included developing HTML/CSS templates and completing structured assignments involving SEO audits, keyword research, Google Ads, social media content planning, and Google Analytics demonstrations.',
      areas: ['HTML', 'CSS', 'SEO', 'Keyword Research', 'Google Ads', 'Google Analytics'],
      mentor: 'Tejashree Kadu',
    },
    {
      id: 'sunfibo',
      role: 'Software Development / AI Intern',
      org: 'Sun Fibo Tech',
      location: '',
      period: '',
      summary:
        'Contributed to AI/ML project workflows involving fire and person detection, image data annotation, model evaluation activities, project documentation, and code repository organization — practical exposure to computer vision development and collaborative AI project workflows.',
      areas: ['Python', 'Computer Vision', 'Data Annotation', 'Model Evaluation', 'Documentation', 'GitHub'],
      mentor: '',
    },
  ],
  achievements: [
    {
      title: '2nd Place — Logic Loop Hackathon',
      org: 'HackBriven',
      note: 'Achieved second place in the Logic Loop hackathon on two consecutive occasions.',
      icon: '01',
    },
    {
      title: 'Student Placement Coordinator',
      org: 'Zeal Central Placement Cell',
      note: 'Contributed to placement-related coordination and student communication.',
      icon: '02',
    },
    {
      title: 'upGrad Campus Connect',
      org: 'Recruitment Drive',
      note: 'Participated in on-ground coordination and assessment-process support at Zeal College.',
      icon: '03',
    },
    {
      title: 'Cultural Activities & Stage Performance',
      org: 'Acting · Dance',
      note: 'Experience in acting, dance, and cultural performances — interests beyond technical development.',
      icon: '04',
    },
  ],
  leadership: [
    {
      title: 'Student Placement Coordinator (SPC)',
      description:
        'Supported placement-related activities, student communication, recruitment-drive coordination, and on-ground event operations through the Zeal Central Placement Cell.',
    },
    {
      title: 'Hackathon Collaboration',
      description:
        'Worked with teammates on technical projects under time constraints, contributing to frontend development, implementation, integration, and problem-solving.',
    },
    {
      title: 'College Event Coordination',
      description:
        'Participated in coordinating campus activities and programs, gaining experience in teamwork, communication, and operational responsibilities.',
    },
    {
      title: 'Acting & Dance',
      description:
        'Participate in cultural performances and stage activities, developing presentation, creative expression, and confidence in front of an audience.',
    },
  ],
  education: [
    {
      degree: 'B.Tech — Artificial Intelligence & Data Science',
      school: 'Zeal College of Engineering and Research, Pune',
      period: 'Third Year · Current as of October 2026',
      note: 'FY CGPA: 9.11',
    },
    { degree: 'HSC — Science', school: 'Sir Parshurambhau College, Pune', period: '', note: '' },
    { degree: 'SSC', school: 'NMV High School, Pune', period: '', note: '' },
  ],
}
