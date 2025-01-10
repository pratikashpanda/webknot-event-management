import express from "express";
import {
  createTask,
  getTasksForEvent,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", createTask);

router.get("/:eventId", getTasksForEvent);

router.put("/:taskId", updateTaskStatus);

export default router;
