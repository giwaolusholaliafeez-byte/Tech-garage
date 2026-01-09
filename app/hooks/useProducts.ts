'use client';

import { useState, useEffect } from 'react';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem('admin-products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch {
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
    setIsLoading(false);
  }, []);

  return { products, isLoading };
}

