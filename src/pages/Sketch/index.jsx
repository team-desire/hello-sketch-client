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
        <div className="flex flex-grow">
          <UnitSelector style={"w-1/2 bg-gray-200 p-4"} />
          <Canvas style={"w-1/2 bg-gray-300 p-4"} />
        </div>
      </div>
    </>
  );
};

export default Sketch;
