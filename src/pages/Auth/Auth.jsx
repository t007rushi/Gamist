import React, { useState } from "react";

export const Auth = () => {
  const [authpage, setAuthpage] = useState(true);
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
              setAuthpage(true);
            }}
          >
            Login
          </button>{" "}
          |
          <button
            onClick={(e) => {
              e.preventDefault();
              setAuthpage(false);
            }}
          >
            Signup
          </button>
        </div>

       
        {authpage ? (
          <>
           <p>Welcome Back</p>
            <label
              htmlFor="login"
              className="flex flex-col items-start justify-evenly gap-4"
            >
              Email
              <input
                type="email"
                id="login"
                className="bg-slate-900 rounded-md p-1 w-72"
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-col items-start justify-center gap-2"
            >
              Password
              <input
                type="password"
                id="password"
                className="bg-slate-900 rounded-md p-1 w-72"
              />
            </label>
            <button className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full font-bold">
              LOGIN
            </button>
            <h1>- OR -</h1>
            <div className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full text-center">
              Log In with Steam
            </div>
            <div className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full text-center">
              Log In with Google
            </div>
            <div className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full text-center">
              Log In with Facebook
            </div>
          </>
        ) : (
          <>
           <p>Start Sharing Gaming moments</p>
            <label
              htmlFor="login"
              className="flex flex-col items-start justify-evenly gap-4"
            >
              First Name
              <input
                type="text"
                id="login"
                className="bg-slate-900 rounded-md p-1 w-72"
              />
            </label>
            <label
              htmlFor="login"
              className="flex flex-col items-start justify-evenly gap-4"
            >
              Last Name
              <input
                type="text"
                id="login"
                className="bg-slate-900 rounded-md p-1 w-72"
              />
            </label>
            <label
              htmlFor="login"
              className="flex flex-col items-start justify-evenly gap-4"
            >
              Email
              <input
                type="email"
                id="login"
                className="bg-slate-900 rounded-md p-1 w-72"
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-col items-start justify-center gap-2"
            >
              Create Password
              <input
                type="password"
                id="password"
                className="bg-slate-900 rounded-md p-1 w-72"
              />
            </label>

            <button className="border-2 border-gray-50 shadow-md hover:text-slate-600 hover:bg-slate-50 cursor-pointer rounded-lg p-1 w-full font-bold">
              SIGNUP
            </button>
          </>
        )}
      </form>
    </div>
  );
};
