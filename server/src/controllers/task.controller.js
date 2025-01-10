import Task from "../models/task.model.js";
import Event from "../models/event.model.js";
import Attendee from "../models/attendee.model.js";
import { errorHandler } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  const { name, deadline, assignedAttendee, eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }

    if (assignedAttendee) {
      const attendee = await Attendee.findById(assignedAttendee);
      if (!attendee) {
        return next(errorHandler(404, "Attendee not found"));
      }
    }

    const newTask = new Task({
      name,
      deadline,
      assignedAttendee,
      eventId,
    });

    await newTask.save();

    if (assignedAttendee) {
      const attendee = await Attendee.findById(assignedAttendee);
      attendee.tasks.push(newTask);
      await attendee.save();
    }

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

export const getTasksForEvent = async (req, res, next) => {
  const { eventId } = req.params;

  try {
    const tasks = await Task.find({ eventId }).populate(
      "assignedAttendee",
      "name email"
    );

    if (tasks.length === 0) {
      return next(errorHandler(404, "No tasks found for this event"));
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!["Pending", "Completed"].includes(status)) {
    return next(errorHandler(400, "Invalid status"));
  }

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!task) {
      return next(errorHandler(404, "Task not found"));
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};
