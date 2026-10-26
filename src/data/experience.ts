export type TimelineItem = {
  year: string
  kind: 'research' | 'education'
  title: string
  institution: string
  location: string
  description: string
  details: string[]
  technologies?: string[]
  status?: string
}

export const experience: TimelineItem = {
  year: 'MAR — SEP 2026',
  kind: 'research',
  title: 'Research Intern — Speech AI & Automatic Speech Recognition',
  institution: 'GIPSA-lab · Grenoble INP — Université Grenoble Alpes',
  location: 'Grenoble, France',
  description: 'Low-resource automatic speech recognition for Silbo Gomero, the whistled form of Spanish spoken on La Gomera.',
  details: [
    'Prepared and analysed whistled speech corpora with WAV audio and Praat TextGrid annotations.',
    'Developed augmentation and synthetic speech strategies to address data scarcity.',
    'Fine-tuned and compared Whisper-based ASR tracks using phrase-independent evaluation.',
    'Measured recognition quality with Character Error Rate (CER) and Word Error Rate (WER).',
  ],
  technologies: ['Python', 'PyTorch', 'Hugging Face', 'Whisper', 'librosa', 'Praat', 'TextGrid', 'jiwer'],
}

export const education: TimelineItem[] = [
  {
    year: '2025 — 2026', kind: 'education', title: 'Master 2 — Exploration Informatique des Données et Décisionnel (EID²)', institution: 'Université Sorbonne Paris Nord', location: 'France', description: 'Advanced studies in artificial intelligence and data science as part of the France–Morocco double-degree pathway.', details: ['International academic experience in France.', 'AI, data exploration and decision support focus.'], status: 'Status configurable',
  },
  {
    year: '2024 — 2025', kind: 'education', title: 'Master 1 — Web Intelligence and Data Science (WISD)', institution: 'Université Sidi Mohamed Ben Abdellah · Faculty of Sciences Dhar El Mahraz', location: 'Fès, Morocco', description: 'Graduate work across machine learning, deep learning, NLP, data science and intelligent systems.', details: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Web Intelligence'], status: 'Completed / verify official issuance',
  },
  {
    year: '2021 — 2024', kind: 'education', title: 'Licence — Mathématiques et Informatique', institution: 'Université Sidi Mohamed Ben Abdellah · Faculty of Sciences Dhar El Mahraz', location: 'Fès, Morocco', description: 'Academic foundation in mathematics, algorithms, programming, statistics and computer science.', details: ['Mathematics', 'Algorithms', 'Programming', 'Statistics', 'Data structures'], status: 'Completed / verify official issuance',
  },
]
