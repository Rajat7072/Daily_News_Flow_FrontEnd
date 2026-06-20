import React, { useState } from "react";

const FAQ = ({ Questions }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="FAQ"
      className="faq-section"
      aria-label="Frequently asked questions"
    >
      <div className="faq-section__header">
        <h3>FAQ</h3>
        <p>
          Answers to common questions about the news platform and article
          format.
        </p>
      </div>
      <ol className="faq-list">
        {Questions?.map((elm) => {
          const questionId = `faq-question-${elm._id}`;
          const answerId = `faq-answer-${elm._id}`;
          const isOpen = openId === elm._id;

          return (
            <li
              key={elm._id}
              className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
            >
              <button
                type="button"
                id={questionId}
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => handleToggle(elm._id)}
              >
                <span>{elm.Q}</span>
              </button>
              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className={`faq-answer ${isOpen ? "faq-answer--open" : ""}`}
                hidden={!isOpen}
              >
                <p>{elm.A}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default FAQ;
