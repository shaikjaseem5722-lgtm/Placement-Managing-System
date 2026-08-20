import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'primary' }) => {
  const colorStyles = {
    primary: { iconBg: 'rgba(99, 102, 241, 0.15)', iconColor: '#818cf8' },
    success: { iconBg: 'rgba(16, 185, 129, 0.15)', iconColor: '#34d399' },
    warning: { iconBg: 'rgba(245, 158, 11, 0.15)', iconColor: '#fbbf24' },
    danger:  { iconBg: 'rgba(239, 68, 68, 0.15)',  iconColor: '#f87171' },
    info:    { iconBg: 'rgba(6, 182, 212, 0.15)',   iconColor: '#38bdf8' }
  }[color] || { iconBg: 'rgba(99, 102, 241, 0.15)', iconColor: '#818cf8' };

  return (
    <div className="glass-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{title}</span>
        {Icon && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: colorStyles.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={20} color={colorStyles.iconColor} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-heading)' }}>
          {value}
        </span>
        {trend && (
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subtitle}</span>
      )}
    </div>
  );
};
