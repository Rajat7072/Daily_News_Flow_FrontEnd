import React, { useContext } from "react";
import SubCard from "./SubCard";
import FloatingButton from "./FloatingButton";
import Loader from "./Loader";
import CreateContext from "./context/CreateContext";

const MainCard = () => {
  const { newsData } = useContext(CreateContext);

  return (
    <>
      {!newsData.length ? (
        <div className="MainCard">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="MainCard">
            <SubCard data={newsData} />
          </div>
          <FloatingButton />
        </div>
      )}
    </>
  );
};

export default MainCard;
