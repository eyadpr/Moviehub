
import React, { useEffect, useState } from "react";
import { FaStar, FaPlay } from "react-icons/fa";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = new URLSearchParams(window.location.search).get("query")?.trim() || "";

  useEffect(() => {
    let cancelled = false;

    async function searchMovies() {
      if (!query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const token = import.meta.env.VITE_TMDB_TOKEN;

        if (!token) {
          throw new Error("TMDB token is missing from the .env file.");
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setMovies(data.results || []);
        }
      } catch (err) {
        console.error("Movie search error:", err);

        if (!cancelled) {
          setMovies([]);
          setError("Could not search movies. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    searchMovies();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <section className="movies-section">
      <div className="movies-container">
        <div className="movies-header">
          <div>
            <span className="section-small-title">SEARCH</span>
            <h2>
              Results for <span>"{query || "All Movies"}"</span>
            </h2>
          </div>
        </div>

        {loading && (
          <div className="movies-loading">Searching Movies...</div>
        )}

        {!loading && error && (
          <div className="movies-error">{error}</div>
        )}

        {!loading && !error && !query && (
          <div className="movies-loading">
            Enter a movie title in the search bar.
          </div>
        )}

        {!loading && !error && query && movies.length === 0 && (
          <div className="movies-loading">No movies found.</div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className="movie-image">
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}

                  <div className="movie-rating">
                    <FaStar />
                    <span>
                      {Number(movie.vote_average || 0).toFixed(1)}
                    </span>
                  </div>

                  <div className="movie-overlay">
                    <button
                      onClick={() => {
                        window.location.href = `https://www.themoviedb.org/movie/${movie.id}`;
                      }}
                    >
                      <FaPlay />
                      View on TMDB
                    </button>
                  </div>
                </div>

                <div className="movie-info">
                  <h3 title={movie.title}>{movie.title}</h3>
                  <p>{movie.release_date || "Unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
