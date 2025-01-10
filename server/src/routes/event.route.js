import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", createEvent);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.put("/:id",verifyToken, updateEvent);

router.delete("/:id",verifyToken, deleteEvent);

export default router;
