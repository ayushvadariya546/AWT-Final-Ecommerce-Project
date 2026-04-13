import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, X } from 'lucide-react';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 'PRD-001', name: 'Royal Lotus Brass Urli', category: 'Decor', price: '₹4,500', stock: 124, status: 'Active' },
    { id: 'PRD-002', name: 'Vintage Ganesha Idol', category: 'Artifacts', price: '₹8,200', stock: 45, status: 'Active' },
    { id: 'PRD-003', name: 'Ornate Diya Stand Set', category: 'Spiritual', price: '₹2,100', stock: 8, status: 'Low Stock' },
    { id: 'PRD-004', name: 'Handcrafted Brass Planter', category: 'Home', price: '₹5,600', stock: 50, status: 'Active' },
    { id: 'PRD-005', name: 'Antique Peacock Brass Bell', category: 'Decor', price: '₹3,200', stock: 210, status: 'Active' },
    { id: 'PRD-006', name: 'Hand-Etched Brass Serving Tray', category: 'Luxury', price: '₹3,800', stock: 14, status: 'Active' },
    { id: 'PRD-007', name: 'Royal Elephant Brass Vastu Figurine', category: 'Artifacts', price: '₹6,500', stock: 55, status: 'Active' },
    { id: 'PRD-008', name: 'Traditional Brass Spice Box', category: 'Home', price: '₹4,200', stock: 3, status: 'Low Stock' },
    { id: 'PRD-009', name: 'Royal Peacock Carved Urli', category: 'Decor', price: '₹5,200', stock: 89, status: 'Active' },
    { id: 'PRD-010', name: 'Celestial Brass Sun Art', category: 'Wall Art', price: '₹7,800', stock: 11, status: 'Active' },
    { id: 'PRD-011', name: 'Ornate Temple Hanging Bell', category: 'Decor', price: '₹2,800', stock: 34, status: 'Active' },
    { id: 'PRD-012', name: 'Gajalakshmi Brass Idol Lamp', category: 'Spiritual', price: '₹6,200', stock: 42, status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'Decor', price: '', stock: '', status: 'Active' });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = `PRD-${String(products.length + 1).padStart(3, '0')}`;
    setProducts([...products, { id: newId, ...formData }]);
    setIsModalOpen(false);
    setFormData({ name: '', category: 'Decor', price: '', stock: '', status: 'Active' });
  };

  return (
    <>
      <div className="animate-fade-in" style={{ position: 'relative' }}>
        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          <h1>Manage Products</h1>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add New Product
          </button>
        </div>
        
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          
          
          <div className="flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 10, pointerEvents: 'none' }} />
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="glass" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
            </div>
            
            <div style={{ position: 'relative' }}>
               <select 
                 className="btn btn-secondary glass" 
                 style={{ padding: '0.5rem 2.5rem 0.5rem 1rem', appearance: 'none', cursor: 'pointer', outline: 'none' }}
                 value={filterStatus}
                 onChange={(e) => setFilterStatus(e.target.value)}
               >
                 <option value="All">All Statuses</option>
                 <option value="Active">Active</option>
                 <option value="Low Stock">Low Stock</option>
                 <option value="Out of Stock">Out of Stock</option>
               </select>
               <Filter size={18} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Product ID</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Name</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Category</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Price</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Stock</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i !== filteredProducts.length - 1 ? '1px solid var(--border-glass)' : 'none' }}>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{p.id}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{p.name}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{p.category}</td>
                    <td style={{ padding: '1rem 1.5rem', fontFamily: 'Outfit', fontWeight: '600' }}>{p.price}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{p.stock}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold',
                        background: p.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 
                                    p.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: p.status === 'Active' ? 'var(--success)' : 
                               p.status === 'Low Stock' ? 'var(--warning)' : 'var(--danger)'
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button className="icon-btn hover:text-accent-light" style={{ padding: '0.5rem', color: 'var(--text-muted)' }}><Edit size={16} /></button>
                        <button className="icon-btn hover:text-danger" style={{ padding: '0.5rem', color: 'var(--text-muted)' }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', margin: '1rem', position: 'relative' }}>
            <button 
              className="icon-btn" 
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }} 
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} color="var(--text-secondary)" />
            </button>
            
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>Add New Product</h2>
            
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Product Name</label>
                <input required type="text" placeholder="Enter product name..." className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', border: '1px solid var(--border-glass)' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Category</label>
                  <select className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', appearance: 'none', border: '1px solid var(--border-glass)' }} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Decor">Decor</option>
                    <option value="Artifacts">Artifacts</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Home">Home</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Wall Art">Wall Art</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Status</label>
                  <select className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', appearance: 'none', border: '1px solid var(--border-glass)' }} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Price (INR)</label>
                  <input required type="text" placeholder="e.g. ₹5,000" className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', border: '1px solid var(--border-glass)' }} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Stock Quantity</label>
                  <input required type="number" min="0" placeholder="e.g. 50" className="glass" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', border: '1px solid var(--border-glass)' }} value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '1rem', width: '100%' }}>Create Product</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProducts;
