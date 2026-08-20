import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Award, TrendingUp, DollarSign, Building2, Users } from 'lucide-react';

export const AnalyticsPage = () => {
  const { placementStats, companies } = useAuth();

  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="page-wrapper animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: 0 }}>Institutional Placement Analytics & Insights</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Multi-year recruitment data metrics, department performance, and compensation distributions
          </p>
        </div>

        <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
          Batch 2026 Live Audit
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <StatCard title="Overall Placement Rate" value={`${placementStats.overallPlacementRate}%`} subtitle="Batch 2026" icon={Award} color="success" />
        <StatCard title="Highest Package" value={placementStats.highestPackage} subtitle="Record CTC offered" icon={TrendingUp} color="primary" />
        <StatCard title="Average CTC Package" value={placementStats.averagePackage} subtitle="Across all engineering streams" icon={DollarSign} color="info" />
        <StatCard title="Total Extended Offers" value={placementStats.totalOffersExtended} subtitle={`${placementStats.totalPlacedStudents} students placed`} icon={Users} color="warning" />
      </div>

      {/* Charts Grid Row 1 */}
      <div className="grid-2">
        
        {/* Department Placement Rate Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Department-Wise Placement Rates (%)</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Comparison of placement percentage across engineering branches</p>
          </div>

          <div style={{ width: '100%', height: '300px', marginTop: '0.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementStats.departmentStats} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="department" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val}%`, 'Placement Rate']}
                />
                <Bar dataKey="placed" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Year Salary Package Trends Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Salary Package Trajectory (2022 - 2026)</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Highest CTC vs Average CTC trends (in LPA)</p>
          </div>

          <div style={{ width: '100%', height: '300px', marginTop: '0.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placementStats.yearlyTrends} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val} LPA`, 'Package']}
                />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
                <Line type="monotone" dataKey="highestCtc" name="Highest CTC" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="avgCtc" name="Average CTC" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Charts Grid Row 2 */}
      <div className="grid-2">

        {/* CTC Distribution Bar Chart */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Compensation Package Distribution</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Number of students placed across CTC salary slabs</p>
          </div>

          <div style={{ width: '100%', height: '280px', marginTop: '0.5rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementStats.ctcDistribution} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="range" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  formatter={(val) => [`${val} Students`, 'Count']}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                  {placementStats.ctcDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Corporate Hiring Leaderboard */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>Top Corporate Hiring Partners</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified hiring partners with active campus recruitment</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {companies.slice(0, 4).map((comp, i) => (
              <div key={comp.id} style={{
                background: 'rgba(15, 23, 42, 0.5)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', width: '20px' }}>#{i+1}</span>
                  <img src={comp.logo} alt={comp.name} style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{comp.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comp.industry}</div>
                  </div>
                </div>

                <span className="badge badge-success">Verified Partner</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
