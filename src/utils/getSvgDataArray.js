import { BODY } from "../mocks/body";
import { FACE } from "../mocks/face";
import { HEAD } from "../mocks/head";

const getSvgDataArray = async (urls) => {
  try {
    // const fetchPromises = urls.map(async (url) => {
    //   const response = await fetch(url, { mode: "no-cors" });
    //   const data = await response.text();
    //   return data;
    // });
    // const svgDataArray = await Promise.all(fetchPromises);
    // return svgDataArray;

    return [HEAD, FACE, BODY];
  } catch (error) {
    console.error(error);
    console.error("Error fetching s3 objects");
  }
};

export default getSvgDataArray;
