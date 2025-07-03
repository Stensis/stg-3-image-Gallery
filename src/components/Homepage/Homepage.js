import React, { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { LoadingData } from "../Loading/LoadingData";
import SearchBar from "../SearchBar/SearchBar";
import ImageCard from "../Gallery/ImageCard/ImageCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import imageData from "../../data.json";
import "./HomePage.css";

function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user || null);
      setLoading(false);
    });

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

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...filteredImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const filteredImages = images.filter((image) =>
    image.tags.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingData />;
  if (!user)
    return (
      <div className="not-logged-in">🔒 Please log in to view the gallery.</div>
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="homepage">
        <header className="header">
          <div className="logo-section">
            <h1 className="logo">🖼️ Image Gallery</h1>
            <span className="drag-hint">✨ Drag & drop images to reorder</span>
          </div>

          <SearchBar setSearchTerm={setSearchTerm} />

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <main className="gallery-wrapper">
          {filteredImages.length === 0 ? (
            <p className="not-found">
              😢 No images found matching your search.
            </p>
          ) : (
            <div className="gallery-grid">
              {filteredImages.map((image, index) => (
                <ImageCard
                  key={index}
                  imageData={image}
                  index={index}
                  moveImage={moveImage}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </DndProvider>
  );
}

export default HomePage;
