/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { app } from "../../firbaseConfig";
import { signOut, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../../features/auth/authSlice";

export const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const signmeout = (e) => {
    e.preventDefault();
    try {
      const userdata = dispatch(SignOut());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="fixed top-0 z-10 bg-slate-800 w-full h-14 text-gray-50 flex flex-row items-center justify-between">
      <h1 className="font-bold text-2xl">GAMIST</h1>
      {isLoggedIn && (
        <div className="flex items-center">
          <button
            className="p-2 m-2 text-2xl"
            onClick={() => navigate("/home")}
          >
            <i className="fa-solid fa-house"></i>
          </button>
          <button title="bookmark" className="p-2 m-2 text-2xl">
            <i className="fa-solid fa-bookmark"></i>
          </button>
          <button title="message" className="p-2 m-2 text-2xl">
            <i className="fa-solid fa-message"></i>
          </button>
          <button className="p-2 m-2 text-2xl">
            <i className="fa-solid fa-square-plus"></i>
          </button>
          <Link to="/profile" className=" p-2 text-2xl">
            <i className="fa-solid fa-user"></i>
          </Link>
          <button className="p-2 m-2 text-2xl" onClick={signmeout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      )}
    </div>
  );
};
