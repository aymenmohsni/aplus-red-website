import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { mockProducts, mockVendors } from '../../utils/mockData';
import { useAuthStore } from '../../store/authStore';

const VendorProducts = () => {
  const { user } = useAuthStore();
  const vendor = mockVendors.find(v => v.id === user?.vendorId) || mockVendors[0];

  const supplierIdMap = { 'VEN-001': 'SUP-001', 'VEN-002': 'SUP-002', 'VEN-003': 'SUP-003' };
  const legacyId = supplierIdMap[vendor.id];

  const [products, setProducts] = useState(mockProducts.filter(p => p.supplierId === legacyId));
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', description: '', imagePreview: '', imageFile: null });

  const categories = ['Surgical Supplies', 'Diagnostic Equipment', 'Personal Protection', 'Laboratory', 'Patient Care', 'Emergency Medical'];

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name: '', category: '', price: '', stock: '', description: '', imagePreview: '', imageFile: null });
    setEditingProduct(null);
    setShowAddModal(true);
  };

  const openEdit = (product) => {
    setForm({ name: product.name, category: product.category, price: product.price, stock: product.stock, description: product.description, imagePreview: product.image || '', imageFile: null });
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, imagePreview: reader.result, imageFile: file }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id
        ? { ...p, name: form.name, category: form.category, price: parseFloat(form.price), stock: parseInt(form.stock), description: form.description, image: form.imagePreview || p.image }
        : p
      ));
    } else {
      const newProduct = {
        id: 'new-' + Date.now(),
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
        description: form.description,
        supplierId: legacyId,
        supplier: vendor.name,
        image: form.imagePreview || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
        features: [],
        specifications: {},
      };
      setProducts([...products, newProduct]);
    }
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this product from your store?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
          />
        </div>
        <button onClick={openAdd} className="btn-medical flex items-center gap-2 whitespace-nowrap">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-neutral">{products.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Products</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{products.filter(p => p.stock < 20).length}</p>
          <p className="text-xs text-gray-500 mt-1">Low Stock</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-red-500">{products.filter(p => p.stock === 0).length}</p>
          <p className="text-xs text-gray-500 mt-1">Out of Stock</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-neutral truncate max-w-xs">{product.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-xs">{product.description?.slice(0, 60)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-neutral">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-sm font-semibold ${
                      product.stock === 0 ? 'text-red-600' :
                      product.stock < 20 ? 'text-orange-500' : 'text-green-600'
                    }`}>
                      {product.stock < 20 && product.stock > 0 && <AlertTriangle className="w-3.5 h-3.5" />}
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No products found</div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-slide-up">
            <h3 className="font-display text-2xl text-neutral mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-neutral mb-1">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input-medical"
                  placeholder="e.g. Surgical Gloves Box 100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="input-medical"
                  >
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral mb-1">Price ($) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="input-medical"
                    placeholder="29.99"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral mb-1">Initial Stock</label>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                  className="input-medical"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral mb-1">Product Image</label>
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                  {form.imagePreview ? (
                    <div className="relative">
                      <img src={form.imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded-lg mx-auto" />
                      <p className="text-xs text-primary mt-2 text-center font-medium">Click to change</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <p className="text-sm text-gray-500">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="input-medical resize-none"
                  rows={3}
                  placeholder="Brief product description..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 btn-medical">
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
