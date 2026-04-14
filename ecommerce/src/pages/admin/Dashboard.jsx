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
               <svg
                 viewBox="0 0 900 260"
                 role="img"
                 aria-label="Revenue analytics line chart"
                 style={{ width: '100%', height: '100%', borderRadius: '8px', background: '#ffffff' }}
               >
                 <line x1="50" y1="210" x2="840" y2="210" stroke="#d9d9d9" strokeWidth="1" />
                 <line x1="50" y1="30" x2="50" y2="210" stroke="#d9d9d9" strokeWidth="1" />

                 <text x="20" y="210" fontSize="11" fill="#6b7280">0</text>
                 <text x="12" y="165" fontSize="11" fill="#6b7280">250</text>
                 <text x="12" y="120" fontSize="11" fill="#6b7280">500</text>
                 <text x="12" y="75" fontSize="11" fill="#6b7280">750</text>

                 <polyline
                   fill="none"
                   stroke="#f59e0b"
                   strokeWidth="4"
                   points="70,165 130,155 190,120 250,105 310,120 370,130 430,75 490,120 550,95 610,80 670,120 730,120 790,110"
                 />
                 <polyline
                   fill="none"
                   stroke="#1d74d1"
                   strokeWidth="4"
                   points="70,175 130,170 190,145 250,130 310,145 370,155 430,115 490,145 550,135 610,130 670,145 730,145 790,145"
                 />

                 <g fill="#f59e0b">
                   <circle cx="70" cy="165" r="5" />
                   <circle cx="130" cy="155" r="5" />
                   <circle cx="190" cy="120" r="5" />
                   <circle cx="250" cy="105" r="5" />
                   <circle cx="310" cy="120" r="5" />
                   <circle cx="370" cy="130" r="5" />
                   <circle cx="430" cy="75" r="5" />
                   <circle cx="490" cy="120" r="5" />
                   <circle cx="550" cy="95" r="5" />
                   <circle cx="610" cy="80" r="5" />
                   <circle cx="670" cy="120" r="5" />
                   <circle cx="730" cy="120" r="5" />
                   <circle cx="790" cy="110" r="5" />
                 </g>

                 <g fill="#1d74d1">
                   <circle cx="70" cy="175" r="5" />
                   <circle cx="130" cy="170" r="5" />
                   <circle cx="190" cy="145" r="5" />
                   <circle cx="250" cy="130" r="5" />
                   <circle cx="310" cy="145" r="5" />
                   <circle cx="370" cy="155" r="5" />
                   <circle cx="430" cy="115" r="5" />
                   <circle cx="490" cy="145" r="5" />
                   <circle cx="550" cy="135" r="5" />
                   <circle cx="610" cy="130" r="5" />
                   <circle cx="670" cy="145" r="5" />
                   <circle cx="730" cy="145" r="5" />
                   <circle cx="790" cy="145" r="5" />
                 </g>

                 <g fontSize="10" fill="#6b7280">
                   <text x="56" y="228">01-Jan</text>
                   <text x="116" y="228">01-Feb</text>
                   <text x="176" y="228">01-Mar</text>
                   <text x="236" y="228">01-Apr</text>
                   <text x="296" y="228">01-May</text>
                   <text x="356" y="228">01-Jun</text>
                   <text x="416" y="228">01-Jul</text>
                   <text x="476" y="228">01-Aug</text>
                   <text x="536" y="228">01-Sep</text>
                   <text x="596" y="228">01-Oct</text>
                   <text x="656" y="228">01-Nov</text>
                   <text x="716" y="228">01-Dec</text>
                 </g>

                 <g fontSize="12" fill="#374151" fontWeight="600">
                   <text x="635" y="24">Nav 500</text>
                   <text x="635" y="44">Nav 400</text>
                   <text x="635" y="64">Nav 300</text>
                   <text x="635" y="84">Nav 200</text>
                 </g>
                 <circle cx="810" cy="20" r="6" fill="#f59e0b" />
                 <polygon points="804,44 816,44 810,34" fill="#1d74d1" />
                 <polygon points="804,54 816,54 810,64" fill="#60a5fa" />
                 <rect x="804" y="74" width="12" height="12" fill="#34d399" />
               </svg>
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
