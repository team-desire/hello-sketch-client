import { useEffect, useRef } from "react";

const ParentCanvas = ({ width, height, children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
  }, [width, height]);

  const handleDownload = () => {};

  return (
    <div style={{ position: "relative" }}>
      <button onClick={handleDownload}>스케치 다운로드</button>
      <canvas ref={canvasRef} width={width} height={height} />
      {children}
    </div>
  );
};

export default ParentCanvas;
