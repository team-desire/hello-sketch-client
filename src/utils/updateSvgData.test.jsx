import updateSvgData from "./updateSvgData";

describe("updateSvgData", () => {
  const sampleSvgData = `
    <svg height="100" width="100">
      <circle class="target" cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      <circle cx="50" cy="50" r="20" stroke="black" stroke-width="3" fill="yellow" />
    </svg>
  `;

  test("should update the fill color of target elements to the specified color", () => {
    const fillColor = "blue";

    const updatedSvgData = updateSvgData(sampleSvgData, fillColor);

    expect(updatedSvgData).toContain('fill="blue"');
  });

  test("should parse and serialize SVG data correctly", () => {
    const fillColor = "green";

    const parser = new DOMParser();
    const originalSvgDom = parser.parseFromString(
      sampleSvgData,
      "image/svg+xml",
    );

    const updatedSvgData = updateSvgData(sampleSvgData, fillColor);
    const updatedSvgDom = parser.parseFromString(
      updatedSvgData,
      "image/svg+xml",
    );

    const targetElementOriginal = originalSvgDom.querySelector(".target");
    const targetElementUpdated = updatedSvgDom.querySelector(".target");

    expect(targetElementOriginal.getAttribute("fill")).not.toBe(fillColor);
    expect(targetElementUpdated.getAttribute("fill")).toBe(fillColor);
  });
});
