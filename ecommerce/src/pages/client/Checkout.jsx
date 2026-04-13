import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCartItems, saveCartItems } from '../../utils/cart';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const cartItems = useMemo(() => getCartItems(), []);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems]);
  const tax = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);
  const total = subtotal + tax;

  const handleCompleteOrder = async () => {
    setError('');

    if (!user?.token) {
      setError('Please log in again to complete your order.');
      return;
    }

    if (!cartItems.length) {
      setError('Your cart is empty.');
      return;
    }

    if (!firstName || !lastName || !address || !city || !postalCode || !country) {
      setError('Please fill all shipping details.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        orderItems: cartItems.map((item) => ({
          title: item.name,
          qty: item.qty,
          price: item.price,
          product: item._id || item.id,
        })),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod: 'Online',
        totalAmount: total,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      const orderForReceipt = {
        ...data,
        customerName: `${firstName} ${lastName}`,
      };

      localStorage.setItem('nexus_last_order', JSON.stringify(orderForReceipt));
      saveCartItems([]);
      navigate('/shop/billing', { state: { order: orderForReceipt } });
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Secure Checkout</h1>

      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {error && (
          <div className="glass" style={{ borderRadius: '8px', padding: '0.75rem 1rem', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.35)' }}>
            {error}
          </div>
        )}

        <div>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: 'var(--accent-primary)', color: 'white', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>1</span>
            Shipping Information
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder="First Name" className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" placeholder="Address" className="glass" style={{ gridColumn: 'span 2', width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="City" className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} value={city} onChange={(e) => setCity(e.target.value)} />
            <input type="text" placeholder="Postal Code" className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <input type="text" placeholder="Country" className="glass" style={{ gridColumn: 'span 2', width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.8rem' }}>2</span>
            Payment Details
          </h3>
          <div className="glass" style={{ padding: '2rem', borderRadius: '8px', border: '1px dashed var(--border-glass)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Payment is marked as successful for demo flow.
          </div>
        </div>

        <button type="button" className="btn btn-primary flex-center" style={{ padding: '1rem', fontSize: '1.125rem', marginTop: '1rem', textDecoration: 'none', opacity: submitting ? 0.7 : 1 }} onClick={handleCompleteOrder} disabled={submitting}>
          {submitting ? 'Placing Order...' : `Complete Order - \u20B9${total.toLocaleString('en-IN')}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;