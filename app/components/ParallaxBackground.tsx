'use client'

import { useEffect, useRef, useState } from 'react'

interface ParallaxBackgroundProps {
  imageUrl: string;
}

export default function ParallaxBackground({ imageUrl }: ParallaxBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  useEffect(() => {
    if (!bgRef.current) return
    
    // Increased multiplier for more noticeable effect
    const yValue = scrollY * 0.08
    
    // Apply transform with hardware acceleration
    bgRef.current.style.transform = `translate3d(0, ${yValue}px, 0)`
  }, [scrollY])
  
  return (
    <div 
      ref={bgRef}
      className="absolute inset-0 bg-cover bg-center will-change-transform"
      style={{ 
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    />
  )
}