import React from "react";
import "./footer.css";
import {
  FaFilm,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="movie-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            <FaFilm />
            <span>Movie<span>Hub</span></span>
          </div>

          <p>
            Your ultimate destination for movies, series,
            and unforgettable entertainment.
          </p>

          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">Popular</a>
          <a href="#">Trending</a>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>
          <a href="#">Action</a>
          <a href="#">Comedy</a>
          <a href="#">Drama</a>
          <a href="#">Animation</a>
        </div>

        <div className="footer-links">
          <h3>Information</h3>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 MovieHub. Made with <FaHeart /> for movie lovers.
        </p>
      </div>
    </footer>
  );
}