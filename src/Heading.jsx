import React, { memo } from "react";

const Heading = (probs) => {
  const { heading } = probs;
  return (
    <div className="contact-us-heading">
      <b>{heading}</b>
    </div>
  );
};

export default Heading;
