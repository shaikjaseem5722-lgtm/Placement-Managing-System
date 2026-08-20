import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Pages
import { AuthPage } from './pages/AuthPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { JobsPage } from './pages/JobsPage';
import { StudentProfile } from './pages/StudentProfile';

import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { ManageJobs } from './pages/ManageJobs';
import { ViewApplicants } from './pages/ViewApplicants';

import { AdminDashboard } from './pages/AdminDashboard';
import { CompanyManagement } from './pages/CompanyManagement';
import { StudentDirectory } from './pages/StudentDirectory';
import { AnalyticsPage } from './pages/AnalyticsPage';

const AppContent = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role || 'GUEST';

  // State tab
  const [activeTab, setActiveTab] = useState(() => {
    if (role === 'ADMIN') return 'admin-dashboard';
    if (role === 'RECRUITER') return 'recruiter-dashboard';
    return 'student-dashboard';
  });

  // Auto update tab on role switch
  useEffect(() => {
    if (role === 'ADMIN') {
      if (!['admin-dashboard', 'companies', 'students', 'analytics'].includes(activeTab)) {
        setActiveTab('admin-dashboard');
      }
    } else if (role === 'RECRUITER') {
      if (!['recruiter-dashboard', 'manage-jobs', 'applicants'].includes(activeTab)) {
        setActiveTab('recruiter-dashboard');
      }
    } else if (role === 'STUDENT') {
      if (!['student-dashboard', 'jobs', 'profile'].includes(activeTab)) {
        setActiveTab('student-dashboard');
      }
    }
  }, [role]);

  if (!currentUser) {
    return <AuthPage />;
  }

  // Render Page Content based on activeTab & RBAC check
  const renderTabContent = () => {
    switch (activeTab) {
      // Student Tabs
      case 'student-dashboard':
        return <StudentDashboard setActiveTab={setActiveTab} />;
      case 'jobs':
        return <JobsPage />;
      case 'profile':
        return <StudentProfile />;

      // Recruiter Tabs
      case 'recruiter-dashboard':
        return <RecruiterDashboard setActiveTab={setActiveTab} />;
      case 'manage-jobs':
        return <ManageJobs />;
      case 'applicants':
        return <ViewApplicants />;

      // Admin Tabs
      case 'admin-dashboard':
        return <AdminDashboard setActiveTab={setActiveTab} />;
      case 'companies':
        return <CompanyManagement />;
      case 'students':
        return <StudentDirectory />;
      case 'analytics':
        return <AnalyticsPage />;

      default:
        return <StudentDashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Navbar />
        <main>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
