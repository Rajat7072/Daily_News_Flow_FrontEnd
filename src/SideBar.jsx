import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetApi } from "./Api/useGetApi";
import CreateContext from "./context/CreateContext";
import { useToast } from "./useToast";

const SideBar = () => {
  const showToast = useToast();
  const { newsData, setNewsDate, page, setPage } = useContext(CreateContext);
  const navigate = useNavigate();
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
    if (response.articles.length) {
      setNewsDate(response.articles);
    } else {
      localStorage.removeItem("category");
      showToast(
        " No Articles are present in this section",
        2500,
        "😊",
        "top-right",
      );
    }
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            onClick={() => handleClick("Home")}
            to="/"
          >
            <i>Daily News Flow</i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Daily News Flow
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    data-bs-dismiss="offcanvas"
                    onClick={() => handleClick("Home")}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link
                        onClick={() => handleClick("Science")}
                        className="dropdown-item"
                        data-bs-dismiss="offcanvas"
                      >
                        Science
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Politics")}
                        data-bs-dismiss="offcanvas"
                      >
                        Politics
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Technology")}
                        data-bs-dismiss="offcanvas"
                      >
                        Technology
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Sports")}
                        data-bs-dismiss="offcanvas"
                      >
                        Sports
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Research")}
                        data-bs-dismiss="offcanvas"
                      >
                        Research
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Education")}
                        data-bs-dismiss="offcanvas"
                      >
                        Education
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Business")}
                        data-bs-dismiss="offcanvas"
                      >
                        Business
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Health")}
                        data-bs-dismiss="offcanvas"
                      >
                        Health
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleClick("Environment")}
                        data-bs-dismiss="offcanvas"
                      >
                        Environment
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" to="#">
                        About Comptetive Exams
                      </Link>
                    </li> */}
                  </ul>
                </li>
              </ul>
              {/* <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form> */}
              <Link
                className="dropdown-item"
                data-bs-dismiss="offcanvas"
                onClick={() => navigate("/aboutus")}
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
