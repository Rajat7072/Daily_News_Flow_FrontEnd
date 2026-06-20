import React, { memo } from "react";
import MainCard from "./MainCard";
import LatestUpdates from "./LatestUpdates";
import { SEO } from "../components/SEO";
import { getCanonicalUrl } from "../utils/seoHelpers";

const Card = memo(() => {
  return (
    <main className="news-layout" aria-label="Latest news and headlines">
      <SEO
        title="Daily News Flow — Latest Headlines"
        description="Explore today’s latest AI-curated news stories, handpicked by category and updated in real time."
        keywords="news, latest headlines, AI news, trending stories, world news"
        url={getCanonicalUrl("/")}
        type="website"
      />
      <section className="news-primary">
        <MainCard />
      </section>
      <aside className="news-secondary" aria-label="Latest headlines">
        <LatestUpdates />
      </aside>
    </main>
  );
});

export default Card;
