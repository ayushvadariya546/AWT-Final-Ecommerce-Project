import { TrendingUp, Users, IndianRupee, Package } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '\u20B945,23,189.00', change: '+20.1%', icon: <IndianRupee size={24} color="var(--success)" /> },
    { label: 'Active Users', value: '2,350', change: '+15.2%', icon: <Users size={24} color="var(--accent-light)" /> },
    { label: 'Total Orders', value: '1,205', change: '+5.4%', icon: <Package size={24} color="var(--warning)" /> },
    { label: 'Conversion Rate', value: '3.8%', change: '+1.2%', icon: <TrendingUp size={24} color="var(--accent-primary)" /> },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>{stat.label}</span>
              <div style={{ padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Outfit' }}>{stat.value}</div>
            <div style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
               <TrendingUp size={14} /> {stat.change} <span style={{ color: 'var(--text-muted)' }}>from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
         <div className="glass-card" style={{ height: '400px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Revenue Analytics</h3>
            <div style={{ height: '85%', border: '1px dashed var(--border-glass)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
               Chart Area Representation
            </div>
         </div>
         <div className="glass-card">
            <h3 style={{ marginBottom: '1rem' }}>Recent Orders</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {[1,2,3,4,5].map(i => (
                 <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)' }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>Order #{8930 + i}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Just now</div>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>\u20B94,500.00</div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;