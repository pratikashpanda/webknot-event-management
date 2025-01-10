import express from "express";
import {
  addAttendee,
  getAllAttendees,
  deleteAttendee,
} from "../controllers/attendee.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/add", addAttendee);

router.get("/", getAllAttendees);

router.delete("/:id", verifyToken, deleteAttendee);

export default router;
