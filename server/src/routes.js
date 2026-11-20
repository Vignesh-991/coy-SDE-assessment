import { Router } from 'express';
import { db } from './db.js';

const router = Router();

/**
 * GET /feed
 * Return profiles that the current user has not swiped on.
 * Never expose hidden incoming likes.
 */
router.get('/feed', (req, res) => {
  try {
    const feed = db.getFeed();
    res.json({
      success: true,
      count: feed.length,
      profiles: feed
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve feed',
      message: error.message
    });
  }
});

/**
 * POST /swipe
 * Accept profileId and action (like/pass).
 * Save the swipe permanently.
 * Return whether a mutual match was created.
 */
router.post('/swipe', (req, res) => {
  try {
    const { profileId, action } = req.body;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: profileId'
      });
    }

    if (!action || !['like', 'pass'].includes(action)) {
      return res.status(400).json({
        success: false,
        error: "Invalid action. Must be 'like' or 'pass'"
      });
    }

    const result = db.recordSwipe(profileId, action);
    res.json(result);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /matches
 * Return only mutual matches.
 */
router.get('/matches', (req, res) => {
  try {
    const matches = db.getMatches();
    res.json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve matches',
      message: error.message
    });
  }
});

/**
 * GET /me
 * Return current logged-in user details
 */
router.get('/me', (req, res) => {
  try {
    const user = db.getCurrentUser();
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /reset
 * Reset feed and matches for testing convenience
 */
router.post('/reset', (req, res) => {
  try {
    const result = db.reset();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
