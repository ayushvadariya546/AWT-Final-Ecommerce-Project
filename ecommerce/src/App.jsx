import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import Navbar from './components/common/Navbar';
import Home from './pages/client/Home';
import Products from './pages/client/Products';
import ProductDetails from './pages/client/ProductDetails';
import Categories from './pages/client/Categories';
import About from './pages/client/About';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
import Billing from './pages/client/Billing';
import ClientSettings from './pages/client/Settings';

import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import Customers from './pages/admin/Customers';
import Settings from './pages/admin/Settings';

import Welcome from './pages/common/Welcome';
import Login from './pages/auth/Login';

import './index.css';
const ClientLayout = () => (
  <div className="client-app">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />

          
          <Route path="/shop" element={
            <ProtectedRoute allowedRole="client">
              <ClientLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="categories" element={<Categories />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<ClientSettings />} />
          </Route>

          
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
