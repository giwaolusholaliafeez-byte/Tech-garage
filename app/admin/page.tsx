'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductImage from '../components/ProductImage';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const savedProducts = localStorage.getItem('admin-products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        // Clean up any products with invalid image URLs
        const cleaned = parsed.map((p: Product) => {
          if (p.image && !p.image.startsWith('http://') && !p.image.startsWith('https://') && !p.image.startsWith('/')) {
            // Replace invalid image URL with placeholder
            return { ...p, image: 'https://via.placeholder.com/500x500?text=No+Image' };
          }
          return p;
        });
        setProducts(cleaned);
        localStorage.setItem('admin-products', JSON.stringify(cleaned));
      } catch {
        setProducts(initialProducts);
        localStorage.setItem('admin-products', JSON.stringify(initialProducts));
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('admin-products', JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('admin-products', JSON.stringify(products));
    }
  }, [products]);

  const handleAdd = () => {
    setIsAdding(true);
    setEditingProduct({
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      featured: false,
    });
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setEditingProduct(product);
    setIsAdding(false);
  };

  const handleSave = () => {
    // Validation
    if (!editingProduct.name?.trim()) {
      alert('Please enter a product name');
      return;
    }
    if (!editingProduct.description?.trim()) {
      alert('Please enter a product description');
      return;
    }
    if (!editingProduct.price || editingProduct.price <= 0) {
      alert('Please enter a valid price');
      return;
    }
    if (!editingProduct.image?.trim()) {
      alert('Please upload an image or enter an image URL');
      return;
    }
    // Validate image URL format (allow http://, https://, or paths starting with /)
    const imageUrl = editingProduct.image.trim();
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
      alert('Image URL must be a valid URL starting with http://, https://, or /');
      return;
    }
    if (!editingProduct.category?.trim()) {
      alert('Please enter a category');
      return;
    }

    if (isAdding) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: editingProduct.name.trim(),
        description: editingProduct.description.trim(),
        price: editingProduct.price || 0,
        image: editingProduct.image.trim(),
        category: editingProduct.category.trim(),
        featured: editingProduct.featured || false,
      };
      setProducts([...products, newProduct]);
      setIsAdding(false);
    } else if (isEditing) {
      setProducts(
        products.map((p) =>
          p.id === isEditing
            ? {
                ...p,
                name: editingProduct.name?.trim() || p.name,
                description: editingProduct.description?.trim() || p.description,
                price: editingProduct.price || p.price,
                image: editingProduct.image?.trim() || p.image,
                category: editingProduct.category?.trim() || p.category,
                featured: editingProduct.featured ?? p.featured,
              }
            : p
        )
      );
      setIsEditing(null);
    }
    setEditingProduct({});
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditingProduct({});
    setUploadError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB for Cloudinary)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      setEditingProduct({ ...editingProduct, image: data.url });
      setUploadError(null);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-2 text-gray-600">Manage your product inventory</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg">
            <div className="text-sm font-medium opacity-90">Total Products</div>
            <div className="mt-2 text-3xl font-bold">{products.length}</div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white shadow-lg">
            <div className="text-sm font-medium opacity-90">Featured Products</div>
            <div className="mt-2 text-3xl font-bold">
              {products.filter((p) => p.featured).length}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 text-white shadow-lg">
            <div className="text-sm font-medium opacity-90">Total Value</div>
            <div className="mt-2 text-3xl font-bold">
              ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || isEditing) && (
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {isAdding ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button
                onClick={handleCancel}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={editingProduct.category || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Audio, Gaming, Accessories"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:from-blue-700 hover:file:to-purple-700 file:cursor-pointer disabled:opacity-50"
                    />
                    {uploading && (
                      <p className="mt-1 text-sm text-blue-600">Uploading...</p>
                    )}
                    {uploadError && (
                      <p className="mt-1 text-sm text-red-600">{uploadError}</p>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={editingProduct.image || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, image: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  {editingProduct.image && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 mb-1">Preview:</p>
                      <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        <ProductImage
                          src={editingProduct.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured || false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Product</span>
                </label>
              </div>
              <div className="sm:col-span-2 flex gap-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-medium text-white transition-all hover:shadow-lg hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  Save Product
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Featured
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {product.featured ? (
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white">
                          Featured
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(product.id)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && (
          <div className="mt-8 text-center py-12">
            <p className="text-gray-500">No products found. Add your first product!</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-all hover:bg-red-700 hover:shadow-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

