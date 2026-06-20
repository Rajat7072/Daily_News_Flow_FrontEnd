import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetApi } from "../Api/useGetApi";
import CreateContext from "../context/CreateContext";
import { useToast } from "../hooks/useToast";
import { useDarkMode } from "../hooks/useCustomHooks";

const categories = [
  "Home",
  "Science",
  "Politics",
  "Technology",
  "Sports",
  "Research",
  "Education",
  "Business",
  "Health",
  "Environment",
];

const categoryIcons = {
  Home: "🏠",
  Science: "🔬",
  Politics: "🗳️",
  Technology: "💻",
  Sports: "🏅",
  Research: "🧪",
  Education: "🎓",
  Business: "💼",
  Health: "❤️",
  Environment: "🌿",
  "About Us": "ℹ️",
};

const SideBar = () => {
  const showToast = useToast();
  const { setNewsDate, setPage } = useContext(CreateContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleClick = async (type) => {
    const url = "/newsapi/article?page=1&limit=10";
    let response;

    if (type === "Home") {
      response = await useGetApi(`${url}`);
      localStorage.removeItem("category");
    } else {
      localStorage.setItem("category", type);
      response = await useGetApi(`${url}&category=${type}`);
    }

    setPage(1);
    if (response?.articles?.length) {
      setNewsDate(response.articles);
    } else {
      localStorage.removeItem("category");
      showToast(
        "No articles are present in this section.",
        2500,
        "😊",
        "top-right",
      );
    }
    closeMenu();
    navigate("/");
  };

  return (
    <header className="app-nav">
      <div className="app-nav__brand">
        <button
          type="button"
          className="app-nav__logo"
          onClick={() => handleClick("Home")}
        >
          <span className="app-nav__logo-mark">DF</span>
          <span>
            <strong>Daily News Flow</strong>
          </span>
        </button>
        <button
          type="button"
          className="app-nav__theme-toggle"
          onClick={toggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={isDark}
        >
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>
        <button
          type="button"
          className={`app-nav__toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`app-nav__menu ${menuOpen ? "app-nav__menu--open" : ""}`}
        aria-label="Primary navigation"
      >
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className="app-nav__link"
                onClick={() => handleClick(category)}
              >
                <span className="app-nav__link-icon">
                  {categoryIcons[category] || "•"}
                </span>
                {category}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="app-nav__link app-nav__link--secondary"
              onClick={() => {
                closeMenu();
                navigate("/aboutus");
              }}
            >
              <span className="app-nav__link-icon">
                {categoryIcons["About Us"]}
              </span>
              About Us
            </button>
          </li>
        </ul>
      </nav>

      {menuOpen && (
        <div
          className="app-nav__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default SideBar;
