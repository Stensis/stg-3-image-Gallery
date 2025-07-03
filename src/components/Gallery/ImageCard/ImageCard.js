import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./ImageCard.css";

const ImageCard = ({ imageData, moveImage, index }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "image",
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`image-card ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.6 : 1 }}
    >
      <img
        src={imageData.imageSrc}
        className="image-card-img"
        alt={imageData.alt_description || "Gallery Image"}
      />
      <div className="image-card-body">
        <h5 className="image-card-title">{imageData.title}</h5>
        <p className="image-card-desc">{imageData.description}</p>

        <div className="tags">
          {imageData.tags.map((tag, idx) => (
            <span key={idx} className="tag-chip">
              #{tag}
            </span>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ImageCard;
