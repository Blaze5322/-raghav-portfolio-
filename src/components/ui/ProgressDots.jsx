import styles from './ProgressDots.module.css'
import { SECTIONS } from '../../data/content'

export default function ProgressDots({ currentSection, goTo }) {
  return (
    <div className={styles.wrap}>
      {SECTIONS.map((s, i) => (
        <button
          key={s.id}
          className={`${styles.dot} ${currentSection === i ? styles.active : ''}`}
          onClick={() => goTo(i)}
          title={s.label}
          aria-label={`Go to ${s.label}`}
        />
      ))}
    </div>
  )
}
