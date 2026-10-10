import React from "react";
import {
  FaFilm,
  FaHome,
  FaHeart,
  FaBookmark,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg movie-navbar">
      <div className="container">

        <a className="navbar-brand movie-logo" href="/">
          <span className="logo-icon">
            <FaFilm />
          </span>

          <span>
            Movie<span className="yellow">Hub</span>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <a className="nav-link" href="/">
                <FaHome />
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/#movies">
                <FaFilm />
                Movies
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/favorites">
                <FaHeart />
                Favorites
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/watchlist">
                <FaBookmark />
                Watchlist
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/about">
                <FaInfoCircle />
                About
              </a>
            </li>

          </ul>

          <form
  className="search-form"
  onSubmit={(e) => {
    e.preventDefault();

    const query = e.target.search.value.trim();

    if (query) {
      window.location.href = `/search?query=${encodeURIComponent(query)}`;
    }
  }}
>
            <div className="search-input">
              <FaSearch />

              <input
  type="text"
  name="search"
         placeholder="Search movies..."
         />
         </div>

            <button type="submit" className="search-btn">
              Search
            </button>
          </form>

        </div>
      </div>
    </nav>
  );
}