import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { LoadingData } from "../Loading/LoadingData";
import SearchBar from "../SearchBar/SearchBar";
import ImageCard from "../Gallery/ImageCard/ImageCard";

import imageData from "../../data.json"; // Importing the JSON data

function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Use the imported JSON data directly instead of fetching it from the Pixabay API
    setImages(imageData);

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  const filteredImages = images.filter((image) =>
    image.tags.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingData />;

  if (!user) return <div>Please log in to view the gallery.</div>;

  return (
    <div>
      <div className="container text-center mt-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-4">
            <h1>Image Gallery</h1>
          </div>
          <div className="col-12 col-md-4 mt-3 mt-md-0">
            <SearchBar setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-12 col-md-4 mt-3 mt-md-0">
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {filteredImages.map((image, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
              <ImageCard imageData={image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
