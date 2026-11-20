import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');
const SEED_PATH = path.join(DATA_DIR, 'seedProfiles.json');

// Initial incoming likes (profiles who have liked current_user before they even start swiping)
const DEFAULT_INCOMING_LIKES = [
  'profile_2',  // Maya Lin
  'profile_4',  // Sofia Rodriguez
  'profile_7',  // Chloe Dubois
  'profile_10', // Aarav Patel
  'profile_14', // Zainab Al-Mansoor
  'profile_19', // Marcus Vance
  'profile_23', // Elena Rossi
  'profile_28'  // Gabriel Santos
];

const DEFAULT_CURRENT_USER = {
  id: 'current_user',
  name: 'Alex Rivera',
  age: 24,
  photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
  bio: 'Software engineer & indie designer. Passionate about music discovery, espresso, and good typography.',
  location: 'San Francisco, CA'
};

class Database {
  constructor() {
    this.store = null;
    this.init();
  }

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(STORE_PATH)) {
      try {
        const raw = fs.readFileSync(STORE_PATH, 'utf-8');
        this.store = JSON.parse(raw);
        console.log('Loaded persistent store from disk with', Object.keys(this.store.swipes || {}).length, 'swipes and', (this.store.matches || []).length, 'matches.');
        return;
      } catch (err) {
        console.warn('Error reading store.json, re-initializing from seed:', err.message);
      }
    }

    this.resetToSeed();
  }

  resetToSeed() {
    const seedData = JSON.parse(fs.readFileSync(SEED_PATH, 'utf-8'));
    this.store = {
      currentUser: DEFAULT_CURRENT_USER,
      profiles: seedData,
      incomingLikes: [...DEFAULT_INCOMING_LIKES],
      swipes: {}, // profileId -> { action: 'like' | 'pass', timestamp: ISOString }
      matches: [] // [{ profileId, matchedAt, profile }]
    };
    this.save();
    console.log('Initialized store with', seedData.length, 'profiles and', DEFAULT_INCOMING_LIKES.length, 'incoming likes.');
  }

  save() {
    try {
      const tempPath = `${STORE_PATH}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.store, null, 2), 'utf-8');
      fs.renameSync(tempPath, STORE_PATH);
    } catch (err) {
      console.error('Failed to save store to disk:', err);
    }
  }

  getCurrentUser() {
    return this.store.currentUser;
  }

  /**
   * GET /feed
   * Return profiles that the current user has not swiped on.
   * STRICT PRIVACY RULE: Strip any internal fields or incoming like info!
   */
  getFeed() {
    const swipedIds = new Set(Object.keys(this.store.swipes || {}));
    
    // Filter out already swiped profiles
    const unswiped = this.store.profiles.filter(p => !swipedIds.has(p.id));

    // Return sanitized public profiles without revealing incoming likes
    return unswiped.map(p => ({
      id: p.id,
      name: p.name,
      age: p.age,
      photo: p.photo,
      bio: p.bio,
      location: p.location,
      interests: p.interests,
      verified: Boolean(p.verified)
    }));
  }

  /**
   * POST /swipe
   * Accept profileId and action ('like' | 'pass').
   * Save swipe permanently.
   * Return whether mutual match was created.
   */
  recordSwipe(profileId, action) {
    if (!profileId || typeof profileId !== 'string') {
      throw new Error('Valid profileId is required');
    }

    if (action !== 'like' && action !== 'pass') {
      throw new Error("Action must be either 'like' or 'pass'");
    }

    const profile = this.store.profiles.find(p => p.id === profileId);
    if (!profile) {
      const err = new Error(`Profile with id '${profileId}' not found`);
      err.status = 404;
      throw err;
    }

    // Check if already swiped to prevent duplicate swipe logic issues
    const alreadySwiped = this.store.swipes[profileId];
    if (alreadySwiped) {
      const isAlreadyMatched = this.store.matches.some(m => m.profileId === profileId);
      return {
        success: true,
        alreadySwiped: true,
        matched: isAlreadyMatched,
        matchProfile: isAlreadyMatched ? profile : null,
        message: 'Profile has already been swiped on'
      };
    }

    // Record the swipe
    this.store.swipes[profileId] = {
      action,
      timestamp: new Date().toISOString()
    };

    let matched = false;
    let matchProfile = null;

    // Check mutual match condition: current user liked AND profile has incoming like
    if (action === 'like' && this.store.incomingLikes.includes(profileId)) {
      matched = true;
      matchProfile = {
        id: profile.id,
        name: profile.name,
        age: profile.age,
        photo: profile.photo,
        bio: profile.bio,
        location: profile.location,
        interests: profile.interests,
        verified: profile.verified
      };

      // Add to matches if not already in matches list
      if (!this.store.matches.some(m => m.profileId === profileId)) {
        this.store.matches.unshift({
          profileId,
          matchedAt: new Date().toISOString(),
          profile: matchProfile
        });
      }
    }

    this.save();

    return {
      success: true,
      matched,
      matchProfile
    };
  }

  /**
   * GET /matches
   * Return only mutual matches.
   */
  getMatches() {
    return this.store.matches || [];
  }

  /**
   * Reset store back to initial seed state
   */
  reset() {
    this.resetToSeed();
    return { success: true, message: 'Store reset to initial state' };
  }
}

export const db = new Database();
