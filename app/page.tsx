import Image from "next/image";
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParallaxBackground from './components/ParallaxBackground'
import { getFeaturedProducts } from './data/products';

export default function Home() {
  const featuredProducts = getFeaturedProducts(3);
  
  return (
    <>
      <Navbar currentPage="home" />
      
      <section className="relative h-screen bg-black text-white overflow-hidden">
        {/* Parallax background */}
        <ParallaxBackground imageUrl="/images/oversized-tshirt-hero.jpg" />
        
        {/* Dark overlay that's initially less opaque */}
        <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-500 ease-in-out"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            
          </h2>
          <div className="mt-48 relative group">
            {/* Overlay that appears only when hovering the button */}
            <div className="fixed inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-500 ease-in-out pointer-events-none"></div>
            
            <Link
              href="/shop"
              className="bg-white text-black px-12 py-6 text-2xl md:text-3xl font-bold relative z-20 overflow-hidden group-hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Shop Now</span>
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-150"></span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* New Drops Section */}
      <section className="py-16 text-white" style={{ backgroundColor: 'gray' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">NEW DROPS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg bg-white text-black">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden relative">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    width={500} 
                    height={500}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:blur-[2px]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link 
                      href={`/product/${product.id}`} 
                      className="bg-white text-black px-6 py-3 font-bold rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <div className="bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded-full">
                      SALE
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-gray-500 line-through mr-2">₹{product.originalPrice.toFixed(2)}</span>
                    <span className="text-xl font-bold">₹{product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/shop" 
              className="inline-block border-2 border-white px-8 py-3 text-lg font-bold hover:bg-white hover:text-gray-800 transition-colors duration-300"
              style={{ ['--hover-text-color' as string]: '#545452' }}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}
