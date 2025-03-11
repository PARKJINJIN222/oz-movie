import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; 
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import { fetchMovies } from './api'; // TMdb API에서 데이터를 가져오는 부분
import "./index.css"; 

const App = () => {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장할 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행될 비동기 함수
    const getMovies = async () => { // async는 함수를 비동기 함수로 정의하고 항상 promise를 반환하게 합니다. await은 promise가 이행되거나 거부될 때까지 async를 일시정지합니다. promise 처리 시 결과값 반환
      try {
        const moviesData = await fetchMovies(); // TMdb API에서 영화 데이터 가져오기
        setMovies(moviesData); // 상태 업데이트
      } catch (error) {
        console.error('에러가 발생했습니다', error); // 에러 처리
      }
    };

    getMovies(); // 비동기 함수 호출
  }, []); // 빈 배열을 전달하여 처음 마운트될 때만 실행

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
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
};

export default App;



  // useEffect(() => {
  //   if (Array.isArray(movieListData.results)) {
  //     setMovies(movieListData.results);
  //   } else {
  //     console.error("movieListData.results is not an array");
  //   }
  // }, []);
//try{...} (error) catch {...} 자바스크립트 예외처리 구문, 첫 마운트때 영화데이터를 가져오기 위해 useEffect 사용 다시 인지 