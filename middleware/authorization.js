// authorizationMiddleware.js

function checkRole(role) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges.' });
    }

    next();
  };
}

module.exports = {
  checkRole,
};
