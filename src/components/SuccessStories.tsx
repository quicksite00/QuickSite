import { useEffect, useRef } from 'react'

const stories = [
  {
    name: 'Alex Chen',
    role: 'Freelance Designer',
    quote: "QuickSite got me a professional portfolio in hours, not weeks. My client bookings doubled within a month.",
    gradient: 'linear-gradient(135deg, #FF00CC, #8000FF)',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Software Engineer',
    quote: "Finally a website that looks as good as my code. The one-page layout is clean, fast, and recruiters love it.",
    gradient: 'linear-gradient(135deg, #8000FF, #0ff)',
  },
  {
    name: 'James Okafor',
    role: 'Startup Founder',
    quote: "We needed a landing page fast. QuickSite delivered a stunning site with zero subscription traps. Forever ours.",
    gradient: 'linear-gradient(135deg, #0ff, #FF00CC)',
  },
  {
    name: 'Maya Patel',
    role: 'UX Designer',
    quote: "My portfolio went from basic to breathtaking. The curved layout alone gets compliments in every interview.",
    gradient: 'linear-gradient(135deg, #FF00CC, #0ff)',
  },
  {
    name: 'David Kim',
    role: 'Product Manager',
    quote: "Zero hosting fees, zero subscriptions. Just a gorgeous site that loads instantly. Exactly what I needed.",
    gradient: 'linear-gradient(135deg, #8000FF, #FF00CC)',
  },
]

function SuccessStories() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef(0)

  const totalCards = stories.length

  const updateCurve = () => {
    const track = trackRef.current
    if (!track) return

    const vpW = window.innerWidth
    const vpH = window.innerHeight

    const stripeCx = 0.5 * vpW
    const stripeCy = 0.35 * vpH + 379.2
    const stripeRx = 0.72 * vpW
    const stripeRy = 288
    const baselineY = 0.45 * vpH

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      const cardRect = card.getBoundingClientRect()
      const cx = cardRect.left + cardRect.width / 2

      const dx = cx - stripeCx
      const ratio = Math.max(-1, Math.min(1, dx / stripeRx))
      const yOnArc = stripeCy - stripeRy * Math.sqrt(1 - ratio * ratio)
      const translateY = yOnArc - baselineY

      const cardPos = (i / (totalCards - 1)) * 2 - 1
      const progressCenter = progressRef.current * 2 - 1
      const diff = cardPos - progressCenter
      const clamped = Math.max(-1, Math.min(1, diff))
      const rotate = clamped * 60

      card.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`
    })
  }

  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    if (!pin || !track) return

    const getCardWidth = () => {
      const first = cardsRef.current[0]
      if (!first) return 0
      return first.getBoundingClientRect().width
    }

    let cardWidth = getCardWidth()
    let maxTranslate = (stories.length - 1) * cardWidth

    const onScroll = () => {
      const pinRect = pin.getBoundingClientRect()
      const scrollableDistance = pin.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -pinRect.top / scrollableDistance))
      progressRef.current = progress
      const initialShift = 0.5 * window.innerWidth - cardWidth / 2
      const offset = -initialShift + progress * maxTranslate
      track.style.transform = `translate(-50%, -50%) translateX(${-offset}px)`
      updateCurve()
    }

    const onResize = () => {
      cardWidth = getCardWidth()
      maxTranslate = (stories.length - 1) * cardWidth
      onScroll()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={pinRef} style={{ position: 'relative', height: '500vh' }}>
      <section
        ref={sectionRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(180deg, #0D0920 0%, #1A1538 30%, #2D264E 70%, #151225 100%)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        {(() => {
          const vpW = window.innerWidth
          const vpH = window.innerHeight
          const stripeCx = 0.5 * vpW
          const stripeCy = 0.35 * vpH + 379.2
          const stripeRx = 0.72 * vpW
          const stripeRy = 288

          const text = "SUCCESS STORIES"
          return (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 3,
                pointerEvents: 'none',
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: 4,
                fontSize: 'clamp(2.2rem, 4.5vw, 5rem)',
              }}
            >
              {text.split('').map((ch, i) => {
                const n = text.length
                const charX = ((i / (n - 1)) * 0.92 + 0.04) * vpW
                const dx = charX - stripeCx
                const ratio = Math.max(-1, Math.min(1, dx / stripeRx))
                const yOnArc = stripeCy - stripeRy * Math.sqrt(1 - ratio * ratio)
                const topPx = yOnArc - 0.35 * vpH - 80

                return (
                  <span
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${((i / (n - 1)) * 0.92 + 0.04) * 100}%`,
                      top: topPx,
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #A9ADC0, #7D96AC)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                )
              })}
            </div>
          )
        })()}

        <svg
          style={{
            position: 'absolute',
            top: '35%',
            left: 0,
            width: '100%',
            height: 400,
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'visible',
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="stripeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#869EB6" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#A9ADC0" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#90AEC7" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#A9ADC0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#869EB6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M -10,12.14 A 61 61 0 0 1 110,12.14 A 58.93 58.93 0 0 1 110,130 A 62 62 0 0 0 -10,130 A 58.93 58.93 0 0 1 -10,12.14 Z"
            fill="url(#stripeGrad)"
            opacity="0.9"
          />
        </svg>

        <div
          ref={trackRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: 460,
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            overflow: 'visible',
            zIndex: 2,
            willChange: 'transform',
          }}
        >
          {stories.map((s, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              style={{
                flex: '0 0 42vw',
                height: 340,
                background: 'rgba(26,26,46,0.85)',
                borderRadius: 20,
                padding: 32,
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                willChange: 'transform',
                transformOrigin: '50% 120%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: s.gradient,
                  boxShadow: '0 0 20px rgba(255,0,204,0.5)',
                }}
              />

              <div
                style={{
                  fontSize: 48,
                  lineHeight: 1,
                  background: s.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 12,
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 900,
                }}
              >
                "
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  opacity: 0.9,
                  margin: 0,
                  flex: 1,
                }}
              >
                {s.quote}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: s.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {s.name.charAt(0)}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{s.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SuccessStories
