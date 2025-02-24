// src/pages/Favorites.jsx
import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import "../styles/Favorites.css";

function Favorites() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="no-favorites-message">No favorites added yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <div key={movie.id} className="favorite-movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="favorite-movie-image"
                />
              </Link>
              <h4 className="favorite-movie-title">{movie.title} ({movie.release_date?.split("-")[0]})</h4>
              <button className="remove-favorite-btn" onClick={() => removeFavorite(movie.id)}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
}

export default Favorites;
