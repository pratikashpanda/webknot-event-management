import Attendee from "../models/attendee.model.js";
import Event from "../models/event.model.js"; 
import { errorHandler } from "../utils/error.js";

export const addAttendee = async (req, res, next) => {
  const { name, email, eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }

    const newAttendee = new Attendee({
      name,
      email,
      eventId,
    });

    await newAttendee.save();

    event.attendees.push(newAttendee._id);
    await event.save();

    res.status(201).json(newAttendee);
  } catch (error) {
    next(error);
  }
};

export const getAllAttendees = async (req, res, next) => {
  try {
    const attendees = await Attendee.find().populate(
      "eventId",
      "name location"
    ); 
    res.status(200).json(attendees);
  } catch (error) {
    next(error);
  }
};

export const deleteAttendee = async (req, res, next) => {
  const { id } = req.params; 

  try {
    const deletedAttendee = await Attendee.findByIdAndDelete(id);
    if (!deletedAttendee) {
      return next(errorHandler(404, "Attendee not found"));
    }

    res.status(200).json({ message: "Attendee has been deleted" });
  } catch (error) {
    next(error);
  }
};
