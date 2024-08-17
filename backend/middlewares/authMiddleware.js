import jwt from "jsonwebtoken";
const JWTSECRET = "thisisjwt";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  // Check if the token is blacklisted
  if (tokenBlacklist.has(token)) {
    return res.status(401).send({ error: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, JWTSECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};
