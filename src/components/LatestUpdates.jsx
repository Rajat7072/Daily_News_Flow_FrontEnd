import React, { useState, useEffect, memo, useMemo } from "react";
import { useGetApi } from "../Api/useGetApi";

const LatestUpdates = () => {
  const [newsHighlights, setNewsHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApiNews = async () => {
      const response = await useGetApi("/newsapi/getNewsUpdates");
      setNewsHighlights(response.news_headlines || []);
      setLoading(false);
    };
    getApiNews();
  }, []);

  const highlights = useMemo(() => newsHighlights, [newsHighlights]);

  return (
    <div className="latest-updates" aria-live="polite">
      <div>
        <h4 className="h2-latest-updates">Latest News</h4>
      </div>

      {loading ? (
        <div className="latest-updates__loading">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="inside-latest-updates-div inside-latest-updates-div--skeleton"
            >
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--line" />
            </div>
          ))}
        </div>
      ) : (
        highlights.map((elm, index) => (
          <article key={index} className="inside-latest-updates-div">
            <h6>{elm.heading}</h6>
            <p>{elm.description}</p>
          </article>
        ))
      )}
    </div>
  );
};

export default memo(LatestUpdates);
