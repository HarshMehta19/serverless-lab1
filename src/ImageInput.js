import React, { useState } from 'react';
import axios from 'axios';

const ImageInput = () => {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [step, setStep] = useState(1); // 1 for email input, 2 for image upload
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result); // Set image state to base64 data URI
    };

    reader.readAsDataURL(file);
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    try {
      setLoading(true);
      const formData = {
        'email': email
      };
      const response = await axios.post(`https://yd7httyb13.execute-api.us-east-1.amazonaws.com/New/get`, formData);
      console.log("response", response)
      const responseData = JSON.parse(response.data.body);

      console.log("json", JSON.parse(response.data.body))
      if(responseData.items) 
        setGallery(responseData.items); // Assuming response.data is an array of image URLs
      setStep(2); // Proceed to step 2 for image upload
    } catch (error) {
      console.error('Error fetching gallery:', error);
      alert('Failed to fetch gallery. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async() => {
    console.log("email", email)
    const formData = {
      'email': email
    };

    const response = await axios.post('https://yd7httyb13.execute-api.us-east-1.amazonaws.com/New/delete', formData);
    console.log('Image uploaded successfully:', response.data.imageURL);
    alert("Image deleted successfully");
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image.');
      return;
    }

    try {
      setLoading(true);
      const formData = {
        'email': email,
        'image': image,
      };
      const userExists = await axios.post('https://yd7httyb13.execute-api.us-east-1.amazonaws.com/New/userExits', formData);
      const response = await axios.post('https://yd7httyb13.execute-api.us-east-1.amazonaws.com/New/getDetails', formData);

      console.log('Image uploaded successfully:', response.data.imageURL);
      setImage('');
      handleStep1Submit(e);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          {/* <h2>Step 1: Enter Email</h2> */}
          <form onSubmit={handleStep1Submit}>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <button type="submit">Next</button>
          </form>
        </div>
      )}
      {step === 2 && (
        <div>
          {/* <h2>Step 2: Upload Image</h2> */}
          <form onSubmit={handleImageUpload}>
            <div>
              <label>Image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <button type="submit">Upload</button>
          </form>
          <h2>Gallery</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="image-gallery">
              {/* {gallery.map((image, index) => ( */}
                <div  className="image-container">
                  <img src={gallery.imageData} alt={`Image`} />
                  <button onClick={deleteImage}>Delete</button>
                </div>
              {/* ))} */}
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .image-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          grid-gap: 10px;
          justify-items: center;
        }
        .image-container {
          border: 1px solid #ccc;
          padding: 5px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .image-container img {
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </div>
  );
};

export default ImageInput;
