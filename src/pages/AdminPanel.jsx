import React, { useState, useEffect, useCallback } from "react";
import { usePostApi } from "./Api/usePostApi";
import { useGetApi, useGetFilterApi } from "./Api/useGetApi";
import { usePutApi } from "./Api/usePutApi";
import { useToast } from "./useToast";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDeleteApi } from "./Api/useDeleteApi";
import { SEO } from "./components/SEO";
import { getCanonicalUrl } from "./utils/seoHelpers";
const secret_key = import.meta.env.VITE_SECRET_CRED;

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const cred = localStorage.getItem("credentials");
  const showToast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cred || cred !== secret_key) {
      showToast(
        "You are not authorised to perform this action.",
        2500,
        "😊",
        "top-right",
      );
      navigate("/");
    }
  }, [cred, navigate, showToast]);

  const [news, setNews] = useState({
    extractArticle: "",
    fetchArticleInput: "",
    fetchArticleTextArea: "",
    textAreaUpdatedArticle: "",
    imageUrl: "",
    deleteArticle: "",
    articleArray: "",
  });
  const [file, setFile] = useState(null);

  const updateNews = useCallback((key, value) => {
    setNews((current) => ({ ...current, [key]: value }));
  }, []);

  const callToastFunc = useCallback(
    (dataResponse) => {
      setLoading(false);
      if (!dataResponse) {
        showToast("Server is not responding.", 2500, "😊", "top-right");
      } else if (dataResponse === "Article") {
        showToast("Article fetched successfully.", 2500, "😊", "top-right");
      } else if (dataResponse?.success) {
        showToast(dataResponse.msg, 2500, "😊", "top-right");
      } else {
        const errors = dataResponse?.error?.errors || dataResponse?.error;
        showToast(
          errors?.[0]?.msg || errors || "Unable to complete request.",
          2500,
          "😅",
          "top-right",
        );
      }
    },
    [showToast],
  );

  const handleFileChange = useCallback((event) => {
    setFile(event.target.files[0]);
  }, []);

  const handleClick = useCallback(
    async (type) => {
      try {
        setLoading(true);
        let dataResponse;
        if (type === "article") {
          dataResponse = await usePostApi("/newsapi/extractArticle", {
            url: news.extractArticle,
            Imgurl: news.imageUrl,
          });
          updateNews("extractArticle", "");
          await usePutApi("/newsapi/count", {
            params: dataResponse.response,
            type: "Increase",
          });
          callToastFunc(dataResponse);
        } else if (type === "heading") {
          dataResponse = await useGetFilterApi("/newsapi/article", {
            heading: news.fetchArticleInput,
          });
          updateNews(
            "fetchArticleTextArea",
            JSON.stringify(dataResponse.articles[0]),
          );
          updateNews("fetchArticleInput", "");
          callToastFunc("Article");
        } else if (type === "textAreaUpdatedArticle") {
          const updatedNewsArticle = JSON.parse(news.textAreaUpdatedArticle);
          dataResponse = await usePutApi(
            "/newsapi/article",
            updatedNewsArticle,
          );
          updateNews("textAreaUpdatedArticle", "");
          callToastFunc(dataResponse);
        } else if (type === "deleteArticle") {
          dataResponse = await useDeleteApi(
            "/newsapi/article",
            news.deleteArticle,
          );
          await usePutApi("/newsapi/count", {
            params: dataResponse.category,
            type: "Decrease",
          });
          updateNews("deleteArticle", "");
          callToastFunc(dataResponse);
        } else {
          const articleArray = JSON.parse(news.articleArray);
          dataResponse = await usePostApi(
            "/newsapi/getLatestNews",
            articleArray,
          );
          updateNews("fetchArticleInput", "");
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
    },
    [news, updateNews, callToastFunc, showToast],
  );

  const handleImageClick = useCallback(async () => {
    try {
      setLoading(true);
      if (!file) {
        showToast("Please select a file first!", 2500, "😅", "top-right");
        return;
      }
      const formData = new FormData();
      formData.append("myFile", file);
      const myResponse = await usePostApi("/newsapi/upload", formData);
      updateNews("imageUrl", myResponse.url);
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
  }, [file, showToast, updateNews]);

  return cred && loading === true ? (
    <Loader />
  ) : (
    <>
      <SEO
        title="Admin Panel | Daily News Flow"
        description="Admin dashboard for Daily News Flow to ingest, update, and manage news content."
        keywords="admin panel, news management, content admin"
        url={getCanonicalUrl("/adminPanel")}
        type="website"
        noindex
      />
      <main
        className="admin-panel"
        aria-label="Admin controls"
        aria-busy={loading}
      >
        <header className="admin-panel__header">
          <h1>Admin Panel</h1>
          <p>Manage article ingestion, updates, and publication settings.</p>
        </header>

        <section className="admin-panel__section">
          <h2>Upload Article Image</h2>
          <label className="sr-only" htmlFor="fileUpload">
            Article image file
          </label>
          <input
            type="file"
            id="fileUpload"
            name="myFile"
            onChange={handleFileChange}
            disabled={loading}
            aria-describedby="file-description"
          />
          <p id="file-description" className="sr-only">
            Upload a file to assign as the article thumbnail image.
          </p>
          <button
            type="button"
            className="button button--secondary"
            onClick={handleImageClick}
            disabled={loading}
          >
            Upload Image
          </button>
          <input
            type="text"
            className="input-image-url"
            placeholder="Image URL response"
            value={news.imageUrl}
            onChange={(e) => updateNews("imageUrl", e.target.value)}
            disabled={loading}
          />
        </section>

        <section className="admin-panel__section">
          <h2>Extract Article</h2>
          <label className="sr-only" htmlFor="extract-article">
            Article URL or text to extract
          </label>
          <input
            id="extract-article"
            type="text"
            placeholder="URL or text to extract news"
            value={news.extractArticle}
            onChange={(e) => updateNews("extractArticle", e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="button button--primary"
            onClick={() => handleClick("article")}
            disabled={loading}
          >
            Add Article
          </button>
        </section>

        <section className="admin-panel__section">
          <h2>Delete Article</h2>
          <label className="sr-only" htmlFor="delete-article">
            Enter the heading of the article to delete
          </label>
          <input
            id="delete-article"
            type="text"
            placeholder="Heading of article to delete"
            value={news.deleteArticle}
            onChange={(e) => updateNews("deleteArticle", e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="button button--secondary"
            onClick={() => handleClick("deleteArticle")}
            disabled={loading}
          >
            Delete Article
          </button>
        </section>

        <section className="admin-panel__section">
          <h2>Update Today’s News</h2>
          <label className="sr-only" htmlFor="article-array">
            Paste the article array JSON here
          </label>
          <textarea
            id="article-array"
            rows="4"
            placeholder="Paste the article array JSON here"
            value={news.articleArray}
            onChange={(e) => updateNews("articleArray", e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="button button--primary"
            onClick={() => handleClick("latestNews")}
            disabled={loading}
            aria-disabled={loading}
          >
            Add Latest News
          </button>
        </section>

        <section className="admin-panel__section">
          <h2>Fetch Article</h2>
          <label className="sr-only" htmlFor="fetch-article-heading">
            Heading to fetch the article
          </label>
          <input
            id="fetch-article-heading"
            type="text"
            placeholder="Heading to fetch the article"
            value={news.fetchArticleInput}
            onChange={(e) => updateNews("fetchArticleInput", e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            className="button button--primary"
            onClick={() => handleClick("heading")}
            disabled={loading}
          >
            Get Selected Article
          </button>
          <label className="sr-only" htmlFor="fetched-article-json">
            Fetched article JSON response
          </label>
          <textarea
            id="fetched-article-json"
            rows="5"
            placeholder="Fetched article JSON appears here"
            value={news.fetchArticleTextArea}
            onChange={(e) => updateNews("fetchArticleTextArea", e.target.value)}
            disabled={loading}
          />
        </section>

        <section className="admin-panel__section">
          <h2>Edit Article JSON</h2>
          <label className="sr-only" htmlFor="update-article-json">
            Paste article JSON to update
          </label>
          <textarea
            id="update-article-json"
            rows="5"
            placeholder="Paste article JSON to update"
            value={news.textAreaUpdatedArticle}
            onChange={(e) =>
              updateNews("textAreaUpdatedArticle", e.target.value)
            }
            disabled={loading}
          />
          <button
            type="button"
            className="button button--secondary"
            onClick={() => handleClick("textAreaUpdatedArticle")}
            disabled={loading}
            aria-disabled={loading}
          >
            Update Article
          </button>
        </section>
      </main>
    </>
  );
};

export default AdminPanel;
