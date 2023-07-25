import NavBar from "../../components/NavBar";
import SubNavBar from "../../components/SubNavBar";
import Canvas from "../../components/Canvas";
import UnitSelector from "../../components/UnitSelector";

const Sketch = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <SubNavBar />
        <div className="flex justify-center my-6">
          <input
            className="placeholder:text-slate-400 w-96 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 sm:text-sm"
            placeholder="Title"
            type="text"
            name="title"
          />
        </div>
        <div className="flex flex-grow">
          <UnitSelector style={"w-1/2 bg-gray-200 p-4"} />
          <Canvas style={"w-1/2 bg-gray-300 p-4"} />
        </div>
      </div>
    </>
  );
};

export default Sketch;
