// src/context/TrailerContext.jsx
import { createContext, useState, useContext } from "react";

const TrailerContext = createContext();

export const TrailerProvider = ({ children }) => {
  const [activeTrailer, setActiveTrailer] = useState(null);

  return (
    <TrailerContext.Provider value={{ activeTrailer, setActiveTrailer }}>
      {children}
    </TrailerContext.Provider>
  );
};

// ✅ Hook personalizat cu verificare
export const useTrailer = () => {
  const context = useContext(TrailerContext);
  if (!context) {
    throw new Error("❌ useTrailer must be used within a TrailerProvider");
  }
  return context;
};
