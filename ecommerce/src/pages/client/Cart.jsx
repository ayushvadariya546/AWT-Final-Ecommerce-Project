import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getCartItems, saveCartItems } from '../../utils/cart';

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    return getCartItems();
  });

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if ((item._id || item.id) !== id) {
          return item;
        }
        return { ...item, qty: Math.max(1, item.qty + delta) };
      })
    );
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );
  const tax = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);
  const total = subtotal + tax;
  const formatINR = (amount) => `\u20B9${amount.toLocaleString('en-IN')}`;

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1>Shopping Cart</h1>
        <button 
          className="btn btn-secondary glass" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          onClick={() => { if(window.confirm('Clear all items and refresh?')) { saveCartItems([]); window.location.reload(); } }}
        >
          Reset Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cartItems.length === 0 ? (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Add products from the shop to continue.
              </p>
              <Link to="/shop/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id || item.id} className="glass-card flex-between" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0 }}>{item.name}</h3>
                    <p style={{ margin: '0.25rem 0', color: 'var(--text-secondary)' }}>{item.category?.name || item.category}</p>
                    <span style={{ fontWeight: 'bold' }}>{formatINR(item.price)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div className="glass" style={{ display: 'flex', alignItems: 'center', padding: '0.25rem 1rem', borderRadius: '20px', gap: '1rem' }}>
                    <button style={{ color: 'var(--text-secondary)' }} onClick={() => updateQty(item._id || item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button style={{ color: 'var(--text-secondary)' }} onClick={() => updateQty(item._id || item.id, 1)}>+</button>
                  </div>
                  <button className="icon-btn hover:text-danger" style={{ color: 'var(--text-muted)' }} onClick={() => removeItem(item._id || item.id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="glass-card" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>Order Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div className="flex-between">
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontWeight: 'bold' }}>{formatINR(subtotal)}</span>
            </div>
            <div className="flex-between">
              <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Free</span>
            </div>
            <div className="flex-between">
              <span style={{ color: 'var(--text-secondary)' }}>Tax (18% GST)</span>
              <span style={{ fontWeight: 'bold' }}>{formatINR(tax)}</span>
            </div>

            <div className="flex-between" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--accent-light)' }}>{formatINR(total)}</span>
            </div>
          </div>

          <Link
            to={cartItems.length ? '/shop/checkout' : '/shop/products'}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', opacity: cartItems.length ? 1 : 0.7, pointerEvents: cartItems.length ? 'auto' : 'none' }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
