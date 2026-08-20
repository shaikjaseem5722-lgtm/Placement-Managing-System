import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';
import { Search, Filter, MapPin, Calendar, CheckCircle2, XCircle, Briefcase, FileText, Send, Sparkles, Building2, AlertCircle } from 'lucide-react';

export const JobsPage = () => {
  const { currentUser, jobs, students, applications, applyForJob } = useAuth();
  const currentStudent = students.find(s => s.id === currentUser?.studentId) || students[0];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleType, setSelectedRoleType] = useState('ALL');
  const [minCtcFilter, setMinCtcFilter] = useState(0);
  const [eligibleOnly, setEligibleOnly] = useState(false);

  // Selected Job for Details Modal
  const [selectedJob, setSelectedJob] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [applyResult, setApplyResult] = useState(null);

  // Filtering Logic
  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          j.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          j.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedRoleType === 'ALL' || j.roleType === selectedRoleType;
    const matchesCtc = j.numericCtc >= minCtcFilter;
    const matchesEligibility = !eligibleOnly || currentStudent.cgpa >= j.minCgpa;

    return matchesSearch && matchesType && matchesCtc && matchesEligibility;
  });

  const handleApply = (jobId) => {
    setApplyResult(null);
    const res = applyForJob(jobId, coverNote);
    setApplyResult(res);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>Active Placement Drives</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Explore job openings, check your eligibility status, and submit 1-click applications
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-info" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
            Your CGPA: <strong>{currentStudent?.cgpa || '8.5'}</strong>
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        
        {/* Search Bar */}
        <div style={{ flex: '1 1 280px', position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by job title, company name, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Role Type Filter */}
        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '160px' }}
          value={selectedRoleType}
          onChange={(e) => setSelectedRoleType(e.target.value)}
        >
          <option value="ALL">All Role Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Internship + PPO">Internship + PPO</option>
        </select>

        {/* Min CTC Filter */}
        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '160px' }}
          value={minCtcFilter}
          onChange={(e) => setMinCtcFilter(Number(e.target.value))}
        >
          <option value={0}>Any Salary / CTC</option>
          <option value={8}>8+ LPA</option>
          <option value={12}>12+ LPA</option>
          <option value={18}>18+ LPA</option>
        </select>

        {/* Eligible Only Checkbox Pill */}
        <button
          type="button"
          onClick={() => setEligibleOnly(!eligibleOnly)}
          className={`btn ${eligibleOnly ? 'btn-primary' : 'btn-secondary'}`}
          style={{ gap: '6px' }}
        >
          <Filter size={14} /> Eligible Drives Only
        </button>
      </div>

      {/* Job Grid */}
      <div className="grid-2">
        {filteredJobs.map((job) => {
          const isEligible = currentStudent.cgpa >= job.minCgpa;
          const hasApplied = applications.some(a => a.jobId === job.id && a.studentId === currentStudent.id);
          const appDetails = applications.find(a => a.jobId === job.id && a.studentId === currentStudent.id);

          return (
            <div key={job.id} className="glass-card glass-card-interactive" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'space-between' }}>
              
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>{job.title}</h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <Building2 size={13} /> {job.companyName}
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-success" style={{ fontSize: '0.9rem', padding: '0.4rem 0.85rem' }}>
                    {job.ctc}
                  </span>
                </div>

                {/* Tags row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span className="badge badge-primary">{job.roleType}</span>
                  <span className="badge badge-info"><MapPin size={12} /> {job.location}</span>
                  <span className="badge badge-warning"><Calendar size={12} /> Apply by {job.deadline}</span>
                </div>

                {/* Eligibility Pill Indicator */}
                <div style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isEligible ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: isEligible ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid rgba(248, 113, 113, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: isEligible ? '#34d399' : '#f87171' }}>
                    {isEligible ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {isEligible ? 'You meet the minimum CGPA requirement' : `Requires min ${job.minCgpa} CGPA (Your CGPA: ${currentStudent.cgpa})`}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Min CGPA: {job.minCgpa}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                  {job.description}
                </p>
              </div>

              {/* Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {job.applicantsCount} student applicants
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setCoverNote('');
                      setApplyResult(null);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    View Details
                  </button>

                  {hasApplied ? (
                    <span className="badge badge-success" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      ✓ {appDetails?.status || 'Applied'}
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setCoverNote('');
                        setApplyResult(null);
                      }}
                      className="btn btn-primary btn-sm"
                      disabled={!isEligible}
                      style={{ opacity: isEligible ? 1 : 0.6 }}
                    >
                      Apply Now <Send size={13} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Job Details & Application Modal */}
      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={`Job Drive Details - ${selectedJob.title}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Modal Company Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <img src={selectedJob.companyLogo} alt={selectedJob.companyName} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{selectedJob.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#818cf8', margin: 0, fontWeight: 600 }}>{selectedJob.companyName}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '4px' }}>
                  <span className="badge badge-success">{selectedJob.ctc}</span>
                  <span className="badge badge-info">{selectedJob.location}</span>
                </div>
              </div>
            </div>

            {applyResult && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: applyResult.success ? 'var(--success-bg)' : 'var(--danger-bg)',
                color: applyResult.success ? '#34d399' : '#f87171',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {applyResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                {applyResult.message}
              </div>
            )}

            <div>
              <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.35rem' }}>Description & Scope</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{selectedJob.description}</p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '0.35rem' }}>Key Requirements & Prerequisites</h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {selectedJob.requirements?.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
                  <span>Custom Application Cover Note (Optional)</span>
                  <span style={{ fontSize: '0.75rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FileText size={12} /> Resume: {currentStudent.resumeName || 'Default PDF Resume'}
                  </span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Briefly state why you're a great fit for this role..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button onClick={() => setSelectedJob(null)} className="btn btn-secondary">
                Close
              </button>

              {applications.some(a => a.jobId === selectedJob.id && a.studentId === currentStudent.id) ? (
                <span className="badge badge-success" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                  ✓ Application Submitted
                </span>
              ) : (
                <button
                  onClick={() => handleApply(selectedJob.id)}
                  className="btn btn-primary"
                  disabled={currentStudent.cgpa < selectedJob.minCgpa}
                >
                  Confirm & Submit Application <Send size={16} />
                </button>
              )}
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
