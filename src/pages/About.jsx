import React from "react";
import Heading from "./Heading";
import { SEO } from "./components/SEO";
import { getCanonicalUrl } from "./utils/seoHelpers";

const About = () => {
  return (
    <>
      <SEO
        title="About Daily News Flow"
        description="Discover the mission and AI-powered approach behind Daily News Flow, your source for modern news delivery."
        keywords="about us, AI news platform, modern news experience"
        url={getCanonicalUrl("/aboutus")}
        type="website"
      />
      <main
        className="page-section page-section--split"
        aria-labelledby="about-heading"
      >
        <Heading heading="About Us" />
        <section className="about-panel">
          <p>
            Welcome to Daily News Flow — your smart destination for the latest
            news, trending stories, and real-time updates powered by Artificial
            Intelligence.
          </p>
          <p>
            Our platform uses advanced AI technology to discover, analyze, and
            generate articles on the most talked-about topics from around the
            world. From breaking news and technology updates to entertainment,
            business, sports, and global trends, we aim to deliver fast,
            accurate, and easy-to-read content for modern readers.
          </p>
        </section>

        <section className="about-grid">
          <article>
            <h3>What We Do</h3>
            <ul>
              <li>
                Provide AI-generated articles on trending and latest news topics
              </li>
              <li>
                Cover multiple categories including Technology, Business,
                Sports, Entertainment, Health, and World News
              </li>
              <li>
                Deliver quick summaries and detailed insights in a clean reading
                experience
              </li>
              <li>
                Continuously update content to keep readers informed in real
                time
              </li>
            </ul>
          </article>

          <article>
            <h3>Our Mission</h3>
            <p>
              Our mission is to make news consumption faster, smarter, and more
              accessible using the power of Artificial Intelligence. We believe
              readers should get important information without unnecessary
              complexity or delay.
            </p>
          </article>

          <article>
            <h3>Why Choose Us?</h3>
            <ul>
              <li>Fast updates on trending topics</li>
              <li>AI-powered smart content generation</li>
              <li>Clean and user-friendly reading experience</li>
              <li>Multi-category news coverage</li>
              <li>Focus on simplicity, speed, and accessibility</li>
            </ul>
          </article>

          <article>
            <h3>Disclaimer</h3>
            <p>
              While our AI system helps generate and organize content
              efficiently, we continuously work to improve accuracy and
              reliability. Readers are encouraged to verify critical information
              from official sources when necessary.
            </p>
            <p>
              Stay informed. Stay updated. Experience the future of news with
              Daily News Flow.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default About;
