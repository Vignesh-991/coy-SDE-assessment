import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export default function MatchModal({ matchProfile, currentUser, onClose, onViewMatches }) {
  useEffect(() => {
    // Fire confetti celebration
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FD3A73', '#6366F1', '#A855F7', '#FFD166']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FD3A73', '#6366F1', '#A855F7', '#06D6A0']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  if (!matchProfile) return null;

  const defaultUserPhoto = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="match-overlay" onClick={onClose}>
      <div className="match-card-modal" onClick={e => e.stopPropagation()}>
        <div className="match-sparkle-decor">
          <Sparkles size={36} />
        </div>

        <h1 className="match-title">IT'S A MATCH!</h1>
        <p className="match-subtitle">
          You and <strong style={{ color: 'white' }}>{matchProfile.name}</strong> have liked each other.
        </p>

        {/* Side-by-side Avatars */}
        <div className="match-avatars-row">
          <div className="match-avatar-circle user">
            <img
              src={currentUser?.photo || defaultUserPhoto}
              alt="You"
            />
          </div>

          <div className="match-heart-badge">
            <Heart size={22} fill="white" />
          </div>

          <div className="match-avatar-circle target">
            <img
              src={matchProfile.photo}
              alt={matchProfile.name}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="match-modal-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={onViewMatches}
          >
            <MessageCircle size={18} />
            <span>View in Matches</span>
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            <span>Continue Discovering</span>
          </button>
        </div>
      </div>
    </div>
  );
}
