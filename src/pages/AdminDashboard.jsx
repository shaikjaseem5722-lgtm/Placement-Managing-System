import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import { ShieldCheck, Building2, Users, Briefcase, Award, CheckCircle2, AlertTriangle, ArrowRight, BarChart3 } from 'lucide-react';

export const AdminDashboard = ({ setActiveTab }) => {
  const { companies, jobs, students, applications, placementStats, toggleCompanyStatus } = useAuth();

  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.placementStatus === 'Placed').length;
  const pendingCompanies = companies.filter(c => c.status === 'Pending');

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* TPO Admin Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        padding: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <ShieldCheck size={24} color="#f87171" />
              <span className="badge badge-danger" style={{ fontSize: '0.85rem' }}>Super Administrator</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>Training & Placement Office (TPO) Control Center</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem', fontSize: '0.9rem' }}>
              Institutional placement governance, recruiter verification, student audit, and analytics
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setActiveTab('analytics')} className="btn btn-primary">
              <BarChart3 size={18} /> Placement Analytics
            </button>
            <button onClick={() => setActiveTab('companies')} className="btn btn-secondary">
              Review Companies ({pendingCompanies.length} Pending)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <StatCard title="Overall Placement Rate" value={`${placementStats.overallPlacementRate}%`} subtitle="Institutional Batch 2026" icon={Award} color="success" />
        <StatCard title="Total Registered Students" value={totalStudents} subtitle={`${placedStudents} Placed (${Math.round((placedStudents/totalStudents)*100)}%)`} icon={Users} color="info" />
        <StatCard title="Corporate Hiring Partners" value={companies.length} subtitle={`${pendingCompanies.length} pending approval`} icon={Building2} color="warning" />
        <StatCard title="Active Drive Postings" value={jobs.length} subtitle="On-campus drives open" icon={Briefcase} color="primary" />
      </div>

      {/* Main Grid: Pending Approvals & Live Campus Drives */}
      <div className="grid-2">

        {/* Company Onboarding Approvals */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Recruiter Company Approvals</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Approve corporate partners to publish campus drives</p>
            </div>
            <button onClick={() => setActiveTab('companies')} className="btn btn-outline btn-sm">
              Manage All Partners
            </button>
          </div>

          {companies.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No companies registered.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {companies.map((company) => (
                <div key={company.id} style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img src={company.logo} alt={company.name} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{company.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{company.industry} • {company.headquarters}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`badge badge-${company.status === 'Verified' ? 'success' : 'warning'}`}>
                      {company.status}
                    </span>
                    <button
                      onClick={() => toggleCompanyStatus(company.id, company.status === 'Verified' ? 'Pending' : 'Verified')}
                      className={`btn btn-sm ${company.status === 'Verified' ? 'btn-secondary' : 'btn-primary'}`}
                    >
                      {company.status === 'Verified' ? 'Revoke' : 'Approve'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Global Student Placement Overview */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Recent Student Placement Records</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Institutional audit of student job offers</p>
            </div>
            <button onClick={() => setActiveTab('students')} className="btn btn-secondary btn-sm">
              Student Directory <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {students.slice(0, 4).map((stud) => (
              <div key={stud.id} style={{
                background: 'rgba(30, 41, 59, 0.4)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{stud.name} ({stud.rollNumber})</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {stud.department} | CGPA: <strong style={{ color: '#34d399' }}>{stud.cgpa}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`badge badge-${stud.placementStatus === 'Placed' ? 'success' : 'warning'}`}>
                    {stud.placementStatus}
                  </span>
                  {stud.placedCompany && (
                    <div style={{ fontSize: '0.72rem', color: '#818cf8', marginTop: '3px', fontWeight: 600 }}>
                      {stud.placedCompany} ({stud.offeredCtc})
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
