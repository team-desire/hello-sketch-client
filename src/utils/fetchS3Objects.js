export const fetchData = async (urls) => {
  try {
    const fetchPromises = urls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.text();
      return data;
    });

    const svgDataArray = await Promise.all(fetchPromises);

    return svgDataArray;
  } catch (err) {
    console.error("Error fetching s3 objects");
  }
};
