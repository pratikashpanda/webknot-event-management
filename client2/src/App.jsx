import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import EventList from "./pages/EventList";
import EventDetail from "./pages/EventDetail";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/events" element={<EventList />} />

          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
