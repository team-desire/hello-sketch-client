import { useEffect, useRef } from "react";

const Unit = ({ svgData, selectedColor, style }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgData && selectedColor) {
      const parser = new DOMParser();
      const svgDOM = parser.parseFromString(svgData, "image/svg+xml");

      const targets = svgDOM.querySelectorAll(".target");

      if (targets && targets.length > 0) {
        targets.forEach((target) => target.setAttribute("fill", selectedColor));
      }

      const updatedSvgData = new XMLSerializer().serializeToString(svgDOM);
      svgRef.current.innerHTML = updatedSvgData;
    }
  }, [svgData, selectedColor]);

  return <div ref={svgRef} className={style}></div>;
};

export default Unit;
