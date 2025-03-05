import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';

export default function ShopPage() {
  return (
    <>
      <Navbar currentPage="shop" />
      <div className="bg-gray-50 min-h-screen pt-10" style={{ backgroundColor: 'gray' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white-900 mb-6 text-center">
            PREMIUM OVERSIZED T-SHIRTS
          </h1>
          
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="w-full h-120 aspect-w-1 aspect-h-1 overflow-hidden relative">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name}
                    width={600} 
                    height={600}
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
                  {product.isSale && (
                    <span className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 text-sm font-bold rounded-full">
                      SALE
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    <Link href={`/product/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center">
                    <span className="text-gray-500 line-through text-sm mr-2">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-black font-bold text-xl">₹{product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg text-white-600 mb-8 max-w-2xl mx-auto">
              Our premium oversized t-shirts are designed for comfort and style. Each piece features unique artwork that tells a story.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}