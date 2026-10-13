import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  UserPlus, 
  LogIn, 
  CheckCircle2, 
  Building, 
  Mail, 
  Home,
  Users
} from 'lucide-react';

export default function AuthModal({ 
  currentUser, 
  allUsers = [], 
  onClose, 
  onSelectUser, 
  onRegister 
}) {
  const [mode, setMode] = useState('SWITCH'); // 'SWITCH', 'REGISTER', 'LOGIN'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [collegeName, setCollegeName] = useState('Apex State Institute of Technology');
  const [hostelBlock, setHostelBlock] = useState('Hostel Block B');
  const [roomNo, setRoomNo] = useState('204');
  const [phone, setPhone] = useState('+1 (555) 987-6543');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !collegeId) {
      setError('Name, Campus Email, and College ID are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onRegister({
        name,
        email,
        collegeId,
        collegeName,
        hostelBlock,
        roomNo,
        phone
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#eef2ff', color: '#4f46e5', padding: '8px', borderRadius: '10px' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                Student Identity & Verification
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Flowchart Step: Register with College Details & Verify Account
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8' }}><X size={20} /></button>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <button
            onClick={() => setMode('SWITCH')}
            style={{
              flex: '1',
              padding: '12px',
              fontSize: '13px',
              fontWeight: '700',
              borderBottom: mode === 'SWITCH' ? '2px solid #4f46e5' : 'none',
              color: mode === 'SWITCH' ? '#4f46e5' : '#64748b',
              background: mode === 'SWITCH' ? 'white' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Users size={15} /> Switch Active Student ({allUsers.length})
          </button>
          <button
            onClick={() => setMode('REGISTER')}
            style={{
              flex: '1',
              padding: '12px',
              fontSize: '13px',
              fontWeight: '700',
              borderBottom: mode === 'REGISTER' ? '2px solid #4f46e5' : 'none',
              color: mode === 'REGISTER' ? '#4f46e5' : '#64748b',
              background: mode === 'REGISTER' ? 'white' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <UserPlus size={15} /> Register New Student
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          {mode === 'SWITCH' && (
            <div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                Select a verified student profile below to instantly test buyer, seller, and trading exchanges from their perspective:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {allUsers.map((u) => {
                  const isCurrent = currentUser?.id === u.id;
                  return (
                    <div
                      key={u.id}
                      onClick={() => { onSelectUser(u); onClose(); }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: `2px solid ${isCurrent ? '#4f46e5' : '#e2e8f0'}`,
                        background: isCurrent ? '#f5f3ff' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={u.avatar} 
                          alt={u.name} 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} 
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{u.name}</span>
                            {u.verified && <span className="verified-badge"><ShieldCheck size={11} /> ID Verified</span>}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {u.email} • ID: {u.collegeId} • {u.hostelBlock} Rm {u.roomNo}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        {isCurrent ? (
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#4f46e5', background: '#e0e7ff', padding: '4px 10px', borderRadius: '9999px' }}>
                            Active
                          </span>
                        ) : (
                          <button
                            style={{ fontSize: '12px', fontWeight: '700', color: '#475569', background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px' }}
                          >
                            Switch to
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {mode === 'REGISTER' && (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Student Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Maya Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Campus Email (@campus.edu) *
                  </label>
                  <input
                    type="email"
                    placeholder="maya@campus.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    College Roll / ID Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 23CS0419"
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Hostel Block
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hostel Block B"
                    value={hostelBlock}
                    onChange={(e) => setHostelBlock(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Room Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 204"
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  College / Institution Name
                </label>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{ padding: '10px 18px', borderRadius: '10px', color: '#64748b', fontWeight: '600', fontSize: '14px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                  }}
                >
                  <UserCheck size={16} />
                  {loading ? 'Registering...' : 'Register & Verify Student'}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
