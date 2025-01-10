import Event from "../models/event.model.js";

export const createEvent = async (req, res, next) => {
  const { name, description, location, date } = req.body;

  const newEvent = new Event({ name, description, location, date });

  try {
    await newEvent.save();
    res.status(201).json("Event Created Successfully!");
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("attendees"); 
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  const { id } = req.params; 

  try {
    const event = await Event.findById(id).populate("attendees"); 
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  const { id } = req.params; 
  const { name, description, location, date } = req.body; 

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: { name, description, location, date } }, 
      { new: true } 
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  const { id } = req.params; 

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event Deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};