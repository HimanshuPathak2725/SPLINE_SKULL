import { Scene } from '../Scene'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/layout.css'

gsap.registerPlugin(ScrollTrigger)

export default function Layout({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animation
      gsap.from('.content-wrapper', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power3.out'
      })

      // Scroll animations
      gsap.to('.scene-wrapper', {
        scrollTrigger: {
          trigger: '.content-wrapper',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        scale: 0.8,
        opacity: 0.7,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="layout">
      <div className="scene-wrapper">
        <Scene />
      </div>
      <div className="content-wrapper">
        {children}
      </div>
    </div>
  )
}
