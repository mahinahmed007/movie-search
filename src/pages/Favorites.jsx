import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);
   const removeFromFavorites = (id) => {
    const updated = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
           Your Favorites
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg mb-4">No favorites yet!</p>
            <p className="text-gray-500">
              Go back and add some movies you love ❤️
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <MovieCard movie={movie} addToFavorites={() => {}} />
              <button
                onClick={() => removeFromFavorites(movie.imdbID)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md opacity-90 group-hover:opacity-100 transition"
              >
                ❌ Remove
              </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
