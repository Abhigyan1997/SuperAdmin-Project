const  Feed = require('../models/feed');

// Function to create a new feed
async function createFeed(req, res) {
  try {
    // Extract feed data from the request body
    const { name, url, description } = req.body;

    // Create the new feed using Sequelize
    const newFeed = await Feed.create({
      name,
      url,
      description,
    });

    res.json({ message: 'Feed created successfully.', feed: newFeed });
  } catch (error) {
    console.error('Error creating feed:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Other feed-related functions (e.g., deleteFeed, updateFeed, getFeedById, getFeeds) can be added here

module.exports = {
  createFeed,
  // Add other functions here
};
