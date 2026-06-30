function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="intro-content">
        <div className="intro-text animate-on-scroll fade-up">
          <h2 className="intro-title">Welcome to <span>QuickSite</span></h2>
          <div className="title-line title-line--small"></div>
          <p className="intro-tagline">We craft lightning-fast, one-page websites that help startups and small businesses
            shine on the web.</p>
          <p className="intro-detail">Whether you're just starting out or already growing on platforms like Instagram and Facebook, we give you a professional edge with sleek, responsive, and impactful sites. These websites are hosted free of cost and they are live 24/7, keeping your online identity alive all the time!</p>
          <a href="#process" id="cta-intro" className="cta intro-cta animate-on-scroll fade-up">See What You Get</a>
        </div>
        <div className="intro-image animate-on-scroll fade-right">
          <img src="/assets/QuickSite Logo.png" alt="QuickSite Preview" />
        </div>
      </div>
    </section>
  )
}

export default Intro
