import React from "react";
import { categories } from "../data/categories";

export const CategoriesFilter = ({
  currentCategory,
  selectCategoryHandler,
}) => {
  return (
    <div className="flex gap-2 mb-2 py-4">
      {categories?.map((category) => {
        return (
          <label
            key={category.id}
            className={
              category.categoryName === currentCategory
                ? "p-2 text-sm text-center font-medium rounded-full border-2 shadow-md border-gray-200 text-white bg-gray-700 w-28"
                : "p-2 whitespace-nowrap text-sm text-center font-medium rounded-full shadow-md border-2 border-gray-200 text-gray-900 bg-white  hover:bg-gray-100 hover:text-blue-700 w-28"
            }
            htmlFor={category.categoryName}
          >
            <input
              className="opacity-0"
              type="radio"
              name="categories"
              id={category.categoryName}
              checked={category && category.categoryName === currentCategory}
              onChange={(e) => selectCategoryHandler(e.target.id)}
            />
            {category.categoryName}
          </label>
        );
      })}
    </div>
  );
};
