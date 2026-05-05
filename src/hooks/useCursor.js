import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top = ring.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(2.5)'
      ringEl.style.borderColor = 'rgba(200,149,108,0.8)'
      ringEl.style.width = '48px'
      ringEl.style.height = '48px'
    }

    const onLeaveLink = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      ringEl.style.borderColor = 'rgba(200,149,108,0.35)'
      ringEl.style.width = '32px'
      ringEl.style.height = '32px'
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    // Attach to interactive elements
    const attachHover = () => {
      document.querySelectorAll('button, a, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    attachHover()

    // Re-attach after DOM changes (MutationObserver)
    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return { dotRef, ringRef }
}
