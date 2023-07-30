import { useEffect, useState } from "react";

import ColorPicker from "../ColorPicker";
import Carousel from "../Carousel";
import getSvgDataArray from "../../utils/getSvgDataArray";

const UnitSelector = ({ elements, onElementChange, unitType, title }) => {
  const [unitData, setUnitData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 3;

  const fetchUnits = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/units?unitType=${unitType}&page=${currentPage}&per_page=${ITEMS_PER_PAGE}`,
      );

      const { units } = await response.json();
      const { list, totalPages } = units;
      const urls = list.map((item) => item.url);
      const unitSvgData = await getSvgDataArray(urls);

      setUnitData(unitSvgData);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error");
    }
  };

  const handleNextButtonClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevButtonClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleColorChange = (event) => {
    onElementChange(unitType, {
      ...elements[unitType],
      fillColor: event.target.value,
    });
  };

  useEffect(() => {
    fetchUnits();
  }, [currentPage]);

  return (
    <div className="h-1/3 bg-gray-300 border-t border-gray-200 mx-auto px-10">
      <h1 className="text-xl">{title}</h1>
      <ColorPicker
        color={elements[unitType]?.fillColor}
        onColorChange={handleColorChange}
        toShow={unitType !== "face"}
      />
      <Carousel
        items={unitData}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevButtonClick={handlePrevButtonClick}
        onNextButtonClick={handleNextButtonClick}
        fillColor={elements[unitType]?.fillColor}
        elements={elements}
        onElementChange={onElementChange}
        unitType={unitType}
      />
    </div>
  );
};

export default UnitSelector;
