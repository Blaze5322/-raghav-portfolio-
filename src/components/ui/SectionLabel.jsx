import styles from './SectionLabel.module.css'
import { SECTIONS } from '../../data/content'

export default function SectionLabel({ currentSection }) {
  return (
    <div className={styles.label}>
      {SECTIONS[currentSection]?.label}
    </div>
  )
}
