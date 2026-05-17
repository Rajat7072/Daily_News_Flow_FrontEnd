import React from "react";

const Carousel = () => {
  return (
    <>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <p>
              "Knowledge is power." - Francis Bacon Staying updated with current
              events gives you the power to understand the world better and
              participate meaningfully in society
            </p>
          </div>
          <div className="carousel-item">
            <p>
              News is what somebody somewhere wants to suppress; all the rest is
              advertising." - Lord Northcliffe Reading diverse news sources
              helps you uncover important truths and see beyond surface-level
              information.
            </p>
          </div>
          <div className="carousel-item">
            <p>
              An informed citizen is the best defense against tyranny." - Thomas
              Jefferson Reading news keeps you aware of what's happening in the
              world and empowers you to make informed decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
