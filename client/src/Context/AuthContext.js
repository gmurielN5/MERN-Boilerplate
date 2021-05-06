import React, { createContext, useState, useEffect, useReducer } from "react";
import { IsAuthenticated } from "../Services/AuthService";
import { dataFetchReducer } from "../Reducers/ContentReducers";
import { filterReducer } from "../Reducers/FilterReducer";
import Loading from "../Components/Loading";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [store, dispatch] = useReducer(dataFetchReducer, {
    Loading: false,
    isError: null,
    articles: [],
    message: [],
  });

  useEffect(() => {
    IsAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoading(false);
    });
  }, []);

  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const filteredArticles = store.articles.filter((article) => {
    if (filter === "ALL") return true;
    if (filter === "HIDDEN" && article.hidden) return true;
    if (filter === "PUBLISHED" && !article.hidden) return true;
    return false;
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            dispatch,
            store,
            dispatchFilter,
            filteredArticles,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
