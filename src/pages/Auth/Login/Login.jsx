/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { app, database } from "../../../firbaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [logdata, setLogData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const auth = getAuth();

  //login
  const LoginHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, logdata.email, logdata.password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const Gprovider = new GoogleAuthProvider();
  const handleGLogin = () => {
    signInWithPopup(auth, Gprovider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const Tprovider = new TwitterAuthProvider();
  const handleTLogin = () => {
    signInWithPopup(auth, Tprovider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const Fprovider = new FacebookAuthProvider();
  const handleFLogin = () => {
    signInWithPopup(auth, Fprovider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      className="fixed bg-center w-screen h-full bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(/assets/gaming.jpg)" }}
    >
      <form
        action=""
        className="bg-slate-800 max-w-xs h-auto p-4 m-auto mt-12 flex flex-col items-center justify-center gap-3 text-cyan-50 rounded-lg drop-shadow-2xl border-gray-50 border-2 "
      >
        <div className="flex flex-row items-start justify-center gap-4 text-2xl font-extrabold border-b p-1 w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Login
          </button>
          |
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            Signup
          </button>
        </div>

        <p>Welcome Back</p>
        <label
          htmlFor="login"
          className="flex flex-col items-start justify-evenly gap-4"
        >
          Email
          <input
            type="email"
            placeholder="Enter the Email"
            className="bg-slate-900 rounded-md p-1 w-72"
            onChange={(e) => setLogData({ ...logdata, email: e.target.value })}
          />
        </label>
        <label
          htmlFor="password"
          className="flex flex-col items-start justify-center gap-2"
        >
          Password
          <input
            type="password"
            placeholder="Enter password"
            className="bg-slate-900 rounded-md p-1 w-72"
            onChange={(e) =>
              setLogData({ ...logdata, password: e.target.value })
            }
          />
        </label>
        <button
          onClick={(e) => LoginHandler(e)}
          className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full font-bold"
        >
          LOGIN
        </button>
        <h1>- OR -</h1>
        <div
          onClick={handleGLogin}
          className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full text-center"
        >
          Log In with Google
        </div>
        <div
          onClick={handleTLogin}
          className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full text-center"
        >
          Log In with Twitter
        </div>
        <div
          onClick={handleFLogin}
          className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full text-center"
        >
          Log In with Facebook
        </div>
      </form>
    </div>
  );
};
