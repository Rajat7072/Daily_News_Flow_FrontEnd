import React from "react";
import Heading from "./Heading";

const About = () => {
  return (
    <div>
      <Heading heading={"About Us"} />
      <section>
        <p>
          Welcome to Daily News App — your smart destination for the latest
          news, trending stories, and real-time updates powered by Artificial
          Intelligence.
        </p>
        <p>
          Our platform uses advanced AI technology to discover, analyze, and
          generate articles on the most talked-about topics from around the
          world. From breaking news and technology updates to entertainment,
          business, sports, and global trends, we aim to deliver fast, accurate,
          and easy-to-read content for modern readers.
        </p>
      </section>
      <hr />
      <section>
        <h3>What We Do</h3>
        <ul>
          <li>
            Provide AI-generated articles on trending and latest news topics
          </li>
          <li>
            Cover multiple categories including Technology, Business, Sports,
            Entertainment, Health, and World News
          </li>
          <li>
            Deliver quick summaries and detailed insights in a clean reading
            experience
          </li>
          <li>
            Continuously update content to keep readers informed in real time
          </li>
        </ul>
      </section>
      <hr />
      <section>
        <h3>Our Mission</h3>
        <p>
          Our mission is to make news consumption faster, smarter, and more
          accessible using the power of Artificial Intelligence. We believe
          readers should get important information without unnecessary
          complexity or delay.
        </p>
      </section>
      <hr />
      <section>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Fast updates on trending topics</li>
          <li>AI-powered smart content generation</li>
          <li>Clean and user-friendly reading experience</li>
          <li>Multi-category news coverage</li>
          <li>Focus on simplicity, speed, and accessibility</li>
        </ul>
      </section>
      <hr />
      <section>
        <h3>Disclaimer</h3>
        <p>
          While our AI system helps generate and organize content efficiently,
          we continuously work to improve accuracy and reliability. Readers are
          encouraged to verify critical information from official sources when
          necessary.
        </p>
        <p>
          Stay informed. Stay updated. Experience the future of news with Daily
          News Flow.
        </p>
      </section>
    </div>
  );
};

export default About;
