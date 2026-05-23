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

          {newsHighlights.map((elm, index) => {
            return (
              <div key={index} className="inside-latest-updates-div">
                <h6>{elm.heading}</h6>
                <p>{elm.description}</p>
                {/* <a href={elm.Link} target="_blank" rel="noopener noreferrer">
                  Read More
                </a> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LatestUpdates;
