import { useState, useEffect } from "react";

import NavBar from "../../components/NavBar";
import SketchCard from "../../components/SketchCard";
import Button from "../../components/Button";

const MySketches = () => {
  const [sketches, setSketches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const onPrevButtonClick = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const onNextButtonClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const userId = sessionStorage.getItem("userEmail");

  useEffect(() => {
    const fetchUserSketches = async () => {
      try {
        if (!userId) {
          console.error("No email found");

          return;
        }

        const response = await fetch(
          `http://localhost:3000/users/${userId}/sketches`,
        );
        const usersSkeches = await response.json();
        setSketches(usersSkeches.sketches.list);
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchUserSketches();
  }, [userId]);

  const fetchSketches = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/sketches?per_page=6&page=${currentPage}`,
      );
      const sketchesData = await response.json();
      setTotalPages(sketchesData.sketches.totalPages);
      setSketches(sketchesData.sketches.list);
    } catch (error) {
      console.error("Failed to fetch sketches:", error.message);
    }
  };

  useEffect(() => {
    fetchSketches();
  }, [currentPage]);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <main className="flex-grow grid grid-cols-3 grid-rows-2 gap-4 p-4">
        {sketches.length !== 0
          ? sketches.map((sketch, index) => (
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
