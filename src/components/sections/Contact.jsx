import styles from './Contact.module.css'
import { PERSON } from '../../data/content'

export default function Contact({ visible }) {
  return (
    <div className={`${styles.contact} ${visible ? styles.visible : ''}`}>
      <div className={styles.label}>// the door</div>
      <h2 className={styles.heading}>Let's build something.</h2>
      <p className={styles.sub}>
        Always open to conversations about<br />ideas, projects, and opportunities.
      </p>
      <div className={styles.links}>
        <a className={styles.link} href={`mailto:${PERSON.email}`}>
          {PERSON.email}
        </a>
        <a className={styles.link} href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn →
        </a>
        <a className={styles.link} href={PERSON.github} target="_blank" rel="noopener noreferrer">
          GitHub →
        </a>
      </div>
      <div className={styles.footer}>
        New Delhi, India · BSc Economics &amp; Data Science
      </div>
    </div>
  )
}
