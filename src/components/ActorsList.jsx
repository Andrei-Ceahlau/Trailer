// src/components/ActorsList.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/ActorsList.css"; // Importăm stilurile

function ActorsList({ actors = [] }) { // 🔥 Asigură că actors are o valoare implicită
  if (!actors || actors.length === 0) {
    return <p className="no-actors">No actors available.</p>;
  }

  return (
    <div className="actors-list-container">
      <h2>Cast</h2>
      <div className="actors-grid">
        {actors.slice(0, 10).map((actor) => (
          <Link key={actor.id} to={`/actor/${actor.id}`} className="actor-card">
            <img 
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/200"}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ActorsList;
