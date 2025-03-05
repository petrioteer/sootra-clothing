import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#545454' }} className="text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">OUR STORE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-gray-300">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sootra Clothing</h2>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">NEED ASSISTANCE?</h3>
              <a href="mailto:sootraclothings@gmail.com" className="hover:text-gray-300">
                sootraclothings@gmail.com
              </a>
            </div>
          </div>
          
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-4">STAY CONNECTED</h3>
            <a href="https://instagram.com/sootraclothings" className="hover:text-gray-300">
              @sootraclothings
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>© {new Date().getFullYear()} | Sootra Clothing | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}