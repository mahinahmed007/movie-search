import { Link } from "react-router-dom";

export default function MovieCard({ movie, addToFavorites }) {
  return (
   <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-xl shadow-lg border border-gray-700 hover:shadow-purple-500/20 transition-all duration-300">

      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-2 text-center">
        <h3 className="font-semibold line-clamp-1">{movie.Title}</h3>
        <p className="text-gray-500 text-sm">{movie.Year}</p>
        <button
          onClick={() => addToFavorites(movie)}
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          ❤️ Favorite
        </button>
      </div>
    </div>
  );
}
