import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "de7b3007";

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
    fetchDefaultMovies();
  }, []);

  const fetchDefaultMovies = async () => {
    setLoading(true);
    try {
      let defaultMovies = [];
      for (let page = 1; page <= 2; page++) { // 2 pages = ~20 movies
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=Avengers&page=${page}`
        );
        const data = await res.json();
        if (data.Search) defaultMovies = [...defaultMovies, ...data.Search];
      }
      setMovies(defaultMovies);
    } catch {
      toast.error("Failed to load default movies 😞");
    } finally {
      setLoading(false);
    }
  };


  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      let allMovies = [];
      for (let page = 1; page <= 5; page++) {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await res.json();
        if (data.Search) allMovies = [...allMovies, ...data.Search];
        else break;
      }
      setMovies(allMovies);
    } catch (error) {
      console.error(error);
      toast.error("Error loading movies");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((f) => f.imdbID === movie.imdbID)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      toast.success(`${movie.Title} added to favorites! 🍿`);
    } else {
      toast.error(`${movie.Title} is already in favorites ❤️`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SearchBar onSearch={fetchMovies} />

      {loading && (
        <div className="flex justify-center py-6">
          <p className="text-lg text-gray-300 animate-pulse">Loading movies...</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="group">
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "./placeholder.png"}
                alt={movie.Title}
                className="w-full h-72 object-cover"
              />
              <div className="p-3 flex flex-col items-center text-center">
                <h3 className="text-base sm:text-lg font-semibold line-clamp-2 group-hover:text-blue-400 transition">
                  {movie.Title}
                </h3>
                <p className="text-sm text-gray-400">{movie.Year}</p>

                <button
                  onClick={(e) => { e.preventDefault(); addToFavorites(movie); }}
                  className="mt-2 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all text-sm flex items-center gap-1"
                >
                  ❤️ Favorite
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!loading && movies.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No movies found. Try searching something else 🎥
        </p>
      )}
    </div>
  );
}
