export type SkillGroup = {
  id: string
  label: string
  summary: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'speech',
    label: 'Speech AI & Audio',
    summary: 'From annotated corpora to evaluated transcription systems.',
    skills: ['Whisper', 'faster-whisper', 'Automatic Speech Recognition', 'Audio processing', 'Silero VAD', 'Speech augmentation', 'TTS integration', 'Praat / TextGrid', 'librosa', 'CER / WER evaluation'],
  },
  {
    id: 'nlp',
    label: 'NLP & Generative AI',
    summary: 'Grounded language systems that retrieve, reason and cite.',
    skills: ['Transformers', 'Hugging Face', 'LLMs', 'RAG', 'Hybrid retrieval', 'BM25', 'FAISS', 'Sentence Transformers', 'LangChain', 'LlamaIndex', 'Prompt engineering'],
  },
  {
    id: 'agents',
    label: 'Agentic AI',
    summary: 'Controlled orchestration for tools, context and decisions.',
    skills: ['AI agents', 'Tool calling', 'Agent orchestration', 'Multi-agent systems', 'CrewAI', 'AutoGen', 'LangGraph', 'Context management'],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    summary: 'Modeling, evaluation and feature work with scientific discipline.',
    skills: ['PyTorch', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Neural networks', 'Model evaluation', 'Feature engineering', 'Time-series forecasting'],
  },
  {
    id: 'vision',
    label: 'Computer Vision',
    summary: 'Visual understanding from OCR and segmentation to multimodality.',
    skills: ['YOLO', 'Vision Transformers', 'OpenCV', 'Image segmentation', 'OCR', 'Multimodal learning'],
  },
  {
    id: 'engineering',
    label: 'Engineering & Deployment',
    summary: 'Turning experiments into interfaces, APIs and reproducible workflows.',
    skills: ['Python', 'FastAPI', 'Flask', 'REST APIs', 'WebSocket', 'Docker', 'Git / GitHub', 'Linux', 'SQL', 'Streamlit', 'Pandas', 'NumPy'],
  },
]
