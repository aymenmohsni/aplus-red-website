import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VendorLayout from './components/VendorLayout';

// Public Pages
import ComingSoonPage from './pages/ComingSoonPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SupplierRegisterPage from './pages/SupplierRegisterPage';
import AboutPage from './pages/AboutPage';
import CustomerProfile from './pages/CustomerProfile';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminVendors from './pages/admin/AdminVendors';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProducts from './pages/vendor/VendorProducts';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorAnalytics from './pages/vendor/VendorAnalytics';
import VendorSettings from './pages/vendor/VendorSettings';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false, vendorOnly = false }) => {
  const { user, isAdmin, isVendor } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  if (vendorOnly && !isVendor()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <HomePage />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/login" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <LoginPage />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/register" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <RegisterPage />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/products" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <ProductsPage />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/products/:id" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <ProductDetailPage />
              </main>
              <Footer />
            </>
          } />
          
          {/* Protected Customer Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Navbar />
              <main className="flex-grow">
                <CartPage />
              </main>
              <Footer />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Navbar />
              <main className="flex-grow">
                <CheckoutPage />
              </main>
              <Footer />
            </ProtectedRoute>
          } />
          
          <Route path="/payment" element={
            <ProtectedRoute>
              <Navbar />
              <main className="flex-grow">
                <PaymentPage />
              </main>
              <Footer />
            </ProtectedRoute>
          } />
          
          <Route path="/order-confirmation/:orderId" element={
            <ProtectedRoute>
              <Navbar />
              <main className="flex-grow">
                <OrderConfirmationPage />
              </main>
              <Footer />
            </ProtectedRoute>
          } />
          
          <Route path="/orders" element={
            <ProtectedRoute>
              <Navbar />
              <main className="flex-grow">
                <OrderHistoryPage />
              </main>
              <Footer />
            </ProtectedRoute>
          } />
          
          {/* About Page */}
          <Route path="/about" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <AboutPage />
              </main>
              <Footer />
            </>
          } />

          {/* Customer Profile */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <main className="flex-grow">
                  <CustomerProfile />
                </main>
                <Footer />
              </>
            </ProtectedRoute>
          } />

          {/* Vendor Registration */}
          <Route path="/vendor-register" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <SupplierRegisterPage />
              </main>
              <Footer />
            </>
          } />

          {/* Vendor Portal Routes */}
          <Route path="/vendor" element={
            <ProtectedRoute vendorOnly>
              <VendorLayout />
            </ProtectedRoute>
          }>
            <Route index element={<VendorDashboard />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="orders" element={<VendorOrders />} />
            <Route path="analytics" element={<VendorAnalytics />} />
            <Route path="settings" element={<VendorSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="vendors" element={<AdminVendors />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          
          {/* Coming Soon Page */}
          <Route path="/coming-soon" element={<ComingSoonPage />} />

          {/* 404 Route */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-display text-primary mb-4">404</h1>
                  <p className="text-xl text-gray-600">Page not found</p>
                </div>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
