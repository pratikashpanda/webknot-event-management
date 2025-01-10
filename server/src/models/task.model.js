import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    assignedAttendee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendee", 
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", 
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
