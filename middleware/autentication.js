const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token.' });
  }

  jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }

    req.user = decodedToken;
    next();
  });
}

module.exports = {
  authenticateUser,
};

