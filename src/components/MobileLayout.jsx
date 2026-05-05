import styles from './MobileLayout.module.css'
import { PERSON, PROJECTS, SKILLS, CERTS } from '../data/content'

export default function MobileLayout() {
  return (
    <div className={styles.layout}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroName}>{PERSON.name.split(' ').join('\n')}</div>
        <div className={styles.heroTag}>{PERSON.tagline}</div>
        <div className={styles.heroBio}>
          BSc Economics &amp; Data Science · AI Builder · 13× Podium
        </div>
        <div className={styles.heroDivider} />
      </section>

      {/* About */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>// about</div>
        <h2 className={styles.sectionTitle}>Builder at the intersection of data &amp; ideas</h2>
        <p className={styles.body}>
          Student at Christ University, Bangalore studying Economics &amp; Data Science.
          I build AI-powered tools, lead the E-Code Club, and have competed in 13+
          business and tech competitions.
        </p>
        <p className={styles.body} style={{ marginTop: '1rem' }}>
          State-level Table Tennis player. 50+ hours of community service.
        </p>
        <div className={styles.tags}>
          {PERSON.tags.map(t => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>// projects</div>
        <h2 className={styles.sectionTitle}>Selected Work</h2>
        {PROJECTS.filter(p => !p.comingSoon).map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.cardTitle}>{p.title}</div>
            <div className={styles.cardDesc}>{p.oneliner}</div>
            <div className={styles.cardStack}>
              {p.stack.slice(0, 4).map(s => (
                <span key={s} className={styles.tech}>{s}</span>
              ))}
            </div>
            <a
              className={styles.cardLink}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>// skills</div>
        <h2 className={styles.sectionTitle}>Tools &amp; Expertise</h2>
        {[
          { label: 'Technical', items: SKILLS.technical },
          { label: 'Business',  items: SKILLS.business },
          { label: 'Soft Skills', items: SKILLS.soft },
        ].map(g => (
          <div key={g.label} className={styles.skillGroup}>
            <div className={styles.skillGroupLabel}>{g.label}</div>
            <div className={styles.pills}>
              {g.items.map(s => <span key={s} className={styles.pill}>{s}</span>)}
            </div>
          </div>
        ))}
      </section>

      {/* Certs */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>// certifications</div>
        <h2 className={styles.sectionTitle}>Credentials</h2>
        {CERTS.filter(c => c.live).map(c => (
          <div key={c.id} className={`${styles.card} ${styles.certCard}`}>
            <div className={styles.certIssuer}>{c.issuer}</div>
            <div className={styles.certTitle}>{c.title}</div>
            {c.date && <div className={styles.certDate}>{c.date}</div>}
          </div>
        ))}
        <p className={styles.body} style={{ marginTop: '1rem', opacity: 0.5 }}>
          More certifications coming soon.
        </p>
      </section>

      {/* Contact */}
      <section className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.sectionLabel}>// contact</div>
        <h2 className={styles.contactTitle}>Let's build<br />something.</h2>
        <a className={styles.contactLink} href={`mailto:${PERSON.email}`}>
          {PERSON.email}
        </a>
        <a className={styles.contactLink} href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn →
        </a>
        <a className={styles.contactLink} href={PERSON.github} target="_blank" rel="noopener noreferrer">
          GitHub →
        </a>
        <div className={styles.mobFooter}>New Delhi, India</div>
      </section>

    </div>
  )
}
