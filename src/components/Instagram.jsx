import React, { useState } from "react";
import { usePostApi } from "./Api/usePostApi";

const Instagram = ({ data }) => {
  const [open, setOpen] = useState(true);
  const [resdata, setResdata] = useState({});

  const handleToggle = () => setOpen((current) => !current);

  const handleImgClick = async () => {
    try {
      const response = await usePostApi("/newsapi/instagram", data);
      setResdata(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoClick = async () => {
    try {
      const response = await usePostApi("/newsapi/instagramVideo", resdata);
      console.log("videoResponse", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="instagram-widget">
      <button
        type="button"
        className="button button--secondary"
        onClick={handleToggle}
      >
        Instagram Upload
      </button>

      {!open && (
        <div className="instagram-widget__panel">
          <button
            type="button"
            className="button button--secondary"
            onClick={handleImgClick}
          >
            Get Prompt For Animation
          </button>

          {resdata?.success && (
            <div className="instagram-widget__response">
              <textarea
                readOnly
                value={JSON.stringify(resdata.msg.videoPlan)}
              />
              {/* <button
                className="button button--secondary"
                type="button"
                onClick={handleVideoClick}
              >
                Generate Video
              </button> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Instagram;
