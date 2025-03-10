import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

// navbar 다른 페이지로 이동

// outlet 중첩 라우팅 , 좀 더 봐야할듯 잘 모르겠음

//layout 전체구조 조정용

