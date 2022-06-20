import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../features/auth/authSlice";

export const SuggestToFollow = () => {
  const { users, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="suggestions hidden md:block mr-4 ">
      <div className="p-2 max-w-md bg-gray-100 rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 sticky top-14 mt-2">
        <div className="flex justify-between items-center mb-4 gap-1">
          <h5 className=" font-bold leading-none  dark:text-white">
            Suggestions for you
          </h5>
          <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </button>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((userl) => {
            return (
              <li className="py-2" key={userl.userId}>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {userl?.firstName}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {userl?.email}
                    </p>
                  </div>
                  {!user?.following?.includes(userl.userId) ? (
                    <div
                      className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer border-2 rounded-lg p-1"
                      onClick={() => dispatch(followUser(userl.userId))}
                    >
                      Follow
                    </div>
                  ) : (
                    <div
                      className="inline-flex items-center text-base font-semibold bg-gray-800 text-white dark:text-white cursor-pointer border-2 rounded-lg p-1"
                      onClick={() => dispatch(unfollowUser(userl.userId))}
                    >
                      Unfollow
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
