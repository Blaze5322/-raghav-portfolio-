import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { CAMERA_PATH } from '../data/content'

export default function CameraRig({ currentSection }) {
  const { camera } = useThree()
  const lookTarget = useRef({ x: 0, y: 0.5, z: 0 })
  const prevSection = useRef(0)

  useEffect(() => {
    if (prevSection.current === currentSection) return
    prevSection.current = currentSection

    const target = CAMERA_PATH[currentSection]
    if (!target) return

    gsap.to(camera.position, {
      x: target.pos[0],
      y: target.pos[1],
      z: target.pos[2],
      duration: 1.4,
      ease: 'power3.inOut',
    })

    gsap.to(lookTarget.current, {
      x: target.look[0],
      y: target.look[1],
      z: target.look[2],
      duration: 1.4,
      ease: 'power3.inOut',
    })
  }, [currentSection, camera])

  useFrame(() => {
    camera.lookAt(lookTarget.current.x, lookTarget.current.y, lookTarget.current.z)
  })

  return null
}
