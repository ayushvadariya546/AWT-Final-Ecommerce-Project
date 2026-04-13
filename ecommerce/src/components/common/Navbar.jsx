import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Star, Search, ShoppingCart, User, Menu, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/products?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'} border-b border-transparent ${isScrolled ? 'border-glass' : ''}`} style={{ padding: '1rem 0', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50 }}>
      <div className="container flex-between">
        
        
        <Link to="/shop" className="flex-center" style={{ gap: '0.8rem' }}>
          <div className="flex-center" style={{ width: '48px', height: '48px' }}>
            <img src={logoImg} alt="KRIVIA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '1.4rem', fontFamily: 'Outfit', fontWeight: '800', letterSpacing: '3px', color: 'var(--text-primary)' }}>
            KRIVIA
          </span>
        </Link>
        
        
        <div className="nav-links hidden-mobile" style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
          <Link to="/shop" style={{ color: location.pathname === '/shop' ? 'var(--accent-light)' : 'var(--text-primary)' }}>Store Home</Link>
          <Link to="/shop/products" style={{ color: location.pathname === '/shop/products' ? 'var(--accent-light)' : 'var(--text-primary)' }}>Shop</Link>
          <Link to="/shop/categories" style={{ color: location.pathname === '/shop/categories' ? 'var(--accent-light)' : 'var(--text-primary)' }}>Categories</Link>
          <Link to="/shop/about" style={{ color: location.pathname === '/shop/about' ? 'var(--accent-light)' : 'var(--text-primary)' }}>About</Link>
        </div>

        
        <div className="nav-actions flex-center" style={{ gap: '1.5rem', position: 'relative' }}>
          
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex-center animate-fade-in" style={{ position: 'absolute', right: '100%', marginRight: '1rem', background: 'var(--bg-secondary)', padding: '0.25rem 0.5rem', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
               <input autoFocus type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', padding: '0.25rem 0.5rem', width: '200px' }} />
               <button type="button" onClick={() => setIsSearchOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}><LogOut size={16} /></button>
            </form>
          ) : (
            <button className="icon-btn hover:text-accent-light" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>
          )}

          <Link to="/shop/cart" className="hover:text-accent-light" style={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={20} />
          </Link>

          <Link to="/shop/settings" className="icon-btn hover:text-accent-light" aria-label="Settings">
            <User size={20} />
          </Link>

          <button className="icon-btn mobile-menu" style={{ display: 'none' }}>
            <Menu size={24} />
          </button>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
