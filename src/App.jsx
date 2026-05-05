import { useState, useEffect, useCallback } from 'react'
import Scene from './components/Scene'
import CameraRig from './components/CameraRig'
import Loader from './components/ui/Loader'
import Nav from './components/ui/Nav'
import ProgressDots from './components/ui/ProgressDots'
import SectionLabel from './components/ui/SectionLabel'
import ScrollHint from './components/ui/ScrollHint'
import CustomCursor from './components/ui/CustomCursor'
import ProjectModal from './components/ui/ProjectModal'
import MobileLayout from './components/MobileLayout'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Certs from './components/sections/Certs'
import Contact from './components/sections/Contact'

import { useScrollSection } from './hooks/useScrollSection'
import { useAudio } from './hooks/useAudio'

const TOTAL_SECTIONS = 6

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const { currentSection, goTo, handleWheel, handleTouchStart, handleTouchEnd } = useScrollSection()
  const { startAudio } = useAudio()

  // Start audio on first interaction
  const handleInteraction = useCallback(() => {
    startAudio()
  }, [startAudio])

  useEffect(() => {
    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })
    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [handleInteraction])

  // Scroll / touch events
  useEffect(() => {
    if (!loaded) return
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [loaded, handleWheel, handleTouchStart, handleTouchEnd])

  return (
    <>
      {/* ── Mobile (shown only on small screens via CSS) ─── */}
      <MobileLayout />

      {/* ── Desktop ─────────────────────────────────────── */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <>
          {/* 3D canvas */}
          <Scene currentSection={currentSection} />

          {/* Custom cursor */}
          <CustomCursor />

          {/* UI overlay */}
          <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
            <Nav currentSection={currentSection} goTo={goTo} />
            <ProgressDots currentSection={currentSection} goTo={goTo} />
            <SectionLabel currentSection={currentSection} />
            <ScrollHint visible={currentSection === 0} />

            {/* Section overlays */}
            <Hero     visible={currentSection === 0} />
            <About    visible={currentSection === 1} />
            <Projects visible={currentSection === 2} onOpen={setSelectedProject} />
            <Skills   visible={currentSection === 3} />
            <Certs    visible={currentSection === 4} />
            <Contact  visible={currentSection === 5} />
          </div>

          {/* Project modal */}
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </>
      )}
    </>
  )
}
