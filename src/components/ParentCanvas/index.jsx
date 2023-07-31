import { useEffect, useRef } from "react";

const ParentCanvas = ({ width, height, children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
  }, [width, height]);

  return (
    <div className="flex flex-col items-center mt-8">
      <button onClick={handleDownload}>스케치 다운로드</button>
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ position: "relative" }}
        />
        {children}
      </div>
    </div>
  );
};

export default ParentCanvas;
