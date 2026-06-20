import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import CreateContext from "../context/CreateContext";
import { useGetApi } from "../Api/useGetApi";

const SubCard = ({ data }) => {
  const navigate = useNavigate();
  const { page, setPage } = useContext(CreateContext);
  const bottomRef = useRef(null);
  const [newsCount, setNewsCount] = useState({});

  const articles = useMemo(() => data || [], [data]);

  const handleClick = useCallback(
    (id, article) => {
      navigate(`/article/${id}`, { state: { article } });
    },
    [navigate],
  );

  useEffect(() => {
    const fetchCount = async () => {
      const responseData = await useGetApi("/newsapi/count");
      setNewsCount(responseData);
    };
    fetchCount();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const limit_cal = page * 10;
          const category = localStorage.getItem("category");
          if (
            category &&
            limit_cal <=
              Math.ceil(
                parseInt(newsCount?.count?.categories?.[category] / 10) || 0,
              ) *
                10
          ) {
            setPage((prev) => prev + 1);
          } else if (
            limit_cal <=
            Math.ceil(parseInt(newsCount?.count?.total || 0) / 10) * 10
          ) {
            setPage((prev) => prev + 1);
          }
        }
      },
      { threshold: 0.15 },
    );

    const current = bottomRef.current;
    if (current) {
      observer.observe(current);
    }
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [page, newsCount, setPage]);

  if (!articles.length) {
    return (
      <div className="sub-card">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="article-card article-card--skeleton">
            <div className="article-card__image skeleton" />
            <div className="article-card__content">
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--meta" />
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--line" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="sub-card">
      {articles.map((elm, index) => (
        <button
          key={elm._id ? `${elm._id}-${index}` : index}
          type="button"
          className="article-card"
          onClick={() => handleClick(elm._id, elm)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleClick(elm._id, elm);
            }
          }}
          aria-label={`Open article ${elm.heading}`}
        >
          <img
            src={elm.image}
            alt={elm.heading || "News image"}
            loading="lazy"
          />
          <div className="article-card__content">
            <div className="article-card__meta">
              <span>{elm.author || "Daily News Flow"}</span>
              <span>{elm.publishedDate}</span>
            </div>
            <div className="article-card__tags">
              <span>{elm.category}</span>
              <span>{elm.estimatedReadTime} min read</span>
            </div>
            <h3>{elm.heading}</h3>
            <p>{elm.content?.slice(0, 180)}...</p>
            <span className="article-card__cta">Read More</span>
          </div>
        </button>
      ))}
      <div ref={bottomRef} className="sub-card__sentinel" aria-hidden="true" />
    </div>
  );
};

export default React.memo(SubCard);
