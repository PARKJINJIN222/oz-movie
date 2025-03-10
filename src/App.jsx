import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; 
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import movieListData from "./movieListData.json";
import "./index.css";


const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (Array.isArray(movieListData.results)) {
      setMovies(movieListData.results);
    } else {
      console.error("movieListData.results is not an array");
    }
  }, []);

  return (
    <Routes>
    
      <Route
        path="/"
        element={
          <div>
            <h1>인기 영화</h1>
            <div className="movie-list">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        }
      />
      <Route path="/movie/:id" element={<MovieDetail/>} />
    </Routes>
  );
};

export default App;