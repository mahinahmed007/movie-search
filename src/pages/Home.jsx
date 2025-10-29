import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "de7b3007";

  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  const fetchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      let allMovies = [];
      // Loop through pages to get more results
      for (let page = 1; page <= 5; page++) {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
        );
        const data = await res.json();
        if (data.Search) {
          allMovies = [...allMovies, ...data.Search];
        } else {
          break;
        }
      }
      setMovies(allMovies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((f) => f.imdbID === movie.imdbID)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  return (
    
      <div className="max-w-6xl mx-auto p-4">
        {/* Keep your old SearchBar */}
        <SearchBar onSearch={fetchMovies} />

        {loading && (
          <div className="flex justify-center py-6">
            <p className="text-lg text-gray-300 animate-pulse">Loading movies...</p>
          </div>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
          {movies.map((movie) => (
            <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="group">
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                  alt={movie.Title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-3 flex flex-col items-center text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-center leading-tight group-hover:text-blue-400 transition line-clamp-2">
                    {movie.Title}
                  </h3>

                  <p className="text-sm text-gray-400">{movie.Year}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToFavorites(movie);
                    }}
                    className="mt-2 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-1 text-sm"
                  >
                    <span>❤️</span> Favorite
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No results */}
        {!loading && movies.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-lg">
            No movies found. Try searching something else 🎥
          </p>
        )}
      </div>
    
  );
}
