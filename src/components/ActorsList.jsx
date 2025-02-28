// src/components/ActorsList.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/ActorsList.css"; // Importăm stilurile

function ActorsList({ actors = [] }) { // 🔥 Evităm erori dacă actors e null/undefined
  if (!actors) {
    return <p className="loading-message">Loading actors...</p>;
  }

  return (
    <div className="actors-list-container">
      {actors.length > 0 ? (
        <>
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
        </>
      ) : (
        <p className="no-actors">No actors available.</p>
      )}
    </div>
  );
}

export default ActorsList;
