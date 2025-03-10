import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <h2>OZ Movie </h2>
      <Link to="/">홈</Link>
      <Link to="/details">상세</Link>
    </nav>
  );
};

export default NavBar;