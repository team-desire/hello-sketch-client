const getSvgDataArray = async (urls) => {
  try {
    const svgDataArray = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        return response.text();
      }),
    );

    return svgDataArray;
  } catch (error) {
    console.error("Error fetching data");
  }
};

export default getSvgDataArray;
