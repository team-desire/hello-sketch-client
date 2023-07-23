import { useEffect, useState } from "react";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

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
    <div className="flex justify-evenly">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={`${currentPage === 1 && "disabled:opacity-25"}`}
      >
        {<AiOutlineCaretLeft size={40} />}
      </Button>
      <div className="flex my-16">
        {images.map((item, index) => (
          <img
            className="w-20 mx-6"
            key={item.imageUrl}
            src={item.imageUrl}
            alt={`Image ${index + 1}`}
          />
        ))}
      </div>
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={` ${currentPage === totalPages && "disabled:opacity-25"}`}
      >
        {<AiOutlineCaretRight size={40} />}
      </Button>
    </div>
  );
};

export default Carousel;
