import React, { useState, useEffect } from 'react';
import './black.css';

function Black() {
  const [inputImageSrc, setInputImageSrc] = useState(null);
  const [outputImageSrc, setOutputImageSrc] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(''); // State to store the username

  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('username'); // Adjust key based on your implementation
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const uploadSketch = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Please upload a sketch image!');
      return;
    }

    // Display the uploaded sketch
    setInputImageSrc(URL.createObjectURL(file));
    setOutputImageSrc(null); // Clear previous output image
    setStatusMessage('Uploading image...');
    setLoading(true); // Start loading spinner

    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', username); // Add the username to the form data

    try {
      const response = await fetch('http://localhost:8001/generate-image', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Failed to generate the image');
      }

      const blob = await response.blob();
      const outputImageUrl = URL.createObjectURL(blob);
      setOutputImageSrc(outputImageUrl);
      setStatusMessage('Image colorized successfully!');

      // Save both images to the server using GridFS after the output is generated
      await saveImages(file, outputImageUrl);

    } catch (error) {
      setStatusMessage('Error: ' + error.message);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const saveImages = async (inputFile, outputImageUrl) => {
    const outputImageBlob = await fetch(outputImageUrl).then(res => res.blob());

    const inputFormData = new FormData();
    inputFormData.append('image', inputFile); // Input image
    inputFormData.append('username', username); // Username

    const outputFormData = new FormData();
    outputFormData.append('image', outputImageBlob, 'output_image.png'); // Output image
    outputFormData.append('username', username); // Username

    try {
      // Send input image to the server for storage
      await fetch('http://localhost:5000/save-image', {
        method: 'POST',
        body: inputFormData,
        mode: 'cors',
      });

      // Send output image to the server for storage
      await fetch('http://localhost:5000/save-image', {
        method: 'POST',
        body: outputFormData,
        mode: 'cors',
      });

      setStatusMessage('Images saved successfully!');

    } catch (error) {
      setStatusMessage('Error saving images: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>From Monochrome to Multicolor</h1>
      <p>
        Reimagine grayscale images with vibrant colors, breathing new life into them with our advanced colorization
        service.
      </p>

      <div className="input-container">
        <input type="file" id="sketchInput" accept="image/*" onChange={uploadSketch} />
      </div>

      <div className="button-container">
        <button type="button" onClick={() => document.getElementById('sketchInput').click()}>
          Generate Image
        </button>
      </div>
      <div id="statusMessage">{statusMessage}</div>

      <div className="output-container">
        {inputImageSrc && (
          <img
            src={inputImageSrc}
            alt="Uploaded sketch"
            style={{ width: '300px', height: '300px', objectFit: 'cover', margin: '20px 0' }}
          />
        )}

        {loading && (
          <div className="loading-spinner" style={{ margin: '20px' }} />
        )}

        {outputImageSrc && !loading && (
          <img
            src={outputImageSrc}
            alt="Generated output"
            style={{ width: '300px', height: '300px', objectFit: 'cover', margin: '20px 0' }}
          />
        )}
      </div>
      <style>
        {`
          .loading-spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Black;
