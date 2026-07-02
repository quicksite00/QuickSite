import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TeamPage from './pages/TeamPage'
import PortfolioPage from './pages/PortfolioPage'
import PlansPage from './pages/PlansPage'
import FeaturedProjects from './pages/FeaturedProjects'

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/featured" element={<FeaturedProjects />} />
    </Routes>
  )
}

export default App
