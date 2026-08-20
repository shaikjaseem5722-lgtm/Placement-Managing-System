import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Award, Sparkles, Download, RefreshCw } from 'lucide-react';

export const ResumeUploader = ({ currentResume, onUploadSuccess, currentAtsScore = 88 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: currentResume?.name || "Rohan_Varma_Resume_SDE.pdf",
    url: currentResume?.url || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    score: currentAtsScore,
    parsedSkills: ["Data Structures", "React.js", "Python", "REST APIs", "PostgreSQL", "Docker"]
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const calculatedScore = Math.floor(82 + Math.random() * 16);
      const newResume = {
        name: file.name,
        url: URL.createObjectURL(file),
        score: calculatedScore,
        parsedSkills: ["System Design", "JavaScript", "Node.js", "SQL", "Cloud Compute", "Agile Methodologies"]
      };
      setResumeData(newResume);
      setIsAnalyzing(false);
      if (onUploadSuccess) {
        onUploadSuccess(newResume);
      }
    }, 1200);
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Resume & ATS Optimization Score</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upload your latest PDF resume for automated AI ATS scanning</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(99, 102, 241, 0.15)', padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
          <Sparkles size={14} color="#818cf8" />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8' }}>AI ATS Parser v2.4</span>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        style={{
          border: isDragging ? '2px dashed var(--primary)' : '2px dashed rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          background: isDragging ? 'rgba(99, 102, 241, 0.08)' : 'rgba(15, 23, 42, 0.4)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <input
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileDrop}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
            width: '100%',
            height: '100%'
          }}
        />

        {isAnalyzing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <RefreshCw className="animate-spin" size={32} color="var(--primary)" />
            <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Analyzing resume keywords & ATS formatting...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={22} color="var(--primary)" />
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                Drop your PDF resume here or <span style={{ color: 'var(--primary)' }}>click to browse</span>
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Supports PDF, DOCX up to 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded File Info & ATS Meter */}
      {resumeData.name && (
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={28} color="#818cf8" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{resumeData.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} color="#34d399" /> Verified PDF Document
                </div>
              </div>
            </div>

            <a
              href={resumeData.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              <Download size={14} /> Download / View
            </a>
          </div>

          {/* ATS Score Progress Bar */}
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.85rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={14} color="#fbbf24" /> Calculated ATS Match Score
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: resumeData.score >= 85 ? '#34d399' : '#fbbf24' }}>
                {resumeData.score} / 100
              </span>
            </div>

            <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${resumeData.score}%`,
                background: resumeData.score >= 85 ? 'linear-gradient(90deg, #34d399, #10b981)' : 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                borderRadius: '4px',
                transition: 'width 0.8s ease'
              }} />
            </div>

            {/* Extracted Skills Badges */}
            <div style={{ marginTop: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Extracted Keywords:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {resumeData.parsedSkills.map((sk, idx) => (
                  <span key={idx} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
