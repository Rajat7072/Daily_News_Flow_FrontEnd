import React, { useState } from "react";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginVal, setLoginVal] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setLoginVal(event.target.value);
  };
  const handleClick = () => {
    localStorage.setItem("credentials", loginVal);
    navigate("/adminPanel");
  };
  return (
    <>
      <Heading heading={"Login"} />
      <form className="contact-us">
        <input
          type="text"
          placeholder="Enter your password here"
          name="name"
          value={loginVal}
          onChange={handleChange}
        />
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
