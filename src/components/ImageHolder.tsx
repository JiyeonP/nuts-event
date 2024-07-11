import React, { useState, useEffect } from "react";
import "./ImageHolder.css";

const ImageHolder = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, [src]);

  return (
    <div className="image-container">
      {isLoading && <div className="spinner" />}
      <img
        src={src}
        alt={alt}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};

export default ImageHolder;
