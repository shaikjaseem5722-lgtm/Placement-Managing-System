import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ResumeUploader } from '../components/ResumeUploader';
import { User, GraduationCap, Award, Phone, Mail, Globe, Linkedin, Github, Plus, X, Save, CheckCircle2 } from 'lucide-react';

export const StudentProfile = () => {
  const { currentUser, students, updateStudentProfile } = useAuth();
  const currentStudent = students.find(s => s.id === currentUser?.studentId) || students[0];

  const [formData, setFormData] = useState({
    name: currentStudent.name || '',
    phone: currentStudent.phone || '',
    department: currentStudent.department || 'Computer Science & Engineering',
    cgpa: currentStudent.cgpa || 8.5,
    bio: currentStudent.bio || '',
    linkedin: currentStudent.linkedin || '',
    github: currentStudent.github || ''
  });

  const [skills, setSkills] = useState(currentStudent.skills || ["React.js", "Node.js", "Python"]);
  const [newSkill, setNewSkill] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudentProfile(currentStudent.id, {
      ...formData,
      skills,
      cgpa: parseFloat(formData.cgpa)
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>Student Profile & Placement Portfolio</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Manage your academic credentials, technical skills, ATS resume, and recruiter contact info
          </p>
        </div>

        {saveSuccess && (
          <span className="badge badge-success" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <CheckCircle2 size={16} /> Profile Saved Successfully!
          </span>
        )}
      </div>

      <div className="grid-2">

        {/* Profile Info Form */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <User size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Personal & Academic Details</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Institutional Roll No.</label>
              <input
                type="text"
                className="form-input"
                value={currentStudent.rollNumber}
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-input"
                value={currentStudent.email}
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Department / Stream</label>
              <select
                className="form-select"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option>Computer Science & Engineering</option>
                <option>Information Technology</option>
                <option>Electronics & Comm.</option>
                <option>Electrical Eng.</option>
                <option>Mechanical Eng.</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Cumulative CGPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                className="form-input"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Professional Bio / Objective</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief description of your expertise and career goals..."
            />
          </div>

          {/* Social Profiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Linkedin size={14} color="#38bdf8" /> LinkedIn Profile
              </label>
              <input
                type="url"
                className="form-input"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Github size={14} color="#f8fafc" /> GitHub Portfolio
              </label>
              <input
                type="url"
                className="form-input"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          {/* Skills Tag Management */}
          <div style={{ paddingTop: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Technical Skills & Competencies
            </label>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
              {skills.map((skill) => (
                <span key={skill} className="badge badge-primary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', display: 'flex', padding: 0 }}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Add a new skill (e.g. React, Kubernetes)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button type="button" onClick={handleAddSkill} className="btn btn-secondary btn-sm" style={{ padding: '0 1rem' }}>
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem' }}>
            <Save size={18} /> Save Profile Changes
          </button>
        </form>

        {/* Right Column: Resume Uploader & Placement Status Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Resume Upload Component */}
          <ResumeUploader
            currentResume={{ name: currentStudent.resumeName, url: currentStudent.resumeUrl }}
            currentAtsScore={currentStudent.atsScore || 88}
            onUploadSuccess={(newRes) => {
              updateStudentProfile(currentStudent.id, {
                resumeName: newRes.name,
                resumeUrl: newRes.url,
                atsScore: newRes.score
              });
            }}
          />

          {/* Placement Audit Card */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Award size={22} color="#fbbf24" />
              <div>
                <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: 0 }}>Placement Status Audit</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified by Institutional TPO Office</p>
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span className="badge badge-success">{currentStudent.placementStatus}</span>
              </div>
              {currentStudent.placedCompany && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Placed At:</span>
                    <strong style={{ color: '#fff' }}>{currentStudent.placedCompany}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Offered Package:</span>
                    <strong style={{ color: '#34d399' }}>{currentStudent.offeredCtc}</strong>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
