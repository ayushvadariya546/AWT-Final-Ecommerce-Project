import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, ShoppingCart } from 'lucide-react';
import { addToCart } from '../../utils/cart';

const Products = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const query = searchParams.get('q');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  let displayedProducts = [...products];

  if (activeCategory) {
    displayedProducts = displayedProducts.filter((p) => (p.category?.name || p.category) === activeCategory);
  }

  if (query) {
    const q = query.toLowerCase();
    displayedProducts = displayedProducts.filter((p) => 
      (p.title || p.name).toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  if (sortBy === 'low') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high') {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2>
          {query ? `Search: "${query}"` : activeCategory ? `${activeCategory} Collection` : 'Premium Collection'}
          <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '1rem' }}>({displayedProducts.length} items)</span>
        </h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary glass" style={{ padding: '0.5rem 1rem' }} onClick={() => alert('Advanced filtering coming soon!')}>
            <Filter size={18} /> Filters
          </button>
          <div style={{ position: 'relative' }}>
            <select
              className="btn btn-secondary glass"
              style={{ padding: '0.5rem 2.5rem 0.5rem 1rem', appearance: 'none', cursor: 'pointer', outline: 'none' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured / Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <ChevronDown size={18} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {loading && <p style={{ textAlign: 'center', margin: '2rem 0' }}>Loading premium collection...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {displayedProducts.map((product) => (
          <div key={product._id} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '240px', background: 'var(--bg-secondary)', position: 'relative' }}>
              <img src={product.imageUrl || product.image} alt={product.title || product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              <button className="icon-btn" style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'var(--bg-primary)', color: 'var(--text-primary)', borderRadius: '50%', padding: '0.75rem', boxShadow: 'var(--shadow-md)' }} onClick={() => addToCart(product)}>
                <ShoppingCart size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{product.category?.name || product.category}</span>
              <Link to={`/shop/product/${product._id}`}><h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>{product.title || product.name}</h3></Link>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.5', flex: 1 }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Outfit' }}>{`\u20B9${product.price.toLocaleString('en-IN')}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;