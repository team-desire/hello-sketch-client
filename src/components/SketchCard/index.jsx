const SketchCard = () => {
  return (
    <div className="border p-4 flex flex-col h-full">
      <div className="p-4 flex-grow flex flex-col justify-center items-center bg-zinc-100">
        <img className="mb-4 max-h-full" />
      </div>
      <div className="flex flex-col flex-shrink">
        <h2 className="mb-2 text-lg">Title: </h2>
        <p className="text-sm">Created: </p>
        <p className="text-sm">Updated: </p>
      </div>
    </div>
  );
};

export default SketchCard;
