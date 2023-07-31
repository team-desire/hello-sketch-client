const SketchCard = ({ sketch }) => {
  if (!sketch) {
    return <div className="border p-4 flex flex-col h-full"></div>;
  }

  return (
    <div className="border p-4 flex flex-col h-full">
      <div className="p-4 flex-grow flex flex-col justify-center items-center bg-zinc-100">
        <img
          className="mb-4 max-h-full"
          src={`${sketch.url}`}
          style={{ maxWidth: "500px", maxHeight: "300px" }}
        />
      </div>
      <div className="flex flex-col flex-shrink">
        <h2 className="mb-2 text-lg">Title: {sketch.title} </h2>
        <p className="text-sm">
          Created: {new Date(sketch.createdAt).toLocaleString()}{" "}
        </p>
        <p className="text-sm">
          Updated: {new Date(sketch.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SketchCard;
