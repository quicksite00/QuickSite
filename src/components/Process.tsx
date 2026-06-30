function Process() {
  const steps = [
    { num: '01', title: 'Choose Your Plan', desc: "Select the perfect package that matches your vision and budget. Whether it's a basic portfolio or a premium interactive site, we've got you covered.", icon: 'fa-rocket' },
    { num: '02', title: 'Free Consultation', desc: "We connect with you to understand your unique needs, discuss design preferences, and ensure we're aligned for a smooth collaboration.", icon: 'fa-comments' },
    { num: '03', title: 'Share Your Info', desc: 'Provide your details, portfolio content, CV, and any specific requirements. The more we know about you, the better we can showcase your story.', icon: 'fa-file-alt' },
    { num: '04', title: 'We Build Your Site', desc: 'Our team crafts your personalized website with modern design, smooth animations, and responsive layouts that work perfectly on all devices.', icon: 'fa-code' },
    { num: '05', title: 'Free Hosting & Deployment', desc: 'We deploy your website on WWW by Vercel and GitHub using your email, ensuring 24/7 availability with blazing-fast performance and zero hosting costs.', icon: 'fa-cloud-upload-alt' },
    { num: '06', title: 'Your Site Goes Live!', desc: 'Your professional portfolio is ready to impress! Share your new online presence with the world and watch opportunities come your way.', icon: 'fa-check-circle' },
  ]

  return (
    <section className="process" id="process">
      <div className="process-content">
        <h2 className="section-title">How We Work</h2>
        <div className="title-line"></div>
        <p className="section-subtitle">A seamless journey from idea to live website in simple steps</p>

        <div className="process-container">
          <div className="process-steps">
            {steps.map((s, i) => (
              <div key={i} className={`process-step animate-on-scroll ${i % 2 === 0 ? 'fade-left' : 'fade-right'}`}>
                <div className="step-number">{s.num}</div>
                <div className="step-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <div className="step-icon">
                  <i className={`fas ${s.icon}`}></i>
                </div>
              </div>
            ))}
          </div>

          <div className="process-visual animate-on-scroll fade-up">
            <div className="visual-container">
              <div className="visual-step">
                <div className="visual-icon"><i className="fas fa-clipboard-list"></i></div>
                <div className="visual-arrow">→</div>
              </div>
              <div className="visual-step">
                <div className="visual-icon"><i className="fas fa-handshake"></i></div>
                <div className="visual-arrow">→</div>
              </div>
              <div className="visual-step">
                <div className="visual-icon"><i className="fas fa-user-circle"></i></div>
                <div className="visual-arrow">→</div>
              </div>
              <div className="visual-step">
                <div className="visual-icon"><i className="fas fa-laptop-code"></i></div>
                <div className="visual-arrow">→</div>
              </div>
              <div className="visual-step">
                <div className="visual-icon"><i className="fas fa-server"></i></div>
                <div className="visual-arrow">→</div>
              </div>
              <div className="visual-step">
                <div className="visual-icon"><i className="fas fa-globe"></i></div>
              </div>
            </div>
            <div className="visual-labels">
              <span>Plan</span>
              <span>Consult</span>
              <span>Info</span>
              <span>Build</span>
              <span>Host</span>
              <span>Live!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
