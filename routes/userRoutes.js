const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middleware/autentication');
const { checkRole } = require('../middleware/authorization');

// POST /users (accessible to everyone)
router.post('/', userController.createUser);

//Login User
router.post('/login',userController.login)

// GET /users (accessible to Super Admin only)
router.get('/', authenticateUser, checkRole('Super Admin'), userController.getUserById);

// DELETE /users/:id (accessible to Admin only)
router.delete('/:id', authenticateUser, checkRole('Admin'), userController.deleteUser);

module.exports = router;
