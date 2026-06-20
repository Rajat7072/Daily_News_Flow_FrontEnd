import React, { useState } from "react";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import { SEO } from "./components/SEO";
import { getCanonicalUrl } from "./utils/seoHelpers";

const Login = () => {
  const [loginVal, setLoginVal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("credentials", loginVal);
    navigate("/adminPanel");
  };

  return (
    <>
      <SEO
        title="Admin Login | Daily News Flow"
        description="Login to access the admin panel for Daily News Flow and manage news content."
        keywords="admin login, news admin, Daily News Flow login"
        url={getCanonicalUrl("/login")}
        type="website"
        noindex
      />
      <main className="page-section" aria-labelledby="login-heading">
        <Heading heading="Login" />
        <form className="contact-us" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password here"
            name="password"
            value={loginVal}
            onChange={(e) => setLoginVal(e.target.value)}
            required
          />
          <button type="submit" className="button button--primary">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
