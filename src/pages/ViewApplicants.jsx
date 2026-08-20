import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';
import { Users, Filter, Download, CheckCircle2, XCircle, Clock, Award, FileText, Search, ExternalLink } from 'lucide-react';

export const ViewApplicants = () => {
  const { currentUser, companies, jobs, applications, updateApplicationStatus } = useAuth();
  
  const currentCompany = companies.find(c => c.id === currentUser?.companyId) || companies[0];
  const companyJobs = jobs.filter(j => j.companyId === currentCompany.id);
  const companyJobIds = companyJobs.map(j => j.id);

  const companyApplications = applications.filter(a => companyJobIds.includes(a.jobId));

  const [selectedJobId, setSelectedJobId] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Resume Modal Preview State
  const [previewApp, setPreviewApp] = useState(null);

  const filteredApps = companyApplications.filter(app => {
    const matchesJob = selectedJobId === 'ALL' || app.jobId === selectedJobId;
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.studentRoll.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.department.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesJob && matchesStatus && matchesSearch;
  });

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>Applicant Recruitment Pipeline</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Review student candidates, inspect ATS resumes, and advance candidates through hiring stages
          </p>
        </div>

        <span className="badge badge-info" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
          Total Candidates: <strong>{companyApplications.length}</strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        
        {/* Search */}
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search candidate name, roll number, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Filter by Job Drive */}
        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '200px' }}
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
        >
          <option value="ALL">All Job Drives ({companyJobs.length})</option>
          {companyJobs.map(j => (
            <option key={j.id} value={j.id}>{j.title}</option>
          ))}
        </select>

        {/* Filter by Pipeline Stage */}
        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '180px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Pipeline Stages</option>
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Selected">Selected / Offered</option>
          <option value="Rejected">Rejected</option>
        </select>

      </div>

      {/* Applicants Master Table */}
      <div className="glass-card">
        {filteredApps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Users size={36} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
            <p>No student candidates match the selected filter criteria.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Department & Roll</th>
                  <th>CGPA</th>
                  <th>ATS Match</th>
                  <th>Applied Drive</th>
                  <th>Resume</th>
                  <th>Stage Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => {
                  const targetJob = jobs.find(j => j.id === app.jobId);
                  return (
                    <tr key={app.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{app.studentName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.studentEmail}</div>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.85rem', color: '#f8fafc' }}>{app.department}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.studentRoll}</div>
                      </td>

                      <td>
                        <strong style={{ color: app.cgpa >= 8.5 ? '#34d399' : app.cgpa >= 7.5 ? '#fbbf24' : '#f8fafc' }}>
                          {app.cgpa} / 10.0
                        </strong>
                      </td>

                      <td>
                        <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                          {app.atsScore || 90}% Match
                        </span>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{targetJob?.title || 'Drive'}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Applied: {app.appliedDate}</div>
                      </td>

                      <td>
                        <button
                          onClick={() => setPreviewApp(app)}
                          className="btn btn-secondary btn-sm"
                          style={{ gap: '4px' }}
                        >
                          <FileText size={13} /> View Resume
                        </button>
                      </td>

                      <td>
                        <span className={`badge badge-${app.status === 'Selected' ? 'success' : app.status === 'Interview Scheduled' ? 'warning' : app.status === 'Shortlisted' ? 'info' : app.status === 'Rejected' ? 'danger' : 'primary'}`}>
                          {app.status}
                        </span>
                      </td>

                      <td>
                        <select
                          className="form-select"
                          style={{ width: 'auto', padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Shortlisted">Shortlist Candidate</option>
                          <option value="Interview Scheduled">Schedule Interview</option>
                          <option value="Selected">Select & Extend Offer</option>
                          <option value="Rejected">Reject Application</option>
                        </select>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Resume & Profile Modal */}
      {previewApp && (
        <Modal
          isOpen={!!previewApp}
          onClose={() => setPreviewApp(null)}
          title={`Candidate Dossier - ${previewApp.studentName}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{previewApp.studentName}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                  {previewApp.department} ({previewApp.studentRoll})
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>CGPA: {previewApp.cgpa}</div>
                <span className="badge badge-primary">ATS Score: {previewApp.atsScore}%</span>
              </div>
            </div>

            {previewApp.coverNote && (
              <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                  Candidate Cover Note:
                </span>
                <p style={{ fontSize: '0.88rem', color: '#fff', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                  "{previewApp.coverNote}"
                </p>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={28} color="#818cf8" />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{previewApp.resumeName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Applicant Resume</div>
                </div>
              </div>

              <a
                href={previewApp.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                <Download size={14} /> Open Full PDF
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Update Pipeline Status:
              </span>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    updateApplicationStatus(previewApp.id, 'Shortlisted');
                    setPreviewApp(null);
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => {
                    updateApplicationStatus(previewApp.id, 'Selected');
                    setPreviewApp(null);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Select Candidate
                </button>
              </div>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
