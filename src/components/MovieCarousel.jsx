// src/components/MovieCarousel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "../styles/MovieCarousel.css";

function MovieCarousel({ title }) {
  const [movies, setMovies] = useState([]);
  const API_KEY = "2ac6f0215c6dc9f9ffa71c2b1b3f9e82"; // 🔥 API direct în cod

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((response) => {
        setMovies(response.data.results || []);
      })
      .catch((error) => console.error("Error fetching popular movies:", error));
  }, []);

  if (!movies || movies.length === 0) {
    return null; // ✅ Dacă nu sunt filme, nu afișăm nimic
  }

  return (
    <div className="container movie-carousel-container">
      <h2 className="text-white text-center mb-4">{title || "Filme Recomandate"}</h2>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="movie-slide">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500"}
              alt={movie.title}
              className="movie-image"
            />
            <div className="movie-overlay">
              <h5>{movie.title}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieCarousel;
