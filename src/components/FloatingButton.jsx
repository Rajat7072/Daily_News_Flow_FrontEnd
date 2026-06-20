import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/contactus");

  return (
    <button
      type="button"
      className="btn-my-class"
      onClick={handleClick}
      aria-label="Contact the Daily News Flow team"
    >
      Contact Us
    </button>
  );
};

export default FloatingButton;
