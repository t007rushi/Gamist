/* eslint-disable no-unused-vars */
import React from 'react'
import { app } from "../../firbaseConfig";
import { signOut, getAuth } from "firebase/auth";
import { useAuth } from '../../context/auth-context';

export const Navbar = () => {
  const auth = getAuth();
  const {userData} = useAuth();
  const signmeout = () => {
    signOut(auth)
    .then(() => {
      alert("signed out");
    })
    .catch((error) => {
      console.log(error.message);
    });
  };
  return (
    <div className="fixed top-0 z-10 bg-slate-800 w-full h-14 text-gray-50 flex flex-row items-center justify-between">
      <h1>GAMIST</h1>
      {userData && <button className="border-white border-2 p-1" onClick={signmeout}>Signout</button>}
    </div>
  )
}
