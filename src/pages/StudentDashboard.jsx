import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import { Briefcase, CheckCircle2, Clock, Award, Building2, Calendar, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

export const StudentDashboard = ({ setActiveTab }) => {
  const { currentUser, students, jobs, applications } = useAuth();

  const currentStudent = students.find(s => s.id === currentUser?.studentId) || students[0];
  const myApplications = applications.filter(a => a.studentId === currentStudent.id);

  const appliedCount = myApplications.length;
  const shortlistedCount = myApplications.filter(a => ['Shortlisted', 'Interview Scheduled', 'Selected'].includes(a.status)).length;
  const selectedCount = myApplications.filter(a => a.status === 'Selected').length;

  const eligibleJobs = jobs.filter(j => currentStudent.cgpa >= j.minCgpa);

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Student Welcome Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
        border: '1px solid rgba(129, 140, 248, 0.3)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-primary">{currentStudent.department}</span>
              <span className="badge badge-info">Batch {currentStudent.batch}</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>Welcome back, {currentStudent.name}! 👋</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem', fontSize: '0.95rem' }}>
              Roll No: <strong style={{ color: '#f8fafc' }}>{currentStudent.rollNumber}</strong> | Cumulative CGPA: <strong style={{ color: '#34d399' }}>{currentStudent.cgpa} / 10.0</strong>
            </p>
          </div>

          {/* Placement Status Box */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: '240px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
              Placement Status
            </span>
            <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CheckCircle2 size={20} color={currentStudent.placementStatus === 'Placed' ? '#34d399' : '#fbbf24'} />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: currentStudent.placementStatus === 'Placed' ? '#34d399' : '#fbbf24' }}>
                {currentStudent.placementStatus}
              </span>
            </div>
            {currentStudent.placedCompany && (
              <p style={{ fontSize: '0.8rem', color: '#818cf8', marginTop: '4px', fontWeight: 600 }}>
                {currentStudent.placedCompany} ({currentStudent.offeredCtc})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <StatCard title="Applications Submitted" value={appliedCount} subtitle="Job drives targeted" icon={Briefcase} color="primary" />
        <StatCard title="Shortlisted / Stage 2" value={shortlistedCount} subtitle="Qualifying applications" icon={Clock} color="warning" />
        <StatCard title="Offers Extended" value={selectedCount} subtitle="Confirmed job offers" icon={Award} color="success" />
        <StatCard title="Eligible Drives" value={eligibleJobs.length} subtitle="Based on your CGPA" icon={Building2} color="info" />
      </div>

      {/* Main Grid Section: Recent Applications & Active Drives */}
      <div className="grid-2">

        {/* My Application Pipeline */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>My Application History</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time status updates from recruiters</p>
            </div>
            <button onClick={() => setActiveTab('jobs')} className="btn btn-outline btn-sm">
              Explore All Jobs <ArrowUpRight size={14} />
            </button>
          </div>

          {myApplications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <p>You haven't applied for any job drives yet.</p>
              <button onClick={() => setActiveTab('jobs')} className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}>
                Browse Available Jobs
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {myApplications.map((app) => {
                const jobDetails = jobs.find(j => j.id === app.jobId);
                return (
                  <div key={app.id} style={{
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
                      <img
                        src={jobDetails?.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80'}
                        alt={app.studentName}
                        style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{jobDetails?.title || 'Software Developer'}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{jobDetails?.companyName}</span>
                          <span>•</span>
                          <span style={{ color: '#34d399', fontWeight: 600 }}>{jobDetails?.ctc}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`badge badge-${app.status === 'Selected' ? 'success' : app.status === 'Interview Scheduled' ? 'warning' : app.status === 'Shortlisted' ? 'info' : 'primary'}`}>
                        {app.status}
                      </span>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Applied on {app.appliedDate}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Featured Open Drives */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Top Hiring Drives</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Drives matching your stream ({currentStudent.department})</p>
            </div>
            <button onClick={() => setActiveTab('jobs')} className="btn btn-secondary btn-sm">
              View All ({jobs.length})
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} style={{
                background: 'rgba(30, 41, 59, 0.5)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={job.companyLogo} alt={job.companyName} style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', color: '#fff', margin: 0 }}>{job.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{job.companyName}</span>
                    </div>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '0.8rem' }}>{job.ctc}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> Deadline: {job.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
