import { useEffect, useState } from "react";

import Button from "../Button";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/serverData.json");
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div className="flex">
      <Button onClick={handlePrev}>Previous</Button>
      <div className="flex justify-evenly">
        {images.slice(startIndex, startIndex + 3).map((imageUrl, index) => (
          <img
            className="w-3/12"
            key={index}
            src={imageUrl}
            alt={`Image ${startIndex + index + 1}`}
          />
        ))}
      </div>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
};

export default Carousel;
