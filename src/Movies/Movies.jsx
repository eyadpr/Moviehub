
import React, { useEffect, useState } from "react";
import { FaStar, FaArrowRight, FaPlay } from "react-icons/fa";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const token = import.meta.env.VITE_TMDB_TOKEN;

        if (!token) {
          throw new Error("TMDB token is missing from the .env file.");
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to load movies: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Movies API error:", err);
        setError("Movies could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);

  if (loading) {
    return (
      <section className="movies-section" id="movies">
        <div className="movies-container">
          <div className="movies-loading">Loading Movies...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="movies-section" id="movies">
        <div className="movies-container">
          <div className="movies-error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="movies-section" id="movies">
      <div className="movies-container">
        <div className="movies-header">
          <div>
            <span className="section-small-title">EXPLORE</span>
            <h2>
              Popular <span>Movies</span>
            </h2>
          </div>

          <button
            className="view-all-btn"
            onClick={() => {
              document
                .getElementById("movies")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View All <FaArrowRight />
          </button>
        </div>

        <div className="movies-grid">
          {movies.slice(0, 20).map((movie) => (
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
  <span>{Number(movie.vote_average || 0).toFixed(1)}</span>
</div>

<div className="movie-overlay">
  <button
    type="button"
    onClick={() => {
      window.location.href = `/movie/${movie.id}`;
    }}
  >
    <FaPlay />
    View Details
  </button>
</div>


                <button
  onClick={() => {
    window.location.href = `/movie/${movie.id}`;
  }}
>
  <FaPlay />
  View Details
</button>
              </div>

              <div className="movie-info">
                <h3 title={movie.title}>{movie.title}</h3>
                <p>{movie.release_date || "Unknown"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
