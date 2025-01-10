import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Event Management App</h1>
      <button
        onClick={() => navigate("/events")}
        className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600 transition"
      >
        View Events
      </button>
    </div>
  );
};

export default Homepage;
