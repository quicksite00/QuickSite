function Footer() {
  return (
    <footer className="site-footer">
      <div className="animated-bg footer-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
      <div className="footer-overlay"></div>
      <div className="footer-content">
        <img src="/assets/QuickSite Logo.png" alt="Logo" className="footer-logo" />
        <h2 className="footer-title">Let's Build Something Great</h2>
        <p className="footer-tagline">Logic-Based Solutions | Step-in • Make-day • Live!</p>

        <div className="footer-socials">
          <a href="https://github.com/quicksite00" target="_blank" rel="noreferrer" className="social-link fa fa-github" title="GitHub">
            <span className="social-tooltip">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/company/quick-site-r/" target="_blank" rel="noreferrer" className="social-link fa fa-linkedin" title="LinkedIn">
            <span className="social-tooltip">LinkedIn</span>
          </a>
          <a href="https://quick-site-00.vercel.app/" target="_blank" rel="noreferrer" className="social-link fa fa-globe" title="Website">
            <span className="social-tooltip">Website</span>
          </a>
          <a href="https://www.instagram.com/quick.site00/" target="_blank" rel="noreferrer" className="social-link fa fa-instagram" title="Instagram">
            <span className="social-tooltip">Instagram</span>
          </a>
          <a href="mailto:quicksite00@gmail.com" target="_blank" rel="noreferrer" className="social-link fa fa-envelope" title="Email">
            <span className="social-tooltip">Email</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2020 QuickSite | All Rights Reserved</p>
      </div>

      <div className="floating-elements footer-floats">
        <div className="float-box"></div>
        <div className="float-circle"></div>
        <div className="float-box"></div>
      </div>
    </footer>
  )
}

export default Footer
