import { Link } from 'react-router-dom';
import { Lightbulb, Flower, Home as HomeIcon, Award, Heart, ShieldCheck } from 'lucide-react';

const Categories = () => {
  const categories = [
    { title: 'Decor', icon: <Flower size={48} color="var(--accent-gold)" />, count: 124, description: 'Elegant centerpieces and ornamental vessels.' },
    { title: 'Artifacts', icon: <Award size={48} color="var(--accent-gold)" />, count: 56, description: 'Majestic idols and traditional sculptures.' },
    { title: 'Lighting', icon: <Lightbulb size={48} color="var(--accent-gold)" />, count: 320, description: 'Antique lamps and geometric lanterns.' },
    { title: 'Wall Art', icon: <HomeIcon size={48} color="var(--accent-gold)" />, count: 45, description: 'Sunburst mirrors and hanging wall decor.' },
    { title: 'Spiritual', icon: <Heart size={48} color="var(--accent-gold)" />, count: 89, description: 'Pooja thalis, diyas, and temple essentials.' },
    { title: 'Home', icon: <ShieldCheck size={48} color="var(--accent-gold)" />, count: 67, description: 'Handcrafted planters and serving trays.' },
  ];

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Shop by Category</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}>Explore our curated collections of premium products.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {categories.map((cat, i) => (
          <Link key={i} to={`/shop/products?category=${cat.title}`} className="glass-card flex-center" style={{ flexDirection: 'column', padding: '3rem 2rem', gap: '1.5rem', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s', cursor: 'pointer' }}>
            <div style={{ color: 'var(--text-primary)' }}>
              {cat.icon}
            </div>
            <h2 style={{ fontSize: '1.5rem', margin: '0' }}>{cat.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'center', margin: 0, padding: '0 1rem' }}>{cat.description}</p>
            <span style={{ color: 'var(--accent-light)', fontSize: '0.875rem', fontWeight: 'bold', marginTop: 'auto' }}>{cat.count} Items</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
