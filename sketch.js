import React, { useState, useEffect } from 'react';

function SketchToReality() {
  const [inputImage, setInputImage] = useState(null);
  const [inputImageUrl, setInputImageUrl] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (inputImageUrl) URL.revokeObjectURL(inputImageUrl);
      if (outputImage) URL.revokeObjectURL(outputImage);
    };
  }, [inputImageUrl, outputImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setInputImage(file);
      setInputImageUrl(URL.createObjectURL(file));
      setStatusMessage('Image uploaded successfully!');
      setOutputImage(null);
    } else {
      setStatusMessage('No file selected.');
    }
  };

  const uploadSketch = async (event) => {
    event.preventDefault();

    if (!inputImage) {
      setStatusMessage('Please upload a sketch first.');
      return;
    }

    setStatusMessage('Processing...');
    setLoading(true);

    const formData = new FormData();
    formData.append('image', inputImage);

    try {
      const response = await fetch('http://localhost:8000/generate-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const outputUrl = URL.createObjectURL(blob);
        setOutputImage(outputUrl);
        setStatusMessage('Image processed successfully!');
        await storeImagesInDatabase(outputUrl);
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || 'Failed to process the image.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatusMessage('An error occurred while processing the image.');
    } finally {
      setLoading(false);
    }
  };

  const storeImagesInDatabase = async (outputUrl) => {
    const username = localStorage.getItem('username');

    if (!username) {
      console.error("Username not found in local storage.");
      return;
    }

    const data = {
      username: username,
      inputImage: inputImageUrl,
      outputImage: outputUrl,
    };

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Images uploaded successfully.");
      } else {
        const errorData = await response.json();
        console.error("Error uploading images:", errorData.message);
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  return (
    <div className="container">
      <h1>Sketches to Reality</h1>
      <p>Turn your rough sketches into fully rendered, realistic images, making your designs look professional and refined.</p>

      <div className="input-container">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div className="button-container">
        <button type="button" onClick={uploadSketch}>Generate Image</button>
      </div>

      <div id="statusMessage">{statusMessage}</div>

      <div className="output-container">
        {inputImage && <img src={inputImageUrl} alt="Input Sketch" style={{ width: '1280px', height: '1280px', objectFit: 'cover', margin: '20px 0' }} />}

        {loading && <div className="loading-spinner" style={{ margin: '20px' }} />}

        {outputImage && !loading && <img src={outputImage} alt="Output Rendered Image" style={{ width: '1280px', height: '1280px', margin: '20px 0', objectFit: 'cover' }} />}
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

export default SketchToReality;
