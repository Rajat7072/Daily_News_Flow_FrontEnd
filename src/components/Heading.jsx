import React, { memo } from "react";

const Heading = memo(({ heading }) => {
  return (
    <header className="section-heading">
      <h1>{heading}</h1>
    </header>
  );
});

export default Heading;
