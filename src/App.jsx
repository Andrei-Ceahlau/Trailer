// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import TopMovies from "./pages/TopMovies";
import ActorDetails from "./pages/ActorDetails";
import SearchResults from "./pages/SearchResults"; // ✅ Importăm pagina de căutare
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";
import { TrailerProvider } from "./context/TrailerContext";

function App() {
  return (
    <FavoritesProvider>
      <TrailerProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-movies" element={<TopMovies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/actor/:id" element={<ActorDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<SearchResults />} /> {/* ✅ Adăugat ruta pentru search */}
          </Routes>
          <Footer />
        </Router>
      </TrailerProvider>
    </FavoritesProvider>
  );
}

export default App;
