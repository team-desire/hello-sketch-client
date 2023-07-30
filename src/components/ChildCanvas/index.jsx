import { useRef, useEffect, useState } from "react";

const ChildCanvas = ({
  width,
  height,
  svgData,
  top,
  left,
  parentWidth,
  parentHeight,
}) => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: left, y: top });
  const [startDrag, setStartDrag] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const img = new Image();
    const encodedSvgData = encodeURIComponent(svgData);
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
  }, [width, height, svgData, isSelected]);

  const handleMouseDown = (event) => {
    setIsSelected(true);
    setStartDrag({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setStartDrag(null);
  };

  const handleMouseMove = (event) => {
    if (!startDrag) return;

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
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
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
