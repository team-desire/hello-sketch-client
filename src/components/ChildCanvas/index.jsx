import { useRef, useEffect } from "react";

const ChildCanvas = ({ width, height, svgData, top, left }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const img = new Image();

    const encodedSvgData = encodeURIComponent(svgData);
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvgData}`;

    img.onload = () => {
      context.drawImage(img, 0, 0, width, height);
    };

    img.src = dataUrl;
  }, [width, height, svgData]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ position: "absolute", top, left }}
    />
  );
};

export default ChildCanvas;
