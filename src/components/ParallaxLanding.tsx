import { useCallback, useRef } from 'react'
import { useScroll, useSpringValue, useSpring, animated, to } from '@react-spring/web'

const FW = 1920
const FH = 1080

const pctX = (px: number) => `${(px / FW) * 100}%`
const pctY = (px: number) => `${(px / FH) * 100}%`
const pctW = (px: number) => `${(px / FW) * 100}%`
const pctH = (px: number) => `${(px / FH) * 100}%`

export default function ParallaxLanding() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll()

  const mouseX = useSpringValue(0, { config: { mass: 0.5, tension: 280, friction: 40 } })
  const mouseY = useSpringValue(0, { config: { mass: 0.5, tension: 280, friction: 40 } })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.start(x)
      mouseY.start(y)
    },
    [mouseX, mouseY],
  )

  const bgTransform = (sMul: number, mMul: number) =>
    to([scrollYProgress, mouseX, mouseY], (s, mx, my) =>
      `translate(${mx * mMul}px, ${s * sMul + my * mMul}px)`)

  const objTransform = (sMul: number, mMul: number) =>
    to([scrollYProgress, mouseX, mouseY], (s, mx, my) =>
      `translate(${mx * mMul}px, ${s * sMul + my * mMul}px)`)

  const iconDepths = [
    { z: 1, d: 6, bright: 0.55, blur: '1.2px', op: 0.9 },
    { z: 2, d: 14, bright: 0.68, blur: '0.9px', op: 0.92 },
    { z: 3, d: 24, bright: 0.82, blur: '0.5px', op: 0.95 },
    { z: 4, d: 36, bright: 0.94, blur: '0px', op: 0.97 },
    { z: 5, d: 50, bright: 1.08, blur: '0px', op: 1 },
  ]

  const iconIdle = useSpring({
    from: { rx: 6, ry: -8, y: 0 },
    to: { rx: -4, ry: 10, y: -10 },
    loop: { reverse: true },
    config: { duration: 7000 },
  })

  const iconWrapTransform = to(
    [mouseX, mouseY, iconIdle.rx, iconIdle.ry, iconIdle.y],
    (mx, my, irx, iry, iy) =>
      `rotateX(${irx + my * -25}deg) rotateY(${iry + mx * 32}deg) translateY(${iy}px)`,
  )

  const specPos = to([mouseX, mouseY], (mx, my) => {
    const px = (mx + 1) * 50
    const py = (my + 1) * 50
    return `radial-gradient(120px 120px at ${px}% ${py}%, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)`
  })

  const iconUrl = '/assets/layers/icon_float.png'

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0d0d1a',
      }}
    >
      <animated.img
        src="/assets/layers/layer1_blue.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          transform: bgTransform(-350, 1),
        }}
      />

      <animated.img
        src="/assets/layers/layer2_blue.png"
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 2,
          transform: bgTransform(-240, 4),
        }}
      />

      <animated.img
        src="/assets/layers/layer3.png"
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: '-5%',
          width: '100%',
          height: '110%',
          objectFit: 'cover',
          zIndex: 3,
          transform: bgTransform(-140, 8),
        }}
      />

      <animated.img
        src="/assets/layers/layer4.png"
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: '10%',
          width: '100%',
          height: '110%',
          objectFit: 'cover',
          zIndex: 4,
          transform: bgTransform(-70, 14),
        }}
      />

      <animated.img
        src="/assets/layers/obj1.png"
        alt=""
        style={{
          position: 'absolute',
          left: pctX(1640),
          top: pctY(59),
          width: pctW(240),
          height: pctH(240),
          zIndex: 4,
          transform: objTransform(-240, 24),
        }}
      />

      <animated.img
        src="/assets/layers/obj2.png"
        alt=""
        style={{
          position: 'absolute',
          left: pctX(1449),
          top: pctY(290),
          width: pctW(385),
          height: pctH(385),
          zIndex: 4,
          transform: objTransform(-240, 24),
        }}
      />

      <animated.img
        src="/assets/layers/obj3.png"
        alt=""
        style={{
          position: 'absolute',
          left: pctX(0),
          top: pctY(89),
          width: pctW(345),
          height: pctH(345),
          zIndex: 4,
          transform: objTransform(-240, 24),
        }}
      />

      <animated.div
        style={{
          position: 'absolute',
          left: '50%',
          top: pctY(80),
          zIndex: 5,
          transform: to([scrollYProgress, mouseX, mouseY], (s, mx, my) =>
            `translateX(-50%) perspective(800px) rotateX(${my * -3}deg) rotateY(${mx * 3}deg) translate(${mx * 19}px, ${s * -180 + my * 19}px)`),
          fontSize: 'clamp(2rem, 7vw, 150px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '4px',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          fontFamily: "'Orbitron', sans-serif",
          background: 'linear-gradient(135deg, #FF00CC, #8000FF, #0ff, #FF00CC)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextStroke: '1.5px #0d0d1a',
          textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.3)',
        }}
      >
        Quick Site
      </animated.div>

      <animated.div
        style={{
          position: 'absolute',
          left: pctX(50),
          top: pctY(820),
          width: pctW(350),
          height: pctH(285),
          zIndex: 5,
          transform: objTransform(-180, 19),
          fontSize: 'clamp(0.8rem, 3.5vw, 60px)',
          fontWeight: 700,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        ONE<br />PAGE
      </animated.div>

      <animated.div
        style={{
          position: 'absolute',
          left: pctX(1480),
          top: pctY(820),
          width: pctW(415),
          height: pctH(285),
          zIndex: 5,
          transform: objTransform(-180, 19),
          fontSize: 'clamp(0.8rem, 3.5vw, 60px)',
          fontWeight: 700,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          textAlign: 'right',
        }}
      >
        BIG<br />IMPACT
      </animated.div>

      <animated.img
        src="/assets/layers/layer5.png"
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          top: '-35%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 6,
          transform: bgTransform(-20, 20),
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: pctY(250),
          width: pctW(600),
          height: pctW(600),
          transform: 'translateX(-50%)',
          zIndex: 10,
          perspective: 1000,
          perspectiveOrigin: '50% 40%',
        }}
      >
        <animated.div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: iconWrapTransform,
            willChange: 'transform',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '82%',
              width: '70%',
              height: '18%',
              transform: 'translate(-50%,-50%) translateZ(-6px) rotateX(90deg)',
              background: 'radial-gradient(closest-side, rgba(0,0,0,0.55), rgba(0,0,0,0) 70%)',
              filter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          />
          {iconDepths.map((l) => (
            <div
              key={l.z}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                pointerEvents: 'none',
                transform: `translateZ(${l.d}px)`,
                filter: `brightness(${l.bright})${l.blur !== '0px' ? ` blur(${l.blur})` : ''}`,
                opacity: l.op,
              }}
            />
          ))}
          <animated.div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'translateZ(52px)',
              background: specPos,
              mixBlendMode: 'screen',
              WebkitMaskImage: `url(${iconUrl})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${iconUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '-6%',
              transform: 'translateZ(-6px)',
              background: 'conic-gradient(from 200deg, #ec4899, #7c3aed, #ec4899)',
              WebkitMaskImage: `url(${iconUrl})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${iconUrl})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              filter: 'blur(18px)',
              opacity: 0.55,
              pointerEvents: 'none',
            }}
          />
        </animated.div>
      </div>
    </section>
  )
}
