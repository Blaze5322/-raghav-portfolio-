import styles from './ScrollHint.module.css'

export default function ScrollHint({ visible }) {
  return (
    <div className={`${styles.hint} ${visible ? styles.visible : ''}`}>
      <span className={styles.text}>scroll</span>
      <div className={styles.arrow} />
    </div>
  )
}
