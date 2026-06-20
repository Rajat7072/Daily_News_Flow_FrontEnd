import React, { useContext, memo } from "react";
import SubCard from "./SubCard";
import FloatingButton from "./FloatingButton";
import Loader from "./Loader";
import CreateContext from "../context/CreateContext";

const MainCard = () => {
  const { newsData } = useContext(CreateContext);

  return (
    <div className="MainCard">
      {!newsData.length ? (
        <div className="MainCard__loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="MainCard__header">
            <span>Top Stories</span>
            <p className="MainCard__subtitle">
              Fresh, AI-curated headlines with deep context and premium
              readability.
            </p>
          </div>
          <SubCard data={newsData} />
          <FloatingButton />
        </>
      )}
    </div>
  );
};

export default memo(MainCard);
