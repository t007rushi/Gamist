export const FilterHandler = (currentCategory,followingsPosts) => {
    switch (currentCategory) {
      case "🔥Trending":
        return followingsPosts.sort(
          (first, second) => first.likes.length - second.likes.length
        );
      case "✨Latest":
        return followingsPosts.sort(
          (first, second) =>
            first.createdAt - second.createdAt
        );
      case "🐼Old":
        return followingsPosts.sort(
          (first, second) =>
            second.createdAt - first.createdAt
        );
      default:
        return followingsPosts;
    }
  };