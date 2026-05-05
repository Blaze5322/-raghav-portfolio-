import styles from './Skills.module.css'
import { SKILLS } from '../../data/content'

const groups = [
  { key: 'technical', label: 'Technical' },
  { key: 'business',  label: 'Business' },
  { key: 'soft',      label: 'Soft Skills' },
]

export default function Skills({ visible }) {
  return (
    <div className={`${styles.skills} ${visible ? styles.visible : ''}`}>
      <div className={styles.inner}>
        <div className={styles.label}>// the toolshed</div>
        <h2 className={styles.heading}>Skills &amp; Tools</h2>
        {groups.map(g => (
          <div key={g.key} className={styles.group}>
            <div className={styles.groupLabel}>{g.label}</div>
            <div className={styles.pills}>
              {SKILLS[g.key].map(s => (
                <span key={s} className={styles.pill}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
