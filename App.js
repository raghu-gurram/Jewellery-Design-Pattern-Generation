import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faHouse, faRightToBracket, faCog } from "@fortawesome/free-solid-svg-icons";
import Login from './login';
import Dashboard from "./dashboard";
import Text from "./text";
import Sketch from "./sketch";
import Black from "./black";
import Contact from "./contactus";

import "./App.css";

function Main() {
  const location = useLocation();
  const noNavbarPaths = ['/dashboard', '/text', '/sketch', '/black'];

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#000000" }}>
          <Link className="navbar-brand" to="/">Jewellery</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  <FontAwesomeIcon icon={faHouse} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <FontAwesomeIcon icon={faRightToBracket} /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  <FontAwesomeIcon icon={faPhone} /> Contact Us
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faCog} /> Services
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/text">Text to Image</Link>
                  <Link className="dropdown-item" to="/black">Black & White to Color</Link>
                  <Link className="dropdown-item" to="/sketch">Sketch to Image</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/text" element={<Text />} />
        <Route path="/sketch" element={<Sketch />} />
        <Route path="/black" element={<Black />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/" element={
          <>
            <div className="started">
              <h1>Visualize Your Jewelry Designs Like Never Before</h1>
              <p>
                Bring your designs to life with realistic imagery, offering diverse enhancements.
                <br />
                Our platform seamlessly refines your creations with precision, giving you a true-to-life preview of the final piece.
              </p>
            </div>

            <div className="scroll-container">
              {["img1.jpeg", "imag2.jpeg", "img3.png", "img4.jpg", "img5.jpg", "img6.jpg", "image copy 4.png", "image copy 3.png", "img9.jpg", "image copy.png"].map((src, index) => (
                <div key={index} className="scroll-item">
                  <img src={src} alt={`Image ${index}`} className="image" />
                </div>
              ))}
            </div>

            <h1>Services We Offer</h1>
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center border p-4">
                    <h3>From Text to Visuals</h3>
                    <p>
                      Transform your ideas into vivid visuals by simply providing descriptive text, and we'll generate images that capture your vision.
                    </p>
                    <Link to="/text" className="btn btn-primary">Get Started</Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center border p-4">
                    <h3>Sketches to Reality</h3>
                    <p>
                      Turn your rough sketches into fully rendered, realistic images, making your designs look professional and refined.
                    </p>
                    <Link to="/sketch" className="btn btn-primary">Get Started</Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center border p-4">
                    <h3>From Monochrome to Multicolor</h3>
                    <p>
                      Reimagine grayscale images with vibrant colors, breathing new life into them with our advanced colorization service.
                    </p>
                    <Link to="/black" className="btn btn-primary">Get Started</Link>
                  </div>
                </div>
              </div>
            </div>

            <footer style={{ marginTop: "50px", textAlign: "center" }}>
              Copyright &copy; Halsvar 2024
            </footer>
          </>
        } />
      </Routes>
    </>
  );
}

function App() {
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/jf5b2cma6cklix4ssn9bsibvvftwfa6l.js";
    script.async = true;
    document.body.appendChild(script);

    // Delay DOM query until after render
    const scrollContainer = document.querySelector(".scroll-container");
    if (!scrollContainer) return; // Exit if scrollContainer is null

    let scrollTimeout;

    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsUserScrolling(false), 500);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      if (!isUserScrolling) {
        scrollContainer.scrollLeft += scrollContainer.offsetWidth / 3;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 3000);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      document.body.removeChild(script);
    };
  }, [isUserScrolling]);

  return (
    <Router>
      <Main />
    </Router>
  );
}


export default App;
