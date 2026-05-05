import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './App.css';

const GOOGLE_CLIENT_ID = '179276315664-kdmpdcaf5jvk830m02978n9b8bi43iae.apps.googleusercontent.com';

const COLORS = {
  bg: '#1c1e1c',
  surface: '#262926',
  text: '#f4f2ec',
  muted: '#858480',
  accent: '#c8f04a',
};

function App() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [backlog, setBacklog] = useState([]);
  const [activeTab, setActiveTab] = useState('today');

  const handleLoginSuccess = (cred) => setUser(cred);

  const generatePlan = () => {
    setPlan({
      date: new Date().toISOString().split('T')[0],
      format: Math.random() > 0.5 ? 'Reel' : 'Karuzela',
      trend: 'Białko w diecie 30+',
      science: '1.6–2.2g białka/kg',
      script: 'Białko. Wszyscy mówią — 1g na kilo. Ale czekaj.',
      status: 'draft',
    });
  };

  if (!user) return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <div style={{ textAlign: 'center', padding: '3rem', background: COLORS.surface, borderRadius: '12px' }}>
          <h1 style={{ color: COLORS.accent, marginBottom: '2rem' }}>PUNKT ZWROTNY</h1>
          <GoogleLogin onSuccess={handleLoginSuccess} />
        </div>
      </GoogleOAuthProvider>
    </div>
  );

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: COLORS.accent, marginBottom: '2rem' }}>📅 Plan na dzisiaj</h1>
        <button onClick={generatePlan} style={{ background: COLORS.accent, color: '#1c1e1c', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
          ✨ Generuj plan
        </button>
        {plan && (
          <div style={{ marginTop: '2rem' }}>
            <p><strong>Trend:</strong> {plan.trend}</p>
            <p><strong>Science:</strong> {plan.science}</p>
            <p><strong>Script:</strong> {plan.script}</p>
            <button onClick={() => setBacklog([...backlog, plan])} style={{ marginTop: '1rem', background: COLORS.accent, color: '#1c1e1c', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
              ➕ Do backlogu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
