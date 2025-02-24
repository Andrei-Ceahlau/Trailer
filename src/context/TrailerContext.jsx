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

export const useTrailer = () => useContext(TrailerContext);
