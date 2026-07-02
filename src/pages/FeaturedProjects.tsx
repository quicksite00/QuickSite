import { useState, useEffect, useRef, Suspense, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

const featuredImages = [
  {
    src: '/assets/featured/stellar.png',
    title: 'Stellar',
    subtitle: 'A cosmic journey through interactive design',
  },
  {
    src: '/assets/featured/muderHistory.png',
    title: 'Murder History',
    subtitle: 'Dark narrative meets immersive storytelling',
  },
  {
    src: '/assets/featured/cads.png',
    title: 'CADS',
    subtitle: 'Precision architecture. Digital soul.',
  },
]

/* ---------- 3D particle field (background depth) ---------- */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 400

  // Pre-populate positions so particles have positions from the start
  const positions = useRef(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return pos
  })()

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a855f7"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ---------- 3D Image Plane with GSAP flip ---------- */
function ImagePlane({
  current,
  onReady,
}: {
  current: number
  onReady: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!)
  const isFirstRender = useRef(true)
  const mouse = useRef({ x: 0, y: 0 })
  const activeRef = useRef(current)
  const loaderRef = useRef(new THREE.TextureLoader())

  // Keep activeRef in sync with current
  activeRef.current = current

  // Mouse tracking for 3D parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Load a texture and apply it to the material
  const loadTexture = useCallback(
    (src: string, cb?: () => void) => {
      loaderRef.current.load(
        src,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          tex.anisotropy = 8
          if (materialRef.current) {
            materialRef.current.map = tex
            materialRef.current.needsUpdate = true
          }
          cb?.()
        },
        undefined,
        () => cb?.(),
      )
    },
    [],
  )

  // Initial texture load
  useEffect(() => {
    loadTexture(featuredImages[0].src, () => onReady())
  }, [loadTexture, onReady])

  // GSAP flip animation on slide change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const mesh = meshRef.current
    if (!mesh) return

    // Kill any in-progress GSAP animations on this mesh
    gsap.killTweensOf(mesh.rotation)

    // Reset to starting rotation
    mesh.rotation.y = 0

    const tl = gsap.timeline()
    const targetIndex = current

    // First half: spin 90° clockwise (old image narrows to edge)
    tl.to(mesh.rotation, {
      y: Math.PI / 2,
      duration: 0.45,
      ease: 'power2.in',
    })

    // Mid-point: swap texture while plane is edge-on (invisible)
    tl.call(() => {
      // Only apply if this is still the active slide (prevents stale updates on rapid clicks)
      if (activeRef.current !== targetIndex) return
      loadTexture(featuredImages[targetIndex].src)
      // Jump rotation to continue visual spin in same direction
      gsap.set(mesh.rotation, { y: -Math.PI / 2 })
    })

    // Second half: complete the spin (new image appears)
    tl.to(mesh.rotation, {
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
    })

    // Cleanup: kill GSAP tweens if component unmounts mid-animation
    return () => {
      gsap.killTweensOf(mesh.rotation)
    }
  }, [current, loadTexture])

  // Subtle mouse-driven 3D tilt
  useFrame(() => {
    if (!meshRef.current) return
    const m = mouse.current
    meshRef.current.rotation.x += (m.y * 0.08 - meshRef.current.rotation.x) * 0.04
    meshRef.current.rotation.z += (-m.x * 0.08 - meshRef.current.rotation.z) * 0.04
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[4.2, 3]} />
      <meshBasicMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  )
}

/* ---------- Scene wrapper ---------- */
function Scene({
  current,
  onReady,
}: {
  current: number
  onReady: () => void
}) {
  return (
    <>
      <color attach="background" args={['#05030f']} />
      <ambientLight intensity={1} />
      <ParticleField />
      <Suspense fallback={null}>
        <ImagePlane current={current} onReady={onReady} />
      </Suspense>
    </>
  )
}

/* ---------- Main component ---------- */
export default function FeaturedProjects() {
  const [current, setCurrent] = useState(0)
  const [ready, setReady] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return
      setCurrent(index)
    },
    [current],
  )

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#05030f]">
      {/* Three.js Canvas — full background */}
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 48 }}
        gl={{ antialias: true, alpha: false }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <Scene current={current} onReady={() => setReady(true)} />
      </Canvas>

      {/* Dark gradient curtain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,3,15,0.15) 0%, rgba(5,3,15,0.35) 40%, rgba(5,3,15,0.8) 100%)',
        }}
      />

      {/* Purple glow accent */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(168,85,247,0.18) 0%, transparent 60%)',
        }}
      />

      {/* Side ambient glow edges */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-48"
        style={{
          background:
            'linear-gradient(to right, rgba(168,85,247,0.08), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-48"
        style={{
          background:
            'linear-gradient(to left, rgba(236,72,153,0.08), transparent)',
        }}
      />

      {/* Overlay content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <span
          className="mb-4 text-xs uppercase tracking-[0.4em] text-fuchsia-300/70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Featured Project
        </span>

        <h1
          className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            background:
              'linear-gradient(135deg, #c084fc 0%, #ec4899 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {featuredImages[current].title}
        </h1>

        <p
          className="mt-4 max-w-lg text-sm tracking-wide text-white/60 md:text-base"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {featuredImages[current].subtitle}
        </p>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        {featuredImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="group relative transition-all duration-300"
            aria-label={`Go to project ${index + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-500 ${
                index === current
                  ? 'h-2.5 w-10 bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-lg shadow-fuchsia-500/50'
                  : 'h-2.5 w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Project counter */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:block">
        <span
          className="text-sm tabular-nums tracking-[0.2em] text-white/40"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {String(current + 1).padStart(2, '0')}
          <span className="mx-2">/</span>
          {String(featuredImages.length).padStart(2, '0')}
        </span>
      </div>

      {/* Initial loading splash */}
      {!ready && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#05030f]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
            <span
              className="text-xs uppercase tracking-[0.3em] text-fuchsia-300/50"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Loading gallery
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
