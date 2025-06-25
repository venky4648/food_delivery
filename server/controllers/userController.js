import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signIn = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user_obj = { name, email, password };
    if (!name || !email ||!password) {
      return res
        .status(400)
        .json({ status: false, message: "all fileds required" });
    }
    const user = await User.findOne({email: email });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({name,email,password:hashedPassword});
    return res
      .status(201)
      .json({
        status: true,
        message: "user registered successfull",
        user: { name:newUser.name, email:newUser.email},
      });
  } catch (err) {}
  return res
    .status(500)
    .json({ status: false, message: "intenal server error", err });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: " all fileds required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }
    console.log("User found:", user);
    console.log("Password from client:", password);
    console.log("Password in DB:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "invalid credientals" });
    }
    const { password: pwd, ...userData } = user.toObject();
    
    return res
      .status(200)
      .json({
        status: true,
        message: "user successfully login",
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
