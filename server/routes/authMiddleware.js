// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Store the decoded token in the request object for further use
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
