import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = "de7b3007"; // ✅ replace with your OMDB key

  // Load favorites from localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  // Fetch movie details
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  // ✅ Add to favorites + toast alert
  const addToFavorites = () => {
    if (!favorites.some((f) => f.imdbID === movie.imdbID)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));

      toast.success(`${movie.Title} added to favorites! 🍿`, {
        icon: "❤️",
      });
    } else {
      toast.error(`${movie.Title} is already in favorites ❤️`);
    }
  };

  if (!movie) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pb-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 p-6 md:pt-10">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-2xl shadow-lg"
        />

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-3">
            {movie.Title}
          </h1>
          <p className="text-gray-400 mb-2">
            {movie.Year} • {movie.Genre}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-xl">⭐</span>
            <p>{movie.imdbRating}/10 IMDb</p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{movie.Plot}</p>
          <p><span className="font-semibold">Director:</span> {movie.Director}</p>
          <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>

          {/* OTT badges (static placeholders) */}
          <div className="mt-5">
            <p className="font-semibold mb-2">Available on:</p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">Netflix</span>
              <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">Amazon Prime</span>
              <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">Disney+ Hotstar</span>
            </div>
          </div>

          {/* ❤️ Add to Favorites Button */}
          <button
            onClick={addToFavorites}
            className="mt-6 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2 text-sm w-fit font-semibold shadow-lg"
          >
            <span>❤️</span> Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
