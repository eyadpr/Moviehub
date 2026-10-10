import React, { useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setMovies(data);
  }, []);

  const removeMovie = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);

    setMovies(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <section className="saved-section">
      <div className="saved-container">

        <h1>
          My <span>Favorites</span>
        </h1>

        {movies.length === 0 ? (
          <p className="empty-message">
            No favorite movies yet.
          </p>
        ) : (
          <div className="saved-grid">
            {movies.map((movie) => (
              <div className="saved-card" key={movie.id}>

                <img
                  src={`${IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />

                <div className="saved-info">
                  <h3>{movie.title}</h3>

                  <p>
                    <FaStar />
                    {movie.vote_average?.toFixed(1)}
                  </p>

                  <button onClick={() => removeMovie(movie.id)}>
                    <FaTrash />
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}