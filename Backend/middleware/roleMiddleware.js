const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied: You do not have the necessary permissions.' });
    }
    next();
  };
};

module.exports = authorizeRole;
