import React from "react";
import "./ImageCard.css"

const ImageCard = ({ imageData }) => {
  return (
    <div className="card mt-5 image-card">
      <img
        src={imageData.imageSrc}
        className="card-img-top"
        alt={imageData.alt_description}
      />
      <div className="card-body image-card-body">
        <h5 className="card-title">{imageData.title}</h5>
        <p><small className="text-muted">{imageData.description}</small></p>
        
        <div className="tags">
          <span>Tags:</span>
          {imageData.tags.map((tag, index) => (
            <span key={index} className="tag badge badge-light mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
