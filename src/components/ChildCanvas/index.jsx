import { useRef, useEffect, useState } from "react";

import updateSvgData from "../../utils/updateSvgData";

import { Z_INDEX } from "../../constants";

const ChildCanvas = ({
  svgData,
  width,
  height,
  top,
  left,
  fillColor,
  elements,
  onElementChange,
  unitType,
  parentWidth,
  parentHeight,
}) => {
  const canvasRef = useRef(null);

  const [position, setPosition] = useState({ x: left, y: top });
  const [startDrag, setStartDrag] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const img = new Image();

    const updatedSvgData = updateSvgData(svgData, fillColor);
    const encodedSvgData = encodeURIComponent(updatedSvgData);
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvgData}`;

    img.onload = () => {
      context.clearRect(0, 0, width, height);
      context.drawImage(img, 0, 0, width, height);
    };

    img.src = dataUrl;
  }, [width, height, svgData, fillColor]);

  const handleMouseDown = (event) => {
    setStartDrag({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setStartDrag(null);
  };

  const handleMouseMove = (event) => {
    if (!startDrag) {
      return;
    }

    const offsetX = event.clientX - startDrag.x;
    const offsetY = event.clientY - startDrag.y;

    setPosition((prevPosition) => ({
      x: Math.min(Math.max(0, prevPosition.x + offsetX), parentWidth - width),
      y: Math.min(Math.max(0, prevPosition.y + offsetY), parentHeight - height),
    }));

    setStartDrag({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ position: "absolute", zIndex: Z_INDEX[unitType] }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onClick={() => {
          onElementChange(unitType, { ...elements[unitType], svgData });
        }}
      />
    </div>
  );
};

export default ChildCanvas;
