import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

import Button from "../Button";
import Unit from "../Unit";

const Carousel = ({
  items,
  currentPage,
  totalPages,
  itemsPerPage = 3,
  onPrevButtonClick,
  onNextButtonClick,
  color = undefined,
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center w-full">
        <Button
          onClick={onPrevButtonClick}
          disabled={currentPage === 1}
          style={`ml-8 ${"disabled:opacity-25"}`}
        >
          {<AiOutlineCaretLeft size={40} />}
        </Button>
        <div className="flex space-x-5">
          {Array.from({ length: itemsPerPage }).map((item, index) => (
            <div key={index} className="w-1/3">
              {items[index] ? (
                <div className="bg-gray-200 rounded-lg w-52 h-52">
                  <Unit
                    svgData={items[index]}
                    selectedColor={color}
                    style="w-full h-full rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-52 h-52 bg-gray-200 rounded-lg"></div>
              )}
            </div>
          ))}
        </div>
        <Button
          onClick={onNextButtonClick}
          disabled={currentPage === totalPages}
          style={`mr-8 ${"disabled:opacity-25"}`}
        >
          {<AiOutlineCaretRight size={40} />}
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
