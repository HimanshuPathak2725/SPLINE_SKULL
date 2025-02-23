import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../styles/home.css'

export default function Home() {
  const sectionsRef = useRef([])

  useEffect(() => {
    sectionsRef.current.forEach((section, i) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        duration: 1
      })
    })
  }, [])

  return (
    <div className="home">
      <section ref={el => sectionsRef.current[0] = el} className="hero">
        <h1>Creative Developer</h1>
        <p>Building digital experiences</p>
      </section>

      <section ref={el => sectionsRef.current[1] = el} className="about">
        <h2>About</h2>
        <p>Frontend developer specializing in creative interfaces</p>
      </section>

      <section ref={el => sectionsRef.current[2] = el} className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          {/* Add your projects here */}
        </div>
      </section>

      <section ref={el => sectionsRef.current[3] = el} className="contact">
        <h2>Contact</h2>
        <a href="mailto:your@email.com">Get in touch</a>
      </section>
    </div>
  )
}
