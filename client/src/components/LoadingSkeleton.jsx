import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-shimmer" />
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 20,
          right: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <div style={{ height: 28, width: '60%', background: 'rgba(255,255,255,0.4)', borderRadius: 8 }} />
        <div style={{ height: 16, width: '40%', background: 'rgba(255,255,255,0.3)', borderRadius: 6 }} />
        <div style={{ height: 38, width: '90%', background: 'rgba(255,255,255,0.2)', borderRadius: 6 }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <div style={{ height: 24, width: 70, background: 'rgba(255,255,255,0.3)', borderRadius: 12 }} />
          <div style={{ height: 24, width: 90, background: 'rgba(255,255,255,0.3)', borderRadius: 12 }} />
          <div style={{ height: 24, width: 80, background: 'rgba(255,255,255,0.3)', borderRadius: 12 }} />
        </div>
      </div>
    </div>
  );
}
