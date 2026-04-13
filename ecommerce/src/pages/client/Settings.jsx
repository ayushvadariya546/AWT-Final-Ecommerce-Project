import { User, Bell, Shield, Key, Save, LogOut, Package, Eye, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const firstName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Customer';
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [cancelledOrderIds, setCancelledOrderIds] = useState([]);

  const userKey = useMemo(() => user?._id || user?.email || 'guest', [user?._id, user?.email]);
  const ordersCacheKey = `nexus_orders_${userKey}`;
  const cancelledCacheKey = `nexus_cancelled_orders_${userKey}`;

  const formatINR = (value) => `INR ${Number(value || 0).toLocaleString('en-IN')}`;
  const formatDate = (value) => {
    if (!value) return 'N/A';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return 'N/A';
    return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  const addDays = (value, days) => {
    const parsed = new Date(value || Date.now());
    if (Number.isNaN(parsed.getTime())) return 'N/A';
    parsed.setDate(parsed.getDate() + days);
    return formatDate(parsed.toISOString());
  };
  const orderLabel = (order) => `#ORD-${String(order?._id || order?.id || '').slice(-6).toUpperCase()}`;
  const getStatus = (order) => {
    if (cancelledOrderIds.includes(order._id)) return 'Cancelled';
    if (order.isDelivered) return 'Delivered';
    if (order.isPaid) return 'Shipped';
    return 'Processing';
  };
  const canCancel = (order) => {
    const status = getStatus(order);
    return status === 'Processing';
  };
  const orderAddress = (order) => {
    const address = order?.shippingAddress || {};
    return [address.address, `${address.city || ''} ${address.postalCode || ''}`.trim()].filter(Boolean).join(', ');
  };

  useEffect(() => {
    const cachedCancelled = localStorage.getItem(cancelledCacheKey);
    if (!cachedCancelled) {
      setCancelledOrderIds([]);
      return;
    }
    try {
      const parsed = JSON.parse(cachedCancelled);
      setCancelledOrderIds(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCancelledOrderIds([]);
    }
  }, [cancelledCacheKey]);

  useEffect(() => {
    if (!user?.token) return;

    let isMounted = true;
    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError('');
      try {
        const response = await fetch('/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to load orders');
        }
        if (isMounted) {
          setOrders(Array.isArray(data) ? data : []);
        }
        localStorage.setItem(ordersCacheKey, JSON.stringify(Array.isArray(data) ? data : []));
      } catch (error) {
        const cachedOrders = localStorage.getItem(ordersCacheKey);
        if (cachedOrders) {
          try {
            const parsed = JSON.parse(cachedOrders);
            if (isMounted) {
              setOrders(Array.isArray(parsed) ? parsed : []);
              setOrdersError('Showing saved order history (offline mode).');
            }
          } catch {
            if (isMounted) {
              setOrders([]);
              setOrdersError(error.message || 'Failed to load orders');
            }
          }
        } else if (isMounted) {
          setOrders([]);
          setOrdersError(error.message || 'Failed to load orders');
        }
      } finally {
        if (isMounted) {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();
    return () => {
      isMounted = false;
    };
  }, [ordersCacheKey, user?.token]);

  const handleCancelOrder = (orderId) => {
    if (!cancelledOrderIds.includes(orderId)) {
      const updated = [...cancelledOrderIds, orderId];
      setCancelledOrderIds(updated);
      localStorage.setItem(cancelledCacheKey, JSON.stringify(updated));
    }
  };

  const handleOpenReceipt = (order) => {
    setSelectedReceiptOrder(order);
  };

  return (
    <>
      <div className="container animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Account Settings</h1>
      
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary glass'}`} 
                style={{ justifyContent: 'flex-start' }}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} /> Profile
              </button>
              <button 
                className={`btn ${activeTab === 'notifications' ? 'btn-primary' : 'btn-secondary glass'}`} 
                style={{ justifyContent: 'flex-start' }}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} /> Notifications
              </button>
              <button 
                className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-secondary glass'}`} 
                style={{ justifyContent: 'flex-start' }}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={18} /> Security
              </button>
              <button
                className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary glass'}`}
                style={{ justifyContent: 'flex-start' }}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} /> My Orders
              </button>
            
              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                <button 
                  className="btn btn-secondary glass" 
                  style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                  onClick={() => { logout(); navigate('/'); }}
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>

            </div>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem' }}>
            {activeTab === 'profile' && (
              <div className="animate-fade-in">
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Profile Information</h2>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>First Name</label>
                      <input type="text" className="glass" defaultValue={firstName} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Last Name</label>
                      <input type="text" className="glass" defaultValue="Guest" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email Address</label>
                    <input type="email" className="glass" defaultValue={user?.email || 'guest@example.com'} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary" onClick={() => alert('Profile Saved!')}>
                      <Save size={18} /> Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          
            {activeTab === 'notifications' && (
              <div className="animate-fade-in">
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Email Notifications</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <label className="flex-between">
                    <div>
                      <strong style={{ display: 'block' }}>Order Updates</strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Receive emails about your order status</span>
                    </div>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }} />
                  </label>
                  <label className="flex-between">
                    <div>
                      <strong style={{ display: 'block' }}>Promotions & Offers</strong>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>New brass arrivals and seasonal discounts</span>
                    </div>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }} />
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="animate-fade-in">
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Password & Security</h2>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Current Password</label>
                    <input type="password" className="glass" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>New Password</label>
                    <input type="password" className="glass" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary" onClick={() => alert('Password Updated!')}>
                      <Key size={18} /> Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Manage Orders</h2>
                {ordersError && (
                  <div className="glass" style={{ borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
                    {ordersError}
                  </div>
                )}
                {ordersLoading && (
                  <div style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Loading your orders...</div>
                )}
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {!ordersLoading && orders.length === 0 && (
                    <div style={{ color: 'var(--text-secondary)' }}>No orders found for this account yet.</div>
                  )}
                  {orders.map((order) => (
                    <div key={order._id} className="glass" style={{ borderRadius: '12px', padding: '1rem', border: '1px solid var(--border-glass)' }}>
                      <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
                        <div>
                          <div style={{ fontWeight: '600' }}>{orderLabel(order)}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{formatDate(order.createdAt)}</div>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getStatus(order)}</span>
                      </div>
                      <div className="flex-between">
                        <div style={{ fontFamily: 'Outfit', fontWeight: '600' }}>{formatINR(order.totalAmount)}</div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setSelectedOrder(order)}>
                            <Eye size={15} /> View Details
                          </button>
                          <button className="btn btn-secondary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleOpenReceipt(order)}>
                            Receipt
                          </button>
                          <button
                            className="btn btn-secondary"
                            style={{
                              padding: '0.45rem 0.8rem',
                              fontSize: '0.8rem',
                              color: canCancel(order) ? 'var(--danger)' : 'var(--text-muted)',
                              borderColor: canCancel(order) ? 'rgba(239,68,68,0.35)' : 'var(--border-glass)',
                              cursor: canCancel(order) ? 'pointer' : 'not-allowed',
                            }}
                            onClick={() => canCancel(order) && handleCancelOrder(order._id)}
                            disabled={!canCancel(order)}
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '620px', margin: '1rem', padding: '2rem', position: 'relative' }}>
            <button
              className="icon-btn"
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => setSelectedOrder(null)}
            >
              <X size={20} color="var(--text-secondary)" />
            </button>
            <h2 style={{ marginBottom: '0.25rem', color: 'var(--accent-gold)' }}>Order Details</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem' }}>{orderLabel(selectedOrder)}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem 1.2rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</div>
                <div>{getStatus(selectedOrder)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Order Date</div>
                <div>{formatDate(selectedOrder.createdAt)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Shipping Date</div>
                <div>{selectedOrder.paidAt ? formatDate(selectedOrder.paidAt) : addDays(selectedOrder.createdAt, 1)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected Delivery</div>
                <div>{selectedOrder.deliveredAt ? formatDate(selectedOrder.deliveredAt) : addDays(selectedOrder.createdAt, 5)}</div>
              </div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Shipping Address</div>
              <div style={{ color: 'var(--text-secondary)' }}>{orderAddress(selectedOrder)}</div>
            </div>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Items</div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {selectedOrder.orderItems?.map((item, idx) => (
                  <div key={`${item.title}-${idx}`} className="glass-card" style={{ padding: '0.75rem 0.9rem', display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.7rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item.title}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Qty: {item.qty}</span>
                    <span style={{ fontFamily: 'Outfit', fontWeight: '600' }}>{formatINR(Number(item.price || 0) * Number(item.qty || 0))}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReceiptOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '860px', margin: '1rem', padding: '2rem', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button
              className="icon-btn"
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => setSelectedReceiptOrder(null)}
            >
              <X size={20} color="var(--text-secondary)" />
            </button>

            <div className="flex-between" style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--accent-gold)' }}>KRIVIA</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Brass Decor & Artifacts</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ margin: 0 }}>Invoice {orderLabel(selectedReceiptOrder)}</h4>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Date: {formatDate(selectedReceiptOrder.createdAt)}</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Billed To</h4>
              <p style={{ margin: 0, fontWeight: '600' }}>{user?.name || 'Customer'}</p>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>{orderAddress(selectedReceiptOrder)}</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.25rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ textAlign: 'left', padding: '0.85rem 0', color: 'var(--text-muted)', fontWeight: '500' }}>Item Description</th>
                  <th style={{ textAlign: 'center', padding: '0.85rem 0', color: 'var(--text-muted)', fontWeight: '500' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '0.85rem 0', color: 'var(--text-muted)', fontWeight: '500' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedReceiptOrder.orderItems?.map((item, idx) => (
                  <tr key={`${item.title}-${idx}`} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '0.9rem 0', fontWeight: '500' }}>{item.title}</td>
                    <td style={{ textAlign: 'center', padding: '0.9rem 0' }}>{item.qty}</td>
                    <td style={{ textAlign: 'right', padding: '0.9rem 0', fontFamily: 'Outfit' }}>{formatINR(Number(item.price || 0) * Number(item.qty || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(() => {
              const subtotal = Number(
                selectedReceiptOrder.orderItems?.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0) || 0
              );
              const total = Number(selectedReceiptOrder.totalAmount || subtotal);
              const gst = Math.max(total - subtotal, 0);
              return (
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
                    <div className="flex-between" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', fontWeight: '700', fontSize: '1.4rem' }}>
                      <span>Total Paid</span>
                      <span style={{ fontFamily: 'Outfit' }}>{formatINR(total)}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
