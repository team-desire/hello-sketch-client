import { useEffect, useRef } from "react";

const Unit = ({ svgData, selectedColor }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgData && selectedColor) {
      const parser = new DOMParser();
      const svgDOM = parser.parseFromString(svgData, "image/svg+xml");

      // NOTE: 이미지 작업 후 ID 값 변경 필요
      const targetText = svgDOM.getElementById("path18");

      if (targetText) {
        targetText.setAttribute("fill", selectedColor);
      }

      const updatedSvgData = new XMLSerializer().serializeToString(svgDOM);
      svgRef.current.innerHTML = updatedSvgData;
    }
  }, [svgData, selectedColor]);

  return <div ref={svgRef}></div>;
};

export default Unit;
