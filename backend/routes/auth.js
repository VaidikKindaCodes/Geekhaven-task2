import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const createdUser = await User.create({ username, email, password });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to signup at the moment",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const {token , user} = await User.matchPassword(email, password);
    return res.json({
      success: true,
      message: "User logged in successfully",
      token,
      user
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Invalid credentials",
    });
  }
});
router.get("/logout", (req, res) => {
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
