import styles from './Certs.module.css'
import { CERTS } from '../../data/content'

export default function Certs({ visible }) {
  return (
    <div className={`${styles.certs} ${visible ? styles.visible : ''}`}>
      <div className={styles.label}>// the wall of wins</div>
      <h2 className={styles.heading}>Certifications</h2>
      <div className={styles.grid}>
        {CERTS.map(c => (
          <div key={c.id} className={`${styles.card} ${c.live ? styles.live : ''}`}>
            <div className={styles.issuer}>{c.issuer}</div>
            <div className={styles.title}>{c.title}</div>
            {c.date && <div className={styles.date}>{c.date}</div>}
            {!c.live && (
              <div className={styles.tbu}>
                <span className={styles.pulseDot} />
                <span>to be updated</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
