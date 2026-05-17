import React, { useContext, useState, useRef, useEffect } from "react";
import SubCard from "./SubCard";
import FloatingButton from "./FloatingButton";
import CreateContext from "./context/CreateContext";
import Loader from "./Loader";

const MainCard = () => {
  const { newsData, page, setPage } = useContext(CreateContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      },
    );
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [setPage]);

  return (
    <>
      {!newsData.length ? (
        <div className="MainCard">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="MainCard">
            <SubCard data={newsData} />
          </div>
          <div ref={bottomRef} style={{ height: "20px", marginTop: "20px" }} />
          <FloatingButton />
        </div>
      )}
    </>
  );
};

export default MainCard;
