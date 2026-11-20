import app from './src/server.js';

async function runTests() {
  console.log('\n--- STARTING AUTOMATED BACKEND TESTS ---');
  const baseUrl = 'http://localhost:5000';

  // Wait for server to bind
  await new Promise(r => setTimeout(r, 500));

  // 1. Test GET /feed
  console.log('\n1. Testing GET /feed...');
  const feedRes = await fetch(`${baseUrl}/feed`);
  const feedData = await feedRes.json();
  console.log(`Feed count: ${feedData.count} profiles`);
  if (!feedData.success || feedData.count !== 30) {
    throw new Error(`Expected 30 profiles, got ${feedData.count}`);
  }
  const sample = feedData.profiles[0];
  if (sample.hasLikedMe !== undefined || sample.incomingLike !== undefined) {
    throw new Error('SECURITY VIOLATION: Incoming likes leaked in /feed response!');
  }
  console.log(`Verified feed privacy: Clean profile returned for ${sample.name}`);

  // 2. Test POST /swipe with 'pass'
  console.log('\n2. Testing POST /swipe (pass on profile_1)...');
  const swipePassRes = await fetch(`${baseUrl}/swipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: 'profile_1', action: 'pass' })
  });
  const swipePassData = await swipePassRes.json();
  console.log(`Pass result: matched=${swipePassData.matched}`);
  if (swipePassData.matched !== false) {
    throw new Error('Pass should not produce a match');
  }

  // 3. Test POST /swipe with 'like' on profile_2 (Maya Lin, who has an incoming like)
  console.log('\n3. Testing POST /swipe (like on profile_2 - mutual match expected)...');
  const swipeLikeRes = await fetch(`${baseUrl}/swipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: 'profile_2', action: 'like' })
  });
  const swipeLikeData = await swipeLikeRes.json();
  console.log(`Like result: matched=${swipeLikeData.matched}, name=${swipeLikeData.matchProfile?.name}`);
  if (!swipeLikeData.matched || swipeLikeData.matchProfile?.name !== 'Maya Lin') {
    throw new Error('Expected mutual match with Maya Lin');
  }

  // 4. Test GET /matches
  console.log('\n4. Testing GET /matches...');
  const matchesRes = await fetch(`${baseUrl}/matches`);
  const matchesData = await matchesRes.json();
  console.log(`Matches count: ${matchesData.count}`);
  if (matchesData.count !== 1 || matchesData.matches[0].profile.name !== 'Maya Lin') {
    throw new Error('Expected 1 match with Maya Lin');
  }

  // 5. Test remaining feed count
  console.log('\n5. Testing remaining feed count...');
  const feedAfterRes = await fetch(`${baseUrl}/feed`);
  const feedAfterData = await feedAfterRes.json();
  console.log(`Remaining profiles: ${feedAfterData.count} (expected 28)`);
  if (feedAfterData.count !== 28) {
    throw new Error(`Expected 28 profiles remaining, got ${feedAfterData.count}`);
  }

  // 6. Test duplicate swipe prevention
  console.log('\n6. Testing duplicate swipe on profile_1...');
  const dupSwipeRes = await fetch(`${baseUrl}/swipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: 'profile_1', action: 'like' })
  });
  const dupSwipeData = await dupSwipeRes.json();
  console.log(`Duplicate swipe handled gracefully: ${dupSwipeData.alreadySwiped}`);

  // 7. Test invalid input validation
  console.log('\n7. Testing invalid swipe inputs...');
  const badActionRes = await fetch(`${baseUrl}/swipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: 'profile_5', action: 'invalid_action' })
  });
  if (badActionRes.status !== 400) {
    throw new Error('Expected 400 for invalid action');
  }

  const badIdRes = await fetch(`${baseUrl}/swipe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId: 'non_existent_id', action: 'like' })
  });
  if (badIdRes.status !== 404) {
    throw new Error('Expected 404 for invalid profileId');
  }
  console.log('API validations verified successfully.');

  // 8. Test POST /reset
  console.log('\n8. Testing POST /reset...');
  const resetRes = await fetch(`${baseUrl}/reset`, { method: 'POST' });
  const resetData = await resetRes.json();
  const feedResetRes = await fetch(`${baseUrl}/feed`);
  const feedResetData = await feedResetRes.json();
  console.log(`Feed count after reset: ${feedResetData.count} (expected 30)`);
  if (feedResetData.count !== 30) {
    throw new Error('Reset failed to restore all 30 profiles');
  }

  console.log('\n>>> ALL BACKEND API TESTS PASSED SUCCESSFULLY! <<<\n');
  process.exit(0);
}

runTests().catch(err => {
  console.error('\nTEST FAILED:', err);
  process.exit(1);
});
