import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Message ID is required" });
  }
  getMessages(req, res, next);
});
router.post("/send/:id", protectRoute, sendMessage);

export default router;
