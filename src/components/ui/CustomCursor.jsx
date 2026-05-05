import { useCursor } from '../../hooks/useCursor'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const { dotRef, ringRef } = useCursor()
  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
