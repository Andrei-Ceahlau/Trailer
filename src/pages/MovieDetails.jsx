// src/pages/MovieDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieCarousel from "../components/MovieCarousel";
import ActorsList from "../components/ActorsList"; 
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]); // ✅ Adăugăm recenzii
  const [showAllReviews, setShowAllReviews] = useState(false); // ✅ Controlăm vizibilitatea recenziilor
  const { addFavorite, favorites } = useContext(FavoritesContext);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error("API Key is missing!");
      return;
    }

    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie details:", error));

    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
      .then((response) => setActors(response.data.cast))
      .catch((error) => console.error("Error fetching cast:", error));

    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`)
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id, API_KEY]);

  if (!movie) {
    return <h2 className="loading-message">Loading movie details...</h2>;
  }

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} className="movie-backdrop"/>
        <div className="movie-info">
          <h1>{movie.title} ({movie.release_date?.split("-")[0]})</h1>
          <p><strong>Genre:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)} / 10</p>
          <p><strong>Runtime:</strong> ⏳ {movie.runtime} min</p>
          <p><strong>Overview:</strong> {movie.overview}</p>

          <button className={`favorite-btn ${isFavorite ? "added" : ""}`} onClick={() => addFavorite(movie)}>
            {isFavorite ? "✅ Added to Favorites" : "❤️ Add to Favorites"}
          </button>
        </div>
      </div>

      {/* Trailer Video */}
      {movie.videos?.results.length > 0 && (
        <div className="trailer-container">
          <h2>Watch Trailer</h2>
          <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`} title="Trailer" allowFullScreen></iframe>
        </div>
      )}

      {/* 🔥 Lista Actorilor */}
      {actors?.length > 0 && <ActorsList actors={actors} />}

      {/* 🔥 RECENZII */}
      {reviews.length > 0 && (
        <div className="reviews-container">
          <h2>Reviews</h2>
          {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
            <div key={review.id} className="review">
              <h4>{review.author}</h4>
              <p>{review.content.length > 300 ? `${review.content.slice(0, 300)}...` : review.content}</p>
            </div>
          ))}

          {/* ✅ Butonul "Show More" */}
          {reviews.length > 3 && !showAllReviews && (
            <button className="show-more-btn" onClick={() => setShowAllReviews(true)}>Show More Reviews</button>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
