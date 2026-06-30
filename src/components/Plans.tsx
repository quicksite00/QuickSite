function Plans() {
  return (
    <section className="plans" id="plans">
      <div className="plans-content">
        <h2 className="section-title">Choose Your Plan</h2>
        <div className="title-line"></div>
        <p className="section-subtitle">Select the perfect website package for your needs</p>

        <div className="plans-container">
          <div className="plan-card basic-plan animate-on-scroll fade-left">
            <div className="plan-header">
              <h3>Basic Portfolio</h3>
              <div className="price">$5</div>
              <p className="plan-description">Perfect for individuals who need a simple yet attractive online presence</p>
            </div>
            <div className="plan-features">
              <ul>
                <li><i className="fas fa-check-circle"></i> One-page responsive design</li>
                <li><i className="fas fa-check-circle"></i> Modern, clean layout</li>
                <li><i className="fas fa-check-circle"></i> Contact form integration</li>
                <li><i className="fas fa-check-circle"></i> Social media Integration</li>
                <li><i className="fas fa-check-circle"></i> Basic customization</li>
                <li><i className="fas fa-check-circle"></i> Free hosting</li>
                <li><i className="fas fa-check-circle"></i> Request Based Maintenance</li>
              </ul>
            </div>
            <div className="plan-footer">
              <a href="#contact" className="cta-btn plan-btn">Select Basic</a>
            </div>
            <div className="plan-badge">Best Value</div>
          </div>

          <div className="plan-card basic-plan animate-on-scroll fade-left">
            <div className="plan-header">
              <h3>Standard Portfolio</h3>
              <div className="price">$10</div>
              <p className="plan-description">Perfect for businesses who need attractive, interactive and appealing online presence</p>
            </div>
            <div className="plan-features">
              <ul>
                <li><i className="fas fa-check-circle"></i> Everything in Basic, plus:</li>
                <li><i className="fas fa-check-circle"></i> Interactive animations</li>
                <li><i className="fas fa-check-circle"></i> Particle/fluid background effects</li>
                <li><i className="fas fa-check-circle"></i> Advanced effects (Scrolling etc)</li>
                <li><i className="fas fa-check-circle"></i> Illustrations/graphics</li>
                <li><i className="fas fa-check-circle"></i> Advance Contact Options</li>
                <li><i className="fas fa-check-circle"></i> Yearly/Monthly Maintenance</li>
              </ul>
            </div>
            <div className="plan-footer">
              <a href="#contact" className="cta-btn plan-btn">Select Standard</a>
            </div>
            <div className="plan-badge">Most Reliable</div>
          </div>

          <div className="plan-card premium-plan animate-on-scroll fade-right">
            <div className="plan-header">
              <h3>Interactive Pro</h3>
              <div className="price">$30</div>
              <p className="plan-description">For those who want to stand out with advanced features</p>
            </div>
            <div className="plan-features">
              <ul>
                <li><i className="fas fa-check-circle"></i> Everything in Standard, plus:</li>
                <li><i className="fas fa-check-circle"></i> Custom Features</li>
                <li><i className="fas fa-check-circle"></i> Impleid Sections</li>
                <li><i className="fas fa-check-circle"></i> Profile based Features</li>
                <li><i className="fas fa-check-circle"></i> Custom Illustrations/Graphics</li>
                <li><i className="fas fa-check-circle"></i> Custom Options/Integration</li>
                <li><i className="fas fa-check-circle"></i> Monthly/Weekly Maintenance</li>
              </ul>
            </div>
            <div className="plan-footer">
              <a href="#contact" className="cta-btn plan-btn premium-btn">Go Premium</a>
            </div>
            <div className="plan-badge premium-badge">The Premium</div>
          </div>
        </div>

        <div className="plan-comparison animate-on-scroll fade-up">
          <p>Not sure which plan is right for you? <a href="#contact">Contact us</a> for a free consultation!</p>
        </div>
      </div>
    </section>
  )
}

export default Plans
