import { useEffect } from 'react'
import Header from './components/Header'
import Intro from './components/Intro'
import Team from './components/Team'
import Moto from './components/Moto'
import PortfolioShowcase from './components/PortfolioShowcase'
import Process from './components/Process'
import Plans from './components/Plans'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPos = (e.clientX / window.innerWidth) - 0.5
      const yPos = (e.clientY / window.innerHeight) - 0.5
      const headerContent = document.querySelector('.header-content') as HTMLElement
      if (headerContent) {
        headerContent.style.transform = `perspective(800px) rotateX(${yPos * 8}deg) rotateY(${xPos * 8}deg) translateZ(50px)`
      }
      const blobs = document.querySelectorAll('.gradient-blob') as NodeListOf<HTMLElement>
      blobs.forEach((blob, index) => {
        const offset = (index + 1) * 50
        blob.style.transform = `translate(${xPos * offset}px, ${yPos * offset}px)`
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', () => {
      const headerContent = document.querySelector('.header-content') as HTMLElement
      if (headerContent) {
        headerContent.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      }
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    document.addEventListener('click', handleSmoothScroll)
    return () => document.removeEventListener('click', handleSmoothScroll)
  }, [])

  useEffect(() => {
    const portfolioCards = document.querySelectorAll('.portfolio-card')
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show')
          }, index * 150)
          cardObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    portfolioCards.forEach((card) => cardObserver.observe(card))
    return () => cardObserver.disconnect()
  }, [])

  useEffect(() => {
    const teamCards = document.querySelectorAll('.team-card') as NodeListOf<HTMLElement>
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)

    const handleCardClick = (e: Event) => {
      if (!isTouch) return
      const card = (e.target as HTMLElement).closest('.team-card') as HTMLElement
      if (!card || (e.target as HTMLElement).closest('a')) return
      card.classList.toggle('flipped')
    }

    teamCards.forEach((card) => card.addEventListener('click', handleCardClick))
    return () => teamCards.forEach((card) => card.removeEventListener('click', handleCardClick))
  }, [])

  return (
    <>
      <Header />
      <Intro />
      <Team />
      <Moto />
      <PortfolioShowcase />
      <Process />
      <Plans />
      <Contact />
      <Footer />
    </>
  )
}

export default App
