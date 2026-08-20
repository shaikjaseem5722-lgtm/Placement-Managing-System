import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Briefcase, Calendar, MapPin, CheckCircle2, Trash2 } from 'lucide-react';

export const ManageJobs = () => {
  const { currentUser, companies, jobs, postJobDrive } = useAuth();
  const currentCompany = companies.find(c => c.id === currentUser?.companyId) || companies[0];
  const companyJobs = jobs.filter(j => j.companyId === currentCompany.id);

  const [formOpen, setFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const [title, setTitle] = useState('');
  const [roleType, setRoleType] = useState('Full-Time');
  const [ctc, setCtc] = useState('18.0 LPA');
  const [numericCtc, setNumericCtc] = useState('18.0');
  const [location, setLocation] = useState('Bangalore / Hybrid');
  const [minCgpa, setMinCgpa] = useState('7.5');
  const [deadline, setDeadline] = useState('2026-08-30');
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('');

  const [selectedDepts, setSelectedDepts] = useState([
    "Computer Science & Engineering",
    "Information Technology"
  ]);

  const allDepts = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Comm.",
    "Electrical Eng.",
    "Mechanical Eng."
  ];

  const handleDeptToggle = (dept) => {
    if (selectedDepts.includes(dept)) {
      setSelectedDepts(selectedDepts.filter(d => d !== dept));
    } else {
      setSelectedDepts([...selectedDepts, dept]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = postJobDrive({
      title,
      roleType,
      ctc,
      numericCtc,
      location,
      minCgpa,
      deadline,
      description,
      requirements: requirementsText.split('\n').filter(r => r.trim().length > 0),
      eligibleDepartments: selectedDepts
    });

    if (res.success) {
      setSuccessMsg(`New placement drive "${title}" created successfully!`);
      setFormOpen(false);
      // reset
      setTitle('');
      setDescription('');
      setRequirementsText('');
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>Campus Hiring Drives</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Publish job openings, set academic cutoff criteria, and schedule placement drives
          </p>
        </div>

        <button onClick={() => setFormOpen(!formOpen)} className="btn btn-primary">
          <PlusCircle size={18} /> {formOpen ? 'Cancel' : 'Post New Job Drive'}
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-sm)', background: 'var(--success-bg)', color: '#34d399', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {/* Post New Job Form Drawer/Card */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="glass-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>Create New Placement Opening</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Targeting institutional batch 2022-2026</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Job Title / Designation</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Senior Software Engineer (Frontend / Backend)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role Type</label>
              <select className="form-select" value={roleType} onChange={(e) => setRoleType(e.target.value)}>
                <option value="Full-Time">Full-Time</option>
                <option value="Internship + PPO">Internship + PPO</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Offered Package (Display)</label>
              <input type="text" className="form-input" placeholder="e.g. 18.5 LPA" value={ctc} onChange={(e) => setCtc(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Numeric CTC (for filter)</label>
              <input type="number" step="0.5" className="form-input" placeholder="18.5" value={numericCtc} onChange={(e) => setNumericCtc(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Min CGPA Cutoff</label>
              <input type="number" step="0.1" className="form-input" placeholder="7.0" value={minCgpa} onChange={(e) => setMinCgpa(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Application Deadline</label>
              <input type="date" className="form-input" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Work Location</label>
            <input type="text" className="form-input" placeholder="e.g. Bangalore, Hyderabad / Hybrid" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          {/* Eligible Streams Checkbox Selector */}
          <div className="form-group">
            <label>Eligible Engineering Departments</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.35rem' }}>
              {allDepts.map((d) => {
                const checked = selectedDepts.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleDeptToggle(d)}
                    className={`btn btn-sm ${checked ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {checked ? '✓ ' : '+ '}{d}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>Detailed Job Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Outline responsibilities, tech stack, team structure..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Key Requirements (One per line)</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Proficiency in Data Structures&#10;Experience with Python and PyTorch&#10;Strong communication skills"
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem' }}>
            Publish Campus Drive
          </button>
        </form>
      )}

      {/* Table of Posted Jobs */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>Active Drive Postings ({companyJobs.length})</h3>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Role Type</th>
                <th>Package (CTC)</th>
                <th>Min CGPA</th>
                <th>Applicants</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {companyJobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{job.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.location}</div>
                  </td>
                  <td><span className="badge badge-primary">{job.roleType}</span></td>
                  <td><span style={{ color: '#34d399', fontWeight: 700 }}>{job.ctc}</span></td>
                  <td>{job.minCgpa} / 10.0</td>
                  <td><strong>{job.applicantsCount}</strong> candidates</td>
                  <td>{job.deadline}</td>
                  <td><span className="badge badge-success">{job.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
