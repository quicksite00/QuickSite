function Team() {
  return (
    <section className="team">
      <h2 className="section-title">Meet the Team</h2>
      <div className="title-line"></div>
      <p className="section-subtitle">Two friends, one mission: helping your business shine online.</p>

      <div className="team-cards">
        <div className="card team-card">
          <div className="card-inner">
            <div className="card-front">
              <img src="/assets/HassanDP2.png" alt="Developer" className="team-img" />
              <h3>Hassan</h3>
              <p className="role">The Frontend Developer</p>
              <div className="skills">
                <span>⚡ Web Developer</span>
                <span>⚡ Data Scientist</span>
                <span>⚡ Programmer</span>
              </div>
            </div>
            <div className="card-back">
              <h3>M. Hassan Nawaz</h3>
              <p>Creative problem solver, passionate about clean code, futuristic designs, and efficient
                solutions. I ensure every QuickSite is smooth, fast, and professional.</p>
              <div className="social-links">
                <a href="https://hassan-nawaz-portfolio00.vercel.app/" target="_blank" rel="noreferrer"><i className="fa-regular fa-user"></i></a>
                <a href="https://www.linkedin.com/in/hafiz-m-hassan-322331256/" target="_blank" rel="noreferrer" className="fa fa-linkedin-in"></a>
                <a href="https://github.com/HassanNawaz14/HassanNawaz14" target="_blank" rel="noreferrer" className="fa fa-github"></a>
                <a href="https://www.instagram.com/hassan.nawaz142003/" target="_blank" rel="noreferrer" className="fa fa-instagram"></a>
              </div>
            </div>
          </div>
        </div>

        <div className="card team-card">
          <div className="card-inner">
            <div className="card-front">
              <img src="/assets/HussnainDP.png" alt="Marketer" className="team-img" />
              <h3>Hussnain</h3>
              <p className="role">The Backend Developer</p>
              <div className="skills">
                <span>⚡ Web Developer</span>
                <span>⚡ Make.com</span>
                <span>⚡ Backend Automation</span>
              </div>
            </div>
            <div className="card-back">
              <h3>Khanzada Hussnain Tariq</h3>
              <p>Expert in outreach and client relations. With years of experience in call centers and marketing,
                I help businesses find their audience and grow fast.</p>
              <div className="social-links">
                <a href="#" target="_blank" rel="noreferrer"><i className="fa-regular fa-user"></i></a>
                <a href="https://www.linkedin.com/in/khanzada-hussnain-tariq-39a654382" target="_blank" rel="noreferrer" className="fa fa-linkedin-in"></a>
                <a href="#" target="_blank" rel="noreferrer" className="fa fa-github"></a>
                <a href="https://www.instagram.com/khanzadahassnaintariq" target="_blank" rel="noreferrer" className="fa fa-instagram"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
