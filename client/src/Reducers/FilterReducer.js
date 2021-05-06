export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_DRAFT_ARTICLES":
      return "HIDDEN";
    case "SHOW_PUBLISHED_ARTICLES":
      return "PUBLISHED";
    default:
      throw new Error();
  }
};
