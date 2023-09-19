import React from "react";
import ImageCard from "../ImageCard/ImageCard";

const ImageGrid = ({ images }) => {
  return (
    <div className="container">
      <div className="row">
        {images.map((image, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
            <ImageCard imageData={image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
