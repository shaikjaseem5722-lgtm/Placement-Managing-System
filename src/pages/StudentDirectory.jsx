import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';
import { Users, Search, Filter, Download, GraduationCap, CheckCircle2, FileText, ExternalLink, Linkedin, Github } from 'lucide-react';

export const StudentDirectory = () => {
  const { students, applications } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'ALL' || s.department === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || s.placementStatus === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>Institutional Student Master Directory</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Comprehensive directory of batch candidates, academic records, and offer audits
          </p>
        </div>

        <span className="badge badge-info" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
          Total Students: <strong>{students.length}</strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by student name, roll number, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '200px' }}
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="ALL">All Departments</option>
          <option value="Computer Science & Engineering">Computer Science & Eng.</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics & Comm.">Electronics & Comm.</option>
        </select>

        <select
          className="form-select"
          style={{ width: 'auto', minWidth: '180px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Placement Statuses</option>
          <option value="Placed">Placed</option>
          <option value="In Process">In Process</option>
          <option value="Unplaced">Unplaced</option>
        </select>
      </div>

      {/* Student Master Table */}
      <div className="glass-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Placement Status</th>
                <th>Company / CTC Offer</th>
                <th>ATS Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((stud) => (
                <tr key={stud.id}>
                  <td><strong style={{ color: '#818cf8' }}>{stud.rollNumber}</strong></td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{stud.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stud.email}</div>
                  </td>
                  <td>{stud.department}</td>
                  <td>
                    <strong style={{ color: stud.cgpa >= 8.5 ? '#34d399' : '#fbbf24' }}>
                      {stud.cgpa} / 10.0
                    </strong>
                  </td>
                  <td>
                    <span className={`badge badge-${stud.placementStatus === 'Placed' ? 'success' : stud.placementStatus === 'In Process' ? 'warning' : 'danger'}`}>
                      {stud.placementStatus}
                    </span>
                  </td>
                  <td>
                    {stud.placedCompany ? (
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{stud.placedCompany}</div>
                        <div style={{ fontSize: '0.75rem', color: '#34d399' }}>{stud.offeredCtc}</div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>N/A</span>
                    )}
                  </td>
                  <td>
                    <span className="badge badge-primary">{stud.atsScore || 85}% ATS Score</span>
                  </td>
                  <td>
                    <button onClick={() => setSelectedStudent(stud)} className="btn btn-secondary btn-sm">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Portfolio - ${selectedStudent.name}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{selectedStudent.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#818cf8', margin: 0 }}>Roll: {selectedStudent.rollNumber} | {selectedStudent.department}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>CGPA: {selectedStudent.cgpa}</div>
                <span className="badge badge-success">{selectedStudent.placementStatus}</span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Bio / Summary:</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>{selectedStudent.bio}</p>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Technical Skills:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedStudent.skills?.map(sk => (
                  <span key={sk} className="badge badge-primary">{sk}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={24} color="#818cf8" />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>{selectedStudent.resumeName || 'Resume PDF'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified Institutional Resume</div>
                </div>
              </div>

              {selectedStudent.resumeUrl && (
                <a href={selectedStudent.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
                  <Download size={13} /> View Resume
                </a>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button onClick={() => setSelectedStudent(null)} className="btn btn-secondary">Close</button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
