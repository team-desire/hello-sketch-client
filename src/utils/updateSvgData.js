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

export default updateSvgData;
