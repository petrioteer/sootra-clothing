export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  isSale?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: 'dharmo-oversized-tee',
    name: 'DHARMO OVERSIZED TEE',
    description: 'Premium oversized t-shirt with unique Dharmo design.',
    price: 769.00,
    originalPrice: 1199.00,
    images: ['/images/products/dharmo-tee.jpg'],
    category: 'tshirts',
    isSale: true
  },
  {
    id: 'kaali-oversized-tee',
    name: 'KAALI OVERSIZED TEE',
    description: 'Premium oversized t-shirt with unique Kaali design.',
    price: 769.00,
    originalPrice: 1199.00,
    images: ['/images/products/kaali-tee.jpg'],
    category: 'tshirts',
    isSale: true
  },
  {
    id: 'krantinari-oversized-tee',
    name: 'KRANTINARI OVERSIZED TEE',
    description: 'Premium oversized t-shirt with unique Krantinari design.',
    price: 659.00,
    originalPrice: 1099.00,
    images: ['/images/products/krantinari-tee.jpg'],
    category: 'tshirts',
    isSale: true
  }
];
// Update your Product interface to include prevId and nextId
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  color?: string;
  images: string[];
  featured?: boolean;
  prevId?: string;  // Add this property
  nextId?: string;  // Add this property
}

// Helper function to get a product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

// Helper function to get featured products (for homepage)
export function getFeaturedProducts(limit = 3): Product[] {
  return products.slice(0, limit);
}