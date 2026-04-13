import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      <aside className="glass" style={{ position: 'sticky', top: 0, height: '100vh', width: '260px', borderRight: '1px solid var(--border-glass)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
          <div style={{ width: '42px', height: '42px' }}>
            <img src={logoImg} alt="KRIVIA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '1.4rem', letterSpacing: '2px', color: 'var(--text-primary)' }}>KRIVIA</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '1rem', 
                  padding: '0.875rem 1rem', borderRadius: '8px',
                  background: isActive ? 'var(--accent-glow)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'background 0.2s'
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <button 
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', color: 'var(--danger)', marginTop: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', borderRadius: '8px' }}
          onClick={() => { logout(); navigate('/'); }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
