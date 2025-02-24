// src/components/MovieCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTrailer } from "../context/TrailerContext"; // Importăm contextul
import "../styles/MovieCard.css";

function MovieCard({ movie, addToFavorites }) {
  const { activeTrailer, setActiveTrailer } = useTrailer(); // Context pentru control
  const [trailerKey, setTrailerKey] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  let hoverTimeout = null;
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        const trailers = response.data.results;
        const officialTrailer = trailers.find((video) => video.type === "Trailer" && video.site === "YouTube");
        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        }
      })
      .catch((error) => console.error("Error fetching trailer:", error));
  }, [movie.id, API_KEY]);

  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => {
      setActiveTrailer(movie.id); // Doar acest trailer va rula
    }, 2500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    if (activeTrailer === movie.id) {
      setActiveTrailer(null); // Oprire trailer dacă cursorul pleacă
    }
  };

  return (
    <div className="movie-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={`/movie/${movie.id}`}>
        {activeTrailer === movie.id && trailerKey ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            title="Trailer"
            allowFullScreen
            className="movie-trailer"
          ></iframe>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-image"
          />
        )}
        <div className="movie-overlay">
          <h5>{movie.title} ({movie.release_date?.split("-")[0]})</h5>
        </div>
      </Link>
     
    </div>
    
  );
}

export default MovieCard;
