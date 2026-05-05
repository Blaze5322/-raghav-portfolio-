import { useState, useCallback, useRef } from 'react'
import { SECTIONS } from '../data/content'

const TOTAL = SECTIONS.length
const COOLDOWN_MS = 900

export function useScrollSection() {
  const [currentSection, setCurrentSection] = useState(0)
  const isAnimating = useRef(false)
  const cooldown = useRef(false)
  const touchStart = useRef(0)

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx))
    if (clamped === currentSection) return
    setCurrentSection(clamped)
  }, [currentSection])

  const handleWheel = useCallback((e) => {
    if (cooldown.current) return
    cooldown.current = true
    setTimeout(() => { cooldown.current = false }, COOLDOWN_MS)
    const dir = e.deltaY > 0 ? 1 : -1
    setCurrentSection(prev => Math.max(0, Math.min(TOTAL - 1, prev + dir)))
  }, [])

  const handleTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (cooldown.current) return
    const dy = touchStart.current - e.changedTouches[0].clientY
    if (Math.abs(dy) < 40) return
    cooldown.current = true
    setTimeout(() => { cooldown.current = false }, COOLDOWN_MS)
    const dir = dy > 0 ? 1 : -1
    setCurrentSection(prev => Math.max(0, Math.min(TOTAL - 1, prev + dir)))
  }, [])

  return {
    currentSection,
    goTo,
    handleWheel,
    handleTouchStart,
    handleTouchEnd,
  }
}
