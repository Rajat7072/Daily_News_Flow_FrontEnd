import { useParams, Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "./Card";
import Carousel from "./Carousel";
import InnerCard from "./InnerCard";
import SideBar from "./SideBar";
import NotFound from "./NotFound";
import ContactUs from "./ContactUs";
import AdminPanel from "./AdminPanel";
import Footer from "./Footer";
import Login from "./Login";
import About from "./About";

function App() {
  const { id } = useParams();
  return (
    <div className="app-container">
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Card />
            </>
          }
        />
        <Route path="/article/:id" element={<InnerCard />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
