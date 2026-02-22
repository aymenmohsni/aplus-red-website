import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Package, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { mockProducts } from '../utils/mockData';
import { useCartStore } from '../store/cartStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral mb-2">Product not found</h2>
          <Link to="/products" className="text-primary hover:text-primary/80">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="glass-card p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in animate-delay-200">
            <div className="mb-4">
              <span className="badge-status bg-primary/10 text-primary">
                {product.category}
              </span>
            </div>

            <h1 className="font-display text-4xl text-neutral mb-4">{product.name}</h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Price and Stock */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-gray-500">per unit</span>
              </div>
              <p className="text-sm text-gray-600">
                Supplier: <span className="font-semibold">{product.supplier}</span>
              </p>
              <p className="text-sm text-gray-600">
                Stock: <span className="font-semibold text-green-600">{product.stock} units available</span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-neutral mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= product.stock) {
                      setQuantity(val);
                    }
                  }}
                  className="w-20 text-center input-medical"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600">
                  Total: <span className="font-bold text-primary">${(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full btn-medical mb-6"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-neutral">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-neutral mb-4">Specifications</h3>
              <dl className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                    <dd className="text-sm font-semibold text-neutral mt-1">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Quality Assured</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Secure Packaging</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
