const User = require("../features/users/user.model");
const { verifyAccessToken } = require("../utils/jwt");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized, access token missing");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  res.status(403);
  next(new Error("Admin access only"));
};

module.exports = {
  protect,
  adminOnly,
};