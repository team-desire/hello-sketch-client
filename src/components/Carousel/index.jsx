import { useEffect, useState } from "react";

import Button from "../Button";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchSketches = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/sketches?per_page=3&page=${currentPage}`,
        );

        const sketches = await response.json();
        setImages(sketches.sketchesUrl.list);
        setTotalPages(sketches.sketchesUrl.totalPages);
      } catch (error) {
        console.error("Error fetching sketches:", error);
      }
    };

    fetchSketches();
  }, [currentPage]);

  const handlePrev = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div className="flex">
      <Button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </Button>
      <div className="flex justify-evenly">
        {images.map((item, index) => (
          <img
            className="w-3/12"
            key={item.imageUrl}
            src={item.imageUrl}
            alt={`Image ${index + 1}`}
          />
        ))}
      </div>

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={`bg-gray-500 ${currentPage === totalPages && "bg-red-300"}`}
      >
        Next
      </Button>
    </div>
  );
};

export default Carousel;
