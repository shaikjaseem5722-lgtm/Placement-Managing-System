import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, Search, ExternalLink, ShieldCheck, CheckCircle2, XCircle, Globe, MapPin } from 'lucide-react';

export const CompanyManagement = () => {
  const { companies, jobs, toggleCompanyStatus } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.headquarters.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>Corporate Partners & Companies</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Verify recruiter credentials, inspect company profiles, and manage hiring privileges
          </p>
        </div>

        <span className="badge badge-info" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
          Registered Companies: <strong>{companies.length}</strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 280px', position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search company name, industry, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '180px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Verification Statuses</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending Approval</option>
        </select>
      </div>

      {/* Grid of Companies */}
      <div className="grid-2">
        {filteredCompanies.map((comp) => {
          const compJobs = jobs.filter(j => j.companyId === comp.id);
          return (
            <div key={comp.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'space-between' }}>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={comp.logo} alt={comp.name} style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{comp.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600, marginTop: '2px' }}>{comp.industry}</div>
                    </div>
                  </div>

                  <span className={`badge badge-${comp.status === 'Verified' ? 'success' : 'warning'}`}>
                    {comp.status}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {comp.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(15, 23, 42, 0.4)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  <div><strong>Recruiter Contact:</strong> {comp.recruiterName} ({comp.recruiterEmail})</div>
                  <div><strong>Headquarters:</strong> {comp.headquarters}</div>
                  <div><strong>Active Drives:</strong> {compJobs.length} placement drives published</div>
                </div>
              </div>

              {/* Actions Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <a
                  href={comp.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ textDecoration: 'none', gap: '4px' }}
                >
                  <Globe size={13} /> Visit Website <ExternalLink size={11} />
                </a>

                <button
                  onClick={() => toggleCompanyStatus(comp.id, comp.status === 'Verified' ? 'Pending' : 'Verified')}
                  className={`btn btn-sm ${comp.status === 'Verified' ? 'btn-danger' : 'btn-primary'}`}
                >
                  {comp.status === 'Verified' ? 'Revoke Verification' : 'Approve Partner'}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
