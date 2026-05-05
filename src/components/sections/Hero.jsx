import styles from './Hero.module.css'
import { PERSON } from '../../data/content'

export default function Hero({ visible }) {
  return (
    <div className={`${styles.hero} ${visible ? styles.visible : ''}`}>
      <div className={styles.name}>
        {PERSON.name.split(' ').map((word, i) => (
          <span key={i} className={styles.word} style={{ animationDelay: `${i * 0.12}s` }}>
            {word}
          </span>
        ))}
      </div>
      <div className={styles.tagline}>{PERSON.tagline}</div>
    </div>
  )
}
