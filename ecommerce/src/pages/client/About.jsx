import { Globe, Leaf, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      
      <div style={{ position: 'relative', height: '50vh', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <img src="/images/about/about_heritage_hero.png" alt="Brass Artisan Craft" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(0,0,0,0.4))' }}></div>
        </div>
        <div style={{ textAlign: 'center', color: 'white', padding: '0 2rem', zIndex: 1 }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Our Heritage</h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto', fontFamily: 'Outfit' }}>Defining the next generation of authentic brass commerce.</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="glass-card" style={{ marginBottom: '4rem', padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ marginBottom: '2rem', color: 'var(--accent-gold)', fontSize: '2.5rem' }}>The KRIVIA Legacy</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
              Founded with a passion for traditional craftsmanship, KRIVIA brings the timeless elegance of brass manufacturing into modern spaces. We meticulously curate absolute premium brass artifacts, ensuring that our customers only experience the highest echelons of artisan metalwork. From our workshop in the heart of Moradabad—the legendary Brass City of India—we continue a legacy that spans over six centuries.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
              By marrying a ruthless dedication to ornate detailing with a powerful and robust delivery pipeline, we provide an unparalleled customer journey. Every single curve, motif, and engraving is etched by hands that have inherited the art from their forefathers.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.125rem' }}>
              When you place a KRIVIA creation in your living room, you are becoming a custodian of a majestic tradition, ensuring that the ancient fires of Indian metallurgy continue to burn bright. Welcome to the pinnacle of Brass Elegance. Welcome to KRIVIA.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent-primary)', transform: 'translate(-15px, 15px)', borderRadius: '16px', zIndex: 0 }}></div>
            <img src="/images/about/about_artisan_legacy.png" alt="Authentic Brass Masterpiece" style={{ width: '100%', height: 'auto', borderRadius: '16px', position: 'relative', zIndex: 1, border: '4px solid var(--border-glass)' }} />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '3rem 2rem', textAlign: 'center' }}>
            <Award size={48} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Master Craftsmanship</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Every piece is hand-forged by generational artisans utilizing centuries-old metalworking techniques.</p>
          </div>
          <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '3rem 2rem', textAlign: 'center' }}>
            <Leaf size={48} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Sustainable Focus</h3>
            <p style={{ color: 'var(--text-secondary)' }}>100% carbon neutral operations and completely purified recycled brass material sourcing.</p>
          </div>
          <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '3rem 2rem', textAlign: 'center' }}>
            <Globe size={48} color="var(--accent-gold)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Global Reach</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Operating across 140 countries with guaranteed priority shipping via trusted logistics networks.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
