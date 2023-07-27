import { useState } from "react";

import NavBar from "../../components/NavBar";
import SubNavBar from "../../components/SubNavBar";
import Canvas from "../../components/Canvas";
import UnitSelectorContainer from "../../components/UnitSelectorContainer";

const Sketch = () => {
  const [sketchTitle, setSketchTitle] = useState("");

  const handleSketchTitle = (event) => {
    setSketchTitle(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <SubNavBar />
        <div className="flex flex-grow">
          <UnitSelectorContainer style={"w-1/2 bg-gray-200 p-4"} />
          <Canvas
            style={"w-1/2 bg-gray-300 p-4"}
            sketchTitle={sketchTitle}
            onChange={handleSketchTitle}
          />
        </div>
      </div>
    </>
  );
};

export default Sketch;
