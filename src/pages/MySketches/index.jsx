import NavBar from "../../components/NavBar";

const MySketches = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex-grow grid grid-cols-3 grid-rows-2 gap-4 p-4">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="border p-4"></div>
          ))}
      </main>
      <footer className="bg-zinc-100 h-20 flex justify-center items-center">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default MySketches;
