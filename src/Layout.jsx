import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./index.scss";

const Layout = () => {
  return (
    <div className="layout-container">
      <Outlet />
    </div>
  );
};

export default Layout;

// navbar 다른 페이지로 이동

// outlet 중첩 라우팅 , 좀 더 봐야할듯 잘 모르겠음

//layout 전체구조 조정용
