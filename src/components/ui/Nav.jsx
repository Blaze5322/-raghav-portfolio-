import styles from './Nav.module.css'
import { SECTIONS } from '../../data/content'

export default function Nav({ currentSection, goTo }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>RG</div>
      <div className={styles.links}>
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className={`${styles.link} ${currentSection === i ? styles.active : ''}`}
            onClick={() => goTo(i)}
          >
            {s.id}
          </button>
        ))}
      </div>
    </nav>
  )
}
