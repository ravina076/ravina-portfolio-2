import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, type Variants } from 'framer-motion'
import profilePhoto from './assets/profile.jpeg'
import certPython from './assets/cert.jpeg'
import certDiploma from './assets/doc.jpeg'

const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

function TraceRail() {
  const { scrollYProgress } = useScroll()
  const fillHeight = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const targets = ['hero', ...NAV_SECTIONS.map((s) => s.id)]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    targets.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const allIds = ['hero', ...NAV_SECTIONS.map((s) => s.id)]

  return (
    <div className="trace-rail" aria-hidden="true">
      <div className="trace-rail__track" />
      <motion.div className="trace-rail__fill" style={{ scaleY: fillHeight, height: '100%' }} />
      {allIds.map((id, i) => (
        <div
          key={id}
          className={`trace-rail__dot${activeId === id ? ' is-active' : ''}`}
          style={{ top: `${(i / (allIds.length - 1)) * 100}%` }}
        />
      ))}
    </div>
  )
}

function Nav() {
  return (
    <header className="nav">
      <a href="#hero" className="nav__mark">
        ravina<span>.dev</span>
      </a>
      <nav className="nav__links">
        {NAV_SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

const skills = [
  { name: 'Python', level: 78 },
  { name: 'JavaScript', level: 70 },
  { name: 'HTML & CSS', level: 82 },
  { name: 'Java', level: 65 },
  { name: 'Full-Stack Dev', level: 68 },
  { name: 'Data Analytics', level: 60 },
  { name: 'Git & GitHub', level: 72 },
  { name: 'Problem Solving', level: 80 },
]

function App() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <div className="app">
      <TraceRail />
      <Nav />

      <main className="shell">
        {/* HERO */}
        <section id="hero" ref={heroRef} style={{ borderBottom: 'none' }}>
          <div className="hero">
            <div>
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Pre-final year CSE student
              </motion.p>
              <motion.h1
                className="hero__name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Ravina T
              </motion.h1>
              <motion.p
                className="hero__tagline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Computer Science &amp; Engineering student writing her way from{' '}
                <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>Python scripts</em> and{' '}
                <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>full-stack builds</em> toward a
                career in AI Engineering.
              </motion.p>
              <motion.div
                className="hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <a className="btn btn--solid" href="#certifications">
                  See my work →
                </a>
                <a className="btn btn--ghost" href="#contact">
                  Get in touch
                </a>
              </motion.div>
            </div>

            <motion.div
              className="hero__portrait"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero__portrait-frame">
                <img src={profilePhoto} alt="Portrait of Ravina T" />
              </div>
              <div className="hero__portrait-tag">figure_01 — ravina.jpeg</div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <Reveal className="eyebrow">01 · About</Reveal>
          <div className="about">
            <Reveal className="about__lede">
              I like understanding how things work underneath — languages, frameworks, systems —
              before I trust myself to build with them.
            </Reveal>
            <motion.div className="about__body" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
              <motion.p variants={fadeUp}>
                I'm currently in my pre-final year of B.E. Computer Science &amp; Engineering at
                Sardar Raja College of Engineering, Tenkasi. Alongside coursework, I've been
                building practical experience: a full-stack development internship, a diploma in
                computer programming, and a certification in data science and analytics.
              </motion.p>
              <motion.p variants={fadeUp}>
                My core toolkit is Python, HTML, CSS and JavaScript — and I'm actively extending
                it toward the machine learning side of computer science, with the goal of working
                as an AI Engineer: someone who builds systems that reason, not just run.
              </motion.p>
              <div className="stat-row">
                <div className="stat">
                  <div className="stat__num">3rd</div>
                  <div className="stat__label">Year, CSE</div>
                </div>
                <div className="stat">
                  <div className="stat__num">2</div>
                  <div className="stat__label">Certifications earned</div>
                </div>
                <div className="stat">
                  <div className="stat__num">1</div>
                  <div className="stat__label">Internship completed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <Reveal className="eyebrow">02 · Skills</Reveal>
          <Reveal className="section-title">What I build with</Reveal>
          <motion.div className="skills-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {skills.map((skill, i) => (
              <motion.div className="skill-cell" key={skill.name} variants={fadeUp}>
                <div className="skill-cell__index">{String(i + 1).padStart(2, '0')}</div>
                <div className="skill-cell__name">{skill.name}</div>
                <div className="skill-cell__level">
                  <motion.div
                    className="skill-cell__level-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <Reveal className="eyebrow">03 · Experience</Reveal>
          <Reveal className="section-title">Where I've worked</Reveal>
          <motion.div className="timeline" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.div className="timeline-item" variants={fadeUp}>
              <div className="timeline-item__marker">Dec 2025</div>
              <div>
                <div className="timeline-item__role">Full Stack Development Intern</div>
                <div className="timeline-item__org">Universe Educational Trust</div>
                <p className="timeline-item__desc">
                  Worked hands-on across the stack, building interfaces with HTML, CSS and
                  JavaScript while getting practical exposure to backend fundamentals — turning
                  classroom concepts into working, deployed features.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* EDUCATION */}
        <section id="education">
          <Reveal className="eyebrow">04 · Education</Reveal>
          <Reveal className="section-title">Where I've studied</Reveal>
          <motion.div className="timeline" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.div className="timeline-item" variants={fadeUp}>
              <div className="timeline-item__marker">2023 — 2027</div>
              <div>
                <div className="timeline-item__role">B.E. Computer Science &amp; Engineering</div>
                <div className="timeline-item__org">Sardar Raja College of Engineering, Tenkasi</div>
                <p className="timeline-item__desc">
                  Currently in pre-final year, building a foundation across programming,
                  data structures and systems — alongside self-driven work in Python and
                  full-stack development.
                </p>
              </div>
            </motion.div>
            <motion.div className="timeline-item" variants={fadeUp}>
              <div className="timeline-item__marker">2026</div>
              <div>
                <div className="timeline-item__role">Data Science &amp; Analytics Certificate</div>
                <div className="timeline-item__org">HP LIFE / HP Foundation</div>
                <p className="timeline-item__desc">
                  Completed structured coursework covering the fundamentals of data analysis and
                  how analytics informs real decisions.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications">
          <Reveal className="eyebrow">05 · Certifications</Reveal>
          <Reveal className="section-title">Proof of the work</Reveal>
          <motion.div className="cert-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.div className="cert-card" variants={fadeUp}>
              <div className="cert-card__image">
                <img src={certPython} alt="Python course completion certificate" />
              </div>
              <div className="cert-card__body">
                <div className="cert-card__title">Python — Course Completed</div>
                <div className="cert-card__issuer">Universe Educational Trust</div>
                <div className="cert-card__meta">Reg. No. UCE1317 · 2026</div>
              </div>
            </motion.div>

            <motion.div className="cert-card" variants={fadeUp}>
              <div className="cert-card__image">
                <img src={certDiploma} alt="Diploma in Computer Programming certificate" />
              </div>
              <div className="cert-card__body">
                <div className="cert-card__title">Diploma in Computer Programming</div>
                <div className="cert-card__issuer">United Ackreditering Services Limited</div>
                <div className="cert-card__meta">First Class · Apr – Jun 2024</div>
              </div>
            </motion.div>

            <motion.div className="cert-card cert-card--text" variants={fadeUp}>
              <div className="cert-card__body">
                <div className="cert-card__title">Data Science &amp; Analytics</div>
                <div className="cert-card__issuer">HP LIFE / HP Foundation</div>
                <div className="cert-card__meta">2026</div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact">
          <Reveal className="eyebrow">06 · Contact</Reveal>
          <Reveal className="contact__title">Let's build something worth shipping.</Reveal>
          <motion.div className="contact__links" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.a className="contact__link" href="mailto:ravinathangaraja@gmail.com" variants={fadeUp}>
              <span className="contact__link-label">Email</span>
              <span className="contact__link-value">ravinathangaraja@gmail.com</span>
            </motion.a>
            <motion.a
              className="contact__link"
              href="https://www.linkedin.com/in/ravina-thangaraja-51aa803b7"
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
            >
              <span className="contact__link-label">LinkedIn</span>
              <span className="contact__link-value">ravina-thangaraja</span>
            </motion.a>
            <motion.a
              className="contact__link"
              href="https://github.com/ravina076"
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
            >
              <span className="contact__link-label">GitHub</span>
              <span className="contact__link-value">@ravina076</span>
            </motion.a>
          </motion.div>
        </section>
      </main>

      <footer>Designed &amp; built by Ravina T · {new Date().getFullYear()}</footer>
    </div>
  )
}

export default App
