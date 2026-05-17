import React from "react";
import loader from "../Images/Loader.gif";

const Loader = () => {
  return (
    <div className="h2-latest-updates" style={{ marginTop: "60px" }}>
      <img src={loader} alt="Loader" />
    </div>
  );
};

export default Loader;
