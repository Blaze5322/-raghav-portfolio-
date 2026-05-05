import { useEffect, useState } from 'react'
import styles from './Loader.module.css'

export default function Loader({ onComplete }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setHiding(true)
      setTimeout(onComplete, 1000)
    }, 3200)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className={`${styles.loader} ${hiding ? styles.hidden : ''}`}>
      <div className={styles.content}>
        <div className={styles.name}>Raghav Gupta</div>
        <div className={styles.tagline}>solve · build · repeat</div>
        <div className={styles.barWrap}>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  )
}
