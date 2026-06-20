import React from "react";
import loader from "../../Images/Loader.gif";

const Loader = () => {
  return (
    <div className="loader" role="status" aria-live="polite" aria-busy="true">
      <img src={loader} alt="Loading content" />
      <p>Loading the latest stories…</p>
    </div>
  );
};

export default Loader;
