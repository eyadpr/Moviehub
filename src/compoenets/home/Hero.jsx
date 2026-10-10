import React from "react";
import { FaPlay, FaInfoCircle, FaStar } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="hero-text">

          <span className="hero-badge">
            #1 Trending Movie
          </span>

          <h1>
            Discover Your
            <span> Next Favorite </span>
            Movie
          </h1>

          <p>
            Explore thousands of movies, discover new stories,
            and find something amazing to watch tonight.
          </p>

          <div className="hero-rating">
            <FaStar />
            <span>8.9</span>
            <span className="rating-text">IMDb Rating</span>
          </div>

        <div className="hero-buttons">
  <button className="premium-btn">
    <FaPlay />
    <span>Watch Now</span>
  </button>

  <button className="outline-btn">
    <FaInfoCircle />
    <span>More Info</span>
  </button>
  </div>

        </div>
      </div>
    </section>
  );
}