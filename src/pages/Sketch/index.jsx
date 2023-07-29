import { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";
import SubNavBar from "../../components/SubNavBar";
import CanvasContainer from "../../components/CanvasContainer";
import UnitSelectorContainer from "../../components/UnitSelectorContainer";

import getSvgDataArray from "../../utils/getSvgDataArray";

import {
  BODY_UNITS,
  FACE_UNITS,
  HEAD_UNITS,
} from "../../components/UnitSelector/UnitSelector.mock";

const Sketch = () => {
  const [sketchTitle, setSketchTitle] = useState("");
  const [elements, setElements] = useState({
    head: { svgData: null },
    face: { svgData: null },
    body: { svgData: null },
  });

  const UNIT_URLS = [HEAD_UNITS[0], FACE_UNITS[0], BODY_UNITS[0]];

  useEffect(() => {
    const getUnitData = async () => {
      try {
        const svgDataArray = await getSvgDataArray(UNIT_URLS);

        setElements({
          head: { svgData: svgDataArray[0] },
          face: { svgData: svgDataArray[1] },
          body: { svgData: svgDataArray[2] },
        });
      } catch (error) {
        console.error(error);
      }
    };

    getUnitData();
  }, []);

  const handleSketchTitle = (event) => {
    setSketchTitle(event.target.value);
  };

  const handleElementChange = (unitType, newElementData) => {
    setElements((prevElements) => ({
      ...prevElements,
      [unitType]: newElementData,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <SubNavBar />
      <div className="flex flex-grow">
        <UnitSelectorContainer style={"w-1/2 bg-gray-200 p-4"} />
        <CanvasContainer
          style={"w-1/2 bg-gray-300 p-4"}
          sketchTitle={sketchTitle}
          onChange={handleSketchTitle}
          elements={elements}
          onElementChange={handleElementChange}
        />
      </div>
    </div>
  );
};

export default Sketch;
