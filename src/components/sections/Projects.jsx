import styles from './Projects.module.css'
import { PROJECTS } from '../../data/content'

export default function Projects({ visible, onOpen }) {
  return (
    <div className={`${styles.projects} ${visible ? styles.visible : ''}`}>
      <div className={styles.label}>// the gallery</div>
      <h2 className={styles.heading}>Selected Work</h2>
      <div className={styles.grid}>
        {PROJECTS.map(p => (
          <div
            key={p.id}
            className={`${styles.card} ${p.comingSoon ? styles.soon : ''}`}
            onClick={() => !p.comingSoon && onOpen(p)}
            data-cursor={!p.comingSoon ? 'pointer' : undefined}
          >
            <div className={styles.num}>{p.num}</div>
            <div className={styles.title}>{p.title}</div>
            {!p.comingSoon ? (
              <>
                <div className={styles.oneliner}>{p.oneliner}</div>
                <div className={styles.stack}>
                  {p.stack.slice(0, 3).map(s => (
                    <span key={s} className={styles.tech}>{s}</span>
                  ))}
                </div>
                <div className={styles.cta}>click to view →</div>
              </>
            ) : (
              <div className={styles.building}>
                <span className={styles.pulseDot} />
                <span>building...</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
