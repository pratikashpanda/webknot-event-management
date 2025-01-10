import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";
import eventRouter from "./src/routes/event.route.js";
import attendeeRouter from "./src/routes/attendee.route.js";
import taskRouter from "./src/routes/task.route.js";



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//ROUTES
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.use("/api/attendees", attendeeRouter);
app.use("/api/tasks", taskRouter);

//MIDDLEWARES
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}!!`);
});
