import ChildCanvas from "../ChildCanvas";
import ParentCanvas from "../ParentCanvas";

const CanvasContainer = ({
  style,
  sketchTitle,
  onChange,
  elements,
  onElementChange,
}) => {
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
      <ParentCanvas width={700} height={700}>
        <ChildCanvas
          width={200}
          height={200}
          svgData={elements.head.svgData}
          top={50}
          left={250}
        />
        <ChildCanvas
          width={200}
          height={200}
          svgData={elements.face.svgData}
          top={250}
          left={250}
        />
        <ChildCanvas
          width={200}
          height={200}
          svgData={elements.body.svgData}
          top={450}
          left={250}
        />
      </ParentCanvas>
    </div>
  );
};

export default CanvasContainer;
