import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

import Button from "../Button";

const SubNavBar = () => {
  const [isPublic, setIsPublic] = useState(true);

  const handleToggle = () => {
    setIsPublic((isPublic) => !isPublic);
  };

  const handleCopyUrl = async (target) => {
    try {
      await navigator.clipboard.writeText(target);
      alert("복사되었습니다!");
    } catch (error) {
      alert("복사에 실패했습니다");
    }
  };

  return (
    <nav className="bg-zinc-100">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-16 items-center justify-between">
          <Button
            style={
              "bg-blue-700 text-white rounded-md px-3 py-2 text-sm font-medium"
            }
          >
            Save
          </Button>
          <div className="flex items-center">
            {isPublic ? "Public" : "Private"}
            <Button onClick={handleToggle}>
              {isPublic ? <BsToggleOn size={25} /> : <BsToggleOff size={25} />}
            </Button>
            <Button
              onClick={() => handleCopyUrl(window.location.href)}
              style={
                "mx-5 bg-blue-700 text-white rounded-md px-3 py-2 text-sm font-medium"
              }
            >
              Copy Url
            </Button>
            <Button
              style={
                "mx-5 bg-blue-700 text-white rounded-md px-3 py-2 text-sm font-medium"
              }
            >
              Download Image
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubNavBar;
