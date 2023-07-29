import NavBar from "../../components/NavBar";
import SketchCard from "../../components/SketchCard";

const MySketches = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex-grow grid grid-cols-3 grid-rows-2 gap-4 p-4">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <SketchCard key={index} />
          ))}
      </main>
      <footer className="bg-zinc-100 h-20 flex justify-center items-center">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default MySketches;
