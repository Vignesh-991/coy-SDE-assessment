import React from 'react';
import { Compass, RotateCcw } from 'lucide-react';

export default function EmptyState({ onReset, isResetting = false }) {
  return (
    <div className="empty-state-card">
      <div className="empty-radar-wrap">
        <Compass size={44} />
      </div>

      <h2 className="empty-title">You've Seen Everyone!</h2>
      <p className="empty-desc">
        There are no more new profiles in your area right now. Expand your preferences or reset the feed to swipe again.
      </p>

      <button
        type="button"
        className="btn-primary"
        style={{ maxWidth: 240 }}
        onClick={onReset}
        disabled={isResetting}
      >
        <RotateCcw size={18} className={isResetting ? 'spin' : ''} />
        <span>{isResetting ? 'Resetting...' : 'Reset Demo Feed'}</span>
      </button>
    </div>
  );
}
