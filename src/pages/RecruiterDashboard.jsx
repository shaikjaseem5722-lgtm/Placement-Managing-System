import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import { Briefcase, UserCheck, Users, Building2, PlusCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const RecruiterDashboard = ({ setActiveTab }) => {
  const { currentUser, companies, jobs, applications } = useAuth();
  
  const currentCompany = companies.find(c => c.id === currentUser?.companyId) || companies[0];
  const companyJobs = jobs.filter(j => j.companyId === currentCompany.id);
  const companyJobIds = companyJobs.map(j => j.id);

  const companyApplications = applications.filter(a => companyJobIds.includes(a.jobId));
  const totalApplicants = companyApplications.length;
  const shortlistedCount = companyApplications.filter(a => ['Shortlisted', 'Interview Scheduled'].includes(a.status)).length;
  const hiredCount = companyApplications.filter(a => a.status === 'Selected').length;

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Recruiter Welcome Header */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(45, 212, 191, 0.15) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        padding: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={currentCompany.logo}
              alt={currentCompany.name}
              style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid rgba(255, 255, 255, 0.1)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>{currentCompany.name}</h2>
                <span className={`badge badge-${currentCompany.status === 'Verified' ? 'success' : 'warning'}`}>
                  {currentCompany.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
                Recruiter Portal | Head: <strong style={{ color: '#fff' }}>{currentCompany.recruiterName}</strong> ({currentCompany.recruiterEmail})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setActiveTab('manage-jobs')} className="btn btn-primary">
              <PlusCircle size={18} /> Post New Drive
            </button>
            <button onClick={() => setActiveTab('applicants')} className="btn btn-secondary">
              View Applicants ({totalApplicants})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <StatCard title="Active Drive Openings" value={companyJobs.length} subtitle="Published on campus" icon={Briefcase} color="primary" />
        <StatCard title="Total Applications Received" value={totalApplicants} subtitle="Across all drives" icon={Users} color="info" />
        <StatCard title="Candidates Shortlisted" value={shortlistedCount} subtitle="Interview round" icon={UserCheck} color="warning" />
        <StatCard title="Students Selected" value={hiredCount} subtitle="Offers generated" icon={CheckCircle2} color="success" />
      </div>

      {/* Main Grid: Active Postings & Recent Applicants */}
      <div className="grid-2">

        {/* Company Active Postings */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Active Hiring Drives</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Job postings currently accepting applications</p>
            </div>
            <button onClick={() => setActiveTab('manage-jobs')} className="btn btn-outline btn-sm">
              Manage Postings
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {companyJobs.map((job) => (
              <div key={job.id} style={{
                background: 'rgba(15, 23, 42, 0.5)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: 0 }}>{job.title}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', marginTop: '3px' }}>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>{job.ctc}</span>
                    <span>•</span>
                    <span>Min CGPA: {job.minCgpa}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-primary">{job.applicantsCount} Applicants</span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Deadline: {job.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Recent Applicants</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Latest student candidate submissions</p>
            </div>
            <button onClick={() => setActiveTab('applicants')} className="btn btn-secondary btn-sm">
              Review Pipeline <ArrowRight size={14} />
            </button>
          </div>

          {companyApplications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No applications submitted yet for your drives.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {companyApplications.slice(0, 4).map((app) => (
                <div key={app.id} style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{app.studentName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {app.department} | CGPA: <strong style={{ color: '#34d399' }}>{app.cgpa}</strong>
                    </div>
                  </div>

                  <span className={`badge badge-${app.status === 'Selected' ? 'success' : app.status === 'Shortlisted' ? 'info' : 'primary'}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
