import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignIn } from "../../../features/auth/authSlice";

export const Login = () => {
  const [logdata, setLogData] = useState({
    email: "sam@test.com",
    password: "sam@test",
  });
  const dispatch = useDispatch();

  //login
  const LoginHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(
        SignIn({ email: logdata.email, password: logdata.password })
      ).unwrap();
    } catch (error) {
      console.log(error.message);
    }
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
          <Link to="/">Login</Link>|<Link to="/signup">Signup</Link>
        </div>

        <p>Welcome Back</p>
        <label
          htmlFor="login"
          className="flex flex-col items-start justify-evenly gap-4"
        >
          Email
          <input
            type="email"
            autocomplete="on"
            value={logdata.email}
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
            value={logdata.password}
            autocomplete="on"
            placeholder="Enter password"
            className="bg-slate-900 rounded-md p-1 w-72"
            onChange={(e) =>
              setLogData({ ...logdata, password: e.target.value })
            }
          />
        </label>
        <button
          onClick={LoginHandler}
          className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full font-bold"
        >
          LOGIN
        </button>
        <Link
          to="/signup"
          className="border-2 text-center text-bold border-gray-50 shadow-md text-slate-600 bg-slate-50 cursor-pointer rounded-lg p-1 w-full font-bold"
        >
          Create New Account
        </Link>
      </form>
    </div>
  );
};
