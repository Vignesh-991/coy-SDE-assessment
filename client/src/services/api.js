const API_BASE = '';

/**
 * Fetch profiles available for the current user to swipe on
 */
export async function getFeed() {
  const res = await fetch(`${API_BASE}/feed`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch feed: ${res.status}`);
  }
  return res.json();
}

/**
 * Record a swipe action (like | pass) on a profile
 */
export async function swipe(profileId, action) {
  const res = await fetch(`${API_BASE}/swipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ profileId, action })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to record swipe: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch all mutual matches for the current user
 */
export async function getMatches() {
  const res = await fetch(`${API_BASE}/matches`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch matches: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch logged-in user profile
 */
export async function getMe() {
  const res = await fetch(`${API_BASE}/me`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch user profile: ${res.status}`);
  }
  return res.json();
}

/**
 * Reset feed and swipes for demo testing
 */
export async function resetFeed() {
  const res = await fetch(`${API_BASE}/reset`, {
    method: 'POST'
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to reset feed: ${res.status}`);
  }
  return res.json();
}
