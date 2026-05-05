// ── Personal Info ────────────────────────────────────────
export const PERSON = {
  name: 'Raghav Gupta',
  tagline: 'solve · build · repeat',
  email: 'raghavG1267@gmail.com',
  phone: '+91 98717 45652',
  location: 'New Delhi, India',
  linkedin: 'https://linkedin.com/in/itsraghavgupta',
  github: 'https://github.com/Blaze5322',
  role: 'Co-Founder · Vibe Coder · BSc Economics & Data Science',
  university: 'Christ University, Bangalore',
  bio: 'BSc Economics & Data Science student at Christ University, Bangalore. I build AI-powered tools, lead the E-Code Club, and have placed in 13+ competitions across business and tech.\n\nDriven by the belief that technical depth and business thinking belong together.',
  tags: ['AI Engineering', 'Python', 'Economics & Data Science', 'Prompt Engineering', 'Table Tennis'],
  achievements: [
    '13+ competition podium finishes',
    'Overall Head — E-Code Club, Christ University',
    'State-level Table Tennis player',
    '50+ hours community service (Anubandha Charity Trust)',
    'Finance Head — Rotaract Club',
  ],
}

// ── Projects ─────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'p01',
    num: '01',
    title: 'AI Job Bot',
    oneliner: 'Automated end-to-end job application pipeline powered by Claude AI.',
    description:
      'End-to-end AI automation that scrapes job listings, scores them against your resume using Claude, generates personalised cover letters with prompt engineering, and auto-applies via Playwright browser automation. A full agentic pipeline from discovery to submission.',
    stack: ['Python', 'Claude API', 'Playwright', 'Streamlit', 'Prompt Engineering'],
    role: 'Solo',
    github: 'https://github.com/Blaze5322/ai-job-bot',
    live: true,
    comingSoon: false,
  },
  {
    id: 'p02',
    num: '02',
    title: 'Object Counter',
    oneliner: 'Real-time computer vision with YOLOv8 — detect and count anything.',
    description:
      'Real-time object detection & counting system built with YOLOv8 and OpenCV. Features a three-thread pipeline for smooth performance, detects 80+ object classes simultaneously, renders live bounding box overlays, and exposes results through a Streamlit dashboard.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit', 'Threading'],
    role: 'Solo',
    github: 'https://github.com/Blaze5322/Object-Counter',
    live: true,
    comingSoon: false,
  },
  {
    id: 'p03',
    num: '03',
    title: 'Loan EMI Planner',
    oneliner: 'Financial planning tool with prepayment modeling and amortization.',
    description:
      'A Python + Streamlit financial planning tool that computes EMI, total interest, and full amortization schedules for various loan types. Supports prepayment scenarios, flexible interest rates, and visual schedule breakdowns — built for real financial planning use cases.',
    stack: ['Python', 'Streamlit', 'Pandas', 'Matplotlib'],
    role: 'Solo',
    github: 'https://github.com/Blaze5322/loan-emi-planner',
    live: true,
    comingSoon: false,
  },
  {
    id: 'p04',
    num: '04',
    title: 'Coming Soon',
    oneliner: 'Something new is being built.',
    description: '',
    stack: [],
    role: '',
    github: null,
    live: false,
    comingSoon: true,
  },
  {
    id: 'p05',
    num: '05',
    title: 'Coming Soon',
    oneliner: 'Something new is being built.',
    description: '',
    stack: [],
    role: '',
    github: null,
    live: false,
    comingSoon: true,
  },
  {
    id: 'p06',
    num: '06',
    title: 'Coming Soon',
    oneliner: 'Something new is being built.',
    description: '',
    stack: [],
    role: '',
    github: null,
    live: false,
    comingSoon: true,
  },
]

// ── Certifications ────────────────────────────────────────
export const CERTS = [
  {
    id: 'c01',
    issuer: 'Tata / Forage',
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    date: 'April 2026',
    live: true,
  },
  { id: 'c02', issuer: '—', title: 'To be updated', date: '', live: false },
  { id: 'c03', issuer: '—', title: 'To be updated', date: '', live: false },
  { id: 'c04', issuer: '—', title: 'To be updated', date: '', live: false },
  { id: 'c05', issuer: '—', title: 'To be updated', date: '', live: false },
  { id: 'c06', issuer: '—', title: 'To be updated', date: '', live: false },
]

// ── Skills ────────────────────────────────────────────────
export const SKILLS = {
  technical: [
    'Python',
    'AI API Integration',
    'Claude API',
    'OpenAI API',
    'Prompt Engineering',
    'YOLOv8',
    'OpenCV',
    'Streamlit',
    'Excel',
  ],
  business: [
    'Business Development',
    'Operations Management',
    'Strategic Planning',
    'Market Research',
    'Financial Analysis',
  ],
  soft: [
    'Leadership',
    'Problem-Solving',
    'Analytical Thinking',
    'Team Collaboration',
    'Decision-Making',
  ],
}

// ── Camera Path (one entry per section) ──────────────────
export const CAMERA_PATH = [
  { pos: [0, 1.5, 6],    look: [0, 0.5, 0] },    // 0 — Hero / Field
  { pos: [-3, 1.4, 0],   look: [0, 1, 0] },       // 1 — About / Desk
  { pos: [0, 2, 10],     look: [0, 1.5, 0] },     // 2 — Projects / Gallery
  { pos: [5, 1.5, 0],    look: [0, 1, 0] },       // 3 — Skills / Toolshed
  { pos: [-4, 2.5, -5],  look: [0, 1.5, -5] },   // 4 — Certs / Wall
  { pos: [0, 1.5, -12],  look: [0, 1, -12] },    // 5 — Contact / Door
]

// ── Section meta ──────────────────────────────────────────
export const SECTIONS = [
  { label: 'The Field',    id: 'hero' },
  { label: 'The Desk',     id: 'about' },
  { label: 'The Gallery',  id: 'projects' },
  { label: 'The Toolshed', id: 'skills' },
  { label: 'The Wall',     id: 'certs' },
  { label: 'The Door',     id: 'contact' },
]
