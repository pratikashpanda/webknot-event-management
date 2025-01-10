import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_BASE_URL;

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    status: "Pending",
    deadline: "",
    attendeeId: null,
  });
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get(`${API_URL}/events/${id}`);
      setEvent(response.data);
    };

    const fetchEventTasks = async () => {
      const response = await axios.get(`${API_URL}/tasks/${id}`);
      setTasks(response.data);
    };

    const fetchAttendees = async () => {
      const response = await axios.get(`${API_URL}/attendees`);
      setAttendees(response.data);
    };

    fetchEvent();
    fetchEventTasks();
    fetchAttendees();
  }, [id]);

  const handleTaskStatus = async (taskId) => {
    try {
      console.log(taskId);
      
      const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        { status: "Completed" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        )
      );
      console.log("Task status updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating task status:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/tasks`, { ...taskData, eventId: id });
      setShowTaskModal(false); 
      setTaskData({
        name: "",
        status: "Pending",
        deadline: "",
        attendeeId: null,
      }); 
      const response = await axios.get(`${API_URL}/tasks/${id}`); 
      setTasks(response.data);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  return (
    <div className="p-6">
      {event && (
        <>
          <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-700 mb-6">{event.description}</p>

          <div className="mb-6">
            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-4"
            >
              Add Task
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add Attendee
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <div>
            {tasks && tasks.length > 0 ? (
              <table className="table-auto border-collapse border border-gray-300 w-3/4 mx-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">#</th>
                    <th className="border border-gray-300 px-4 py-2 w-1/2">
                      Task Name
                    </th>
                    {/* <th className="border border-gray-300 px-4 py-2 w-1/4">
                      Attendees
                    </th> */}
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr key={task._id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {task.name}
                      </td>

                      {/* <td className="border border-gray-300 px-4 py-2">
                        {getTaskAttendees(task._id)}
                      </td> */}
                      <td className="border border-gray-300 px-4 py-2">
                        {task.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => handleTaskStatus(task._id)}
                          disabled={task.status === "Completed"}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No tasks available.</p>
            )}
          </div>
        </>
      )}

      {showTaskModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowTaskModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-96 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Task</h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleTaskSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Task Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={taskData.name}
                  onChange={(e) =>
                    setTaskData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={(e) =>
                    setTaskData((prev) => ({
                      ...prev,
                      deadline: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Attendee</label>
                <select
                  name="attendeeId"
                  value={taskData.attendeeId || ""}
                  onChange={(e) =>
                    setTaskData((prev) => ({
                      ...prev,
                      attendeeId: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>
                    Select an attendee
                  </option>
                  {attendees.map((attendee) => (
                    <option key={attendee._id} value={attendee._id}>
                      {attendee.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
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

export default EventDetails;
