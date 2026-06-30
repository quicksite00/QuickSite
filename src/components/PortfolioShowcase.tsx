import { useEffect, useState } from 'react'

const projects = [
  {
    category: 'professional',
    img: '/assets/Shehryar Ali Portfolio.png',
    alt: 'Chartered Accountant Portfolio',
    categoryLabel: 'Professional',
    title: 'Shehryar Ali',
    description: 'A sophisticated portfolio for a Chartered Accountant showcasing professional credentials, services, and expertise in financial consulting.',
    tags: ['Responsive Design', 'Contact Form', 'Service Showcase'],
    url: 'https://shehryar-ali-portfolio.netlify.app/',
    stat: 'Premium',
  },
  {
    category: 'business',
    img: '/assets/Chad Hall Web.png',
    alt: 'Marriage Hall Website',
    categoryLabel: 'Business',
    title: 'Chand Marriage Hall',
    description: "An elegant wedding venue website featuring gallery, booking system, and venue details for Phool Nagar's premier marriage hall.",
    tags: ['Image Gallery', 'Booking Info', 'Location Map'],
    url: 'https://chandmarriagehall.netlify.app/',
    stat: 'Featured',
  },
  {
    category: 'professional',
    img: '/assets/Usama Hassan Alvi Portfolio.png',
    alt: 'Academic Portfolio',
    categoryLabel: 'Professional',
    title: 'Muhammad Usama Hassan Alvi',
    description: 'A comprehensive academic portfolio for a Lecturer & Researcher highlighting publications, research areas, and teaching experience.',
    tags: ['Research Portfolio', 'Publications', 'CV Download'],
    url: 'https://usama-hassan-alvi-portfolio.netlify.app/',
    stat: 'Academic',
  },
  {
    category: 'business',
    img: '/assets/Cake Bar Web.png',
    alt: 'Bakery Website',
    categoryLabel: 'Business',
    title: 'The Cake Bar',
    description: 'A delightful bakery website featuring handcrafted sweetness, menu showcase, and online ordering capabilities with stunning visuals.',
    tags: ['Menu Display', 'Custom Animations', 'Social Integration'],
    url: 'https://thecakebar01.netlify.app',
    stat: 'Creative',
  },
]

function PortfolioShowcase() {
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const cards = document.querySelectorAll('.portfolio-card') as NodeListOf<HTMLElement>
    cards.forEach((card, index) => {
      const categories = card.getAttribute('data-category')?.split(' ') || []
      if (filter === 'all' || categories.includes(filter)) {
        setTimeout(() => {
          card.style.display = 'block'
          setTimeout(() => card.classList.add('show'), 50)
        }, index * 100)
      } else {
        card.classList.remove('show')
        setTimeout(() => { card.style.display = 'none' }, 300)
      }
    })
  }, [filter])

  return (
    <section className="portfolio-showcase" id="portfolio">
      <div className="portfolio-content">
        <h2 className="section-title animate-on-scroll">Our Success Stories</h2>
        <div className="title-line"></div>
        <p className="section-subtitle animate-on-scroll">Discover the stunning websites we've crafted for professionals and businesses</p>

        <div className="filter-tabs animate-on-scroll">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Projects</button>
          <button className={`filter-btn ${filter === 'professional' ? 'active' : ''}`} onClick={() => setFilter('professional')}>Professional Portfolio</button>
          <button className={`filter-btn ${filter === 'business' ? 'active' : ''}`} onClick={() => setFilter('business')}>Business & Services</button>
        </div>

        <div className="portfolio-grid">
          {projects.map((p, i) => (
            <div key={i} className="portfolio-card" data-category={p.category}>
              <div className="card-image-wrapper">
                <img src={p.img} alt={p.alt} className="card-image" />
                <div className="card-category">{p.categoryLabel}</div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{p.title}</h3>
                <p className="card-description">{p.description}</p>
                <div className="card-features">
                  {p.tags.map((tag, j) => (
                    <span key={j} className="feature-tag">{tag}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <a href={p.url} className="view-project-btn" target="_blank" rel="noreferrer">
                    View Project <i className="fas fa-arrow-right"></i>
                  </a>
                  <div className="project-stats">
                    <div className="stat-item">
                      <i className="fas fa-star"></i>
                      <span>{p.stat}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-cta animate-on-scroll">
          <div className="portfolio-cta-content">
            <h3>Ready to Join Our Success Stories?</h3>
            <p>Let's create something amazing together. Your stunning website is just one click away!</p>
            <a href="#contact" className="cta-button">Start Your Project</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioShowcase
