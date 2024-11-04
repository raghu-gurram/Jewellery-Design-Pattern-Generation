import React, { useState } from "react";
import "./text.css";

function Text() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState("");

    const generateImage = async () => {
        const username = localStorage.getItem("username");

        if (textInput && username) {
            const imageData = { prompt: textInput };

            try {
                setLoading(true);

                const response = await fetch("http://192.168.1.101:5001/generate-image", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(imageData),
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    setImage(imageUrl);

                    // Convert blob to base64 for MongoDB storage
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Image = reader.result.split(",")[1];
                        saveToMongoDB(username, textInput, base64Image);
                    };
                    reader.readAsDataURL(blob);
                } else {
                    const errorData = await response.json();
                    alert("Error from server: " + (errorData.error || "Unknown error"));
                }
            } catch (error) {
                console.error("Error caught:", error);
                alert("Error saving data: " + error.message);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please enter a description and ensure the username is set!");
        }
    };

    const saveToMongoDB = (username, prompt, base64Image) => {
        console.log("Saving image to MongoDB for user:", username);
    };

    return (
        <div className="container">
            <h1>From Text to Visuals</h1>
            <p>
                Transform your ideas into vivid visuals by simply providing descriptive
                text, and we'll generate images that capture your vision.
            </p>

            <div className="input-container">
                <textarea
                    id="textInput"
                    rows="5"
                    placeholder="Enter your description here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                ></textarea>
            </div>

            <div className="button-container">
                <button onClick={generateImage}>Generate Image</button>
            </div>

            {loading && <div className="spinner" />}

            {image && (
                <div id="imageContainer">
                    <img src={image} alt="Generated Visual" />
                </div>
            )}
        </div>
    );
}

export default Text;
