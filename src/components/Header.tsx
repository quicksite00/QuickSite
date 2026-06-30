function Header() {
  return (
    <header>
      <div className="animated-bg">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
      <div className="overlay"></div>
      <div className="header-content">
        <div className="animated-text-wrapper">
          <h1 className="glow">QuickSite</h1>
          <div className="underline-animation"></div>
        </div>
        <p className="tagline">One Page. <span className="highlight">Big Impact</span>.</p>
        <div className="cta-container">
          <a href="#intro" id="catBtn" className="cta">
            <span className="cta-text">Get Your Site Today</span>
            <div className="cta-bg"></div>
          </a>
        </div>
        <div className="scroll-down">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div className="floating-elements">
        <div className="float-box"></div>
        <div className="float-circle"></div>
        <div className="float-box"></div>
      </div>
    </header>
  )
}

export default Header
