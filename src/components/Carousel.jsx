import React, { useEffect, useMemo, useState } from "react";

const quotes = [
  {
    text: "Knowledge is power. Staying updated with current events gives you the power to understand the world better and participate meaningfully in society.",
    author: "Francis Bacon",
  },
  {
    text: "News is what somebody somewhere wants to suppress; all the rest is advertising. Reading diverse news sources helps you uncover important truths.",
    author: "Lord Northcliffe",
  },
  {
    text: "An informed citizen is the best defense against tyranny. Reading news keeps you aware of what's happening in the world and empowers you to make informed decisions.",
    author: "Thomas Jefferson",
  },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const currentQuote = useMemo(() => quotes[index], [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      <div className="carousel-item">
        <p>{currentQuote.text}</p>
        <footer className="carousel-caption">— {currentQuote.author}</footer>
      </div>
      <div className="carousel-indicators" aria-label="Quote navigation">
        {quotes.map((_, step) => (
          <button
            key={step}
            type="button"
            className={`carousel-indicator ${step === index ? "is-active" : ""}`}
            aria-label={`Show quote ${step + 1}`}
            aria-pressed={step === index}
            onClick={() => setIndex(step)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
