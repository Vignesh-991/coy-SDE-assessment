import React from 'react';
import { Heart, MapPin, BadgeCheck, Compass, Calendar } from 'lucide-react';

export default function MatchesPage({ matches = [], isLoading = false, onGoToDiscover }) {
  if (isLoading) {
    return (
      <div className="matches-container">
        <div className="matches-header">
          <h1>Your Matches</h1>
          <p>Connecting with people who like you back</p>
        </div>
        <div className="matches-grid">
          {[1, 2, 3, 4].map(n => (
            <div key={n} style={{ height: 260, background: '#EAE6E1', borderRadius: 20 }} className="skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="matches-container" style={{ alignItems: 'center', textAlign: 'center', paddingTop: 40 }}>
        <div className="empty-radar-wrap" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
          <Heart size={44} />
        </div>
        <h2 className="empty-title">No Matches Yet</h2>
        <p className="empty-desc">
          When you and someone else both swipe right on each other, they'll appear here. Keep exploring to find your match!
        </p>
        <button
          type="button"
          className="btn-primary"
          style={{ maxWidth: 220 }}
          onClick={onGoToDiscover}
        >
          <Compass size={18} />
          <span>Go to Discover</span>
        </button>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h1>Your Matches ({matches.length})</h1>
        <p>You and these lovely people liked each other</p>
      </div>

      <div className="matches-grid">
        {matches.map(m => {
          const profile = m.profile;
          const matchDate = m.matchedAt
            ? new Date(m.matchedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
            : 'Recent';

          return (
            <div key={m.profileId} className="match-item-card">
              <div className="match-item-photo-wrap">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="match-item-photo"
                  loading="lazy"
                />
                {profile.verified && (
                  <div className="match-item-verified">
                    <BadgeCheck size={16} color="#0284C7" />
                  </div>
                )}
              </div>

              <div className="match-item-details">
                <div className="match-item-name">
                  <span>{profile.name}, {profile.age}</span>
                </div>

                <div className="match-item-location">
                  <MapPin size={12} />
                  <span>{profile.location}</span>
                </div>

                <div className="match-item-time">
                  Matched {matchDate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
