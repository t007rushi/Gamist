import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Profile,
  Signup,
  NotFoundPage,
  Bookmark,
  Explore,
} from "../../pages";
import { LeftSideNav } from "../Navbar/LeftSideNav";

export const Main = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="flex gap-4">
      {isLoggedIn && <LeftSideNav />}
      <div className="mt-14 flex-1">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/bookmarks" element={<Bookmark />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </div>
  );
};
