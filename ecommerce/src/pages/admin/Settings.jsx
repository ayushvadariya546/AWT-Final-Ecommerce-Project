import { Save, User, Bell, Shield, Wallet } from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Platform Settings</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <section className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} /> Store Details
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Store Name</label>
              <input type="text" className="glass" defaultValue="KRIVIA" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Customer Support Email</label>
              <input type="email" className="glass" defaultValue="support@krivia.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', outline: 'none' }} />
            </div>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wallet size={20} /> Payment Gateway
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <input type="checkbox" defaultChecked /> Enable Stripe Integration
             </label>
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <input type="checkbox" defaultChecked /> Accept PayPal
             </label>
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <input type="checkbox" /> Enable Cryptocurrency Payments
             </label>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '2rem' }}>
           <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} /> Email Notifications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <input type="checkbox" defaultChecked /> Send Order Confirmations
             </label>
             <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <input type="checkbox" defaultChecked /> Send Shipping Updates
             </label>
          </div>
        </section>

        <button className="btn btn-primary" style={{ width: 'fit-content', padding: '1rem 2rem' }}>
          <Save size={18} /> Save All Changes
        </button>

      </div>
    </div>
  );
};

export default Settings;
