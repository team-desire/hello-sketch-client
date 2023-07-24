import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

import Button from "../Button";

const SubNavBar = () => {
  const [isPublic, setIsPublic] = useState(true);

  const handleToggle = () => {
    setIsPublic((isPublic) => !isPublic);
  };

  return (
    <nav className="bg-zinc-100">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-16 items-center justify-between">
          <Button onClick={handleToggle}>
            {isPublic ? <BsToggleOn size={25} /> : <BsToggleOff size={25} />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default SubNavBar;
