import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Fog, FogExp2 } from 'three'
import * as THREE from 'three'
import CameraRig from './CameraRig'
import { CAMERA_PATH } from '../data/content'

// ── Flickering fire light ────────────────────────────────
function FireLight() {
  const lightRef = useRef()
  useFrame(({ clock }) => {
    if (!lightRef.current) return
    const t = clock.getElapsedTime()
    lightRef.current.intensity = 2.2 + Math.sin(t * 3.1) * 0.45 + Math.sin(t * 7.3) * 0.18
    lightRef.current.position.x = Math.sin(t * 2.1) * 0.09
    lightRef.current.position.z = 1.5 + Math.sin(t * 1.7) * 0.07
  })
  return (
    <pointLight
      ref={lightRef}
      color={0xff6a1a}
      intensity={2.2}
      distance={22}
      position={[0, 0.85, 1.5]}
      castShadow
      shadow-mapSize={[512, 512]}
    />
  )
}

// ── Floating particles (fireflies / dust) ────────────────
function Particles({ count = 700 }) {
  const meshRef = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 34
      arr[i * 3 + 1] = Math.random() * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 34
    }
    return arr
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.003
      if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = 0
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y += 0.0002
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xffb060}
        size={0.04}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

// ── Ground ───────────────────────────────────────────────
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial color={0x2a1a0a} roughness={0.95} />
    </mesh>
  )
}

