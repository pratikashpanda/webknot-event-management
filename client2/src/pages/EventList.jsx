import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_BASE_URL;

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
    };

    const fetchAttendees = async () => {
      const response = await axios.get(`${API_URL}/attendees`);
      setAttendees(response.data);
    };

    fetchEvents();
    fetchAttendees();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/events`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowModal(false); 
      setFormData({ name: "", description: "", location: "", date: "" }); 
      const response = await axios.get(`${API_URL}/events`); 
      setEvents(response.data);
    } catch (error) {
      console.error(
        "Error adding event:",
        error.response?.data || error.message
      );
      alert("Failed to add event.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      <div className="w-full lg:w-2/3 shadow-md p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Events</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/events/${event._id}`)}
            >
              <h2 className="text-lg font-semibold">{event.name}</h2>
              <p className="text-sm">{event.location}</p>
              <p className="text-sm text-gray-600">
                {event.date.split("T")[0]}
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/events/edit/${event._id}`);
                  }}
                  className="bg-yellow-400 px-4 py-2 text-sm text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-red-500 px-4 py-2 text-sm text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 pt-2">Attendees</h1>
        {attendees.length > 0 ? (
          <ul className="space-y-4">
            {attendees.map((attendee) => (
              <li
                key={attendee._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="font-semibold">{attendee.name}</h3>
                <p className="text-sm text-gray-600">{attendee.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No attendees available.</p>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-96 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Event</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
