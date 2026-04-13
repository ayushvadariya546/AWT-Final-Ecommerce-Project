import { Link } from 'react-router-dom';
import { Star, ShieldCheck, User } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const Welcome = () => {
  return (
    <div className="animate-fade-in flex-center" style={{ height: '100vh', padding: '1rem' }}>
      
      <div className="glass-card" style={{ maxWidth: '800px', width: '100%', padding: '2rem 1.5rem', textAlign: 'center', borderRadius: '40px' }}>
        
        <div className="flex-center" style={{ marginBottom: '1.5rem' }}>
          <div className="flex-center animate-pulse-glow" style={{ width: '150px', height: '150px', overflow: 'hidden', borderRadius: '32px' }}>
            <img src={logoImg} alt="KRIVIA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(205, 159, 54, 0.12))', borderRadius: '32px' }} />
          </div>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2.5rem auto', lineHeight: '1.5' }}>
          Handcrafted brass pieces for modern homes and timeless spaces.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-glass)', transition: 'transform 0.3s, box-shadow 0.3s' }}
               onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--accent-light)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-glass)'; }}>
            <div className="flex-center" style={{ height: '64px', width: '64px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-light)', margin: '0 auto 1.5rem auto' }}>
               <User size={32} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Shop Account</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>Explore products, place orders, and track your purchases.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/login?type=client" className="btn btn-primary" style={{ width: '100%' }}>Continue as Customer</Link>
            </div>
          </div>
          
          
          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-glass)', transition: 'transform 0.3s, border-color 0.3s' }}
               onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--success)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-glass)'; }}>
            <div className="flex-center" style={{ height: '64px', width: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', margin: '0 auto 1.5rem auto' }}>
               <ShieldCheck size={32} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Admin Console</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>Control catalog, monitor customers, and manage order operations.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/login?type=admin" className="btn" style={{ width: '100%', background: 'var(--success)', color: 'white' }}>Open Admin Login</Link>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Welcome;
