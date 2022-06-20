import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignUp } from "../../../features/auth/authSlice";

export const Signup = () => {
  const [signupdata, setSignupData] = useState([]);
  const dispatch = useDispatch();

  //signup
  const SignUpHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(
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
            autoComplete="on"
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
            autoComplete="on"
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
            autoComplete="on"
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
            autoComplete="on"
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
