import React, { useState } from "react";

const FAQ = ({ Questions }) => {
  const [openId, setOpenId] = useState(null);

  const handleClick = (id) => {
    setOpenId(openId === id ? null : id); // toggle
  };

  return (
    <div id="FAQ">
      <h3>
        <b>FAQ</b>
      </h3>

      <ol>
        {Questions.map((elm) => (
          <li key={elm._id}>
            <h5>{elm.Q}</h5>

            {openId === elm._id ? (
              <>
                <p>{elm.A}</p>
              </>
            ) : (
              <button
                className="btn btn-outline-dark"
                onClick={() => handleClick(elm._id)}
              >
                Show Answer
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FAQ;
