import { useEffect, useMemo, useState } from 'react';
import { Eye, Search, Filter, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const formatINR = (value) => `INR ${Number(value || 0).toLocaleString('en-IN')}`;

const formatDate = (value) => {
  if (!value) return 'N/A';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'N/A';
  return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getOrderStatus = (order) => {
  if (order.isCancelled) return 'Cancelled';
  if (order.isDelivered) return 'Delivered';
  if (order.isPaid) return 'Shipped';
  return 'Processing';
};

const getStatusStyles = (status) => ({
  background:
    status === 'Delivered'
      ? 'rgba(16, 185, 129, 0.1)'
      : status === 'Processing'
        ? 'rgba(139, 92, 246, 0.1)'
        : status === 'Shipped'
          ? 'rgba(56, 189, 248, 0.1)'
          : 'rgba(239, 68, 68, 0.1)',
  color:
    status === 'Delivered'
      ? 'var(--success)'
      : status === 'Processing'
        ? 'var(--accent-light)'
        : status === 'Shipped'
          ? '#38bdf8'
          : 'var(--danger)',
});

const getOrderLabel = (order) => `#ORD-${String(order?._id || order?.id || '').slice(-6).toUpperCase()}`;

const getAddressLabel = (order) => {
  const address = order?.shippingAddress || {};
  return [address.address, `${address.city || ''} ${address.postalCode || ''}`.trim()].filter(Boolean).join(', ');
};

const ManageOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch orders');
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setOrders([]);
        setError(err.message || 'Unable to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user?.token]);

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const status = getOrderStatus(order);
      const orderId = getOrderLabel(order).toLowerCase();
      const customer = (order?.user?.name || 'Customer').toLowerCase();

      const matchesSearch = !query || customer.includes(query) || orderId.includes(query);
      const matchesFilter = filterStatus === 'All' || status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [filterStatus, orders, searchTerm]);

  return (
    <>
      <div className="animate-fade-in">
        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          <h1>Manage Orders</h1>
        </div>

        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 10, pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass"
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <select
                  className="btn btn-secondary glass"
                  style={{ padding: '0.5rem 2.5rem 0.5rem 1rem', appearance: 'none', cursor: 'pointer', outline: 'none' }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <Filter size={18} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
              <button className="btn btn-secondary" onClick={() => alert('CSV export can be added with backend report endpoint.')}>
                Export CSV
              </button>
            </div>
          </div>

          {loading && <p style={{ color: 'var(--text-secondary)', padding: '1.5rem' }}>Loading orders...</p>}

          {error && (
            <div className="glass" style={{ borderRadius: '8px', padding: '0.75rem 1rem', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.35)', margin: '1rem' }}>
              {error}
            </div>
          )}

          {!loading && !error && filteredOrders.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', padding: '1.5rem' }}>No orders found.</p>
          )}

          {!loading && !error && filteredOrders.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Order ID</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Customer</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Date</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Items</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Total</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Status</th>
                    <th style={{ padding: '1rem 1.5rem', fontWeight: '500', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, i) => {
                    const status = getOrderStatus(order);
                    return (
                      <tr key={order._id} style={{ borderBottom: i !== filteredOrders.length - 1 ? '1px solid var(--border-glass)' : 'none' }}>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{getOrderLabel(order)}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>{order?.user?.name || 'Customer'}</td>
                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{formatDate(order.createdAt)}</td>
                        <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{order.orderItems?.length || 0} items</td>
                        <td style={{ padding: '1rem 1.5rem', fontFamily: 'Outfit', fontWeight: '600' }}>{formatINR(order.totalAmount)}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span
                            style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              ...getStatusStyles(status),
                            }}
                          >
                            {status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye size={16} /> View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '560px', padding: '2rem', margin: '1rem', position: 'relative' }}>
            <button
              className="icon-btn"
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => setSelectedOrder(null)}
            >
              <X size={20} color="var(--text-secondary)" />
            </button>

            <h2 style={{ marginBottom: '0.25rem', color: 'var(--accent-gold)' }}>Order Details</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>{getOrderLabel(selectedOrder)}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem 1.5rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Customer</div>
                <div style={{ fontWeight: '600' }}>{selectedOrder?.user?.name || 'Customer'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Order Date</div>
                <div style={{ color: 'var(--text-secondary)' }}>{formatDate(selectedOrder.createdAt)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Items</div>
                <div style={{ color: 'var(--text-secondary)' }}>{selectedOrder.orderItems?.length || 0} items</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Total</div>
                <div style={{ fontFamily: 'Outfit', fontWeight: '600' }}>{formatINR(selectedOrder.totalAmount)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Payment</div>
                <div style={{ color: 'var(--text-secondary)' }}>{selectedOrder.paymentMethod || 'Online'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Status</div>
                <div>{getOrderStatus(selectedOrder)}</div>
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Shipping Address</div>
              <div style={{ color: 'var(--text-secondary)' }}>{getAddressLabel(selectedOrder)}</div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Products</div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {selectedOrder.orderItems?.map((product, index) => (
                  <div key={`${product.title}-${index}`} className="glass-card" style={{ padding: '0.75rem 0.9rem', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.8rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{product.title}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Qty: {product.qty}</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: '600' }}>{formatINR(Number(product.price || 0) * Number(product.qty || 0))}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageOrders;
