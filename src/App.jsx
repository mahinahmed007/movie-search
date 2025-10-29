import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-gray-800/80 via-gray-900/70 to-gray-800/80 border-b border-gray-700 shadow-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              🎬 Movie App
            </h1>
            <div className="space-x-6 text-sm font-medium">
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
              <Link to="/favorites" className="hover:text-purple-400 transition">
                Favorites
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
