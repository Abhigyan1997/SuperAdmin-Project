const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Function to handle user login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database using Sequelize
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Other authentication-related functions (e.g., register, logout) can be added here

module.exports = {
  login,
  // Add other functions here
};
