import React from 'react';
import './App.css';
import ImageInput from './ImageInput';

function App() {
  // const [imageURLs, setImageURLs] = useState([]);

  const handleImagesReceived = () => {
    // setImageURLs(urls);
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <ImageInput onImagesReceived={handleImagesReceived} />
    </div>
  );
}

export default App;
