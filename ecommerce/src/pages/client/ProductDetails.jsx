import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Shield, ArrowLeft } from 'lucide-react';
import { addToCart } from '../../utils/cart';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>Loading product details...</div>;
  if (error || !product) return <div className="container" style={{ paddingTop: '120px', textAlign: 'center', color: 'var(--danger)' }}>{error || 'Product not found'}</div>;

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <Link to="/shop/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
        <div className="glass-card" style={{ height: '500px', padding: 0, overflow: 'hidden', position: 'relative' }}>
          <img src={product.imageUrl || product.image} alt={product.title || product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', fontWeight: 'bold' }}>{product.category?.name || product.category}</span>
            <h1 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{product.title || product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', color: 'var(--warning)', gap: '0.25rem' }}>
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} />
              </div>
              <span style={{ color: 'var(--text-muted)' }}>(128 Reviews)</span>
            </div>
          </div>

          <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'Outfit' }}>
            {`\u20B9${product.price.toLocaleString('en-IN')}`}
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: '1.6' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: '1rem', background: 'var(--accent-primary)', color: 'white' }} onClick={() => addToCart(product)}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="btn btn-secondary" style={{ padding: '1rem' }} onClick={() => { addToCart(product); navigate('/shop/cart'); }}>
              Buy Now
            </button>
          </div>

          <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Shield size={24} color="var(--accent-gold)" />
              <div>
                <h4 style={{ margin: 0 }}>Lifetime Craftsmanship Guarantee</h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>We promise absolute perfection. Free replacements for any casting defect.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;