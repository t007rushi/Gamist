import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navbarData } from "./navbarData";

export const LeftSideNav = () => {
  const { pathname } = useLocation();
  return (
    <aside className="w-64 mt-20 ml-10 hidden sm:block " aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-100 rounded dark:bg-gray-800 sticky top-14 mt-2 shadow-md">
        <ul className="space-y-2">
          {navbarData.map((nav) => {
            return (
              <Link
                to={nav.link}
                title={nav.title}
                className={
                  pathname === nav.link
                    ? "flex items-center p-2 text-base font-normal bg-gray-700 text-white rounded-lg dark:text-white dark:hover:bg-gray-700"
                    : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              >
                <i
                  className={
                    pathname === nav.link
                      ? `${nav.icon} text-white text-2xl`
                      : `${nav.icon} text-gray-600 text-2xl`
                  }
                ></i>
                <span className="ml-3 text-xl">{nav.title}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
