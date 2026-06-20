import React, { useState, Children, useEffect } from "react";
import CreateContext from "./CreateContext";
import App from "../App";
import { useGetApi } from "../Api/useGetApi";

const ContextProvider = ({ children }) => {
  const [newsData, setNewsDate] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const category = localStorage.getItem("category");
      let data;
      if (category) {
        data = await useGetApi(
          `/newsapi/article?page=${page}&limit=10&category=${category}`,
        );
      } else {
        data = await useGetApi(`/newsapi/article?page=${page}&limit=10`); // await async function
      }

      setNewsDate((prev) => {
        const allArticles = [...prev, ...(data.articles || [])];
        const seenIds = new Set();
        return allArticles.filter((article) => {
          const idKey = article?._id || JSON.stringify(article);
          if (seenIds.has(idKey)) {
            return false;
          }
          seenIds.add(idKey);
          return true;
        });
      });
    };
    fetchData();
  }, [page]);
  return (
    <CreateContext.Provider value={{ newsData, setNewsDate, page, setPage }}>
      {children}
    </CreateContext.Provider>
  );
};

export default ContextProvider;
