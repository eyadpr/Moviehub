
import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaCalendar,
  FaClock,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

export default function MovieDetails({ movieId }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function getMovie() {
      setLoading(true);
      setError("");

      try {
        const token = import.meta.env.VITE_TMDB_TOKEN;

        if (!token) {
          throw new Error("TMDB token is missing.");
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to load movie: ${response.status}`);
        }

        const data = await response.json();

        const favorites =
          JSON.parse(localStorage.getItem("favorites") || "[]");

        const watchlist =
          JSON.parse(localStorage.getItem("watchlist") || "[]");

        if (!cancelled) {
          setMovie(data);
          setIsFavorite(
            favorites.some((item) => item.id === data.id)
          );
          setIsWatchlist(
            watchlist.some((item) => item.id === data.id)
          );
        }
      } catch (err) {
        console.error("Movie details error:", err);

        if (!cancelled) {
          setError("Could not load movie details. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (movieId) {
      getMovie();
    } else {
      setError("Movie ID is missing.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  const toggleFavorite = () => {
    if (!movie) return;

    const favorites =
      JSON.parse(localStorage.getItem("favorites") || "[]");

    const updatedFavorites = isFavorite
      ? favorites.filter((item) => item.id !== movie.id)
      : [...favorites.filter((item) => item.id !== movie.id), movie];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = () => {
    if (!movie) return;

    const watchlist =
      JSON.parse(localStorage.getItem("watchlist") || "[]");

    const updatedWatchlist = isWatchlist
      ? watchlist.filter((item) => item.id !== movie.id)
      : [...watchlist.filter((item) => item.id !== movie.id), movie];

    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setIsWatchlist(!isWatchlist);
  };

  if (loading) {
    return <div className="details-loading">Loading movie...</div>;
  }

  if (error || !movie) {
    return (
      <div className="details-loading">
        {error || "Movie not found."}
        <button
          className="back-btn"
          onClick={() => {
            window.location.href = "/#movies";
          }}
        >
          Back to Movies
        </button>
      </div>
    );
  }

  return (
    <section
      className="movie-details"
      style={{
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(5, 5, 5, 0.98) 0%,
            rgba(5, 5, 5, 0.88) 35%,
            rgba(5, 5, 5, 0.55) 70%,
            rgba(5, 5, 5, 0.9) 100%
          ),
          ${movie.backdrop_path
            ? `url("${BACKDROP_URL}${movie.backdrop_path}")`
            : "none"}
        `,
      }}
    >
      <div className="details-container">
        <button
          className="back-btn"
          onClick={() => {
            window.location.href = "/#movies";
          }}
        >
          ← Back to Movies
        </button>

        <div className="details-content">
          <div className="details-poster">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>

          <div className="details-info">
            <span className="details-label">MOVIE DETAILS</span>

            <h1>{movie.title}</h1>

            <div className="details-meta">
              <span className="details-rating">
                <FaStar />
                {Number(movie.vote_average || 0).toFixed(1)}
              </span>

              <span>
                <FaCalendar />
                {movie.release_date || "N/A"}
              </span>

              <span>
                <FaClock />
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </span>
            </div>

            <div className="movie-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>

            <div className="movie-overview">
              <h2>Overview</h2>
              <p>{movie.overview || "No overview available."}</p>
            </div>

            <div className="details-buttons">
              <button
                className={`details-btn ${isFavorite ? "active-btn" : ""}`}
                onClick={toggleFavorite}
              >
                <FaHeart />
                {isFavorite
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>

              <button
                className={`details-btn ${isWatchlist ? "active-btn" : ""}`}
                onClick={toggleWatchlist}
              >
                <FaBookmark />
                {isWatchlist
                  ? "Remove from Watchlist"
                  : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}