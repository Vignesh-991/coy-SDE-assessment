import React from 'react';
import { Compass, Sparkles, Heart, ShieldCheck, Flame } from 'lucide-react';

export default function HomePage({ onGoToDiscover, stats = { total: 30, remaining: 30, matches: 0 } }) {
  return (
    <div className="home-container">
      <div className="home-hero-card">
        <div className="home-logo-circle">
          <Heart size={38} fill="currentColor" />
        </div>

        <h1 className="home-title">Welcome to Coy</h1>
        <p className="home-subtitle">
          A modern dating experience designed for genuine connections. Discover thoughtful profiles and connect through mutual chemistry.
        </p>

        {/* Quick Live Stats */}
        <div className="home-stats-row">
          <div className="home-stat-box">
            <span className="home-stat-number">{stats.remaining}</span>
            <span className="home-stat-label">In Feed</span>
          </div>
          <div className="home-stat-box">
            <span className="home-stat-number">{stats.matches}</span>
            <span className="home-stat-label">Matches</span>
          </div>
          <div className="home-stat-box">
            <span className="home-stat-number">{stats.total}</span>
            <span className="home-stat-label">Profiles</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary"
          style={{ maxWidth: 280 }}
          onClick={onGoToDiscover}
        >
          <Compass size={20} />
          <span>Start Discovering</span>
        </button>
      </div>

      {/* Feature Highlights */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
          padding: '0 4px'
        }}
      >
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>Mutual Privacy</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Likes are strictly confidential until mutual.
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Flame size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>Instant Chemistry</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Real-time match celebration screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
