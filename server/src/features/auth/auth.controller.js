//server/src/features/auth/auth.controller.js
const authService = require("./auth.service");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    res.json({
      success: true,
      message: "Login successful",
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401);
      throw new Error("Refresh token missing");
    }

    const result = await authService.refreshAccessToken(refreshToken);

    res.json({
      success: true,
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", cookieOptions);

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

const me = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  refresh,
  logout,
  me,
  updateProfile,
};