export type ProjectCategory = 'Speech AI' | 'NLP & LLM' | 'RAG & Agentic AI' | 'Computer Vision' | 'Data Science'

export type Project = {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: ProjectCategory
  technologies: string[]
  features: string[]
  architecture: string[]
  challenges: string[]
  results?: { label: string; value: string; note: string }[]
  github?: string
  demo?: string
  featured: boolean
  type: 'Research' | 'Academic' | 'Independent' | 'Collaborative'
  organization?: string
  repositoryMeta?: string
  accent: string
  visual: 'wave' | 'network' | 'satellite' | 'document' | 'forecast' | 'grid'
  cover?: string
}

export const projects: Project[] = [
  {
    id: 'silbo-asr', title: 'Silbo Gomero — Low-Resource ASR', category: 'Speech AI',
    shortDescription: 'Whisper fine-tuning research for a rare whistled speech domain.',
    fullDescription: 'Research on automatic speech recognition for Silbo Gomero, a whistled form of Spanish. The work studies how phrase-independent splitting, augmentation, and synthetic data change recognition accuracy when labelled speech is scarce.',
    technologies: ['Python', 'PyTorch', 'Whisper', 'Hugging Face', 'librosa', 'Praat / TextGrid', 'jiwer'],
    features: ['Four-corpus data preparation', 'Phrase-independent train / validation / test splits', 'Whisper full, frozen and LoRA tracks', 'Synthetic word-level speech generation', 'CER and WER evaluation'],
    architecture: ['Corpus preparation', 'Audio & TextGrid processing', 'Whisper fine-tuning', 'Synthetic data / augmentation', 'CER + WER analysis'],
    challenges: ['Very limited labelled data', 'Avoiding text leakage across repeated phrases', 'Separating acoustic variation from linguistic diversity', 'Interpreting small test sets responsibly'],
    results: [
      { label: 'Best CER', value: '0.218', note: 'Whisper-medium · frozen encoder · synthetic Matrice data' },
      { label: 'Best WER', value: '0.494', note: 'Same phrase-independent test setup' },
      { label: 'Data insight', value: 'r = +0.80', note: 'CER correlation with corpus occurrence-to-type ratio' },
    ],
    github: 'https://github.com/BilalBouizdouzene/silbo-asr', featured: true, type: 'Research', organization: 'GIPSA-lab · Grenoble', accent: 'violet', visual: 'wave', cover: '/images/projects/silbo-asr.jpg',
  },
  {
    id: 'novatel', title: 'NovaTel — Real-Time Voice AI Agent', category: 'Speech AI',
    shortDescription: 'Customer-service voice agent combining streaming speech, grounded retrieval and consent-based human handoff.',
    fullDescription: 'A FastAPI voice-service prototype for a fictional telecom operator. It streams microphone audio over WebSocket or WebRTC, applies Silero VAD and faster-whisper, routes intent to BM25/FAISS retrieval or a consent-based advisor handoff, and returns configurable LLM and TTS responses with latency instrumentation.',
    technologies: ['Python', 'FastAPI', 'WebSocket / WebRTC', 'Silero VAD', 'faster-whisper', 'BM25 / FAISS', 'Gemini / Ollama', 'TTS'],
    features: ['WebSocket PCM and optional WebRTC microphone capture', 'Silero VAD with faster-whisper transcription', 'Intent routing with BM25, FAISS or hybrid retrieval', 'Configurable Gemini, Ollama or OpenAI-compatible LLMs', 'Consent-based advisor inbox with optional CRM connectors', 'VAD, ASR, retrieval, LLM and TTS latency metrics'],
    architecture: ['Microphone', 'WebSocket / WebRTC', 'Silero VAD', 'faster-whisper ASR', 'Intent router', 'BM25 / FAISS RAG or advisor handoff', 'LLM + TTS'],
    challenges: ['Maintaining low latency across VAD, ASR, retrieval, LLM and TTS', 'Keeping answers grounded with abstention when evidence is insufficient', 'Designing consent and handoff boundaries for a fictional service workflow'],
    github: 'https://github.com/BilalBouizdouzene/novatel-real-time-voice-ai-agent', featured: true, type: 'Independent', accent: 'cyan', visual: 'wave', cover: '/images/projects/novatel.jpg',
  },
  {
    id: 'enterprise-rag', title: 'Enterprise RAG & Agentic AI Platform', category: 'RAG & Agentic AI',
    shortDescription: 'Enterprise knowledge platform combining hybrid retrieval, evidence validation and controlled agent routing.',
    fullDescription: 'An enterprise knowledge platform that ingests common document formats, combines lexical and dense retrieval with RRF and optional reranking, routes questions to document, SQL or calculator tools, and returns cited answers or controlled fallbacks.',
    technologies: ['Python', 'FastAPI', 'Streamlit', 'BM25', 'Qdrant', 'LangGraph', 'MLflow', 'Docker'],
    features: ['PDF, TXT, Markdown, DOCX and HTML ingestion', 'BM25 and dense embedding retrieval', 'RRF fusion and optional CrossEncoder reranking', 'Citation and evidence validation', 'Controlled document, SQL and calculator routing'],
    architecture: ['Document ingestion', 'BM25 + dense retrieval', 'RRF + CrossEncoder', 'Evidence validation', 'Document / SQL / calculator routing', 'Cited response or fallback'],
    challenges: ['Balancing lexical and semantic retrieval', 'Keeping answers traceable to source evidence', 'Maintaining useful offline and multilingual fallbacks'],
    github: 'https://github.com/BilalBouizdouzene/Enterprise-RAG-Agentic-AI-Platform', featured: true, type: 'Independent', accent: 'orange', visual: 'network', cover: '/images/projects/enterprise-rag.jpg',
  },
  {
    id: 'geo-llm', title: 'GeoLLM — Satellite Image Intelligence', category: 'Computer Vision',
    shortDescription: 'Satellite image analysis combining classification, segmentation and LLM-generated context.',
    fullDescription: 'A Streamlit application for satellite-image analysis that combines ten-class landscape classification, seven-class geographic segmentation and FLAN-T5 contextual explanations, with downloadable reports and support for common image formats.',
    technologies: ['Python', 'Streamlit', 'PyTorch', 'ResNet-18', 'U-Net', 'MobileNetV2', 'FLAN-T5'],
    features: ['Ten-class landscape classification', 'Seven-class geographic segmentation', 'Contextual analysis with FLAN-T5', 'Interactive visual results', 'PNG, JPG and JPEG uploads'],
    architecture: ['Satellite image', 'ResNet-18 classifier', 'U-Net + MobileNetV2 segmentation', 'Geographic outputs', 'FLAN-T5 explanation', 'Streamlit report'],
    challenges: ['Combining classification and segmentation outputs', 'Explaining visual predictions clearly', 'Keeping model weights and image inputs practical for an interactive workflow'],
    github: 'https://github.com/BilalBouizdouzene/geo-llm-satellite', featured: true, type: 'Collaborative', accent: 'green', visual: 'satellite', cover: '/images/projects/geo-llm.jpg',
  },
  {
    id: 'agent-autonome', title: 'Autonomous Multimodal AI Agent', category: 'RAG & Agentic AI',
    shortDescription: 'Multimodal analyst and planner for text, PDFs, audio, images, video and web sources.',
    fullDescription: 'A Flask-based multimodal analyst that collects and fuses text, PDF, audio, image, video and web inputs, uses OCR, Whisper, embeddings and FAISS retrieval, then generates contextual answers and exports PDF reports, presentations and audio summaries.',
    technologies: ['Python', 'Flask', 'Gemini API', 'Whisper', 'FAISS', 'Sentence Transformers', 'LangChain', 'SQLite'],
    features: ['Multimodal file and URL ingestion', 'OCR and audio/video transcription', 'FAISS retrieval with SourcePolicy reranking', 'Persistent SQLite memory', 'PDF, PPT and audio export'],
    architecture: ['Files / URLs', 'OCR + Whisper + parsers', 'Sentence embeddings', 'FAISS retrieval', 'SourcePolicy reranking', 'Gemini response + exports'],
    challenges: ['Normalising multiple input modalities', 'Maintaining source traceability', 'Coordinating planning across tool outputs'],
    github: 'https://github.com/BilalBouizdouzene/agent_autonome', featured: true, type: 'Academic', organization: 'USMBA · Sorbonne Paris Nord', accent: 'pink', visual: 'network', cover: '/images/projects/agent-autonome.jpg',
  },
  {
    id: 'document-risk', title: 'Multimodal Document Risk Intelligence', category: 'Computer Vision',
    shortDescription: 'Document review platform for OCR, extraction, duplicate search and explainable prioritisation.',
    fullDescription: 'A document-review platform for PDFs and images that preserves text, layout and provenance, extracts fields, checks consistency, searches for duplicates and produces explainable review-priority indicators through a FastAPI dashboard.',
    technologies: ['Python', 'FastAPI', 'OCR', 'Layout analysis', 'SQLite', 'Document AI', 'pytest'],
    features: ['OCR blocks with layout coordinates', 'Document-type detection and field extraction', 'Consistency and duplicate checks', 'Evidence-backed anomaly indicators', 'Review queue and dashboard API'],
    architecture: ['PDF / image intake', 'Render + OCR', 'Field extraction', 'Consistency + duplicate search', 'Anomaly indicators', 'Explainable review queue'],
    challenges: ['Handling noisy scans and varied layouts', 'Keeping provenance attached to extracted fields', 'Prioritising review without overstating risk signals'],
    github: 'https://github.com/BilalBouizdouzene/Multimodal-Document-Risk-Intelligence-Platform', featured: true, type: 'Independent', accent: 'blue', visual: 'document', cover: '/images/projects/document-risk.jpg',
  },
  {
    id: 'multilingual-speech', title: 'Multilingual Speech & NLP Intelligence', category: 'Speech AI',
    shortDescription: 'A speech-to-NLP workflow spanning transcription, language and intent.',
    fullDescription: 'A multilingual speech and language intelligence system covering transcription, language identification, summarisation, named-entity recognition, keyword extraction, intent classification and semantic search.',
    technologies: ['ASR', 'NLP', 'NER', 'Semantic search'],
    features: ['Multilingual transcription', 'Language identification', 'Summarisation', 'NER and keyword extraction', 'Intent classification'],
    architecture: ['Audio', 'ASR', 'Language detection', 'NLP tasks', 'Semantic index', 'Search / insights'],
    challenges: ['Language-specific error propagation', 'Keeping downstream NLP useful under ASR noise'],
    featured: false, type: 'Independent', accent: 'cyan', visual: 'wave', cover: '/images/projects/multilingual-speech.jpg',
  },
  {
    id: 'claimshield-ai', title: 'ClaimShield AI', category: 'Speech AI',
    shortDescription: 'Privacy-aware speech intelligence for automotive claims.',
    fullDescription: 'A claims workflow that transcribes audio with faster-whisper, detects sensitive information, extracts automotive facts, aligns evidence to timestamps and produces protected, traceable outputs with human review.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'faster-whisper', 'SQLite', 'PyAV'],
    features: ['CPU INT8 speech transcription', 'French, English and Arabic language detection', 'PII and automotive-fact extraction', 'Timestamped evidence alignment', 'Protected audio and JSON exports'],
    architecture: ['Audio input', 'FastAPI validation', 'faster-whisper ASR', 'PII + claim fact extraction', 'Human review + protected export'],
    challenges: ['Keeping privacy boundaries clear', 'Linking extracted facts to timestamped evidence', 'Evaluating WER, CER and PII metrics responsibly'],
    github: 'https://github.com/BilalBouizdouzene/claimshield-ai', featured: true, type: 'Independent', repositoryMeta: 'Public · TypeScript · MIT License · Updated 14 hours ago', accent: 'orange', visual: 'document', cover: '/images/projects/claimshield-ai.jpg',
  },
  {
    id: 'echomind', title: 'EchoMind', category: 'Speech AI',
    shortDescription: 'Explainable speech analysis with selective re-decoding.',
    fullDescription: 'A speech-analysis prototype that preserves a baseline transcript, detects uncertainty, selectively re-decodes bounded regions and records correction provenance through a FastAPI dashboard.',
    technologies: ['Python', 'faster-whisper', 'FastAPI', 'Uvicorn', 'Gradio', 'NumPy', 'SciPy'],
    features: ['CPU INT8 speech recognition', 'English, French and Modern Standard Arabic support', 'Baseline and final transcript comparison', 'Uncertainty timeline and correction provenance', 'WER, CER, latency and ablation evaluation'],
    architecture: ['Audio input', 'faster-whisper baseline', 'Uncertainty + policy', 'Selective re-decoding', 'FastAPI / Gradio dashboard', 'Evaluation reports'],
    challenges: ['Making correction decisions inspectable', 'Keeping CPU inference practical', 'Separating measured evidence from demo behavior'],
    github: 'https://github.com/BilalBouizdouzene/EchoMind', featured: false, type: 'Independent', repositoryMeta: 'Public · Python · MIT License · Updated 15 hours ago', accent: 'cyan', visual: 'network', cover: '/images/projects/echomind.jpg',
  },
  {
    id: 'absi', title: 'ABSI — AI Brainstorming & Idea Structuring', category: 'NLP & LLM', shortDescription: 'Multimodal brainstorming agent for generating, scoring and structuring ideas.', fullDescription: 'ABSI is a Flask-based multimodal brainstorming agent that extracts knowledge from PDFs, DOCX files, images and audio, generates and scores ideas with LLMs, groups them thematically and visualises the result through graphs and mind maps.', technologies: ['Python', 'Flask', 'LLMs', 'Sentence Transformers', 'KMeans', 'HDBSCAN', 'UMAP', 'Plotly'], features: ['Multimodal extraction with OCR and transcription', 'Idea generation with originality, coherence and relevance scores', 'Semantic clustering and theme extraction', 'Interactive graphs and mind maps', 'JSON and Plotly visualisation exports'], architecture: ['PDF / DOCX / image / audio', 'Extraction + embeddings', 'RAG + reranking', 'Idea scoring', 'KMeans / HDBSCAN / UMAP', 'Graphs + mind maps'], challenges: ['Turning heterogeneous inputs into comparable ideas', 'Making creative outputs measurable', 'Keeping visual exploration useful and interpretable'], github: 'https://github.com/BilalBouizdouzene/ABSI', featured: false, type: 'Independent', accent: 'violet', visual: 'grid', cover: '/images/projects/absi.jpg',
  },
  {
    id: 'demand-forecasting', title: 'Demand Forecasting & Decision Intelligence', category: 'Data Science', shortDescription: 'Retail forecasts, uncertainty intervals and replenishment priorities from the Walmart M5 dataset.', fullDescription: 'An end-to-end retail forecasting platform built on the public Walmart M5 dataset. It prepares sales, calendar and price data, compares forecasting models across 1-, 7- and 28-day horizons, estimates uncertainty and turns forecasts into replenishment priorities and monitoring reports.', technologies: ['Python', 'Pandas', 'FastAPI', 'Ridge', 'LightGBM', 'XGBoost', 'MLflow'], features: ['Chronological backtesting across multiple horizons', 'Forecast intervals and anomaly flags', 'Model benchmark and operational Ridge artifact', 'Replenishment recommendations with simulated stock', 'FastAPI planner workspace and monitoring views'], architecture: ['M5 sales + calendar + prices', 'Lag and rolling features', 'Forecast models', 'Chronological backtest', 'Intervals + anomaly flags', 'Replenishment decisions'], challenges: ['Preventing temporal leakage', 'Representing uncertainty over long horizons', 'Separating simulated inventory from live operational data'], github: 'https://github.com/BilalBouizdouzene/Demand-Forecasting-Decision-Intelligence-Platform', featured: false, type: 'Independent', accent: 'orange', visual: 'forecast', cover: '/images/projects/demand-forecasting.jpg',
  },
  {
    id: 'churn', title: 'Customer Churn & Retention Intelligence', category: 'Data Science', shortDescription: 'Telecom churn prediction with calibrated risk scoring and retention prioritisation.', fullDescription: 'A telecom churn application built on the IBM Telco Customer Churn dataset. It prepares customer and service features, compares classifiers, calibrates probabilities, selects a business threshold and exposes a Flask dashboard with explainable retention priorities.', technologies: ['Python', 'Flask', 'Scikit-learn', 'XGBoost', 'SHAP', 'Pandas'], features: ['Feature engineering for services and contract value', 'Logistic, Random Forest and XGBoost comparison', 'Calibrated churn probabilities and threshold analysis', 'Risk queue with retention recommendations', 'SHAP explanations and drift monitoring'], architecture: ['IBM Telco CSV', 'Validation + feature engineering', 'Model benchmark', 'Probability calibration', 'Business threshold', 'Flask dashboard + retention queue'], challenges: ['Handling class imbalance', 'Turning probabilities into contact capacity decisions', 'Keeping business simulations distinct from observed data'], github: 'https://github.com/BilalBouizdouzene/Customer-Churn-Prediction-Retention-Intelligence-Platform', featured: false, type: 'Independent', accent: 'pink', visual: 'grid', cover: '/images/projects/churn.jpg',
  },
  {
    id: 'time-series', title: 'Time-Series Forecasting & Decision Intelligence', category: 'Data Science', shortDescription: 'Short-term household electricity forecasting with backtesting and uncertainty intervals.', fullDescription: 'A Streamlit forecasting workflow for hourly household electricity demand using the UCI Individual Household Electric Power Consumption dataset. It compares statistical, machine-learning and LSTM models across 1-, 6-, 24- and 168-hour horizons, then exports forecasts and evaluation reports.', technologies: ['Python', 'Pandas', 'Statsmodels', 'Prophet', 'XGBoost', 'LSTM', 'Streamlit'], features: ['Hourly aggregation of UCI household power data', 'Chronological walk-forward backtesting', 'Statistical, ML and LSTM model comparison', 'Residual-based forecast intervals', 'Streamlit pages for forecasts, errors and model insights'], architecture: ['UCI minute readings', 'Hourly aggregation', 'Calendar + lag features', 'Forecast models', 'Walk-forward evaluation', 'Streamlit dashboard'], challenges: ['Forecasting a single household without weather or occupancy data', 'Comparing models across different horizons', 'Communicating approximate uncertainty responsibly'], github: 'https://github.com/BilalBouizdouzene/Time-Series-Forecasting-Decision-Intelligence-Platform', featured: false, type: 'Independent', accent: 'green', visual: 'forecast', cover: '/images/projects/time-series.jpg',
  },
  {
    id: 'mmctr', title: 'MM-CTR — Multimodal Recommendation Embeddings', category: 'NLP & LLM', shortDescription: 'From-scratch multimodal item embeddings and CTR modelling for the MM-CTR challenge.', fullDescription: 'An implementation of the MM-CTR WWW 2025 challenge pipeline on MicroLens-1M: it fuses text, image and recommendation signals into 128-dimensional item embeddings, then feeds them into a Transformer plus DCNv2 click-through-rate model.', technologies: ['Python', 'PyTorch', 'PCA', 'CLIP-like encoders', 'InfoNCE', 'Transformer', 'DCNv2'], features: ['Text and image item embeddings', 'Separate PCA compression to a 128-dimensional vector', 'InfoNCE refinement from co-consumption sequences', 'Transformer modelling of item history', 'DCNv2 and MLP for CTR prediction'], architecture: ['Item text + images', 'Text / image encoders', 'PCA fusion to 128d', 'InfoNCE refinement', 'Transformer + DCNv2', 'CTR probability'], challenges: ['Aligning multiple item modalities', 'Keeping Task 1 embeddings reusable for Task 2', 'Efficient parquet and item-feature lookups'], github: 'https://github.com/BilalBouizdouzene/mmctr2025', featured: false, type: 'Academic', accent: 'blue', visual: 'network', cover: '/images/projects/mmctr.jpg',
  },
  {
    id: 'chatbot-rag', title: 'Chatbot RAG', category: 'RAG & Agentic AI', shortDescription: 'Multimodal RAG assistant for text, audio and document-based questions.', fullDescription: 'A Flask assistant that accepts text, audio, PDFs, DOCX files and images, transcribes or extracts their contents, indexes chunks with Sentence Transformers and FAISS, and generates context-aware answers with Gemini while preserving conversation history in SQLite.', technologies: ['Python', 'Flask', 'Whisper', 'Gemini 2.5 Pro', 'Sentence Transformers', 'FAISS', 'SQLite'], features: ['PDF, DOCX and image upload with OCR', 'Audio questions transcribed with Whisper', 'Semantic retrieval with FAISS', 'Multi-session conversation history', 'Source visualisation for generated answers'], architecture: ['Text / audio / files', 'Extraction + chunking', 'Sentence embeddings', 'FAISS retrieval + reranking', 'SQLite history', 'Gemini grounded response'], challenges: ['Keeping multimodal inputs in one retrieval flow', 'Maintaining context across sessions', 'Making retrieved sources visible to the user'], github: 'https://github.com/BilalBouizdouzene/chatbot-rag', featured: false, type: 'Independent', accent: 'violet', visual: 'document', cover: '/images/projects/chatbot-rag.jpg',
  },
  {
    id: 'cosmetovigilance', title: 'Assistant Cosmetovigilance', category: 'NLP & LLM', shortDescription: 'Cosmetic-safety assistant combining structured data, fuzzy search and RAG.', fullDescription: 'A cosmetic-vigilance project that turns CSV, open-data, regulatory PDFs and scraped sources into a SQLite knowledge base, then combines RapidFuzz, FAISS embeddings and Gemini through a Streamlit assistant. It also includes an optional star-schema data warehouse and decision interface.', technologies: ['Python', 'SQLite', 'Streamlit', 'RapidFuzz', 'Sentence Transformers', 'FAISS', 'Gemini', 'PyMuPDF'], features: ['Product, ingredient and incident data preparation', 'Typo-tolerant fuzzy search with RapidFuzz', 'Semantic search and RAG with FAISS', 'Natural-language assistant grounded in SQLite', 'Optional star-schema warehouse and BI view'], architecture: ['CSV / open data / PDFs / web', 'ETL + INCI normalisation', 'SQLite knowledge base', 'RapidFuzz + FAISS retrieval', 'RAG with Gemini', 'Streamlit assistant + BI'], challenges: ['Normalising heterogeneous cosmetic data', 'Combining structured and semantic retrieval', 'Keeping domain answers grounded in available sources'], github: 'https://github.com/BilalBouizdouzene/assistant-cosmetovigilance', featured: false, type: 'Independent', accent: 'green', visual: 'document', cover: '/images/projects/cosmetovigilance.jpg',
  },
]

const selectedOrder = ['silbo-asr', 'claimshield-ai']
export const featuredProjects = projects.filter((project) => project.featured).sort((a, b) => {
  const aIndex = selectedOrder.indexOf(a.id)
  const bIndex = selectedOrder.indexOf(b.id)
  if (aIndex >= 0 || bIndex >= 0) return (aIndex < 0 ? 99 : aIndex) - (bIndex < 0 ? 99 : bIndex)
  return 0
})
