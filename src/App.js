import React, { useState } from 'react';
import './App.css';
import ImageInput from './ImageInput';
import ImageGallery from './ImageGallery';

function App() {
  const [imageURLs, setImageURLs] = useState([]);

  const handleImagesReceived = (urls) => {
    setImageURLs(urls);
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <ImageInput onImagesReceived={handleImagesReceived} />
    </div>
  );
}

export default App;
