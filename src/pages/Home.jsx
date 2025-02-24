// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCarousel from "../components/MovieCarousel";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // Gen selectat
  const [sortBy, setSortBy] = useState("popularity.desc"); // Sortare implicită
  
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    if (!API_KEY) return;

    // Fetch filme populare
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((response) => {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      })
      .catch((error) => console.log(error));

    // Fetch genuri
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch((error) => console.log(error));
  }, [API_KEY]);

  // 🔥 Funcție pentru filtrare după gen
  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    
    if (!genreId) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie => movie.genre_ids.includes(Number(genreId)));
      setFilteredMovies(filtered);
    }
  };

  // 🔥 Funcție pentru sortare
  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    setSortBy(sortOption);

    const sortedMovies = [...filteredMovies].sort((a, b) => {
      if (sortOption === "popularity.desc") return b.popularity - a.popularity;
      if (sortOption === "vote_average.desc") return b.vote_average - a.vote_average;
      if (sortOption === "release_date.desc") return new Date(b.release_date) - new Date(a.release_date);
    });

    setFilteredMovies(sortedMovies);
  };

  return (
    <div className="home-page">
      <MovieCarousel movies={movies} />

      {/* 🔥 Dropdown-uri pentru filtrare și sortare */}
      <div className="filters-container">
        {/* Filtrare după gen */}
        <select className="filter-dropdown" onChange={handleGenreChange} value={selectedGenre}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>

        {/* Sortare */}
        <select className="filter-dropdown" onChange={handleSortChange} value={sortBy}>
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>

      <h2 className="popular-movies">Popular Movies</h2>
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} addToFavorites={() => {}} />
          ))
        ) : (
          <p className="text-center text-white">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
