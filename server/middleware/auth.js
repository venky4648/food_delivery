import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "super_secret_food_delivery_jwt_token_key_1234");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ success: false, message: "Token is invalid or expired" });
  }
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied: Admins only" });
    }
    next();
  });
};
