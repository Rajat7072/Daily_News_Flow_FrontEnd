import React from "react";
import dnf from "../Images/Rose-Logo.png";
import { Link } from "react-router-dom";
import { SEO } from "./components/SEO";
import { getCanonicalUrl } from "./utils/seoHelpers";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found | Daily News Flow"
        description="The page you are looking for was not found. Return to the home page to discover the latest news."
        keywords="404, page not found, news site"
        url={getCanonicalUrl("/404")}
        type="website"
      />
      <main className="not-found" role="main">
        <img src={dnf} alt="Daily News Flow logo" className="not-found__image" />
        <div className="not-found__content">
        <h1>404</h1>
        <p>We couldn’t find that page. Explore the latest headlines instead.</p>
        <Link to="/" className="button button--primary">
          Go back home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
