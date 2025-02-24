// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const FavoritesContext = createContext();

// ✅ Hook pentru a accesa contextul mai ușor
export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // ✅ Încărcăm favoritele din localStorage la inițializare
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // ✅ Salvăm în localStorage ori de câte ori `favorites` se schimbă
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("✅ Favoritele salvate în localStorage:", favorites);
  }, [favorites]);

  // ✅ Adaugă un film la favorite doar dacă nu există deja
  const addFavorite = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites((prevFavorites) => {
        const updatedFavorites = [...prevFavorites, movie];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // ✅ Salvăm imediat
        return updatedFavorites;
      });
    }
  };

  // ✅ Elimină un film din favorite
  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((movie) => movie.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // ✅ Salvăm imediat
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
