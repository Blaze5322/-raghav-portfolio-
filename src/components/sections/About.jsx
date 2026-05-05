import styles from './About.module.css'
import { PERSON } from '../../data/content'

export default function About({ visible }) {
  return (
    <div className={`${styles.about} ${visible ? styles.visible : ''}`}>
      <div className={styles.label}>// about me</div>
      <h2 className={styles.heading}>Builder at the intersection<br />of data &amp; ideas</h2>
      <p className={styles.body}>
        BSc Economics &amp; Data Science student at Christ University, Bangalore.
        I build AI-powered tools, lead the E-Code Club, and have placed in 13+ competitions
        across business and tech.
        <br /><br />
        Driven by the belief that technical depth and business thinking belong together.
      </p>
      <div className={styles.achievements}>
        {PERSON.achievements.map((a, i) => (
          <div key={i} className={styles.achievement}>
            <span className={styles.dot}>—</span> {a}
          </div>
        ))}
      </div>
      <div className={styles.tags}>
        {PERSON.tags.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>
    </div>
  )
}
