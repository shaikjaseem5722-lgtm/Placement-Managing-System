import React from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, UserCheck, ShieldCheck, LogOut, Key, User } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout, switchDemoRole } = useAuth();

  return (
    <header style={{
      height: '70px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'var(--primary-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <GraduationCap size={24} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', color: '#fff', margin: 0, lineHeight: 1.2 }}>NexPlacement</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Institutional Career & Placement Portal</p>
        </div>
      </div>

      {/* Quick Demo Switchers & Current User Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Role Quick Switch Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '3px',
          gap: '2px'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0 0.5rem', fontWeight: 600 }}>Demo Switch:</span>
          <button
            onClick={() => switchDemoRole('STUDENT')}
            className={`btn btn-sm ${currentUser?.role === 'STUDENT' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '20px', padding: '0.25rem 0.65rem' }}
          >
            <User size={13} /> Student
          </button>
          <button
            onClick={() => switchDemoRole('RECRUITER')}
            className={`btn btn-sm ${currentUser?.role === 'RECRUITER' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '20px', padding: '0.25rem 0.65rem' }}
          >
            <UserCheck size={13} /> Recruiter
          </button>
          <button
            onClick={() => switchDemoRole('ADMIN')}
            className={`btn btn-sm ${currentUser?.role === 'ADMIN' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '20px', padding: '0.25rem 0.65rem' }}
          >
            <ShieldCheck size={13} /> Admin
          </button>
        </div>

        {/* Auth User Info & Logout */}
        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.75rem', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', color: 'var(--text-muted)' }}>
                <Key size={11} color="#818cf8" />
                <span className={`badge badge-${currentUser.role === 'ADMIN' ? 'danger' : currentUser.role === 'RECRUITER' ? 'info' : 'success'}`}>
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="btn btn-secondary btn-sm"
              style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
