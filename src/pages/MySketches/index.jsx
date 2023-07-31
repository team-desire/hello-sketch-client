import { useState, useEffect } from "react";

import NavBar from "../../components/NavBar";
import SketchCard from "../../components/SketchCard";

const MySketches = () => {
  const [sketches, setSketches] = useState([]);

  useEffect(() => {
    const fetchUserSketches = async () => {
      try {
        const userId = sessionStorage.getItem("userEmail");

        if (!userId) {
          console.error("No email found");

          return;
        }

        const response = await fetch(
          `http://localhost:3000/users/${userId}/sketches`,
        );
        const usersSkeches = await response.json();
        setSketches(usersSkeches);
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchUserSketches();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex-grow grid grid-cols-3 grid-rows-2 gap-4 p-4">
        {sketches.length !== 0
          ? sketches.sketches.list.map((sketch, index) => (
              <SketchCard key={index} sketch={sketch} />
            ))
          : null}
      </main>
      <footer className="bg-zinc-100 h-20 flex justify-center items-center">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default MySketches;
