import { useState, useRef } from "react";

import ParentCanvas from "../ParentCanvas";
import CanvasUnit from "../CanvasUnit";

const CanvasContainer = ({
  style,
  sketchTitle,
  onSketchTitleChange,
  elements,
}) => {
  const canvasRefs = {
    headCanvas: useRef(null),
    faceCanvas: useRef(null),
    bodyCanvas: useRef(null),
  };

  const [headUnit, setHeadUnit] = useState({
    width: 200,
    height: 200,
    y: 150,
    x: 250,
  });

  const [faceUnit, setFaceUnit] = useState({
    width: 150,
    height: 90,
    y: 250,
    x: 275,
  });

  const [bodyUnit, setBodyUnit] = useState({
    width: 200,
    height: 200,
    y: 325,
    x: 250,
  });

  const mergeCanvasAndSave = () => {
    const headCanvas = canvasRefs.headCanvas.current;
    const faceCanvas = canvasRefs.faceCanvas.current;
    const bodyCanvas = canvasRefs.bodyCanvas.current;

    const mergedCanvas = document.createElement("canvas");
    mergedCanvas.width = 700;
    mergedCanvas.height = 700;

    const mergedContext = mergedCanvas.getContext("2d");
    mergedContext.fillStyle = "white";
    mergedContext.fillRect(0, 0, mergedCanvas.width, mergedCanvas.height);

    mergedContext.drawImage(bodyCanvas, bodyUnit.x, bodyUnit.y);
    mergedContext.drawImage(headCanvas, headUnit.x, headUnit.y);
    mergedContext.drawImage(faceCanvas, faceUnit.x, faceUnit.y);

    const mergedDataURL = mergedCanvas.toDataURL("image/png");
    downloadImage(mergedDataURL);
  };

  const downloadImage = (dataURL) => {
    const link = document.createElement("a");
    link.download = "merged_image.png";
    link.href = dataURL;
    link.click();
  };

  return (
    <div className={style}>
      <div className="flex justify-center my-6">
        <input
          className="placeholder:text-slate-400 w-96 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 sm:text-sm"
          placeholder="Title"
          type="text"
          name="title"
          value={sketchTitle}
          onChange={onSketchTitleChange}
        />
        <button onClick={mergeCanvasAndSave}>Download Sketch </button>
      </div>
      <ParentCanvas width={700} height={700}>
        <CanvasUnit
          ref={canvasRefs.headCanvas}
          location={headUnit}
          onChangeLocation={setHeadUnit}
          svgData={elements.head?.svgData}
          fillColor={elements.head?.fillColor}
          unitType={"head"}
          parentWidth={700}
          parentHeight={700}
        />
        <CanvasUnit
          ref={canvasRefs.faceCanvas}
          location={faceUnit}
          onChangeLocation={setFaceUnit}
          svgData={elements.face?.svgData}
          fillColor={elements.face?.fillColor}
          unitType={"face"}
          parentWidth={700}
          parentHeight={700}
        />
        <CanvasUnit
          ref={canvasRefs.bodyCanvas}
          location={bodyUnit}
          onChangeLocation={setBodyUnit}
          svgData={elements.body?.svgData}
          fillColor={elements.body?.fillColor}
          unitType={"body"}
          parentWidth={700}
          parentHeight={700}
        />
      </ParentCanvas>
    </div>
  );
};

export default CanvasContainer;
