import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { LoadingData } from "../Loading/LoadingData";
import SearchBar from "../SearchBar/SearchBar";
import ImageCard from "../Gallery/ImageCard/ImageCard";

const PIXABAY_API_BASE_URL = "https://pixabay.com/api/";
const PIXABAY_ACCESS_KEY = "39543052-9e0126b6d58e1c49053efbed9";

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

    fetch(
      `${PIXABAY_API_BASE_URL}?key=${PIXABAY_ACCESS_KEY}&per_page=6&image_type=photo`
    )
      .then((response) => response.json())
      .then((data) => {
        const imagesWithTags = data.hits.map((img) => ({
          ...img,
          tag: img.tags.split(",")[0] || "No tag available", 
        }));
        setImages(imagesWithTags);
      })
      .catch((error) => {
        console.error("Error fetching images: ", error);
      });

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
    image.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingData />;

  if (!user) return <div>Please log in to view the gallery.</div>;

  return (
    <div>
      <div className="container text-center mt-4">
        <div className="row align-items-center">
          <div className="col-4">
            <h1>Image Gallery</h1>
          </div>
          <div className="col-4">
            <SearchBar setSearchTerm={setSearchTerm} />
          </div>
          <div className="col-4">
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
