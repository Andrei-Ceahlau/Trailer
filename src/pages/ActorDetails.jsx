// src/pages/ActorDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ Importă Link!
import axios from "axios";

import "../styles/ActorDetails.css"; 

function ActorDetails() {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error("API Key is missing!");
      return;
    }

    // Fetch actor details
    axios
      .get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&append_to_response=movie_credits`)
      .then((response) => {
        setActor(response.data);
        setMovies(response.data.movie_credits.cast);
      })
      .catch((error) => console.error("Error fetching actor details:", error));
  }, [id, API_KEY]);

  if (!actor) {
    return <h2 className="loading-message">Loading actor details...</h2>;
  }

  return (
    <div className="actor-details-container">
      <div className="actor-header">
        <img 
          src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : "https://via.placeholder.com/300"}
          alt={actor.name}
          className="actor-image"
        />
        <div className="actor-info">
          <h1>{actor.name}</h1>
          <p><strong>Born:</strong> {actor.birthday ? actor.birthday : "Unknown"}</p>
          <p><strong>Biography:</strong> {actor.biography ? actor.biography : "No biography available."}</p>
        </div>
      </div>

      {/* Filme în care a jucat */}
      {movies.length > 0 && (
        <div className="actor-movies">
          <h2>Movies</h2>
          <div className="movies-grid">
            {movies.slice(0, 10).map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="search-movie-card"> {/* 🔥 Acum fiecare film e clickabil */}
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200"}
                  alt={movie.title}
                  className="search-movie-image"
                />
                <h5 className="search-movie-title">{movie.title} ({movie.release_date?.split("-")[0] || "Unknown"})</h5>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ActorDetails;
