'use client';

import { useProducts } from './hooks/useProducts';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter((p) => p.featured);
  const otherProducts = products.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16 text-center animate-fade-in">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tech Garage
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            TechGarage — your go-to spot for quality gadgets at great prices. Reliable tech, smooth service, no stress. Shop smart. Upgrade today 🚀
          </p>
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="mb-16 animate-fade-in">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Featured Products</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <section className="animate-fade-in">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">All Products</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {otherProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${(featuredProducts.length + index) * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
