import React from 'react';
import { Compass, House, Users, Sparkles, Heart } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange, matchCount = 0 }) {
  return (
    <>
      {/* Desktop Sticky Header */}
      <header className="desktop-nav">
        <div className="brand-logo" onClick={() => onTabChange('discover')}>
          <div className="brand-icon-wrap">
            <Heart size={20} fill="currentColor" />
          </div>
          <div className="brand-title">
            <span>Coy</span>
            <span className="brand-badge">Discover</span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => onTabChange('home')}
          >
            <House size={18} />
            <span>Home</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => onTabChange('discover')}
          >
            <Compass size={18} />
            <span>Discover</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => onTabChange('matches')}
          >
            <Users size={18} />
            <span>Matches</span>
            {matchCount > 0 && <span className="nav-badge-pill">{matchCount}</span>}
          </button>
        </nav>
      </header>

      {/* Mobile Top Header */}
      <div className="mobile-header">
        <div className="brand-logo" onClick={() => onTabChange('discover')}>
          <div className="brand-icon-wrap" style={{ width: 32, height: 32 }}>
            <Heart size={18} fill="currentColor" />
          </div>
          <div className="brand-title" style={{ fontSize: '1.2rem' }}>
            <span>Coy</span>
            <span className="brand-badge">Discover</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
          <Sparkles size={18} />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav">
        <button
          className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange('home')}
        >
          <div className="mobile-icon-wrap">
            <House size={22} />
          </div>
          <span>Home</span>
        </button>

        <button
          className={`mobile-nav-btn ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => onTabChange('discover')}
        >
          <div className="mobile-icon-wrap">
            <Compass size={22} />
          </div>
          <span>Discover</span>
        </button>

        <button
          className={`mobile-nav-btn ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => onTabChange('matches')}
        >
          <div className="mobile-icon-wrap" style={{ position: 'relative' }}>
            <Users size={22} />
            {matchCount > 0 && <span className="mobile-nav-badge">{matchCount}</span>}
          </div>
          <span>Matches</span>
        </button>
      </nav>
    </>
  );
}
