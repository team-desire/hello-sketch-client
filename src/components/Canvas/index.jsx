import { useRef } from "react";

import MoveableSVG from "../MoveableSVG";

const Canvas = ({ style, sketchTitle, onChange }) => {
  const containerRef = useRef(null);

  return (
    <div className={style}>
      <div className="flex justify-center my-6">
        <input
          className="placeholder:text-slate-400 w-96 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 sm:text-sm"
          placeholder="Title"
          type="text"
          name="title"
          value={sketchTitle}
          onChange={onChange}
        />
      </div>
      <div
        className="box-content h-4/5 p-4 border-4 bg-white"
        ref={containerRef}
      >
        <MoveableSVG containerRef={containerRef} />
      </div>
    </div>
  );
};

export default Canvas;
