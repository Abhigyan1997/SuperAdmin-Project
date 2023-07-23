// logRoutes.js

const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// GET /logs (accessible only to the Super Admin)
router.get('/', logController.getLogs);
router.delete('/:id', logController.deleteLog);
router.put('/:id',logController. editLog);

module.exports = router;
