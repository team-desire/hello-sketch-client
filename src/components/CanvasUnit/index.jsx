import { forwardRef, useRef, useEffect, useState } from "react";

import updateSvgData from "../../utils/updateSvgData";

import { Z_INDEX } from "../../constants";

const CanvasUnit = forwardRef((props, ref) => {
  const canvasRef = useRef(null);

  const {
    svgData,
    fillColor,
    unitType,
    parentWidth,
    parentHeight,
    location,
    onChangeLocation,
  } = props;

  const { width, height } = location;

  const [startDrag, setStartDrag] = useState(null);

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

    onChangeLocation((prevLocation) => ({
      ...prevLocation,
      x: Math.min(Math.max(0, prevLocation.x + offsetX), parentWidth - width),
      y: Math.min(Math.max(0, prevLocation.y + offsetY), parentHeight - height),
    }));

    setStartDrag({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    if (ref) {
      ref.current = canvasRef.current;
    }
  }, [ref]);

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

  return (
    <div
      style={{
        position: "absolute",
        top: `${location.y}px`,
        left: `${location.x}px`,
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
      />
    </div>
  );
});

export default CanvasUnit;
