import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const API_KEY = "de7b3007";

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);

    const fetchMovie = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
      const data = await res.json();
      setMovie(data);

      // Fetch related movies (suggestions)
      if (data.Title) {
        const keyword = data.Title.split(" ")[0]; // take first word of title
        const recRes = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`);
        const recData = await recRes.json();
        if (recData.Search) {
          // filter out current movie and limit suggestions
          setRecommended(recData.Search.filter(m => m.imdbID !== id).slice(0, 6));
        }
      }
    };
    fetchMovie();
  }, [id]);

  const addToFavorites = () => {
    if (!favorites.some((f) => f.imdbID === movie.imdbID)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      toast.success(`${movie.Title} added to favorites! 🍿`, { icon: "❤️" });
    } else {
      toast.error(`${movie.Title} is already in favorites ❤️`);
    }
  };

  if (!movie) return <p className="text-center py-10 text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pb-16">
      {/* Movie Info */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 p-6 md:pt-10">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-2xl shadow-lg"
        />
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-3">{movie.Title}</h1>
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

          {/* OTT badges */}
          <div className="mt-5">
            <p className="font-semibold mb-2">Available on:</p>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">Netflix</span>
              <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">Amazon Prime</span>
              <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">Disney+ Hotstar</span>
            </div>
          </div>

          <button
            onClick={addToFavorites}
            className="mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-1 text-sm w-fit"
          >
            <span>❤️</span> Add to Favorites
          </button>
        </div>
      </div>

      {/* 💡 Recommended Section */}
      {recommended.length > 0 && (
        <div className="max-w-6xl mx-auto mt-12 px-6">
          <h2 className="text-2xl font-semibold text-white mb-6">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {recommended.map((rec) => (
              <Link key={rec.imdbID} to={`/movie/${rec.imdbID}`}>
                <div className="bg-[#1e293b] hover:scale-105 transition-transform duration-300 rounded-lg p-2 shadow-md">
                  <img
                    src={rec.Poster !== "N/A" ? rec.Poster : "https://via.placeholder.com/150"}
                    alt={rec.Title}
                    className="rounded-md mb-2"
                  />
                  <p className="text-sm font-medium truncate">{rec.Title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
