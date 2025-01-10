import mongoose from "mongoose";

const AttendeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", 
      required: true,
    },
  },
  { timestamps: true }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);

export default Attendee;
