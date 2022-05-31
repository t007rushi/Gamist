/* eslint-disable no-unused-vars */
import React from "react";
import { app } from "../../firbaseConfig";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../features/auth/authSlice";

export const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signmeout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogout());
        navigate("/");
        alert("signed out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="fixed top-0 z-10 bg-slate-800 w-full h-14 text-gray-50 flex flex-row items-center justify-between">
      <h1>GAMIST</h1>
      <div>
        <button className="border-white border-2 p-1">Profile</button>
        <button className="border-white border-2 p-1">Create</button>
        <button className="border-white border-2 p-1">MSG</button>
        <button className="border-white border-2 p-1" onClick={signmeout}>
          Signout
        </button>
      </div>
    </div>
  );
};
