// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/login
router.post('/login', authController.login);

// Other authentication-related routes (e.g., register, logout) can be added here

module.exports = router;
