import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetail.css";
import movieDetailData from "./movieDetailData.json"

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(movieDetailData);
useEffect(()=> {
  
  // console.log(movieListData, movieListData.results);
})
  // useEffect(() => {
  //   fetch("/movieListData.json") // public 폴더 내 JSON 파일 로드
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const foundMovie = data.results.find((m) => m.id === Number(id));
  //       setMovie(foundMovie);
  //     })
  //     .catch((error) => console.error("Error loading movie data:", error));
  // }, [id]);

  if (!movie) {
    return <p>영화 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="movie-detail-container">
      <div className="poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
      </div>
      <div className="details">
        <h1>{movie.title}</h1>
        <p className="rating">⭐ {movie.vote_average}</p>
        <p className="overview">{movie.overview}</p>
        <Link to="/">홈으로</Link>
      </div>
    </div>
  );
};

export default MovieDetail;