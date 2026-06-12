import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to create JWT token
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "super_secret_food_delivery_jwt_token_key_1234", {
    expiresIn: "1h",
  });
};

export const signIn = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "all fields required" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role: role || "user" });
    
    const token = createToken(newUser._id, newUser.role);
    
    return res
      .status(201)
      .json({
        status: true,
        message: "user registered successfully",
        token,
        user: { name: newUser.name, email: newUser.email, role: newUser.role },
      });
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "internal server error", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "all fields required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "invalid credentials" });
    }
    
    const { password: pwd, ...userData } = user.toObject();
    const token = createToken(user._id, user.role);
    
    return res
      .status(200)
      .json({
        status: true,
        message: "user successfully login",
        token,
        user: userData,
      });
  } catch (e) {
    return res
      .status(500)
      .json({
        status: false,
        message: "internal server error",
        error: e.message,
      });
  }
};
