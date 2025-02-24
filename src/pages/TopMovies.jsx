// src/pages/TopMovies.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/TopMovies.css"; // Stil personalizat

function TopMovies() {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => {
        setMovies(response.data.results.slice(0, 10)); // Luăm doar primele 10 filme
      })
      .catch((error) => console.error("Error fetching top movies:", error));
  }, [API_KEY]);

  return (
    <div className="top-movies-container">
      <h2 className="top-movies-title">Top 10 Filme ale Lunii</h2>
      <div className="top-movies-grid">
        {movies.map((movie, index) => (
          <div key={movie.id} className="top-movie-card">
            <span className="rank-badge">{index + 1}</span>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="top-movie-image"
              />
              <div className="top-movie-overlay">
                <h5>{movie.title} ({movie.release_date?.split("-")[0]})</h5>
                <p>⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopMovies;
