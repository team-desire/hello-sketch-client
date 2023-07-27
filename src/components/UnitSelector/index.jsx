import { useState } from "react";

import ColorPicker from "../ColorPicker";
import Carousel from "../Carousel";

import { TOTAL_PAGES } from "./UnitSelector.mock";

const UnitSelector = ({ units, unitType, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [color, setColor] = useState("#000000");

  const handleNextButtonClick = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const handlePrevButtonClick = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="h-1/3 bg-gray-300 border-t border-gray-200 mx-auto px-10">
      <h1 className="text-xl">{title}</h1>
      <ColorPicker color={color} onColorChange={handleColorChange} />
      <Carousel
        items={units}
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPrevButtonClick={handlePrevButtonClick}
        onNextButtonClick={handleNextButtonClick}
      />
    </div>
  );
};

export default UnitSelector;
