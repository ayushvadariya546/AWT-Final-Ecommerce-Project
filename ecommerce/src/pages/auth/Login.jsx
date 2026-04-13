import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeParam = searchParams.get('type');
  const forcedRole = typeParam === 'admin' ? 'admin' : typeParam === 'client' ? 'client' : null;
  
  const [isClient, setIsClient] = useState(forcedRole ? forcedRole === 'client' : typeParam !== 'admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  useEffect(() => {
    if (forcedRole) {
      setIsClient(forcedRole === 'client');
      setEmail('');
      setPassword('');
      return;
    }
    setIsClient(searchParams.get('type') !== 'admin');
    setEmail('');
    setPassword('');
  }, [searchParams, forcedRole]);

  const switchRole = (nextIsClient) => {
    setIsClient(nextIsClient);
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const expectedRole = forcedRole || (isClient ? 'client' : 'admin');
      const loggedInUser = await login(email, password, expectedRole);

      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in flex-center" style={{ minHeight: '100vh', padding: '2rem', position: 'relative' }}>
      
      <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', color: 'var(--text-secondary)' }}>
        ← Back to Welcome
      </Link>
      
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem 2rem', position: 'relative', overflow: 'hidden', borderRadius: '40px' }}>
        
        
        <div style={{ 
          position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', 
          background: isClient ? 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 50%)' 
                               : 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15), transparent 50%)',
          zIndex: 0, pointerEvents: 'none', transition: 'background 0.5s ease'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="flex-center animate-pulse-glow" style={{ 
            width: '100px', height: '100px', margin: '0 auto 1.5rem auto', borderRadius: '24px', overflow: 'hidden'
          }}>
            <img src={logoImg} alt="KRIVIA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 5px 15px rgba(205, 159, 54, 0.1))', borderRadius: '24px' }} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {isClient ? 'Welcome Back to KRIVIA' : 'Secure Admin Login'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isClient ? 'Sign in to continue shopping and track orders.' : 'Sign in to manage catalog, users, and orders.'}
          </p>
        </div>

        
        {!forcedRole && (
          <div className="glass" style={{ display: 'flex', padding: '0.25rem', borderRadius: '8px', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
            <button 
              className="btn" 
              style={{ flex: 1, background: isClient ? 'var(--bg-secondary)' : 'transparent', color: isClient ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isClient ? '600' : '400' }}
              onClick={() => switchRole(true)}
              type="button"
            >
              Customer Login
            </button>
            <button 
              className="btn" 
              style={{ flex: 1, background: !isClient ? 'var(--bg-secondary)' : 'transparent', color: !isClient ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: !isClient ? '600' : '400' }}
              onClick={() => switchRole(false)}
              type="button"
            >
              Admin Login
            </button>
          </div>
        )}

        <form key={isClient ? 'client-form' : 'admin-form'} onSubmit={handleLogin} autoComplete="off" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input type="text" name="fake-user" autoComplete="username" style={{ display: 'none' }} />
          <input type="password" name="fake-pass" autoComplete="current-password" style={{ display: 'none' }} />
          {errorMessage && (
            <div className="glass" style={{ borderRadius: '8px', padding: '0.75rem 1rem', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.35)' }}>
              {errorMessage}
            </div>
          )}
          
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 10, pointerEvents: 'none' }} />
            <input 
              type="email" 
              placeholder={isClient ? 'Enter your email' : 'Enter admin email'} 
              required
              className="glass" 
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', border: '1px solid var(--border-glass)', transition: 'border-color 0.3s' }}
              onFocus={e => e.target.style.borderColor = isClient ? 'var(--accent-light)' : 'var(--success)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-glass)'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              name={isClient ? 'customer_email' : 'admin_email'}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 10, pointerEvents: 'none' }} />
            <input 
              type="password" 
              placeholder={isClient ? 'Enter your password' : 'Enter admin password'} 
              required
              className="glass" 
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', border: '1px solid var(--border-glass)', transition: 'border-color 0.3s' }}
              onFocus={e => e.target.style.borderColor = isClient ? 'var(--accent-light)' : 'var(--success)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-glass)'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              name={isClient ? 'customer_password' : 'admin_password'}
            />
          </div>

          <div className="flex-between">
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', cursor: 'pointer' }}>
               <input type="checkbox" style={{ accentColor: isClient ? 'var(--accent-primary)' : 'var(--success)' }} /> Keep me signed in
             </label>
             <a href="#" style={{ color: isClient ? 'var(--accent-light)' : 'var(--success)', fontSize: '0.875rem' }}>Reset password</a>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn" 
            style={{ 
              padding: '1rem', 
              background: isClient ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))' : 'var(--success)',
              color: 'white',
              boxShadow: isClient ? '0 4px 14px 0 var(--accent-glow)' : '0 4px 14px 0 rgba(16, 185, 129, 0.4)',
              marginTop: '0.5rem',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Signing You In...' : isClient ? 'Login to Account' : 'Login to Dashboard'} <ArrowRight size={18} />
          </button>
        </form>
        
        {isClient && (
          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem', position: 'relative', zIndex: 1 }}>
            New to KRIVIA? <a href="#" style={{ color: 'var(--accent-light)' }}>Create account</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
