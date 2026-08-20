import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Briefcase,
  UserCheck,
  Building2,
  Users,
  BarChart3,
  FileText,
  PlusCircle,
  ShieldAlert
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { currentUser } = useAuth();
  const role = currentUser?.role || 'STUDENT';

  const studentLinks = [
    { id: 'student-dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Explore Job Drives', icon: Briefcase },
    { id: 'profile', label: 'My Profile & Resume', icon: FileText }
  ];

  const recruiterLinks = [
    { id: 'recruiter-dashboard', label: 'Recruiter Dashboard', icon: LayoutDashboard },
    { id: 'manage-jobs', label: 'Manage Postings', icon: PlusCircle },
    { id: 'applicants', label: 'Applicant Pipeline', icon: UserCheck }
  ];

  const adminLinks = [
    { id: 'admin-dashboard', label: 'TPO Control Center', icon: LayoutDashboard },
    { id: 'companies', label: 'Company Onboarding', icon: Building2 },
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'analytics', label: 'Placement Statistics', icon: BarChart3 }
  ];

  const links = role === 'ADMIN' ? adminLinks : role === 'RECRUITER' ? recruiterLinks : studentLinks;

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(15, 23, 42, 0.95)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      gap: '0.5rem'
    }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '0 0.75rem 0.5rem 0.75rem'
      }}>
        {role} Navigation
      </div>

      {links.map((link) => {
        const Icon = link.icon;
        const isActive = activeTab === link.id;
        return (
          <button
            key={link.id}
            onClick={() => setActiveTab(link.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: isActive ? 'var(--primary-gradient)' : 'transparent',
              color: isActive ? '#fff' : 'var(--text-muted)',
              fontSize: '0.9rem',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? 'var(--shadow-glow)' : 'none'
            }}
          >
            <Icon size={18} color={isActive ? '#fff' : '#94a3b8'} />
            <span>{link.label}</span>
          </button>
        );
      })}

      {/* Security Token Badge Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="glass-card" style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', background: 'rgba(30, 41, 59, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>
            <ShieldAlert size={14} /> JWT RBAC Guard Active
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', wordBreak: 'break-all' }}>
            Token: {currentUser?.token ? currentUser.token.slice(0, 22) + '...' : 'Guest'}
          </p>
        </div>
      </div>
    </aside>
  );
};
