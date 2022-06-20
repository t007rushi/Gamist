/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../../features/auth/authSlice";
import { navbarData } from "./navbarData";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const signmeout = (e) => {
    e.preventDefault();
    try {
      dispatch(SignOut());
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
    <div className="fixed top-0 z-20 bg-slate-800 w-full h-14 text-gray-50 flex flex-row items-center justify-between">
      <div className="flex gap-2 items-center ml-2">
        <img src="/assets/logo.jpg" alt="" className="w-10 h-10" />
        <h1 className="font-bold text-2xl hidden sm:block">GAMIST</h1>
      </div>
      {isLoggedIn && (
        <div className="flex items-center">
          {navbarData.map(({title,link,icon}) => {
            return (
              <Link
              key={title}
                to={link}
                title={title}
                className="p-2 m-2 text-2xl sm:hidden"
              >
                <i className={icon}></i>
              </Link>
            );
          })}
          <button className="p-2 m-2 text-2xl" onClick={signmeout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      )}
    </div>
  );
};
