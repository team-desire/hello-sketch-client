import { useEffect, useState } from "react";

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
    setCurrentSlideIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(images.length / 3)) %
        Math.ceil(images.length / 3),
    );
  };

  const handleNext = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(images.length / 3),
    );
  };

  const startIndex = currentSlideIndex * 3;

  return (
    <div className="flex">
      <button onClick={handlePrev}>Previous</button>
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
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Carousel;
