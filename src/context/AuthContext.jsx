import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COMPANIES,
  INITIAL_JOBS,
  INITIAL_STUDENTS,
  INITIAL_APPLICATIONS,
  PLACEMENT_STATS
} from '../data/mockData';

const AuthContext = createContext(null);

// Generate mock JWT Token
const generateJwtToken = (user) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }));
  const signature = btoa("secret-institutional-key-signature");
  return `${header}.${payload}.${signature}`;
};

export const AuthProvider = ({ children }) => {
  // Saved user token & details
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nexplacement_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default logged in as Student for instant demo experience
    return {
      id: "user-stud-1",
      studentId: "stud-001",
      name: "Rohan Varma",
      email: "rohan.varma@inst.edu.in",
      role: "STUDENT",
      token: generateJwtToken({ id: "user-stud-1", email: "rohan.varma@inst.edu.in", role: "STUDENT", name: "Rohan Varma" })
    };
  });

  // State management with localStorage persistence
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem('nexplacement_companies');
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('nexplacement_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('nexplacement_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('nexplacement_apps');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('nexplacement_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nexplacement_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('nexplacement_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('nexplacement_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('nexplacement_apps', JSON.stringify(applications));
  }, [applications]);

  // Auth Operations
  const login = (email, password, role) => {
    let name = email.split('@')[0].replace('.', ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    let studentId = null;
    let companyId = null;

    if (role === 'STUDENT') {
      const match = students.find(s => s.email.toLowerCase() === email.toLowerCase());
      studentId = match ? match.id : "stud-001";
      if (match) name = match.name;
    } else if (role === 'RECRUITER') {
      const match = companies.find(c => c.recruiterEmail?.toLowerCase() === email.toLowerCase());
      companyId = match ? match.id : "comp-1";
      if (match) name = match.recruiterName;
    } else if (role === 'ADMIN') {
      name = "TPO Admin Officer";
    }

    const userObj = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      studentId,
      companyId,
      token: generateJwtToken({ id: `user-${Date.now()}`, email, role, name })
    };

    setCurrentUser(userObj);
    return { success: true, token: userObj.token };
  };

  const register = (userData) => {
    const { email, role, name, extraData } = userData;

    const userObj = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      token: generateJwtToken({ id: `user-${Date.now()}`, email, role, name })
    };

    if (role === 'STUDENT') {
      const newStud = {
        id: `stud-${Date.now()}`,
        userId: userObj.id,
        rollNumber: extraData?.rollNumber || `2022REG${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        email,
        phone: extraData?.phone || "+91 99999 00000",
        department: extraData?.department || "Computer Science & Engineering",
        batch: "2022-2026",
        cgpa: parseFloat(extraData?.cgpa || "8.0"),
        skills: extraData?.skills ? extraData.skills.split(',').map(s => s.trim()) : ["JavaScript", "Python"],
        placementStatus: "Unplaced",
        placedCompany: null,
        offeredCtc: null,
        resumeUrl: null,
        resumeName: null,
        atsScore: 75,
        bio: extraData?.bio || "Enthusiastic engineering student ready for new career opportunities."
      };
      setStudents(prev => [newStud, ...prev]);
      userObj.studentId = newStud.id;
    } else if (role === 'RECRUITER') {
      const newCompany = {
        id: `comp-${Date.now()}`,
        name: extraData?.companyName || name + " Enterprise",
        logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80",
        industry: extraData?.industry || "Technology Services",
        website: extraData?.website || "https://example.com",
        headquarters: extraData?.headquarters || "Bangalore, India",
        status: "Verified",
        recruiterEmail: email,
        recruiterName: name,
        description: extraData?.description || "High growth technology & solutions provider."
      };
      setCompanies(prev => [newCompany, ...prev]);
      userObj.companyId = newCompany.id;
    }

    setCurrentUser(userObj);
    return { success: true, token: userObj.token };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Quick switch role helper for easy testing
  const switchDemoRole = (role) => {
    if (role === 'STUDENT') {
      const stud = students[0];
      setCurrentUser({
        id: stud.userId,
        studentId: stud.id,
        name: stud.name,
        email: stud.email,
        role: 'STUDENT',
        token: generateJwtToken({ id: stud.userId, email: stud.email, role: 'STUDENT', name: stud.name })
      });
    } else if (role === 'RECRUITER') {
      const comp = companies[0];
      setCurrentUser({
        id: "user-recruiter-1",
        companyId: comp.id,
        name: comp.recruiterName,
        email: comp.recruiterEmail,
        role: 'RECRUITER',
        token: generateJwtToken({ id: "user-recruiter-1", email: comp.recruiterEmail, role: 'RECRUITER', name: comp.recruiterName })
      });
    } else if (role === 'ADMIN') {
      setCurrentUser({
        id: "user-admin-1",
        name: "Dr. K. S. Sharma (Head TPO)",
        email: "tpo.admin@institution.edu.in",
        role: 'ADMIN',
        token: generateJwtToken({ id: "user-admin-1", email: "tpo.admin@institution.edu.in", role: 'ADMIN', name: "Dr. K. S. Sharma" })
      });
    }
  };

  // Student Actions
  const updateStudentProfile = (studentId, updatedFields) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, ...updatedFields } : s));
  };

  const applyForJob = (jobId, coverNote = "") => {
    if (!currentUser || currentUser.role !== 'STUDENT') return { success: false, message: "Only students can apply." };

    const currentStud = students.find(s => s.id === currentUser.studentId) || students[0];
    const targetJob = jobs.find(j => j.id === jobId);

    if (!targetJob) return { success: false, message: "Job not found." };

    // Check duplicate
    const existing = applications.find(a => a.jobId === jobId && a.studentId === currentStud.id);
    if (existing) return { success: false, message: "You have already applied for this job drive." };

    // Check eligibility
    if (currentStud.cgpa < targetJob.minCgpa) {
      return { success: false, message: `Your CGPA (${currentStud.cgpa}) is below the minimum required (${targetJob.minCgpa}).` };
    }

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: targetJob.id,
      studentId: currentStud.id,
      studentName: currentStud.name,
      studentEmail: currentStud.email,
      studentRoll: currentStud.rollNumber,
      department: currentStud.department,
      cgpa: currentStud.cgpa,
      resumeUrl: currentStud.resumeUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      resumeName: currentStud.resumeName || `${currentStud.name.replace(' ', '_')}_Resume.pdf`,
      atsScore: currentStud.atsScore || 85,
      status: "Applied",
      appliedDate: new Date().toISOString().split('T')[0],
      coverNote
    };

    setApplications(prev => [newApp, ...prev]);

    // Update job applicant count
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));

    return { success: true, message: "Application submitted successfully!" };
  };

  // Recruiter Actions
  const postJobDrive = (jobData) => {
    const company = companies.find(c => c.id === currentUser.companyId) || companies[0];

    const newJob = {
      id: `job-${Date.now()}`,
      companyId: company.id,
      companyName: company.name,
      companyLogo: company.logo,
      title: jobData.title,
      roleType: jobData.roleType || "Full-Time",
      ctc: jobData.ctc,
      numericCtc: parseFloat(jobData.numericCtc || "12.0"),
      location: jobData.location,
      minCgpa: parseFloat(jobData.minCgpa || "6.0"),
      eligibleDepartments: jobData.eligibleDepartments || ["Computer Science & Engineering", "Information Technology"],
      deadline: jobData.deadline,
      description: jobData.description,
      requirements: Array.isArray(jobData.requirements) ? jobData.requirements : (jobData.requirements ? jobData.requirements.split('\n') : []),
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      status: "Active"
    };

    setJobs(prev => [newJob, ...prev]);
    return { success: true, job: newJob };
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        // If selected, update student placement status
        if (newStatus === 'Selected') {
          const targetJob = jobs.find(j => j.id === a.jobId);
          setStudents(sPrev => sPrev.map(st => st.id === a.studentId ? {
            ...st,
            placementStatus: 'Placed',
            placedCompany: targetJob?.companyName || 'Campus Recruiter',
            offeredCtc: targetJob?.ctc || '12.0 LPA'
          } : st));
        }
        return { ...a, status: newStatus };
      }
      return a;
    }));
  };

  // Admin Actions
  const toggleCompanyStatus = (companyId, newStatus) => {
    setCompanies(prev => prev.map(c => c.id === companyId ? { ...c, status: newStatus } : c));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      companies,
      jobs,
      students,
      applications,
      placementStats: PLACEMENT_STATS,
      login,
      register,
      logout,
      switchDemoRole,
      updateStudentProfile,
      applyForJob,
      postJobDrive,
      updateApplicationStatus,
      toggleCompanyStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
