const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "your_secret_key");
    req.user = decoded;
    next();
  } catch (error){
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired. Please login again." });
    }
    res.status(401).json({ error: "Invalid token." });
  }
};

