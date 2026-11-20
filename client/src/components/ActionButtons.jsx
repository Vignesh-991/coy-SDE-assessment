import React from 'react';
import { X, Star, Heart } from 'lucide-react';

export default function ActionButtons({ onPass, onLike, onSuperLike, disabled = false }) {
  return (
    <div className="action-buttons-bar">
      {/* Pass Action Button */}
      <button
        type="button"
        className="action-btn pass"
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass Profile"
        title="Pass (Swipe Left)"
      >
        <X size={28} strokeWidth={2.8} />
      </button>

      {/* Super Like Action Button (Visual only as requested) */}
      <button
        type="button"
        className="action-btn super-like"
        onClick={onSuperLike}
        disabled={disabled}
        aria-label="Super Like"
        title="Super Like"
      >
        <Star size={24} strokeWidth={2.5} fill="currentColor" />
      </button>

      {/* Like Action Button */}
      <button
        type="button"
        className="action-btn like"
        onClick={onLike}
        disabled={disabled}
        aria-label="Like Profile"
        title="Like (Swipe Right)"
      >
        <Heart size={30} strokeWidth={2.6} fill="currentColor" />
      </button>
    </div>
  );
}
