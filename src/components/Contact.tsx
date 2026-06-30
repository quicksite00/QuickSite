import { useState, type FormEvent } from 'react'

function Contact() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setSending(true)
    setStatus(null)

    try {
      const formData = new FormData(form)
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus({ type: 'success', message: "Message sent successfully! We'll get back to you soon." })
        form.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch {
      setStatus({ type: 'error', message: 'Oops! There was a problem sending your message. Please try again.' })
    } finally {
      setSending(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-content">
        <h2 className="section-title">Get In Touch</h2>
        <div className="title-line"></div>
        <p className="section-subtitle">Ready to elevate your online presence? Let's create something amazing together!</p>

        <div className="contact-container">
          <div className="contact-info animate-on-scroll fade-left">
            <h3>Why Choose QuickSite?</h3>
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-rocket"></i></div>
              <div className="info-text">
                <h4>Lightning Fast</h4>
                <p>Websites optimized for speed and performance</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-paint-brush"></i></div>
              <div className="info-text">
                <h4>Beautiful Design</h4>
                <p>Modern, eye-catching designs that convert visitors</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><i className="fa-solid fa-hand-holding-dollar"></i></div>
              <div className="info-text">
                <h4>One Time Payment</h4>
                <p>We don't trap you in monthly subscriptions — pay once, enjoy forever.</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon"><i className="fas fa-server"></i></div>
              <div className="info-text">
                <h4>Free Hosting</h4>
                <p>We handle hosting so you don't have to worry</p>
              </div>
            </div>
          </div>

          <form className="contact-form animate-on-scroll fade-right" id="contact-form"
            action="https://formspree.io/f/xvgbyyna" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" name="name" required />
              <label htmlFor="name">Your Name</label>
              <div className="input-highlight"></div>
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" required />
              <label htmlFor="email">Your Email</label>
              <div className="input-highlight"></div>
            </div>
            <div className="form-group">
              <select id="service" name="service" required defaultValue="">
                <option value="" disabled></option>
                <option value="basic">Basic Portfolio Site</option>
                <option value="premium">Interactive Pro Site</option>
                <option value="custom">Custom Project</option>
                <option value="consultation">Consultation</option>
              </select>
              <label htmlFor="service">Service Needed</label>
              <div className="input-highlight"></div>
            </div>
            <div className="form-group">
              <textarea id="message" name="message" rows={5} required></textarea>
              <label htmlFor="message">Your Message</label>
              <div className="input-highlight"></div>
            </div>
            <button type="submit" className={`cta-btn form-submit ${sending ? 'sending' : ''}`}>
              <span>Send Message</span>
              <div className="submit-loader">
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
              </div>
            </button>
            {status && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
