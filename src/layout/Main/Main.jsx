import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Signup } from "../../pages";

export const Main = () => {
  return (
    <div className="mt-14">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
};
