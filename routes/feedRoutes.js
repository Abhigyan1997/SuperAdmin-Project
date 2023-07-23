// feedRoutes.js

const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

// POST /feeds
router.post('/', feedController.createFeed);

// Other feed-related routes (e.g., deleteFeed, updateFeed, getFeedById, getFeeds) can be added here

module.exports = router;
