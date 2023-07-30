import { useRef, useEffect, useState } from "react";

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
  isFromCarousel,
}) => {
  const canvasRef = useRef(null);

  const [position, setPosition] = useState({ x: left, y: top });
  const [startDrag, setStartDrag] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const updateSvgData = (svgData, fillColor) => {
    const parser = new DOMParser();
    const svgDOM = parser.parseFromString(svgData, "image/svg+xml");

    const targets = svgDOM.querySelectorAll(".target");

    if (targets && targets.length > 0) {
      targets.forEach((target) => target.setAttribute("fill", fillColor));
    }

    const updatedSvgData = new XMLSerializer().serializeToString(svgDOM);

    return updatedSvgData;
  };

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

      if (isSelected) {
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.strokeRect(0, 0, width, height);
      }
    };

    img.src = dataUrl;
  }, [width, height, svgData, fillColor, isSelected]);

  const handleMouseDown = (event) => {
    setIsSelected(true);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (canvasRef.current && !canvasRef.current.contains(event.target)) {
        setIsSelected(false);
      }
    };

    if (isSelected) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelected]);

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
        style={{ position: "absolute", top, left, zIndex: Z_INDEX[unitType] }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onClick={() => {
          if (isFromCarousel) {
            onElementChange(unitType, { ...elements[unitType], svgData });
          }

          return;
        }}
      />
      {isSelected && (
        <>
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0px",
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default ChildCanvas;
