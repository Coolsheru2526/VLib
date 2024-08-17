import express from "express";
const router = express.Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { loginUser, registerUser, logoutUser } from "../controllers/auth.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);

export default router;
