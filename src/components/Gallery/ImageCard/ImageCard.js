import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./ImageCard.css";

const ImageCard = ({ imageData, moveImage, index }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "image",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
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

  const cardClassName = isDragging
    ? "card mt-5 image-card dragging"
    : "card mt-5 image-card";

  return (
    <div
    ref={ref}
    className={cardClassName} 
    style={{ opacity: isDragging ? 0.5 : 1 }}
  >
      <img
        src={imageData.imageSrc}
        className="card-img-top"
        alt={imageData.alt_description}
      />
      <div className="card-body image-card-body">
        <h5 className="card-title">{imageData.title}</h5>
        <p>
          <small className="text-muted">{imageData.description}</small>
        </p>

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
