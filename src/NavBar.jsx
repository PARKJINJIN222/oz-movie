import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";
import "./index.scss";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzM1ZGU0OGY2ZDNjMTJmY2QyMWQzNGQ5NmE2MmQ1NyIsIm5iZiI6MTc0MTU5NTcxNi45NTM5OTk4LCJzdWIiOiI2N2NlYTQ0NDY2NzZlOTk0MDAxMGQ0NWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5PuESXyaUBlj2XK57iLZbXzLGiFejLiMk-8bDfEwCWM";
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

const NavBar = ({ setMovies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🌟 TMDb API 호출 함수
  const fetchMovies = async (query) => {
    if (!query) return; // 검색어가 없으면 API 호출 안 함!
    try {
      const response = await fetch(
        `${BASE_URL}?api_key=${API_KEY}&query=${query}&language=ko-KR`
      );
      const data = await response.json();
      setMovies(data.results || []); // 🌟 API 결과를 movies 상태로 업데이트
    } catch (error) {
      console.error("영화 검색 중 오류 발생:", error);
    }
  };

  // 🌟 검색어가 변경될 때마다 API 호출!
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams({ search: debouncedSearchTerm });
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setSearchParams]);

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">MOOOOOVIE</h2>

      <div className="nav-links">
        <Link to="/">홈</Link>
        <Link to="/details">상세</Link>
      </div>

      {/* 🌟 항상 검색창이 보이도록 수정! */}
      <div className="search-container">
        <input
          type="text"
          placeholder="영화를 검색해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
    </nav>
  );
};

export default NavBar;
