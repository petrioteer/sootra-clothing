'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Navbar({ currentPage = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ backgroundColor: '#545454' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/images/sootra-logo.png" 
                alt="SOOTRA" 
                width={280} 
                height={112} 
                className="w-auto h-28 animate-float"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link 
                href="/" 
                className={`px-4 py-2 text-xl font-medium ${currentPage === 'home' ? 'text-white font-bold border-b-2 border-white' : 'hover:text-gray-300'}`}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className={`px-4 py-2 text-xl font-medium ${currentPage === 'shop' ? 'text-white font-bold border-b-2 border-white' : 'hover:text-gray-300'}`}
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-2">
              <span className="sr-only">Cart</span>
              <svg
                className="h-9 w-9 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <Link href="/login" className="p-2">
              <span className="sr-only">Login</span>
              <svg
                className="h-9 w-9 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}