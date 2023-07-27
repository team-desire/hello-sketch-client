import { useState, useRef, useEffect, useCallback } from "react";

const MoveableSVG = ({ containerRef }) => {
  const [selectedSVGs, setSelectedSVGs] = useState(Array(3).fill(null));
  const [isDragging, setIsDragging] = useState(Array(3).fill(false));
  const [boundingBoxs, setBoundingBoxs] = useState(Array(3).fill(null));
  const [boundingBoxVisible, setBoundingBoxVisible] = useState(
    Array(3).fill(false),
  );
  const [offsets, setOffsets] = useState(Array(3).fill({ x: 0, y: 0 }));
  const [positions, setPositions] = useState([
    { x: 0, y: 0 },
    { x: 20, y: 20 },
    { x: 40, y: 40 },
  ]);
  const [positionRatios, setPositionRatios] = useState(
    Array(3).fill({ x: 0, y: 0 }),
  );
  const svgRefs = useRef([null, null, null]);

  const handleSVGSelect = (index) => (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newSelectedSVGs = [...selectedSVGs];
        newSelectedSVGs[index] = reader.result;
        setSelectedSVGs(newSelectedSVGs);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(reader.result, "image/svg+xml");
        const layerElement = svgDoc.querySelector("#layer1");

        if (layerElement) {
          const bbox = layerElement.getBBox();
          const newBoundingBoxs = [...boundingBoxs];
          newBoundingBoxs[index] = {
            top: bbox.y,
            left: bbox.x,
            width: bbox.width,
            height: bbox.height,
          };
          setBoundingBoxs(newBoundingBoxs);
        }
      };
      reader.readAsText(file);
    }
  };

  const adjustPosition = (index) => {
    const containerBounds = containerRef.current.getBoundingClientRect();
    const newPosition = {
      x: containerBounds.width * positionRatios[index].x,
      y: containerBounds.height * positionRatios[index].y,
    };
    const newPositions = [...positions];
    newPositions[index] = newPosition;
    setPositions(newPositions);
  };

  const handleMouseDown = (index) => (e) => {
    setIsDragging((prev) => prev.map((_, i) => i === index));
    const newOffset = {
      x: e.clientX - positions[index].x,
      y: e.clientY - positions[index].y,
    };
    setOffsets((prev) =>
      prev.map((offset, i) => (i === index ? newOffset : offset)),
    );
    setBoundingBoxVisible((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible)),
    );
  };

  const updateBoundingBox = useCallback(() => {
    boundingBoxs.forEach((box, index) => {
      if (box) {
        const svgElement = svgRefs.current[index];

        if (svgElement) {
          const layerElement = svgElement.querySelector("#layer1");

          if (layerElement) {
            const ctm = layerElement.getScreenCTM();
            const newBox = {
              top: box.top * ctm.d + ctm.f,
              left: box.left * ctm.a + ctm.e,
              width: box.width * ctm.a,
              height: box.height * ctm.d,
            };

            const newBoundingBoxs = [...boundingBoxs];
            newBoundingBoxs[index] = newBox;
            setBoundingBoxs(newBoundingBoxs);
          }
        }
      }
    });
  }, [boundingBoxs]);

  const handleMouseMove = (e) => {
    setIsDragging((prev) =>
      prev.map((dragging, index) => {
        if (dragging) {
          let newX = e.clientX - offsets[index].x;
          let newY = e.clientY - offsets[index].y;
          const containerBounds = containerRef.current.getBoundingClientRect();
          const svgBounds = svgRefs.current[index].getBoundingClientRect();

          if (newX < 0) newX = 0;

          if (newY < 0) newY = 0;

          if (newX + svgBounds.width > containerBounds.width)
            newX = containerBounds.width - svgBounds.width;

          if (newY + svgBounds.height > containerBounds.height)
            newY = containerBounds.height - svgBounds.height;

          const newPosition = { x: newX, y: newY };
          const newPositions = [...positions];
          newPositions[index] = newPosition;
          setPositions(newPositions);
          const newPositionRatio = {
            x: newX / containerBounds.width,
            y: newY / containerBounds.height,
          };
          const newPositionRatios = [...positionRatios];
          newPositionRatios[index] = newPositionRatio;
          setPositionRatios(newPositionRatios);
          svgRefs.current[
            index
          ].style.transform = `translate(${newX}px, ${newY}px)`;
        }

        return dragging;
      }),
    );

    if (isDragging.includes(true)) {
      updateBoundingBox();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(Array(3).fill(false));
  };

  const handleResize = useCallback(() => {
    selectedSVGs.forEach((svg, index) => {
      adjustPosition(index);
    });
  }, [selectedSVGs, adjustPosition]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMouseMove, handleMouseUp, handleResize]);

  return (
    <div className="moveable-svg-container w-max h-max">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div key={index}>
            <input type="file" onChange={handleSVGSelect(index)} />
            {selectedSVGs[index] && (
              <div
                id={`moveable-svg-${index}`}
                ref={(el) => (svgRefs.current[index] = el)}
                className="moveable-svg"
                style={{
                  transform: `translate(${positions[index].x}px, ${positions[index].y}px)`,
                  border: boundingBoxVisible[index] ? "2px solid red" : "none",
                  boxSizing: "border-box",
                }}
                onMouseDown={handleMouseDown(index)}
                dangerouslySetInnerHTML={{ __html: selectedSVGs[index] }}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default MoveableSVG;
