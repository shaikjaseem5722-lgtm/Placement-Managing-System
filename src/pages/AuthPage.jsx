import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, ShieldCheck, UserCheck, User, Lock, Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export const AuthPage = () => {
  const { login, register, switchDemoRole } = useAuth();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('STUDENT'); // 'STUDENT' | 'RECRUITER' | 'ADMIN'

  // Form Fields
  const [email, setEmail] = useState('rohan.varma@inst.edu.in');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Rohan Varma');

  // Extra Student/Recruiter Fields
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [cgpa, setCgpa] = useState('8.5');
  const [companyName, setCompanyName] = useState('TechCorp Global');

  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (authMode === 'login') {
      const res = login(email, password, selectedRole);
      if (res.success) {
        setMessage({ type: 'success', text: `Authenticated successfully as ${selectedRole}!` });
      }
    } else {
      const res = register({
        email,
        name,
        role: selectedRole,
        extraData: {
          department,
          cgpa,
          companyName
        }
      });
      if (res.success) {
        setMessage({ type: 'success', text: `Account registered successfully! JWT Token issued.` });
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)'
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--primary-gradient)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
            marginBottom: '1rem'
          }}>
            <GraduationCap size={32} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.85rem', color: '#fff', margin: 0 }}>NexPlacement Institutional Portal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Unified Placement & Career Management Engine
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-card" style={{ padding: '2rem' }}>

          {/* Login / Register Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                background: authMode === 'login' ? 'var(--bg-card)' : 'transparent',
                color: authMode === 'login' ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Log In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: 'none',
                borderRadius: '6px',
                background: authMode === 'register' ? 'var(--bg-card)' : 'transparent',
                color: authMode === 'register' ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Register
            </button>
          </div>

          {/* Role Tabs */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Select Portal Access Role:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('STUDENT');
                  setEmail('rohan.varma@inst.edu.in');
                }}
                style={{
                  padding: '0.6rem 0.4rem',
                  border: selectedRole === 'STUDENT' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedRole === 'STUDENT' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.4)',
                  color: selectedRole === 'STUDENT' ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <User size={16} color={selectedRole === 'STUDENT' ? '#818cf8' : '#94a3b8'} />
                Student
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('RECRUITER');
                  setEmail('recruiter@techcorp.com');
                }}
                style={{
                  padding: '0.6rem 0.4rem',
                  border: selectedRole === 'RECRUITER' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedRole === 'RECRUITER' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.4)',
                  color: selectedRole === 'RECRUITER' ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <UserCheck size={16} color={selectedRole === 'RECRUITER' ? '#818cf8' : '#94a3b8'} />
                Recruiter
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('ADMIN');
                  setEmail('tpo.admin@institution.edu.in');
                }}
                style={{
                  padding: '0.6rem 0.4rem',
                  border: selectedRole === 'ADMIN' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  background: selectedRole === 'ADMIN' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.4)',
                  color: selectedRole === 'ADMIN' ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ShieldCheck size={16} color={selectedRole === 'ADMIN' ? '#818cf8' : '#94a3b8'} />
                TPO Admin
              </button>
            </div>
          </div>

          {message && (
            <div style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
              background: message.type === 'success' ? 'var(--success-bg)' : 'var(--danger-bg)',
              color: message.type === 'success' ? '#34d399' : '#f87171',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <CheckCircle size={16} /> {message.text}
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit}>
            {authMode === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu.in"
                  required
                />
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Extra fields for Student Registration */}
            {authMode === 'register' && selectedRole === 'STUDENT' && (
              <>
                <div className="form-group">
                  <label>Department / Stream</label>
                  <select className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)}>
                    <option>Computer Science & Engineering</option>
                    <option>Information Technology</option>
                    <option>Electronics & Comm.</option>
                    <option>Electrical Eng.</option>
                    <option>Mechanical Eng.</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Current CGPA</label>
                  <input type="number" step="0.01" className="form-input" value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="8.50" />
                </div>
              </>
            )}

            {/* Extra fields for Recruiter Registration */}
            {authMode === 'register' && selectedRole === 'RECRUITER' && (
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" className="form-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Acme Innovations" />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
              {authMode === 'login' ? 'Sign In with JWT Auth' : 'Create Account'} <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#818cf8', fontWeight: 600, marginBottom: '0.5rem' }}>
              <Sparkles size={14} /> Quick Demo Access:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div><strong>Student Demo:</strong> <code style={{ color: '#38bdf8' }}>rohan.varma@inst.edu.in</code></div>
              <div><strong>Recruiter Demo:</strong> <code style={{ color: '#38bdf8' }}>recruiter@techcorp.com</code></div>
              <div><strong>Admin Demo:</strong> <code style={{ color: '#38bdf8' }}>tpo.admin@institution.edu.in</code></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
