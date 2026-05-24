import React, { useState, useEffect } from "react";
import { usePostApi } from "./Api/usePostApi";
import { useGetApi, useGetFilterApi } from "./Api/useGetApi";
import { usePutApi } from "./Api/usePutApi";
import axios from "axios";
import { useToast } from "./useToast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDeleteApi } from "./Api/useDeleteApi";
const secret_key = import.meta.env.VITE_SECRET_CRED;

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const cred = localStorage.getItem("credentials");
  const showToast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cred || cred !== secret_key) {
      showToast(
        "You Are not Authorised to Perform this action",
        2500,
        "😊",
        "top-right",
      );
      navigate("/");
    }
  }, [cred, navigate]);

  const [news, setNews] = useState({
    extractArticle: "",
    fetchArticleInput: "",
    fetchArticleTextArea: "",
    textAreaUpdatedArticle: "",
    imageUrl: "",
    deleteArticle: "",
    articleArray: [],
  });
  const [file, setFile] = useState(null);

  const callToastFunc = (dataResponse) => {
    setLoading(false);
    if (!dataResponse) {
      dataResponse = "Server is Not Responding";
      showToast(dataResponse, 2500, "😊", "top-right");
    } else if (dataResponse === "Article") {
      dataResponse = "Article Fetched Successfully";
      showToast(dataResponse, 2500, "😊", "top-right");
    } else if (dataResponse?.success) {
      showToast(dataResponse?.msg, 2500, "😊", "top-right");
    } else if (!dataResponse?.error?.success) {
      const data = dataResponse?.error?.errors
        ? dataResponse?.error?.errors
        : dataResponse.error;
      showToast(data[0]?.msg ? data[0]?.msg : data, 2500, "😅", "top-right");
    }
  };
  const handleFileChange = async (event) => {
    setFile(event.target.files[0]); // store selected file
  };
  const handleChange = (event, type) => {
    if (type === "extractArticle") {
      setNews({ ...news, extractArticle: event.target.value });
    } else if (type === "fetchArticleInput") {
      setNews({ ...news, fetchArticleInput: event.target.value });
    } else if (type === "fetchArticleTextArea") {
      setNews({ ...news, fetchArticleTextArea: event.target.value });
    } else if (type === "textAreaUpdatedArticle") {
      setNews({ ...news, textAreaUpdatedArticle: event.target.value });
    } else if (type === "imageUrl") {
      setNews({ ...news, imageUrl: event.target.value });
    } else if (type === "deleteArticle") {
      setNews({ ...news, deleteArticle: event.target.value });
    } else if (type === "articleArray") {
      setNews({ ...news, articleArray: event.target.value });
    }
  };

  const handleClick = async (type) => {
    try {
      setLoading(true);
      let dataResponse;
      if (type === "article") {
        dataResponse = await usePostApi("/newsapi/extractArticle", {
          url: news.extractArticle,
          Imgurl: news.imageUrl,
        });
        setNews({ ...news, extractArticle: "" });
        const responseNewsCountSaved = await usePutApi("/newsapi/count", {
          params: dataResponse.response,
          type: "Increase",
        });
        callToastFunc(dataResponse);
      } else if (type === "heading") {
        dataResponse = await useGetFilterApi("/newsapi/article", {
          heading: news.fetchArticleInput,
        });
        setNews({
          ...news,
          fetchArticleTextArea: JSON.stringify(dataResponse.articles[0]),
          fetchArticleInput: "",
        });
        callToastFunc("Article");
      } else if (type === "textAreaUpdatedArticle") {
        const updatedNewsArticle = JSON.parse(news.textAreaUpdatedArticle);
        dataResponse = await usePutApi("/newsapi/article", updatedNewsArticle);
        setNews({ ...news, textAreaUpdatedArticle: "" });
        callToastFunc(dataResponse);
      } else if (type === "deleteArticle") {
        dataResponse = await useDeleteApi(
          "/newsapi/article",
          news.deleteArticle,
        );
        const responseNewsCountSaved = await usePutApi("/newsapi/count", {
          params: dataResponse.category,
          type: "Decrease",
        });
        setNews({ ...news, deleteArticle: "" });
        const toastSend = {
          success: dataResponse.success,
          status: dataResponse.status,
          msg: dataResponse.msg,
        };
        callToastFunc(dataResponse);
      } else {
        const articleArray = JSON.parse(news.articleArray);
        dataResponse = await usePostApi("/newsapi/getLatestNews", articleArray);
        setNews({ ...news, fetchArticleInput: "" });
        callToastFunc(dataResponse);
      }
    } catch (error) {
      showToast(
        "An error occurred. Please try again.",
        2500,
        "😅",
        "top-right",
      );
    } finally {
      setLoading(false);
    }
  };
  const handleImageClick = async () => {
    try {
      setLoading(true);
      if (!file) {
        showToast("Please select a file first!", 2500, "😅", "top-right");
        return;
      }
      const formData = new FormData();
      formData.append("myFile", file);
      const myResponse = await usePostApi("/newsapi/upload", formData);
      setNews({ ...news, imageUrl: myResponse.url });
    } catch (error) {
      showToast(
        "Failed to upload image. Please try again.",
        2500,
        "😅",
        "top-right",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {cred && loading === true ? (
        <Loader />
      ) : (
        <div className="admin-panel">
          <h2>Admin Panel</h2>
          <div id="border" className="mediaSmall">
            <h5>Click Below To Add Article Image:</h5>
            <input
              type="file"
              id="fileUpload"
              name="myFile"
              onChange={handleFileChange}
            />
            <button
              className="btn btn-outline-dark"
              type="button"
              onClick={handleImageClick}
            >
              Upload Image
            </button>
            <input
              className="input-image-url"
              type="text"
              placeholder="Image Url Response"
              value={news.imageUrl}
              onChange={(e) => handleChange(e, "imageUrl")}
            />
          </div>
          <div id="border">
            <h5>Click Below To Add The Desired Extracted Article:</h5>
            <input
              type="text"
              placeholder="Place url or text for which News needs to be extracted"
              value={news.extractArticle}
              onChange={(e) => handleChange(e, "extractArticle")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => handleClick("article")}
            >
              Add Article
            </button>
          </div>
          <div id="border">
            <h5>Click Below To Delete The Desired Article:</h5>
            <input
              type="text"
              placeholder="Place heading for the Article to be deleted"
              value={news.deleteArticle}
              onChange={(e) => handleChange(e, "deleteArticle")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => handleClick("deleteArticle")}
            >
              Delete Article
            </button>
          </div>
          <div id="border">
            <h5>Click Below To Update Latest News For Today:</h5>
            <input
              type="text"
              placeholder="Place The Array of Article"
              value={news.articleArray}
              onChange={(e) => handleChange(e, "articleArray")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleClick}
            >
              Add Latest News
            </button>
          </div>
          <div id="border">
            <h5>Click Below To Get The Selected Article:</h5>
            <input
              type="text"
              placeholder="Place The Heading To Fetch The Article"
              value={news.fetchArticleInput}
              onChange={(e) => handleChange(e, "fetchArticleInput")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => handleClick("heading")}
            >
              Get The Selected Article
            </button>
            <textarea
              style={{ marginTop: "10px" }}
              value={news.fetchArticleTextArea}
              onChange={(e) => handleChange(e, "fetchArticleTextArea")}
            />
          </div>
          <div id="border" style={{ display: "flex", flexDirection: "column" }}>
            <h5>Click Below To Update The Particular Article:</h5>
            <textarea
              style={{ marginTop: "10px" }}
              value={news.textAreaUpdatedArticle}
              onChange={(e) => handleChange(e, "textAreaUpdatedArticle")}
            />
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => handleClick("textAreaUpdatedArticle")}
            >
              Update The Selected Article
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
