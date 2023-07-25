import NavBar from "../../components/NavBar";
import SubNavBar from "../../components/SubNavBar";

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
          <div className="w-1/3 bg-gray-200 p-4">
            <p>This is the left column.</p>
          </div>
          <div className="w-2/3 bg-gray-300 p-4">
            <p>This is the right column.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sketch;
