//server/src/features/auth/auth.service.js
const User = require("../users/user.model");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwt");

const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || "",
  address: user.address || "",
  city: user.city || "",
  postalCode: user.postalCode || "",
});

const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: formatUserResponse(user),
    accessToken,
    refreshToken,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("Your account is disabled");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: formatUserResponse(user),
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.id);

  if (!user || !user.isActive) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    user: formatUserResponse(user),
  };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return formatUserResponse(user);
};


const updateProfile = async (userId, profileData) => {
  const allowedUpdates = {
    name: profileData.name,
    phone: profileData.phone,
    address: profileData.address,
    city: profileData.city,
    postalCode: profileData.postalCode,
  };

  const user = await User.findByIdAndUpdate(userId, allowedUpdates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return formatUserResponse(user);
};
module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  getCurrentUser,
  updateProfile,
};