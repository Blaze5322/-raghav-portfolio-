import { useEffect } from 'react'
import styles from './ProjectModal.module.css'

export default function ProjectModal({ project, onClose }) {
  const open = !!project

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!project) return (
    <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={onClose} />
  )

  return (
    <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.box} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>[ close ]</button>
        <div className={styles.num}>// {project.num}</div>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.desc}>{project.description}</p>
        <div className={styles.stack}>
          {project.stack.map(s => (
            <span key={s} className={styles.tech}>{s}</span>
          ))}
        </div>
        <div className={styles.meta}>
          <span className={styles.metaItem}>Role: {project.role}</span>
        </div>
        <a
          className={styles.btn}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  )
}
