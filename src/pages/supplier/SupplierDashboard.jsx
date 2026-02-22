import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, ShoppingBag, Package, Clock, CheckCircle } from 'lucide-react';
import { mockProducts, mockOrders, mockSuppliers } from '../../utils/mockData';
import { useAuthStore } from '../../store/authStore';

const SupplierDashboard = () => {
  const { user } = useAuthStore();
  
  // Get supplier data
  const supplier = mockSuppliers.find(s => s.email === user?.email) || mockSuppliers[0];
  
  // Get supplier's products
  const supplierProducts = mockProducts.filter(p => p.supplierId === supplier.id);
  
  // Get supplier's orders (orders containing their products)
  const supplierOrders = mockOrders.flatMap(order => 
    order.supplierOrders?.filter(so => so.supplierId === supplier.id) || []
  );

  const stats = [
    {
      label: 'Total Revenue',
      value: '$' + supplier.totalSales.toFixed(2),
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+12.5%',
    },
    {
      label: 'Pending Payout',
      value: '$' + supplier.pendingPayout.toFixed(2),
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: 'Due: Next Monday',
    },
    {
      label: 'Total Products',
      value: supplierProducts.length,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Orders',
      value: supplierOrders.length,
      icon: ShoppingBag,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  // Top performing products
  const topProducts = supplierProducts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
        <h1 className="font-display text-3xl mb-2">Welcome back, {supplier.name}!</h1>
        <p className="text-white/90">Here's an overview of your marketplace performance</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            Commission Rate: {supplier.commissionRate}%
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            Status: Active
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-card p-6 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              {stat.change && (
                <TrendingUp className="w-5 h-5 text-green-500" />
              )}
            </div>
            <h3 className="text-3xl font-bold text-neutral mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            {stat.change && (
              <p className="text-xs text-green-600 mt-2">{stat.change}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-neutral">Recent Orders</h2>
            <Link to="/supplier/orders" className="text-primary hover:text-primary/80 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {supplierOrders.map((order, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-neutral">Order #{idx + 1}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">${order.supplierPayout.toFixed(2)}</p>
                    <span className={`badge-status text-xs ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Commission: ${order.commission.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-neutral">Your Products</h2>
            <Link to="/supplier/products" className="text-primary hover:text-primary/80 text-sm font-semibold">
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">${product.price}</p>
                  <p className={`text-xs ${
                    product.stock < 20 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commission Breakdown */}
      <div className="glass-card p-6">
        <h2 className="font-display text-2xl text-neutral mb-6">Commission Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 mb-2">Total Commission Paid</p>
            <p className="text-2xl font-bold text-blue-900">
              ${(supplier.totalSales * (supplier.commissionRate / 100)).toFixed(2)}
            </p>
            <p className="text-xs text-blue-600 mt-1">{supplier.commissionRate}% of ${supplier.totalSales.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 mb-2">Your Earnings</p>
            <p className="text-2xl font-bold text-green-900">
              ${(supplier.totalSales - (supplier.totalSales * (supplier.commissionRate / 100))).toFixed(2)}
            </p>
            <p className="text-xs text-green-600 mt-1">After platform fees</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-600 mb-2">Pending Payout</p>
            <p className="text-2xl font-bold text-orange-900">${supplier.pendingPayout.toFixed(2)}</p>
            <p className="text-xs text-orange-600 mt-1">Next payout: Monday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
