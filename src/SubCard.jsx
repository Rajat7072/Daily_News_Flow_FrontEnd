import React from "react";
import dnf from "../Images/Rose-Logo.png";
import { Link, useNavigate } from "react-router-dom";

const SubCard = (probs) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/article/${id}`);
  };
  const { data } = probs;

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
    </div>
  );
};

export default SubCard;
