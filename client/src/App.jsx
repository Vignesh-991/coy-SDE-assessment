import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MatchModal from './components/MatchModal';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import * as api from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);
  const [activeMatchModal, setActiveMatchModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Show auto-dismissing toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Initial Data Fetch
  const loadInitialData = async () => {
    try {
      setIsLoadingFeed(true);
      setIsLoadingMatches(true);

      const [feedData, matchesData, userData] = await Promise.all([
        api.getFeed().catch(() => ({ profiles: [] })),
        api.getMatches().catch(() => ({ matches: [] })),
        api.getMe().catch(() => ({ user: null }))
      ]);

      setProfiles(feedData.profiles || []);
      setMatches(matchesData.matches || []);
      setCurrentUser(userData.user || null);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      showToast('Could not connect to Coy server. Please check backend.', 'error');
    } finally {
      setIsLoadingFeed(false);
      setIsLoadingMatches(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Remove profile from local list when swiped
  const handleSwipeSuccess = (swipedId) => {
    setProfiles((prev) => prev.filter((p) => p.id !== swipedId));
  };

  // When a mutual match occurs
  const handleMatchCreated = (matchedProfile) => {
    setActiveMatchModal(matchedProfile);
    // Refresh matches in background
    api.getMatches().then((res) => {
      setMatches(res.matches || []);
    }).catch(console.error);
  };

  // Reset feed
  const handleResetFeed = async () => {
    await api.resetFeed();
    await loadInitialData();
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matchCount={matches.length}
      />

      {/* Main Tab Content */}
      <main className="app-main">
        {activeTab === 'home' && (
          <HomePage
            onGoToDiscover={() => setActiveTab('discover')}
            stats={{
              total: 30,
              remaining: profiles.length,
              matches: matches.length
            }}
          />
        )}

        {activeTab === 'discover' && (
          <DiscoverPage
            profiles={profiles}
            isLoading={isLoadingFeed}
            onSwipeSuccess={handleSwipeSuccess}
            onMatchCreated={handleMatchCreated}
            onResetFeed={handleResetFeed}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'matches' && (
          <MatchesPage
            matches={matches}
            isLoading={isLoadingMatches}
            onGoToDiscover={() => setActiveTab('discover')}
          />
        )}
      </main>

      {/* Mutual Match Celebration Modal */}
      {activeMatchModal && (
        <MatchModal
          matchProfile={activeMatchModal}
          currentUser={currentUser}
          onClose={() => setActiveMatchModal(null)}
          onViewMatches={() => {
            setActiveMatchModal(null);
            setActiveTab('matches');
          }}
        />
      )}
    </div>
  );
}
