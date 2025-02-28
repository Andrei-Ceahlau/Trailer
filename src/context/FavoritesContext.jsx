// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const FavoritesContext = createContext();

// ✅ Hook personalizat pentru a accesa contextul mai ușor
export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("❌ Error loading favorites from localStorage:", error);
      return [];
    }
  });

  // ✅ Salvăm automat în localStorage ori de câte ori `favorites` se schimbă
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Adaugă un film la favorite doar dacă nu există deja
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === movie.id)) {
        return [...prevFavorites, movie]; // ✅ Doar dacă nu există deja
      }
      return prevFavorites;
    });
  };

  // ✅ Elimină un film din favorite
  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
