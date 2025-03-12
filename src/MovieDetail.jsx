import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import movieDetailData from "./movieDetailData.json"
import axios from "axios";
import { API_KEY, BASE_URL } from "./api";
import "./index.scss";

const MovieDetail = () => {
  const { id } = useParams(); //ID를 가져와서 다른 값 적용하는식으로 해야할거같고

  // const [movie, setMovie] = useState(movieDetailData);
  const [movie, setMovie] = useState(null); //널로 초기화 해서 연동시키고 asycn await 이용
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        // const data = await response.json();
        setMovie(response.data); //응답 데이터 상태에 저장 하는 목적
      } catch (error) {
        console.error("정보를 받아올 수 없습니다", error);
      }
    };
    fetchMovieDetail();
  }, [id]);
  // console.log(movieListData, movieListData.results);
  // 2-아이디가 바뀔떄마다 적용되게
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
    console.log(movie);
    return <p>영화 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="detail-container">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
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
