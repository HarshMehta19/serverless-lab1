import React from 'react';

const ImageGallery = ({ imageURLs }) => {
  return (
    <div>
      <h2>Photo Gallery</h2>
      <div className="gallery">
        {imageURLs.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
