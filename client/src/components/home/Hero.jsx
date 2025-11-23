const Hero = () => {
  return (
    <section className='hero-wrapper'>
      <div className='hero-image'></div>
      <div className='hero-content'>
        <h1>Hello, I'm Angela</h1>
        <div className='attributes'>
          <ul>
            <li>Lifelong learner</li>
            <li> | </li>
            <li>Web Developer</li>
            <li> | </li>
            <li>Silks Enthusiast</li>
          </ul>
        </div>
        <div>
          <button className='learn-more'><a href='#section-two-truths'>Learn more about me below</a></button>
        </div>
      </div>
    </section>
  )
}

export default Hero