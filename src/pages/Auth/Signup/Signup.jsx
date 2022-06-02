/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { app } from "../../../firbaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUp } from "../../../features/auth/authSlice";

export const Signup = () => {
  const [signupdata, setSignupData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  //signup
  const SignUpHandler = (e) => {
    e.preventDefault();
    try {
      const userdata = dispatch(
        SignUp({
          firstName: signupdata.first,
          lastName: signupdata.last,
          email: signupdata.email,
          password: signupdata.password,
        })
      ).unwrap();
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
    <div
      className="fixed bg-center w-screen h-full bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(/assets/gaming.jpg)" }}
    >
      <form
        action=""
        className="bg-slate-800 max-w-xs h-auto p-4 m-auto mt-12 flex flex-col items-center justify-center gap-3 text-cyan-50 rounded-lg drop-shadow-2xl border-gray-50 border-2"
      >
        <div className="flex flex-row items-start justify-center gap-4 text-2xl font-extrabold border-b p-1 w-full">
          <Link to="/">Login</Link>|<Link to="/signup">Signup</Link>
        </div>

        <p>Start Sharing Gaming moments</p>
        <label
          htmlFor="signup"
          className="flex flex-col items-start justify-evenly gap-4"
        >
          First Name
          <input
            type="text"
            placeholder="First Name"
            className="bg-slate-900 rounded-md p-1 w-72"
            onChange={(e) =>
              setSignupData({ ...signupdata, first: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="signup"
          className="flex flex-col items-start justify-evenly gap-4"
        >
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            className="bg-slate-900 rounded-md p-1 w-72"
            onChange={(e) =>
              setSignupData({ ...signupdata, last: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="login"
          className="flex flex-col items-start justify-evenly gap-4"
        >
          Email
          <input
            type="email"
            placeholder="Enter Email"
            className="bg-slate-900 rounded-md p-1 w-72"
            onChange={(e) =>
              setSignupData({ ...signupdata, email: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="password"
          className="flex flex-col items-start justify-center gap-2"
        >
          Create Password
          <input
            type="password"
            placeholder="Enter password"
            className="bg-slate-900 rounded-md p-1 w-72"
            onChange={(e) =>
              setSignupData({ ...signupdata, password: e.target.value })
            }
          />
        </label>

        <button
          type="submit"
          className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full font-bold"
          onClick={SignUpHandler}
        >
          SIGNUP
        </button>
      </form>
    </div>
  );
};
