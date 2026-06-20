import { Suspense, lazy, useMemo } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/App_modern.css";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const Carousel = lazy(() => import("./components/Carousel"));
const Card = lazy(() => import("./components/Card"));
const InnerCard = lazy(() => import("./pages/InnerCard"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.35,
};

function App() {
  const location = useLocation();
  const lazyRoutes = useMemo(
    () => [
      {
        path: "/",
        element: (
          <>
            <Carousel />
            <Card />
          </>
        ),
      },
      { path: "/article/:id", element: <InnerCard /> },
      { path: "/contactus", element: <ContactUs /> },
      { path: "/adminPanel", element: <AdminPanel /> },
      { path: "/login", element: <Login /> },
      { path: "/aboutus", element: <About /> },
      { path: "/*", element: <NotFound /> },
    ],
    [],
  );

  return (
    <div className="app-container">
      <SideBar />
      <Suspense
        fallback={
          <div className="page-fallback">
            <Loader />
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {lazyRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <motion.main
                    className="page-shell"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    {route.element}
                  </motion.main>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
