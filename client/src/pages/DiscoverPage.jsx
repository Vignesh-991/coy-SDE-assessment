import React, { useState, useEffect, useCallback } from 'react';
import ProfileCard from '../components/ProfileCard';
import ActionButtons from '../components/ActionButtons';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import * as api from '../services/api';

export default function DiscoverPage({
  profiles,
  isLoading,
  onSwipeSuccess,
  onMatchCreated,
  onResetFeed,
  onShowToast
}) {
  const [isSwiping, setIsSwiping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const currentProfile = profiles && profiles.length > 0 ? profiles[0] : null;
  const nextProfile = profiles && profiles.length > 1 ? profiles[1] : null;

  // Handle swipe logic
  const handleSwipe = useCallback(async (action) => {
    if (!currentProfile || isSwiping) return;

    const profileToSwipe = currentProfile;
    setIsSwiping(true);

    // Optimistically advance card immediately
    onSwipeSuccess(profileToSwipe.id);

    try {
      const response = await api.swipe(profileToSwipe.id, action);
      if (response.matched && response.matchProfile) {
        onMatchCreated(response.matchProfile);
      }
    } catch (err) {
      console.error('Error during swipe:', err);
      onShowToast(err.message || 'Failed to submit swipe', 'error');
    } finally {
      setIsSwiping(false);
    }
  }, [currentProfile, isSwiping, onSwipeSuccess, onMatchCreated, onShowToast]);

  // Handle Super Like (visual only + triggers like)
  const handleSuperLike = () => {
    if (!currentProfile) return;
    onShowToast(`⭐ Super Liked ${currentProfile.name}!`, 'star');
    handleSwipe('like');
  };

  // Keyboard controls for desktop power users
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleSwipe('pass');
      } else if (e.key === 'ArrowRight') {
        handleSwipe('like');
      } else if (e.key === 'ArrowUp') {
        handleSuperLike();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwipe]);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await onResetFeed();
      onShowToast('Feed reset with fresh profiles!', 'success');
    } catch (err) {
      onShowToast('Failed to reset feed', 'error');
    } finally {
      setIsResetting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="discover-container">
        <LoadingSkeleton />
        <div style={{ marginTop: 24 }}>
          <ActionButtons disabled={true} />
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return <EmptyState onReset={handleReset} isResetting={isResetting} />;
  }

  return (
    <div className="discover-container">
      {/* Interactive Card */}
      <ProfileCard
        key={currentProfile.id}
        profile={currentProfile}
        nextProfile={nextProfile}
        onSwipe={handleSwipe}
        active={!isSwiping}
      />

      {/* Action Buttons below card */}
      <ActionButtons
        onPass={() => handleSwipe('pass')}
        onLike={() => handleSwipe('like')}
        onSuperLike={handleSuperLike}
        disabled={isSwiping}
      />
    </div>
  );
}
