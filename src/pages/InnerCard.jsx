import React, { useContext, useMemo, useState, useEffect } from "react";
import FAQ from "../components/FAQ";
import CreateContext from "../context/CreateContext";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetFilterApi } from "../Api/useGetApi";
import { generateFAQSchema, truncateText } from "../utils/seoHelpers";

const InnerCard = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { newsData } = useContext(CreateContext);
  const [article, setArticle] = useState(state?.article ?? null);
  const [loading, setLoading] = useState(!state?.article);
  const [error, setError] = useState(null);

  const cachedArticle = useMemo(
    () => newsData.find((elm) => elm._id === id),
    [newsData, id],
  );

  useEffect(() => {
    if (cachedArticle) {
      setArticle(cachedArticle);
      setLoading(false);
      return;
    }

    if (state?.article) {
      setArticle(state.article);
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await useGetFilterApi("/newsapi/article", { id });
        if (response?.articles?.length > 0) {
          setArticle(response.articles[0]);
        } else if (response?.article) {
          setArticle(response.article);
        } else {
          const fallbackResponse = await useGetFilterApi(
            `/newsapi/article/${id}`,
          );
          if (fallbackResponse?.article) {
            setArticle(fallbackResponse.article);
          } else if (fallbackResponse?.articles?.length > 0) {
            setArticle(fallbackResponse.articles[0]);
          } else {
            setError("Article not found.");
          }
        }
      } catch (fetchError) {
        setError(fetchError?.error || "Unable to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [cachedArticle, id, state]);

  const articleContent = useMemo(() => {
    if (!article?.content) return "";
    return typeof article.content === "string"
      ? article.content
      : String(article.content);
  }, [article]);

  const breadcrumbs = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "Article", path: `/article/${id}` },
    ],
    [id],
  );

  if (loading) {
    return (
      <main className="page-section" aria-busy="true">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-section">
        <div className="error-card">
          <h2>Unable to load article</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return article ? (
    <article className="Inner-Card" aria-labelledby="article-heading">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          {breadcrumbs.map((crumb) => (
            <li key={crumb.path}>
              <a href={crumb.path}>{crumb.label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="article-hero">
        <img
          src={article.image}
          alt={article.heading || "News visual"}
          className="inner-card-img"
          loading="lazy"
        />
      </div>
      <header className="article-header">
        <p className="article-label">Featured article</p>
        <h1 id="article-heading">{article.heading || "Article loaded"}</h1>
        <div className="article-meta">
          <span>{article.author || "Daily News Flow"}</span>
          <span>{article.publishedDate}</span>
          <span>{article.category}</span>
        </div>
      </header>
      <section className="article-body">
        <p>{articleContent}</p>
        {Array.isArray(article.SubContent) &&
          article.SubContent.map((element, index) => (
            <section key={index} className="article-section">
              <h2>{element.heading}</h2>
              <p>{element.subSummary}</p>
              <ul>
                {Array.isArray(element.bulletPoints) &&
                  element.bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
              </ul>
            </section>
          ))}
      </section>
      <section className="article-closing">
        <p>{article.closingStatement}</p>
      </section>
      <FAQ Questions={article.Questions || []} />
    </article>
  ) : (
    <main className="page-section" aria-busy="true">
      <Loader />
    </main>
  );
};

export default InnerCard;
