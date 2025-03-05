'use client'

import { useEffect } from 'react'

export default function ParallaxEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.parallax-bg')
      
      parallaxElements.forEach((element) => {
        const speed = 0.5 // Adjust for more or less movement
        const yPos = -(scrollTop * speed)
        element.setAttribute('style', `transform: translate3d(0, ${yPos}px, 0)`)
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return null
}