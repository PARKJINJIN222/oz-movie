import React, { useState, useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import { fetchMovies } from "./api"; // TMdb API에서 데이터를 가져오는 부분
import useDebounce from "./useDebounce";
import NavBar from "./NavBar";
import "./index.scss";

const App = () => {
  const [movies, setMovies] = useState([]); // 영화 데이터를 저장할 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어의 상태를 지정
  const debouncedSearchTerm = useDebounce(searchTerm, 500); //디바운스 적용 (리턴된 값들이 저장된다 (디바운스드벨류)) 지연뒤에
  // 들어온 값이 저장이 된다 0.5초 뒤
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    console.log("검색어 변경됨", debouncedSearchTerm);
    // 컴포넌트가 마운트될 때 실행될 비동기 함수
    const getMovies = async () => {
      // async는 함수를 비동기 함수로 정의하고 항상 promise를 반환하게 합니다. await은 promise가 이행되거나 거부될 때까지 async를 일시정지합니다. promise 처리 시 결과값 반환
      try {
        // console.log("API 호출 검색어:" debouncedSearchTerm);
        const moviesData = await fetchMovies(debouncedSearchTerm); // TMdb API에서 영화 데이터 가져오기 원래는 빈괄호이지만만 debouncedSearchTerm 추가
        // console.log("가져온 영화목록", moviesData);
        setMovies(moviesData); // 상태 업데이트
      } catch (error) {
        console.error("에러가 발생했습니다", error); // 에러 처리
      }
    };

    getMovies(); // 비동기 함수 호출
  }, [debouncedSearchTerm]); //빈 배열만 있으면 처음에만 실행하고 배열안에 서치텀을 넣었으니 재가 업데이트 될때마다 useEffect 내용 실행

  return (
    <div>
      <NavBar setSearchParams={setSearchParams} />
      <h1> 영화 검색</h1>
      {/* <input
        className="search-input"
        type="text"
        placeholder="보고 싶은 영화 제목 입력"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}

      <Routes>
        <Route
          path="/*"
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
    </div>
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
