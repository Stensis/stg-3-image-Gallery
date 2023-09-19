import React from "react";

const ImageCard = ({ imageData }) => {
  return (
    <div className="card mt-5" style={{ width: "20rem", height: "35vh", boxSizing: "border-box" }}>
      <img
        src={imageData.webformatURL}
        className="card-img-top"
        alt={imageData.tag}
        style={{ objectFit: "cover", height: "50%" }} 
      />
      <div
        className="card-body"
        style={{
          backgroundColor: "red",
          boxSizing: "border-box",  
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h5 className="card-title">{imageData.tag}</h5>
        <p><small className="text-muted">Uploaded by {imageData.user}</small></p>
      </div>
    </div>
  );
};

export default ImageCard;
