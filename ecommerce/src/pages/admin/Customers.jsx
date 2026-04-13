import { useEffect, useMemo, useState } from 'react';
import { Search, MoreVertical, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Customers = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeMenu, setActiveMenu] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/users', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch users');
        }

        setUsers(data);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [user?.token]);

  const filteredUsers = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return users;

    return users.filter((u) =>
      `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(term)
    );
  }, [searchQuery, users]);

  const toggleMenu = (e, userId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  useEffect(() => {
    const handleOutsideClick = () => setActiveMenu(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h1>Customer Directory</h1>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 10, pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search customers..."
            className="glass"
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', outline: 'none' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading && <p style={{ color: 'var(--text-secondary)' }}>Loading users...</p>}

      {error && (
        <div className="glass" style={{ borderRadius: '8px', padding: '0.75rem 1rem', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.35)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <p style={{ color: 'var(--text-secondary)' }}>No users found.</p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredUsers.map((u) => (
            <div key={u._id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <span
                  style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    background: u.role === 'admin' ? 'var(--text-primary)' : 'rgba(0,0,0,0.05)',
                    color: u.role === 'admin' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {u.role === 'admin' ? 'ADMIN' : 'CUSTOMER'}
                </span>
                
                <div style={{ position: 'relative' }}>
                  <button 
                    className="icon-btn hover:bg-glass" 
                    style={{ color: 'var(--text-muted)', padding: '0.5rem', borderRadius: '50%' }}
                    onClick={(e) => toggleMenu(e, u._id)}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeMenu === u._id && (
                    <div className="glass animate-fade-in" style={{ 
                      position: 'absolute', top: '100%', right: 0, width: '220px', 
                      padding: '1rem', borderRadius: '12px', zIndex: 100, 
                      boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-glass)',
                      marginTop: '0.5rem'
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Client ID</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <code style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.03)', padding: '0.2rem 0.4rem', borderRadius: '4px', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u._id}</code>
                          <button 
                            onClick={(e) => handleCopyId(e, u._id)}
                            style={{ fontSize: '0.7rem', color: copiedId === u._id ? 'var(--success)' : 'var(--accent-primary)', fontWeight: 'bold' }}
                          >
                            {copiedId === u._id ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      <div style={{ marginBottom: '0.5rem' }}>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Registered On</p>
                        <p style={{ fontSize: '0.85rem' }}>{new Date(u.createdAt).toLocaleString()}</p>
                      </div>

                      <button className="btn" style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', background: 'var(--danger)', color: 'white', marginTop: '0.5rem' }}>
                        Deactivate Account
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h3 style={{ marginBottom: '0.25rem' }}>{u.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Mail size={14} /> {u.email}
              </p>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Last Activity</p>
                  <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Status</p>
                  <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.9rem' }}>Active</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
