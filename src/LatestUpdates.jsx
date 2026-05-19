import React, { useState, useEffect } from "react";
import { useGetApi } from "./Api/useGetApi";

const LatestUpdates = () => {
  const [newsHighlights, setNewsHighlights] = useState([]);
  useEffect(() => {
    async function getApiNews(params) {
      const response = await useGetApi("/newsapi/getNewsUpdates");
      setNewsHighlights(response.news_headlines);
    }
    getApiNews();
  }, []);

  return (
    <>
      {newsHighlights && (
        <div className="latest-updates">
          <div>
            <h4 className="h2-latest-updates">Latest News</h4>
          </div>
          <ol>
            {newsHighlights.map((elm, index) => {
              return <li key={index}>{elm}</li>;
            })}
          </ol>
        </div>
      )}
    </>
  );
};

export default LatestUpdates;
