import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", isLoggedIn, getUsersForSidebar);
router.get("/:id", isLoggedIn, (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Message ID is required" });
  }
  getMessages(req, res, next);
});
router.post("/send/:id", isLoggedIn, sendMessage);

export default router;
