import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { MapPin, BadgeCheck } from 'lucide-react';

export default function ProfileCard({ profile, nextProfile, onSwipe, active = true }) {
  const [imageError, setImageError] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-16, 0, 16]);
  
  // Opacity of feedback stamps
  const likeOpacity = useTransform(x, [20, 90], [0, 1]);
  const nopeOpacity = useTransform(x, [-90, -20], [1, 0]);

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 110;
    const velocityThreshold = 400;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setExitDirection('right');
      onSwipe('like');
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setExitDirection('left');
      onSwipe('pass');
    } else {
      // Spring back to center
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 25 });
    }
  };

  const fallbackPhoto = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80`;

  return (
    <div className="card-stack-viewport">
      {/* Background Peeking Card (Smooth stacking effect) */}
      {nextProfile && (
        <div className="profile-card-back">
          <div className="card-photo-wrapper">
            <img
              src={nextProfile.photo}
              alt={nextProfile.name}
              className="card-photo"
              loading="lazy"
            />
            <div className="card-scrim" />
            <div className="card-content">
              <div className="card-header-row">
                <div className="card-name-age">
                  <span>{nextProfile.name}, {nextProfile.age}</span>
                  {nextProfile.verified && (
                    <BadgeCheck size={22} className="verified-badge" />
                  )}
                </div>
              </div>
              <div className="card-location-row">
                <MapPin size={15} />
                <span>{nextProfile.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Foreground Profile Card */}
      <motion.div
        className="profile-card"
        style={{
          x,
          rotate,
          zIndex: 10
        }}
        drag={active ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
        animate={
          exitDirection === 'right'
            ? { x: 500, opacity: 0, rotate: 25, transition: { duration: 0.3 } }
            : exitDirection === 'left'
            ? { x: -500, opacity: 0, rotate: -25, transition: { duration: 0.3 } }
            : { x: 0, opacity: 1, scale: 1 }
        }
        initial={{ scale: 0.95, opacity: 0 }}
        whileHover={active ? { scale: 1.005 } : {}}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        {/* Dynamic LIKE Stamp Overlay */}
        <motion.div
          className="swipe-stamp like"
          style={{ opacity: likeOpacity }}
        >
          LIKE
        </motion.div>

        {/* Dynamic NOPE Stamp Overlay */}
        <motion.div
          className="swipe-stamp nope"
          style={{ opacity: nopeOpacity }}
        >
          PASS
        </motion.div>

        {/* Card Photo & Scrim */}
        <div className="card-photo-wrapper">
          <img
            src={imageError ? fallbackPhoto : profile.photo}
            alt={profile.name}
            className="card-photo"
            onError={() => setImageError(true)}
          />
          <div className="card-scrim" />

          {/* Card Info Overlay */}
          <div className="card-content">
            <div className="card-header-row">
              <div className="card-name-age">
                <span>{profile.name}, {profile.age}</span>
                {profile.verified && (
                  <BadgeCheck size={24} className="verified-badge" />
                )}
              </div>
            </div>

            <div className="card-location-row">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>

            <p className="card-bio">{profile.bio}</p>

            {profile.interests && profile.interests.length > 0 && (
              <div className="card-interests">
                {profile.interests.map((interest, idx) => (
                  <span key={idx} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
