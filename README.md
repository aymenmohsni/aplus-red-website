# APlusMedDepot Frontend - MVP Phase 1

A modern, full-featured medical supplies marketplace built with React, Tailwind CSS, and JavaScript.

## 🚀 Features

### Customer Features
- **User Authentication**: Login and registration with account approval workflow
- **Product Catalog**: Browse products with search, filters, and category navigation
- **Product Details**: Detailed product pages with specifications and features
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **Checkout Process**: Multi-step checkout with shipping address forms
- **Payment Integration**: Payment form (ready for Stripe Elements integration)
- **Order Management**: Order confirmation and history tracking

### Admin Features
- **Dashboard**: Overview of revenue, orders, products, and pending users
- **Product Management**: View, search, and manage product inventory
- **Order Management**: View and track all orders with status filters
- **User Management**: Approve/reject pending user registrations

## 🛠 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Zustand** - State management
- **React Router v6** - Client-side routing
- **React Hook Form** - Form handling
- **Lucide React** - Icon library

## 📦 Installation

1. **Clone or extract the project**
   ```bash
   cd aplusmed-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

## 🔑 Demo Credentials

### Customer Account
- **Email**: john@hospital.com
- **Password**: any password

### Admin Account
- **Email**: admin@aplusmed.com
- **Password**: any password

## 📁 Project Structure

```
aplusmed-frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx      # Main navigation
│   │   ├── Footer.jsx      # Footer component
│   │   └── AdminLayout.jsx # Admin panel layout
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   └── admin/          # Admin pages
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminOrders.jsx
│   │       └── AdminUsers.jsx
│   ├── store/              # Zustand state management
│   │   ├── authStore.js    # Authentication state
│   │   └── cartStore.js    # Shopping cart state
│   ├── utils/              # Utilities and mock data
│   │   └── mockData.js     # Mock products and orders
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design Features

- **Modern Healthcare Aesthetic**: Clean, professional design optimized for medical industry
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Smooth Animations**: Page transitions and hover effects
- **Accessibility**: Keyboard navigation and semantic HTML
- **Custom Color Scheme**: Medical-inspired teal, navy, and mint colors
- **Typography**: DM Serif Display for headings, Inter for body text

## 🔄 State Management

### Auth Store (Zustand)
- User authentication state
- Login/logout functionality
- Role-based access (customer/admin)
- Persistent session storage

### Cart Store (Zustand)
- Shopping cart items
- Add/remove/update quantities
- Calculate totals
- Persistent localStorage

## 🚦 Routing

All routes are defined in `App.jsx`:

**Public Routes:**
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/products` - Product catalog
- `/products/:id` - Product detail page

**Protected Routes (Require Login):**
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/payment` - Payment page
- `/order-confirmation/:orderId` - Order confirmation
- `/orders` - Order history

**Admin Routes (Admin Only):**
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/users` - User approval management

## 🔌 Backend Integration Points

The frontend is ready for backend integration. Here are the integration points:

### Authentication (authStore.js)
- Replace mock login with Supabase Auth
- Implement real user registration
- Add session management

### Products (mockData.js)
- Replace mock products with API calls
- Implement real-time inventory updates
- Add image upload functionality

### Shopping Cart (cartStore.js)
- Sync cart with backend database
- Implement cart persistence across devices

### Orders
- Create order API integration
- Add payment processing (Stripe)
- Implement order tracking

### Admin Features
- Real-time dashboard statistics
- Product CRUD operations
- User approval workflow
- Order management system

## 📝 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests (when configured)
npm run test
```

## 🎯 Next Steps for Production

1. **Backend Integration**
   - Set up Supabase project
   - Configure authentication
   - Create database schema
   - Add Row-Level Security policies

2. **Payment Integration**
   - Set up Stripe account
   - Implement Stripe Elements
   - Add webhook handlers

3. **Email Service**
   - Configure Resend or similar service
   - Create email templates
   - Add transactional emails

4. **Deployment**
   - Deploy to Vercel/Netlify
   - Configure environment variables
   - Set up CI/CD pipeline

5. **Testing**
   - Add unit tests
   - Implement E2E tests
   - Performance testing

6. **Additional Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Advanced search and filters
   - Bulk ordering for hospitals
   - Invoice generation

## 🐛 Known Limitations

- Currently uses mock data (no real backend)
- Payment processing is simulated
- Email notifications not implemented
- Image uploads not functional
- Search is client-side only

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is for demonstration purposes. All rights reserved.

## 👥 Support

For questions or issues, please contact the development team.

---

Built with ❤️ for healthcare professionals
