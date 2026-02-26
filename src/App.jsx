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
          
          
          {/* Coming Soon Page */}
          <Route path="/" element={<ComingSoonPage />} />

          {/* 404 Route */}
          {/* <Route path="*" element={
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
          } /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
