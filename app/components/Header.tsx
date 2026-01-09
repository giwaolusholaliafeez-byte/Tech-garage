'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tech Garage
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Shop
          </Link>
          <Link
            href="/admin"
            className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Admin
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white animate-bounce">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

