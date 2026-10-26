import { Component, type CSSProperties, type ErrorInfo, type ReactNode, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleDot, Clipboard, Code2, Cpu, Download,
  ExternalLink, Github, Globe2, Layers3, Linkedin, Mail, MapPin, Menu, Moon, Network,
  Search, Sparkles, Sun, Terminal, X, Zap,
} from 'lucide-react'
import { education, experience } from './data/experience'
import { featuredProjects, projects, type Project, type ProjectCategory } from './data/projects'
import { highlights, personal } from './data/personal'
import { skillGroups } from './data/skills'

type Theme = 'dark' | 'light'
type Filter = 'All Projects' | 'Featured' | ProjectCategory

const ease = [0.22, 1, 0.36, 1] as const

function getProjectIdFromHash() {
  const match = window.location.hash.match(/^#\/projects\/([^/]+)/)
  return match?.[1] ?? null
}

function scrollToId(id: string) {
  window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio render error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <div className="fatal-screen"><div><span className="eyebrow">SYSTEM MESSAGE</span><h1>Something went wrong.</h1><p>Reload the page to restart the portfolio experience.</p><button className="button button-primary" onClick={() => window.location.reload()}>Reload portfolio <ArrowRight size={16} /></button></div></div>
    }
    return this.props.children
  }
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('portfolio-theme') as Theme) || 'dark')
  const [projectId, setProjectId] = useState<string | null>(getProjectIdFromHash)

  useEffect(() => {
    const onHashChange = () => setProjectId(getProjectIdFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [projectId])

  const openProject = (id: string) => { window.location.hash = `#/projects/${id}`; window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }
  const goHome = () => { window.location.hash = '#/'; window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }
  const project = projectId ? projects.find((item) => item.id === projectId) : undefined

  return <ErrorBoundary>{project ? <ProjectDetails project={project} theme={theme} setTheme={setTheme} goHome={goHome} /> : <Home theme={theme} setTheme={setTheme} openProject={openProject} />}</ErrorBoundary>
}

function SiteHeader({ theme, setTheme, compact = false }: { theme: Theme; setTheme: (theme: Theme) => void; compact?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = [['about', 'Profile'], ['research', 'Research'], ['education', 'Journey'], ['skills', 'Skills'], ['projects', 'Projects']] as const

  const handleNav = (id: string) => {
    setMenuOpen(false)
    if (window.location.hash.startsWith('#/projects/')) {
      window.location.hash = '#/'
      setTimeout(() => scrollToId(id), 80)
    } else scrollToId(id)
  }

  return <>
    <div className="progress-track"><div className="progress-bar" /></div>
    <header className={`site-header ${compact ? 'site-header-compact' : ''}`}>
      <button className="brand" onClick={() => { window.location.hash = '#/'; window.scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="Go to home">
        <span className="brand-mark"><span>BB</span><i /></span>
        <span className="brand-copy"><strong>Bilal Bouizdouzene</strong><small>AI ENGINEER / RESEARCHER</small></span>
      </button>
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">
        {nav.map(([id, label]) => <button key={id} onClick={() => handleNav(id)}>{label}</button>)}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="header-contact" onClick={() => handleNav('contact')}>Let’s talk <ArrowUpRight size={15} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
  </>
}

function Home({ theme, setTheme, openProject }: { theme: Theme; setTheme: (theme: Theme) => void; openProject: (id: string) => void }) {
  return <div className="app-shell">
    <SiteHeader theme={theme} setTheme={setTheme} />
    <main>
      <Hero />
      <ProfileSection />
      <FeaturedSection openProject={openProject} />
      <ResearchSection openProject={openProject} />
      <EducationSection />
      <SkillsSection />
      <BuildSection />
      <ArchiveSection openProject={openProject} />
      <ResumeContactSection />
    </main>
    <Footer />
    <BackToTop />
  </div>
}

function Hero() {
  const reduceMotion = useReducedMotion()
  return <section className="hero section-wrap" id="top">
    <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
    <div className="hero-grid" />
    <div className="hero-content">
      <motion.div initial={reduceMotion ? undefined : { opacity: 0, y: 18 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .7, ease }} className="hero-kicker"><span className="status-dot" /> {personal.availability}</motion.div>
      <motion.h1 initial={reduceMotion ? undefined : { opacity: 0, y: 24 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .8, delay: .08, ease }}>I build systems that<br /><em>listen, reason & ship.</em></motion.h1>
      <motion.p className="hero-lede" initial={reduceMotion ? undefined : { opacity: 0, y: 18 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .7, delay: .17, ease }}>AI Engineer focused on Speech AI, NLP, LLMs and agentic systems — with research discipline and a production-oriented mindset.</motion.p>
      <motion.div className="hero-ctas" initial={reduceMotion ? undefined : { opacity: 0, y: 14 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .7, delay: .24, ease }}>
        <button className="button button-primary" onClick={() => scrollToId('projects')}>Explore projects <ArrowDownRight size={17} /></button>
        <a className="button button-ghost" href={`mailto:${personal.email}`}>Get in touch <Mail size={16} /></a>
      </motion.div>
      <div className="hero-meta"><span><MapPin size={14} /> {personal.location}</span><span className="meta-separator" /><span>Available internationally</span></div>
    </div>
    <motion.div className="hero-visual" initial={reduceMotion ? undefined : { opacity: 0, scale: .96 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .18, ease }}>
      <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
      <div className="visual-core"><div className="core-ring" /><div className="core-word">SPEECH<span>·</span>AI</div><div className="core-caption">SIGNAL → CONTEXT</div></div>
      <svg className="network-svg" viewBox="0 0 530 520" aria-label="Abstract network visualization" role="img">
        <defs><linearGradient id="heroLine" x1="0" x2="1"><stop offset="0" stopColor="#8d63ff" /><stop offset="1" stopColor="#71d8e8" /></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        <g className="network-lines" stroke="url(#heroLine)" strokeWidth="1.2" opacity=".8"><path d="M76 132 L158 74 L254 126 L350 66 L460 138" /><path d="M76 132 L122 242 L234 216 L350 66" /><path d="M122 242 L206 370 L335 322 L460 404" /><path d="M234 216 L335 322 L410 256 L460 138" /><path d="M206 370 L106 444 L254 454 L460 404" /><path d="M350 66 L410 256" /></g>
        <g className="network-nodes" fill="#071018" stroke="url(#heroLine)" strokeWidth="2" filter="url(#glow)"><circle cx="76" cy="132" r="5" /><circle cx="158" cy="74" r="4" /><circle cx="254" cy="126" r="5" /><circle cx="350" cy="66" r="6" /><circle cx="460" cy="138" r="4" /><circle cx="122" cy="242" r="4" /><circle cx="234" cy="216" r="5" /><circle cx="410" cy="256" r="5" /><circle cx="206" cy="370" r="4" /><circle cx="335" cy="322" r="6" /><circle cx="106" cy="444" r="5" /><circle cx="254" cy="454" r="4" /><circle cx="460" cy="404" r="6" /></g>
        <g className="waveform" fill="none" stroke="#a89bff" strokeWidth="2"><path d="M42 311 C63 311 61 296 79 296 S100 336 120 336 S141 275 161 275 S177 319 197 319 S216 292 237 292 S254 350 276 350 S296 288 315 288 S333 317 353 317 S373 300 395 300 S418 331 438 331 S463 284 487 284" /></g>
      </svg>
      <div className="hero-terminal"><span className="terminal-dot" /><span className="terminal-dot" /><span className="terminal-dot" /><code><b>speech.pipeline</b><i> / realtime</i> <span>→</span> ready</code></div>
    </motion.div>
    <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><div className="scroll-line" /></div>
  </section>
}

function SectionHeading({ eyebrow, title, text, action }: { eyebrow: string; title: ReactNode; text?: string; action?: ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{text && <p>{text}</p>}{action}</div>
}

function ProfileSection() {
  return <section className="section-wrap section-profile" id="about"><SectionHeading eyebrow="01 / PROFILE" title={<>Research depth.<br /><span>Engineering range.</span></>} text="An AI engineer and researcher working across speech, language and applied machine learning." />
    <div className="profile-layout"><div className="profile-copy"><p className="large-copy">My work sits at the intersection of <strong>speech, language and applied machine learning</strong>. I move from a difficult question to a measurable experiment, then shape the result into a tool someone can actually use.</p><p>Across Morocco and France, my training brings together low-resource ASR research, NLP and RAG systems, agentic orchestration and practical API integration. My research internship at GIPSA-lab in Grenoble focused on Whisper-based recognition for Silbo Gomero.</p><div className="profile-signature"><span className="signature-line" /><span>Bilal Bouizdouzene<br /><small>AI ENGINEER · RESEARCHER</small></span></div></div><div className="profile-side"><div className="portrait-card"><img src={personal.portraitPath} alt="Bilal Bouizdouzene wearing academic regalia" /><div className="portrait-caption"><span>PROFILE / 2026</span><strong>Bilal Bouizdouzene</strong></div></div><div className="highlight-grid">{highlights.map((item, index) => <motion.div className="highlight-card" key={item.eyebrow} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ delay: index * .08, duration: .55, ease }}><span>{item.eyebrow}</span><strong>{item.title}</strong><p>{item.text}</p><ArrowUpRight size={16} /></motion.div>)}</div></div></div>
  </section>
}

function FeaturedSection({ openProject }: { openProject: (id: string) => void }) {
  return <section className="section-wrap section-featured" id="featured"><SectionHeading eyebrow="02 / SELECTED WORK" title={<>Systems with a<br /><span>reason to exist.</span></>} text="Research and engineering projects — each one grounded in a real problem, a clear system boundary and an honest account of what was measured." action={<button className="text-link" onClick={() => scrollToId('projects')}>View archive <ArrowRight size={15} /></button>} />
    <div className="featured-grid">{featuredProjects.slice(0, 6).map((project, index) => <ProjectCard key={project.id} project={project} index={index} openProject={openProject} featured />)}</div>
  </section>
}

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <div className={`project-visual visual-${project.visual} accent-${project.accent} ${compact ? 'visual-compact' : ''}`}>
    <div className="visual-label"><span className="visual-pulse" /> {project.category.toUpperCase()}</div>
    {project.cover ? <><img className="project-cover" src={project.cover} alt={`${project.title} project cover`} /><div className="project-cover-shade" /></> : <>
      {project.visual === 'wave' && <><div className="wave-grid" /><svg viewBox="0 0 600 210" className="project-wave"><path d="M10 118 C29 118 25 90 48 90 S66 148 91 148 S118 54 141 54 S163 131 187 131 S211 98 232 98 S252 161 274 161 S297 72 320 72 S343 126 365 126 S390 92 411 92 S430 149 452 149 S476 66 503 66 S529 113 590 113" /></svg><div className="wave-badge">WAV / 16kHz<br /><strong>ASR SIGNAL</strong></div></>}
      {project.visual === 'network' && <><div className="network-mesh"><span /><span /><span /><span /><span /><span /><span /></div><div className="network-label">RETRIEVE <i>→</i> REASON <i>→</i> RESPOND</div></>}
      {project.visual === 'satellite' && <><div className="sat-grid" /><div className="sat-shape sat-shape-a" /><div className="sat-shape sat-shape-b" /><div className="sat-label">GEO / 46.2°N<br /><strong>VISUAL INTELLIGENCE</strong></div></>}
      {project.visual === 'document' && <><div className="doc-paper"><span /><span /><span /><span /><b>RISK SIGNALS</b></div><div className="doc-scan" /><div className="doc-label">OCR / LAYOUT / REVIEW</div></>}
      {project.visual === 'forecast' && <><div className="forecast-grid" /><svg viewBox="0 0 600 240" className="forecast-line"><path d="M15 195 C64 190 72 150 115 164 S166 128 207 147 S248 93 291 112 S336 77 370 92 S416 51 450 77 S494 45 580 34" /><path className="forecast-ghost" d="M15 195 C64 190 72 150 115 164 S166 128 207 147 S248 93 291 112 S336 77 370 92 S416 51 450 77 S494 45 580 34" /></svg><div className="forecast-label">SIGNAL / T+12<br /><strong>DECISION READY</strong></div></>}
      {project.visual === 'grid' && <><div className="idea-grid">{Array.from({ length: 24 }).map((_, i) => <i key={i} className={i % 7 === 0 ? 'active' : ''} />)}</div><div className="grid-label">EMBEDDING SPACE<br /><strong>EXPLORE → STRUCTURE</strong></div></>}
    </>}
  </div>
}

function ProjectCard({ project, index, openProject, featured = false }: { project: Project; index: number; openProject: (id: string) => void; featured?: boolean }) {
  return <motion.article className={`project-card ${featured ? 'project-card-featured' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55, delay: Math.min(index * .06, .25), ease }} onClick={() => openProject(project.id)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openProject(project.id) }}>
    <ProjectVisual project={project} compact={!featured} />
    <div className="project-card-body"><div className="project-card-top"><span className="project-type">{project.type} {project.organization ? `· ${project.organization}` : ''}</span><ArrowUpRight size={18} /></div><h3>{project.title}</h3><p>{project.shortDescription}</p><div className="tech-row">{project.technologies.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}</div></div>
  </motion.article>
}

function ResearchSection({ openProject }: { openProject: (id: string) => void }) {
  const research = projects[0]
  return <section className="section-wrap research-section" id="research"><div className="research-glow" /><SectionHeading eyebrow="03 / RESEARCH EXPERIENCE" title={<>Where the signal<br /><span>gets difficult.</span></>} text="Six months at GIPSA-lab, Grenoble, working on speech recognition where every data point matters." />
    <div className="research-panel"><div className="research-copy"><div className="lab-lockup"><span className="lab-symbol"><CircleDot size={20} /></span><div><strong>GIPSA-lab</strong><small>Grenoble INP · Université Grenoble Alpes</small></div></div><div className="research-title-row"><div><span className="eyebrow">MAR — SEP 2026 · GRENOBLE, FR</span><h3>Research Intern —<br /><em>Speech AI & ASR</em></h3></div><button className="round-arrow" onClick={() => openProject(research.id)} aria-label="Explore Silbo ASR research"><ArrowUpRight size={18} /></button></div><p className="research-lede">Automatic Speech Recognition for <strong>Whistled Spanish (Silbo Gomero)</strong> — adapting transformer-based models to an exceptionally low-resource acoustic domain.</p><div className="research-details"><div><span>Focus</span><p>Whisper fine-tuning · synthetic data · evaluation</p></div><div><span>Supervision</span><p>Dr. Julien Meyer · Dr. José Javier Valero-Mas</p></div></div><button className="button button-light" onClick={() => openProject(research.id)}>Explore research <ArrowRight size={16} /></button></div><div className="research-art"><div className="spectro-header"><span>silbo_asr / evaluation</span><span>phrase-independent split</span></div><div className="spectrogram">{Array.from({ length: 64 }).map((_, index) => <i key={index} style={{ '--i': index } as CSSProperties} />)}</div><div className="research-stat-grid">{research.results?.slice(0, 2).map((result) => <div key={result.label}><span>{result.label}</span><strong>{result.value}</strong><small>{result.note}</small></div>)}</div><div className="signal-caption"><span className="signal-line" /> Synthetic data changes the signal.</div></div></div>
  </section>
}

function EducationSection() {
  return <section className="section-wrap education-section" id="education"><SectionHeading eyebrow="04 / ACADEMIC JOURNEY" title={<>One path.<br /><span>Two countries.</span></>} text="A France–Morocco double-degree pathway across mathematics, intelligent systems, data science and AI research." /><div className="journey-ribbon"><span>2021</span><i /><span>2024</span><i /><span>2025</span><i className="ribbon-active" /><span>2026</span></div><div className="timeline"><TimelineItem item={education[2]} marker="01" /><TimelineItem item={education[1]} marker="02" /><TimelineItem item={education[0]} marker="03" /><TimelineItem item={experience} marker="04" research /></div></section>
}

function TimelineItem({ item, marker, research = false }: { item: typeof education[number] | typeof experience; marker: string; research?: boolean }) {
  return <article className={`timeline-item ${research ? 'timeline-research' : ''}`}><div className="timeline-marker">{marker}</div><div className="timeline-content"><div className="timeline-top"><span className="eyebrow">{item.year}</span>{item.status && <span className="status-note">{item.status}</span>}</div><h3>{item.title}</h3><div className="timeline-institution"><strong>{item.institution}</strong><span><MapPin size={13} /> {item.location}</span></div><p>{item.description}</p><div className="timeline-details">{item.details.map((detail) => <span key={detail}><Check size={12} /> {detail}</span>)}</div>{item.technologies && <div className="tech-row timeline-tech">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}</div></article>
}

function SkillsSection() {
  const [active, setActive] = useState('speech')
  const current = skillGroups.find((group) => group.id === active) ?? skillGroups[0]
  return <section className="section-wrap skills-section" id="skills"><SectionHeading eyebrow="05 / TOOLKIT" title={<>The stack behind<br /><span>the signal.</span></>} text="A practical toolkit for moving from data preparation to a usable AI interface." /><div className="skills-layout"><div className="skill-nav">{skillGroups.map((group, index) => <button className={active === group.id ? 'active' : ''} key={group.id} onClick={() => setActive(group.id)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{group.label}</strong><ArrowRight size={15} /></button>)}</div><AnimatePresence mode="wait"><motion.div key={current.id} className="skills-detail" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .3, ease }}><div className="skills-detail-top"><div className="skills-icon"><Cpu size={21} /></div><div><span className="eyebrow">{current.id.toUpperCase()} / CAPABILITIES</span><h3>{current.label}</h3><p>{current.summary}</p></div></div><div className="skill-cloud">{current.skills.map((skill, index) => <motion.span key={skill} initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * .035, duration: .25 }}>{skill}</motion.span>)}</div><div className="skills-footer"><span><span className="status-dot" /> Working knowledge, project-led</span><span>{String(current.skills.length).padStart(2, '0')} skills mapped</span></div></motion.div></AnimatePresence></div></section>
}

function BuildSection() {
  const steps = [['01', 'Frame the problem', 'Clarify users, constraints and measurable outcomes.'], ['02', 'Prepare the data', 'Build reliable inputs, splits and evaluation boundaries.'], ['03', 'Design the system', 'Choose models, prompts and tools around the task.'], ['04', 'Prove the signal', 'Measure errors, inspect failure modes and trade-offs.'], ['05', 'Integrate & deliver', 'Turn the solution into a clear, testable interface.'], ['06', 'Operate & improve', 'Ship with monitoring, fallbacks and room to iterate.']] as const
  return <section className="section-wrap build-section" id="build"><SectionHeading eyebrow="06 / ENGINEERING METHOD" title={<>From problem to<br /><span>production.</span></>} text="A disciplined path from a research question to a reliable AI product." /><div className="build-flow">{steps.map(([number, title, text], index) => <div className="build-step" key={number}><div className="build-number">{number}</div><div className="build-step-body"><h3>{title}</h3><p>{text}</p></div>{index < steps.length - 1 && <ArrowRight className="build-arrow" size={17} />}</div>)}</div></section>
}

function ArchiveSection({ openProject }: { openProject: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>('All Projects')
  const [query, setQuery] = useState('')
  const filters: Filter[] = ['All Projects', 'Featured', 'Speech AI', 'NLP & LLM', 'RAG & Agentic AI', 'Computer Vision', 'Data Science']
  const filtered = useMemo(() => projects.filter((project) => { const matchFilter = filter === 'All Projects' || (filter === 'Featured' ? project.featured : project.category === filter); const matchQuery = `${project.title} ${project.shortDescription} ${project.technologies.join(' ')}`.toLowerCase().includes(query.toLowerCase()); return matchFilter && matchQuery }), [filter, query])
  return <section className="section-wrap archive-section" id="projects"><SectionHeading eyebrow="07 / PROJECT ARCHIVE" title={<>The wider<br /><span>body of work.</span></>} text="Research, academic builds and independent systems — searchable by domain, with project detail views for the full technical context." /><div className="archive-toolbar"><div className="filter-list">{filters.map((item) => <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="search-field"><Search size={16} /><input aria-label="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" /></label></div><div className="archive-grid">{filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} openProject={openProject} />)}</div>{filtered.length === 0 && <div className="empty-state"><Search size={22} /><p>No projects match that search yet.</p><button className="text-link" onClick={() => { setFilter('All Projects'); setQuery('') }}>Clear filters <ArrowRight size={15} /></button></div>}</section>
}

function ResumeContactSection() {
  const [copied, setCopied] = useState(false)
  const copyEmail = async () => { try { await navigator.clipboard.writeText(personal.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${personal.email}` } }
  return <section className="section-wrap end-section" id="contact"><div className="resume-card"><div><span className="eyebrow">08 / NEXT STEP</span><h2>Interested in my work?<br /><span>Let’s make something intelligent.</span></h2><p>Explore my experience and technical background — or send a direct note if you are building something ambitious in AI.</p></div><div className="resume-actions"><a className="button button-primary" href={personal.resumePath} download>Download CV <Download size={16} /></a><button className="button button-outline-light" onClick={() => scrollToId('projects')}>View projects <ArrowRight size={16} /></button></div></div><div className="contact-strip"><div className="contact-email"><span className="eyebrow">OPEN CHANNEL</span><a href={`mailto:${personal.email}`}>{personal.email}</a></div><div className="contact-links"><button onClick={copyEmail}>{copied ? <Check size={16} /> : <Clipboard size={16} />} {copied ? 'Copied' : 'Copy email'}</button><a href={personal.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>{personal.linkedin && <a href={personal.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>}</div></div></section>
}

function Footer() {
  return <footer className="site-footer section-wrap"><div><span className="footer-mark">BB<span>.</span></span><p>Speech AI · NLP · Agentic systems</p></div><div className="footer-right"><span>© {new Date().getFullYear()} Bilal Bouizdouzene</span><span>Built with curiosity & care</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></div></footer>
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const handler = () => setVisible(window.scrollY > 640); window.addEventListener('scroll', handler, { passive: true }); return () => window.removeEventListener('scroll', handler) }, [])
  return <AnimatePresence>{visible && <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUpRight size={18} /></motion.button>}</AnimatePresence>
}

function ProjectDetails({ project, theme, setTheme, goHome }: { project: Project; theme: Theme; setTheme: (theme: Theme) => void; goHome: () => void }) {
  const related = projects.filter((item) => item.id !== project.id && item.category === project.category).slice(0, 3)
  return <div className="app-shell"><SiteHeader theme={theme} setTheme={setTheme} compact /><main className="detail-page"><div className="section-wrap detail-hero"><button className="back-link" onClick={goHome}><ArrowLeft size={15} /> Back to archive</button><div className="detail-hero-grid"><div><span className="eyebrow">{project.category.toUpperCase()} · {project.type.toUpperCase()}</span><h1>{project.title}</h1><p className="detail-lede">{project.fullDescription}</p><div className="detail-actions">{project.github && <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer">View repository <Github size={16} /></a>}{project.demo && <a className="button button-ghost" href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={16} /></a>}</div><div className="detail-meta"><span><Layers3 size={15} /> {project.type}</span>{project.organization && <span><Globe2 size={15} /> {project.organization}</span>}{project.repositoryMeta && <span><CircleDot size={15} /> {project.repositoryMeta}</span>}</div></div><ProjectVisual project={project} /></div></div><div className="detail-content section-wrap"><div className="detail-main"><DetailBlock title="Project overview" icon={<Sparkles size={16} />}><p>{project.fullDescription}</p></DetailBlock><DetailBlock title="Technical architecture" icon={<Network size={16} />}><div className="architecture-flow">{project.architecture.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < project.architecture.length - 1 && <ArrowRight size={14} />}</div>)}</div></DetailBlock><DetailBlock title="Implementation highlights" icon={<Code2 size={16} />}><div className="detail-list">{project.features.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div></DetailBlock><DetailBlock title="Challenges & decisions" icon={<Terminal size={16} />}><div className="detail-list detail-list-muted">{project.challenges.map((item) => <span key={item}><Zap size={14} />{item}</span>)}</div></DetailBlock></div><aside className="detail-aside"><div className="aside-card"><span className="eyebrow">TECHNOLOGIES</span><div className="detail-tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>{project.results && <div className="aside-card results-card"><span className="eyebrow">VALIDATED SIGNALS</span>{project.results.map((result) => <div className="result-row" key={result.label}><span>{result.label}</span><strong>{result.value}</strong><small>{result.note}</small></div>)}</div>}</aside></div>{related.length > 0 && <div className="related section-wrap"><div className="related-top"><span className="eyebrow">KEEP EXPLORING</span><h2>More in {project.category}</h2></div><div className="related-grid">{related.map((item, index) => <ProjectCard key={item.id} project={item} index={index} openProject={(id) => { window.location.hash = `#/projects/${id}`; window.scrollTo({ top: 0, behavior: 'smooth' }) }} />)}</div></div>}</main><Footer /><BackToTop /></div>
}

function DetailBlock({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return <section className="detail-block"><div className="detail-block-heading"><span>{icon}</span><h2>{title}</h2></div>{children}</section>
}

export { App }