// ── Campfire ─────────────────────────────────────────────
function Campfire() {
  const flameRef = useRef()
  useFrame(({ clock }) => {
    if (!flameRef.current) return
    const t = clock.getElapsedTime()
    flameRef.current.scale.y = 1 + Math.sin(t * 4) * 0.15
    flameRef.current.scale.x = 1 + Math.sin(t * 3.2) * 0.08
    flameRef.current.position.y = 0.65 + Math.sin(t * 5) * 0.03
  })
  return (
    <group position={[0, 0, 1.5]}>
      {/* Logs */}
      <mesh rotation={[0, 0.4, Math.PI / 2]} position={[0.1, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.7, 8]} />
        <meshStandardMaterial color={0x3d1f08} roughness={0.95} />
      </mesh>
      <mesh rotation={[0, -0.5, Math.PI / 2]} position={[-0.1, 0.08, 0.05]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.65, 8]} />
        <meshStandardMaterial color={0x4a2508} roughness={0.95} />
      </mesh>
      {/* Ember base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.22, 20]} />
        <meshStandardMaterial color={0x5a1a00} roughness={0.9} emissive={0x3a0800} emissiveIntensity={0.5} />
      </mesh>
      {/* Flame core */}
      <mesh ref={flameRef} position={[0, 0.65, 0]}>
        <coneGeometry args={[0.12, 0.5, 8]} />
        <meshStandardMaterial
          color={0xff7020}
          emissive={0xff4000}
          emissiveIntensity={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Flame outer */}
      <mesh position={[0, 0.55, 0]}>
        <coneGeometry args={[0.18, 0.35, 8]} />
        <meshStandardMaterial
          color={0xff9040}
          emissive={0xff6020}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

// ── Trees (forest) ───────────────────────────────────────
function Trees() {
  const trees = useMemo(() => {
    const arr = []
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 4 + Math.random() * 14
      const x = Math.cos(angle) * r
      const z = Math.sin(angle) * r + 2
      if (Math.abs(x) < 3.5 && Math.abs(z - 2) < 3.5) continue
      arr.push({
        x, z,
        h: 1.6 + Math.random() * 3,
        trunkR: 0.04 + Math.random() * 0.07,
        topR: 0.22 + Math.random() * 0.35,
        topH: 1.1 + Math.random() * 0.9,
        color: 0x253010 + Math.floor(Math.random() * 0x101010),
      })
    }
    return arr
  }, [])

  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          <mesh position={[0, t.h / 2, 0]} castShadow>
            <cylinderGeometry args={[t.trunkR * 0.7, t.trunkR, t.h, 6]} />
            <meshStandardMaterial color={0x3d2010} roughness={0.95} />
          </mesh>
          <mesh position={[0, t.h + t.topH / 2 - 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, t.topR, t.topH, 6]} />
            <meshStandardMaterial color={t.color} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── Desk scene ───────────────────────────────────────────
function Desk() {
  return (
    <group position={[-3, 0, 0]}>
      {/* Desk surface */}
      <mesh position={[0, 0.82, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.06, 0.95]} />
        <meshStandardMaterial color={0x5c2e08} roughness={0.8} />
      </mesh>
      {/* Legs */}
      {[[-0.85, -0.35], [0.85, -0.35], [-0.85, 0.35], [0.85, 0.35]].map(([lx, lz], i) => (
        <mesh key={i} position={[lx, 0.42, lz]} castShadow>
          <boxGeometry args={[0.07, 0.84, 0.07]} />
          <meshStandardMaterial color={0x4a2508} roughness={0.9} />
        </mesh>
      ))}
      {/* Notebook */}
      <mesh position={[-0.3, 0.86, -0.05]} rotation={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.28, 0.02, 0.2]} />
        <meshStandardMaterial color={0x1a1205} roughness={0.7} />
      </mesh>
      {/* Mug */}
      <mesh position={[0.35, 0.92, 0.05]} castShadow>
        <cylinderGeometry args={[0.065, 0.055, 0.14, 12]} />
        <meshStandardMaterial color={0x8b4020} roughness={0.6} />
      </mesh>
      {/* Plant pot */}
      <mesh position={[-0.6, 0.9, 0.1]} castShadow>
        <cylinderGeometry args={[0.06, 0.045, 0.1, 10]} />
        <meshStandardMaterial color={0x7a3820} roughness={0.7} />
      </mesh>
      <mesh position={[-0.6, 0.98, 0.1]} castShadow>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color={0x2d5020} roughness={0.9} />
      </mesh>
      {/* Monitor frame */}
      <mesh position={[0.1, 1.25, -0.42]} castShadow>
        <boxGeometry args={[0.7, 0.45, 0.03]} />
        <meshStandardMaterial color={0x1a1208} roughness={0.5} />
      </mesh>
      <mesh position={[0.1, 1.25, -0.4]}>
        <boxGeometry args={[0.62, 0.37, 0.01]} />
        <meshStandardMaterial color={0x0a1520} roughness={0.1} emissive={0x102030} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

// ── Bookshelf / Gallery floating frames ──────────────────
function Gallery() {
  const frames = useMemo(() => {
    const colors = [0x4a2508, 0x2d3d18, 0x1a2840, 0x3d1a2d, 0x3d3010, 0x1a3d30]
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 0.9 - Math.PI * 0.25
      const r = 3.2
      return {
        x: Math.sin(angle) * r,
        y: 1.8 + Math.sin(i * 1.3) * 0.2,
        z: 10 + Math.cos(angle) * r * 0.4,
        ry: -angle * 0.4,
        color: colors[i],
      }
    })
  }, [])

  return (
    <group>
      {frames.map((f, i) => (
        <group key={i} position={[f.x, f.y, f.z]} rotation={[0, f.ry, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 0.7, 0.04]} />
            <meshStandardMaterial color={f.color} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.025]}>
            <boxGeometry args={[0.44, 0.58, 0.01]} />
            <meshStandardMaterial color={0x0a0806} roughness={0.2} emissive={0x1a1205} emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── Toolshed pegboard ────────────────────────────────────
function Toolshed() {
  return (
    <group position={[5, 0, 0]}>
      {/* Back wall / pegboard */}
      <mesh position={[0, 2, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 3.5, 0.08]} />
        <meshStandardMaterial color={0x4a2d10} roughness={0.95} />
      </mesh>
      {/* Pegs */}
      {[-1.2, -0.4, 0.4, 1.2].map((px, i) =>
        [0.6, 1.4, 2.2].map((py, j) => (
          <mesh key={`${i}-${j}`} position={[px, py, -0.74]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.12, 6]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color={0x8b5020} roughness={0.7} />
          </mesh>
        ))
      )}
      {/* Tool shapes hanging on pegs */}
      {[-1.2, -0.4, 0.4, 1.2].map((px, i) => (
        <mesh key={i} position={[px, 1.0, -0.68]} castShadow>
          <boxGeometry args={[0.22, 0.32, 0.03]} />
          <meshStandardMaterial color={0x1a3a1a + i * 0x050000} roughness={0.8} />
        </mesh>
      ))}
      {/* Workbench */}
      <mesh position={[0, 0.5, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.08, 0.8]} />
        <meshStandardMaterial color={0x5c3010} roughness={0.85} />
      </mesh>
    </group>
  )
}

// ── Cert wall ────────────────────────────────────────────
function CertWall() {
  return (
    <group position={[-4, 0, -5]}>
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 4, 0.1]} />
        <meshStandardMaterial color={0x3d2010} roughness={0.9} />
      </mesh>
      {[[-1, 1.8], [0.8, 1.8], [-1, 2.8], [0.8, 2.8], [-1, 3.7], [0.8, 3.7]].map(([fx, fy], i) => (
        <group key={i} position={[fx, fy, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.7, 0.5, 0.025]} />
            <meshStandardMaterial color={i === 0 ? 0x8b6020 : 0x2a1a0a} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <boxGeometry args={[0.6, 0.4, 0.01]} />
            <meshStandardMaterial color={i === 0 ? 0xf5efe6 : 0x1a1208} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── Contact door ─────────────────────────────────────────
function ContactDoor() {
  const glowRef = useRef()
  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const t = clock.getElapsedTime()
    glowRef.current.intensity = 1.8 + Math.sin(t * 1.3) * 0.25
  })
  return (
    <group position={[0, 0, -12]}>
      {/* Door frame */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[1.1, 2.6, 0.12]} />
        <meshStandardMaterial color={0x5c3010} roughness={0.85} />
      </mesh>
      {/* Door panel */}
      <mesh position={[0, 2, 0.07]} castShadow>
        <boxGeometry args={[0.88, 2.3, 0.06]} />
        <meshStandardMaterial color={0x7a4520} roughness={0.75} />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.32, 2.0, 0.14]} castShadow>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial color={0xc8956c} roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Warm light above door */}
      <pointLight ref={glowRef} color={0xffd080} intensity={1.8} distance={12} position={[0, 4, 0.5]} />
      {/* Door light panel glow */}
      <mesh position={[0, 2.8, 0.1]}>
        <boxGeometry args={[0.6, 0.3, 0.01]} />
        <meshStandardMaterial color={0xffd080} emissive={0xffd080} emissiveIntensity={0.8} transparent opacity={0.4} />
      </mesh>
      {/* Ground path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 3]} receiveShadow>
        <planeGeometry args={[1.2, 6]} />
        <meshStandardMaterial color={0x3d2010} roughness={0.9} />
      </mesh>
    </group>
  )
}

// ── Main Scene ───────────────────────────────────────────
function SceneContent({ currentSection }) {
  return (
    <>
      <fog attach="fog" args={[0x3d2b1f, 8, 60]} />
      <ambientLight color={0x3d1f0a} intensity={0.35} />
      <FireLight />
      <pointLight color={0xffa040} intensity={1.1} distance={18} position={[-3, 3, -2]} />
      <pointLight color={0xffd080} intensity={1.4} distance={16} position={[-2, 3.5, -1]} />
      <pointLight color={0xff8040} intensity={0.75} distance={14} position={[5, 2.5, 0]} />
      <pointLight color={0xffd0a0} intensity={0.5} distance={18} position={[0, 3.5, -12]} />

      <CameraRig currentSection={currentSection} />
      <Ground />
      <Trees />
      <Campfire />
      <Desk />
      <Gallery />
      <Toolshed />
      <CertWall />
      <ContactDoor />
      <Particles count={700} />
    </>
  )
}

export default function Scene({ currentSection }) {
  return (
    <Canvas
      camera={{
        position: CAMERA_PATH[0].pos,
        fov: 60,
        near: 0.1,
        far: 200,
      }}
      shadows
      gl={{
        antialias: true,
        toneMapping: 4, // ACESFilmicToneMapping
        toneMappingExposure: 0.8,
      }}
      style={{ position: 'fixed', inset: 0 }}
    >
      <SceneContent currentSection={currentSection} />
    </Canvas>
  )
}
