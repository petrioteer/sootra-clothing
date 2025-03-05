'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Redirect to 404 or shop page if product not found
      router.push('/shop');
    }
    
    setLoading(false);
  }, [productId, router]);

  if (loading || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, 1, selectedSize);
    // Optional: Show confirmation or redirect to cart
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, 1, selectedSize);
    router.push('/checkout');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-10" style={{ backgroundColor: 'gray' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900">Shop</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
          
          {/* Previous/Next navigation */}
          <div className="flex justify-between mb-6">
            <Link href={`/product/${product.prevId || ''}`} className={`text-sm flex items-center ${!product.prevId ? 'invisible' : ''}`}>
              <span>← Prev</span>
            </Link>
            <Link href={`/product/${product.nextId || ''}`} className={`text-sm flex items-center ${!product.nextId ? 'invisible' : ''}`}>
              <span>Next →</span>
            </Link>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product image with Amazon-like zoom */}
            <div 
              className="relative rounded-lg overflow-hidden shadow-xl animate-float cursor-zoom-in"
              onMouseMove={(e) => {
                const container = e.currentTarget;
                const { left, top, width, height } = container.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                const img = container.querySelector('img');
                if (img) img.style.transformOrigin = `${x}% ${y}%`;
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(2)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <Image 
                src={product.images[0]} 
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg object-contain bg-gray w-full h-auto transition-transform duration-200"
                priority
              />
            </div>
            
            {/* Product details */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase">{product.name}</h1>
              
              <div className="mt-3">
                <div className="flex items-center">
                  <p className="text-3xl text-white font-bold">₹{product.price.toFixed(2)}</p>
                  {product.originalPrice > product.price && (
                    <p className="ml-3 text-xl text-gray-300 line-through">₹{product.originalPrice.toFixed(2)}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-sm font-medium text-white">Color: {product.color || 'White'}</h2>
                <div className="mt-2">
                  <div className="flex items-center space-x-3">
                    <button 
                      className="relative rounded-full h-8 w-8 border border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                      style={{ backgroundColor: product.color === 'Black' ? 'black' : 'white' }}
                    >
                      <span className="sr-only">{product.color || 'White'}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-sm font-medium text-white">Size</h2>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {['M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full border ${
                          selectedSize === size 
                            ? 'border-white bg-black text-white' 
                            : 'border-white bg-white text-gray-900 hover:border-gray-200'
                        } flex items-center justify-center text-sm font-medium focus:outline-none`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Add to Cart
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="mt-4 w-full bg-white border border-gray-900 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Buy Now
                </button>
              </div>
              {/* Share section */}
              <div className="mt-6">
                <p className="text-sm font-medium text-white mb-2">Share:</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.26-.149-4.771-1.699-4.919-4.919-6.98.059-1.28.073-1.689.073-4.948 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.204.013-3.583.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-300 pt-8">
                <h2 className="text-lg font-bold text-white uppercase">PRODUCT INFO</h2>
                <p className="mt-2 text-white">{product.description}</p>
              </div>
              <div className="mt-8 border-t border-gray-300 pt-8">
                <h2 className="text-lg font-bold text-white uppercase">SPECIFICATIONS</h2>
                <div className="mt-2 text-white">
                  <p>240 GSM 100% Cotton</p>
                  <p>Fit: Relaxed fit / Oversized</p>
                  <p>Premium quality with unique {product.name.split(' ')[0]} design</p>
                  <p>Free shipping on all orders. Delivery in 2-7 days.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg text-white-800 mb-8 max-w-2xl mx-auto">
              Merges contemporary aesthetics with traditional craftsmanship and distinctive texture.
            </p>
          </div>
          {/* Similar Items Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center uppercase">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 4)
                .map((similarProduct) => (
                  <Link href={`/product/${similarProduct.id}`} key={similarProduct.id} className="group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 h-full flex flex-col">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={similarProduct.images[0]}
                          alt={similarProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{similarProduct.name}</h3>
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-lg font-bold text-gray-900">₹{similarProduct.price.toFixed(2)}</p>
                          {similarProduct.originalPrice > similarProduct.price && (
                            <p className="text-sm text-gray-500 line-through">₹{similarProduct.originalPrice.toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}