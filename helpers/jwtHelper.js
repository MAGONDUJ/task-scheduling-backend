const jwt = require("jsonwebtoken");

verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Failed", details: { error: "Access Denied" } });

  try {
    req.user = await jwt.verify(token, process.env.SECRET);
    next();
  } catch (e) {
    res
      .status(400)
      .json({ message: "Failed", details: { error: "Invalid Token" } });
  }
};

generateJwtToken = async data => {
  return jwt.sign(data, process.env.SECRET, { expiresIn: "24h" });
};

module.exports = {
  verifyToken,
  generateJwtToken
};
