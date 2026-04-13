import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, ShieldCheck, Truck } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      
      
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', position: 'relative', background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.05))' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div className="hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', border: '1px solid var(--border-glass)' }}>
              <TrendingUp size={16} color="var(--accent-light)" />
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Divine Collection 2026</span>
            </div>
            
            <h1 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
              Bring <span style={{ color: 'var(--accent-gold)', textShadow: '0 0 30px var(--accent-glow)' }}>Divine</span><br />
              Grace Home
            </h1>
            
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px' }}>
              Explore our premium, Full HD handcrafted Lord Hanuman collection and other exquisite brass artifacts for your sacred spaces.
            </p>
            
            <div className="flex" style={{ gap: '1rem' }}>
              <Link to="/shop/products" className="btn btn-primary">
                Shop Collection <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          
          <div className="hero-visual" style={{ position: 'relative' }}>
            <div className="glass" style={{ width: '100%', borderRadius: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(212, 175, 55, 0.1)', background: '#111' }}>
               <img src="/images/hanuman_ji.png" alt="Lord Hanuman Ji - HD Divine Brass Statue" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
            </div>
            {/* Ambient Glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)', zIndex: -1 }}></div>
          </div>
          
        </div>
      </section>

      
      <section className="container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div className="glass-card flex-center" style={{ flexDirection: 'column', textAlign: 'center', gap: '1rem' }}>
            <Truck size={32} color="var(--accent-light)" />
            <h3>Free Express Shipping</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>On all orders over ₹5,000. Fast & reliable delivery within India.</p>
          </div>
          <div className="glass-card flex-center" style={{ flexDirection: 'column', textAlign: 'center', gap: '1rem' }}>
            <ShieldCheck size={32} color="var(--accent-light)" />
            <h3>Secure Payments</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>100% secure payment with 256-bit encryption.</p>
          </div>
          <div className="glass-card flex-center" style={{ flexDirection: 'column', textAlign: 'center', gap: '1rem' }}>
            <Star size={32} color="var(--accent-light)" />
            <h3>Premium Quality</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Meticulously selected materials and craftsmanship.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
