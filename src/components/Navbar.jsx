// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand text-danger fw-bold fs-3" to="/">
          MovieVerse
        </Link>

        {/* Buton toggler pentru mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Mutăm Home și Favorites în stânga */}
          <ul className="navbar-nav nav-left">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/favorites">Favorites</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/top-movies">Top 10 Movies</Link>
            </li>
          </ul>

          {/* Bara de căutare poziționată corect */}
          <div className="search-bar-container ms-auto">
            <form className="d-flex search-bar" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies..."
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-danger" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
