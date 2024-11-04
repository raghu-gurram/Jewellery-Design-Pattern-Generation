import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import your styles if necessary

const Home = () => {
    return (
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
                {["img1.jpeg", "img2.jpeg", "img3.png", "img4.jpg", "img5.jpg", "img6.jpg", "image copy 4.png", "image copy 3.png", "img9.jpg", "image copy.png"].map((src, index) => (
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
                            <Link to="/" target="_blank" className="btn btn-primary">Get Started</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center border p-4">
                            <h3>Sketches to Reality</h3>
                            <p>
                                Turn your rough sketches into fully rendered, realistic images, making your designs look professional and refined.
                            </p>
                            <Link to="/" target="_blank" className="btn btn-primary">Get Started</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-center border p-4">
                            <h3>From Monochrome to Multicolor</h3>
                            <p>
                                Reimagine grayscale images with vibrant colors, breathing new life into them with our advanced colorization service.
                            </p>
                            <Link to="/" target="_blank" className="btn btn-primary">Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer style={{ marginTop: "50px", textAlign: "center" }}>
                Copyright &copy; Halsvar 2024
            </footer>
        </>
    );
};

export default Home;
