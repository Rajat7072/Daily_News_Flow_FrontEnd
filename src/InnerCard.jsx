import React from "react";
import dnf from "../Images/Rose-Logo.png";
import FAQ from "./FAQ";
import { useContext } from "react";
import CreateContext from "./context/CreateContext";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

const InnerCard = () => {
  const { id } = useParams();
  const { newsData } = useContext(CreateContext);
  const article = newsData.find((elm) => elm._id == id);

  return (
    <>
      {article ? (
        <div className="Inner-Card">
          <div>
            <img
              src={article.image}
              alt="Loading..."
              className="inner-card-img"
            />
          </div>
          <h3>
            <b>{article.heading}</b>
          </h3>
          <p>{article.content}</p>
          <ul>
            {article.SubContent.map((element, index) => {
              return (
                <div key={index}>
                  <h4>{element.heading}</h4>
                  <p>{element.subSummary}</p>
                  <div style={{ padding: "0 0 0 20px" }}>
                    {element.bulletPoints.map((point, pointIndex) => {
                      return <li key={pointIndex}>{point}</li>;
                    })}
                  </div>
                </div>
              );
            })}
          </ul>
          <p>{article.closingStatement}</p>
          <FAQ Questions={article.Questions} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default InnerCard;
