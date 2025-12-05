const Hero = () => {
  return (
    <section className='hero-wrapper'>
      <div className='curved-background'>
        <div className='hero-top-content'>
          <div className='hero-image'></div>
          <div className='hero-text'>
            <h1>Hello, I'm Angela</h1>
            <div className='attributes'>
              <ul>
                <li>Lifelong learner</li>
                <li> | </li>
                <li>Software Engineer</li>
                <li> | </li>
                <li>Silks Enthusiast</li>
              </ul>
            </div>
            <p>Software Engineer with 3+ years building Vue, PHP, and Ruby apps across 100+ sites and a proven track record mentoring developers and delivering business features.
            </p>
          </div>
        </div>
        <svg className='curve curve-mobile' viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" fill="#FFFFFF" />
        </svg>
        <svg className='curve curve-desktop' viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C480,200 960,200 1440,0 L1440,100 L0,100 Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className='hero-testimonials-card'>
        <p className='about-me'></p>
        <button className='learn-more'><a href='#section-two-truths'>Learn more about me below</a></button>
      </div>
    </section>
  )
}

export default Hero