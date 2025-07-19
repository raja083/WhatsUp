import express from "express";
import {
  getLoggedInUser,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../lib/multer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.put("/update-profile", isLoggedIn, upload.single("profilePhoto"), updateProfile);

router.get("/getUser", isLoggedIn, getLoggedInUser);

export default router;
