// GET_CONTENT_LOADING
// GET_CONTENT_SUCCESS
// GET_CONTENT_FAILURE

// ADD_CONTENT_LOADING
// ADD_CONTENT_SUCCESS,
// ADD_CONTENT_FAIL,

// EDIT_CONTENT_LOADING,
// EDIT_CONTENT_SUCCESS,
// EDIT_CONTENT_FAIL,

// DELETE_CONTENT_LOADING,
// DELETE_CONTENT_SUCCESS,
// DELETE_CONTENT_FAIL,

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTENT_LOADING":
      return {
        ...state,
        Loading: true,
      };
    case "ADD_CONTENT_LOADING":
      return {
        ...state,
        Loading: true,
      };
    case "DELETE_CONTENT_LOADING":
    case "EDIT_CONTENT_LOADING":
      return {
        ...state,
        articles: state.articles.map((a) => {
          if (a._id === action.payload.id) return { ...a, Loading: true };
          return a;
        }),
      };
    case "GET_CONTENT_SUCCESS":
      return {
        ...state,
        articles: action.payload.articles,
        Loading: false,
        message: [],
      };
    case "ADD_CONTENT_SUCCESS":
      return {
        ...state,
        articles: state.articles.concat(action.payload.article),
        message: action.payload.message,
        Loading: false,
        isError: false,
      };
    case "EDIT_CONTENT_SUCCESS":
      return {
        ...state,
        articles: state.articles.map((a) => {
          if (a._id === action.payload.id) return action.payload.article;
          return a;
        }),
        Loading: false,
        isError: false,
      };
    case "DELETE_CONTENT_SUCCESS":
      return {
        ...state,
        articles: state.articles.filter(
          (a) => a._id !== action.payload.article._id
        ),
      };
    case "GET_CONTENT_FAILURE":
      return {
        ...state,
        isError: true,
        Loading: false,
        message: action.payload,
      };
    case "ADD_CONTENT_FAILURE":
      return {
        ...state,
        isError: true,
        message: action.payload,
      };
    case "DELETE_CONTENT_FAILURE":
    case "EDIT_CONTENT_FAILURE":
      return {
        ...state,
        isError: true,
        articles: state.articles.map((a) => {
          if (a._id === action.payload.id)
            return { ...a, message: action.payload };
          return a;
        }),
      };
    default:
      return state;
  }
};
