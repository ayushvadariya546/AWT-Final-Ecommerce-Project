import { CheckCircle, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const FALLBACK_INVOICE_DATE = new Date().toISOString();

const Billing = () => {
  const location = useLocation();

  const order = useMemo(() => {
    if (location.state?.order) {
      return location.state.order;
    }

    const stored = localStorage.getItem('nexus_last_order');
    if (!stored) {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }, [location.state]);

  const formatINR = (value) => `\u20B9${Number(value || 0).toLocaleString('en-IN')}`;
  const subtotal = Number(
    order?.orderItems?.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0) || 0
  );
  const total = Number(order?.totalAmount || subtotal);
  const gst = Math.max(total - subtotal, 0);
  const parsedInvoiceDate = new Date(order?.createdAt || FALLBACK_INVOICE_DATE);
  const invoiceDate = Number.isNaN(parsedInvoiceDate.getTime()) ? new Date(FALLBACK_INVOICE_DATE) : parsedInvoiceDate;
  const orderIdRaw = order?._id || order?.id || '';
  const invoiceSuffix = orderIdRaw ? String(orderIdRaw).slice(-4).toUpperCase() : '0000';
  const invoiceNumber = `INV-${invoiceDate.getFullYear()}-${invoiceSuffix}`;

  return (
    <div className="container animate-fade-in billing-page" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="billing-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
        <h1>Order Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {order ? `Thank you for your purchase. Your order #${String(orderIdRaw).slice(-6).toUpperCase()} is being processed.` : 'No recent order found.'}
        </p>
      </div>

      <div className="glass-card receipt-card" style={{ padding: '3rem' }}>
        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--accent-gold)' }}>KRIVIA</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Brass Decor & Artifacts</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h4 style={{ margin: 0 }}>Invoice #{invoiceNumber}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Date: {invoiceDate.toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        {order ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Billed To</h4>
                <p style={{ margin: 0, fontWeight: '500' }}>{order.customerName || 'Customer'}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.25rem 0' }}>{order.shippingAddress?.address}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 0', color: 'var(--text-muted)', fontWeight: '500' }}>Item Description</th>
                  <th style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--text-muted)', fontWeight: '500' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '1rem 0', color: 'var(--text-muted)', fontWeight: '500' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems?.map((item, index) => (
                  <tr key={`${item.title}-${index}`} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '1rem 0', fontWeight: '500' }}>{item.title}</td>
                    <td style={{ textAlign: 'center', padding: '1rem 0' }}>{item.qty}</td>
                    <td style={{ textAlign: 'right', padding: '1rem 0', fontFamily: 'Outfit' }}>{formatINR(item.price * item.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '300px' }}>
                <div className="flex-between" style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span style={{ fontFamily: 'Outfit' }}>{formatINR(subtotal)}</span>
                </div>
                <div className="flex-between" style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                  <span>GST (18%)</span>
                  <span style={{ fontFamily: 'Outfit' }}>{formatINR(gst)}</span>
                </div>
                <div className="flex-between" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
                  <span>Total Paid</span>
                  <span style={{ fontFamily: 'Outfit' }}>{formatINR(total)}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>Please place a new order from checkout to generate invoice details.</p>
        )}
      </div>

      <div className="billing-actions" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button className="btn btn-secondary glass" onClick={() => window.print()}>
          <Download size={18} /> Download Receipt
        </button>
        <Link to="/shop/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Billing;
