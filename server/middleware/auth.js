const jwt = require("jsonwebtoken");

const extractUserFromToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decodedToken.userId;
      next();
    });
  } else {
    req.user = null;
    next();
  }
};

module.exports = extractUserFromToken;
