import React from "react";
import dnf from "../Images/Rose-Logo.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="not-found">
        <div>
          <img src={dnf} alt="Loading..." />
        </div>
        <div>
          <b>404 Not Found</b>
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
