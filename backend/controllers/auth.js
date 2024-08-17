import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWTSECRET = "thisisjwt";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, JWTSECRET);
    res.status(200).send({ message: "Logged in successfully", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
};

const tokenBlacklist = new Set();

export const logoutUser = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    // Add the token to the blacklist
    tokenBlacklist.add(token);
  }
  res.status(200).send({ message: "Logged out successfully" });
};
