import React, { useRef, useEffect, useContext } from "react";
import dnf from "../Images/Rose-Logo.png";
import { Link, useNavigate } from "react-router-dom";
import CreateContext from "./context/CreateContext";

const SubCard = (probs) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/article/${id}`);
  };
  const { data } = probs;
  const { page, setPage } = useContext(CreateContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      },
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [setPage]);

  return (
    <div className="sub-card">
      {data.map((elm) => {
        return (
          <div key={elm._id} onClick={() => handleClick(elm._id)}>
            <img src={elm.image} alt="Loading..." />
            <div>
              <div className="my-div">
                <div>
                  <div>{elm.author ? elm.author : "Daily News Flow"}</div>
                  <div>{elm.publishedDate}</div>
                </div>
                <ul style={{ marginLeft: "10px" }}>
                  <li>{elm.category}</li>
                  <li>{elm.estimatedReadTime} min read</li>
                </ul>
              </div>
              <div>
                <b>{elm.heading}</b>
              </div>
              <div>{elm.content.slice(0, 500)}...</div>
              <div
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Read More
              </div>
            </div>
          </div>
        );
      })}
      <div
        ref={bottomRef}
        style={{
          height: "20px",
        }}
      />
    </div>
  );
};

export default SubCard;
