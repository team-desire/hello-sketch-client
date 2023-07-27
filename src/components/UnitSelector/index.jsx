import { useEffect, useState } from "react";

import ColorPicker from "../ColorPicker";
import Carousel from "../Carousel";

import { TOTAL_PAGES } from "./UnitSelector.mock";
import { fetchData } from "../../utils/fetchS3Objects";

const UnitSelector = ({ units, unitType, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [color, setColor] = useState("#000000");
  const [svgData, setSvgData] = useState(null);

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

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const svgDataArray = await fetchData(units);
        setSvgData(svgDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndSetData();
  }, [units]);

  return (
    <div className="h-1/3 bg-gray-300 border-t border-gray-200 mx-auto px-10">
      <h1 className="text-xl">{title}</h1>
      <ColorPicker color={color} onColorChange={handleColorChange} />
      {svgData && (
        <Carousel
          items={svgData}
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPrevButtonClick={handlePrevButtonClick}
          onNextButtonClick={handleNextButtonClick}
          color={color}
        />
      )}
    </div>
  );
};

export default UnitSelector;
