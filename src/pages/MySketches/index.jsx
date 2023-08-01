import { useState, useEffect } from "react";

import NavBar from "../../components/NavBar";
import SketchCard from "../../components/SketchCard";
import Button from "../../components/Button";

const MySketches = () => {
  const [sketches, setSketches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const userId = sessionStorage.getItem("userEmail");

  const onPrevButtonClick = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const onNextButtonClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const fetchSketches = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/sketches?per_page=6&page=${currentPage}`,
      );
      const sketchesData = await response.json();

      setTotalPages(sketchesData.sketches.totalPages);
      setSketches(sketchesData.sketches.list);
    } catch (error) {
      console.error("Failed to fetch sketches", error.message);
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
          ? sketches.map((sketch) => (
              <SketchCard key={sketch.url} sketch={sketch} />
            ))
          : null}
      </main>
      <nav className="flex justify-center">
        <ul className="list-style-none flex">
          <li>
            <Button
              style={
                "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
              }
              onClick={onPrevButtonClick}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
          </li>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <li key={pageNumber} aria-current={pageNumber + 1 === currentPage}>
              <Button
                style={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 dark:text-neutral-400 ${
                  pageNumber + 1 === currentPage
                    ? "text-neutral-700 shadow-lg"
                    : "text-neutral-500"
                }`}
                onClick={() => setCurrentPage(pageNumber + 1)}
              >
                {pageNumber + 1}
              </Button>
            </li>
          ))}
          <li>
            <Button
              style={
                "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
              }
              onClick={onNextButtonClick}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MySketches;
