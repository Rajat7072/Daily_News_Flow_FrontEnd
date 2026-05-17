import React from "react";
import MainCard from "./MainCard";
import LatestUpdates from "./LatestUpdates";
import FloatingButton from "./FloatingButton";

const Card = () => {
  return (
    <div className="card">
      <MainCard />
      <LatestUpdates />
    </div>
  );
};

export default Card;
