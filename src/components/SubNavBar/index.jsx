import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { useParams } from "react-router-dom";

import Button from "../Button";

const SubNavBar = () => {
  const [isPublic, setIsPublic] = useState(true);
  const { sketch_id } = useParams();
  const userId = sessionStorage.getItem("userEmail");

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

  const handleDownloadImg = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userId}/sketches/${sketch_id}/download_url`,
      );

      const json = await response.json();
      const s3ItemUrl = json.url;
      const s3Response = await fetch(s3ItemUrl);

      if (!s3Response.ok) {
        throw new Error("Network response was not ok.");
      }

      const blob = await s3Response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "sketch.png";
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download the image", error.message);
    }
  };

  return (
    <nav className="bg-zinc-100 mt-1">
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
            {sketch_id && (
              <>
                <Button
                  onClick={() => handleCopyUrl(window.location.href)}
                  style={
                    "mx-5 bg-blue-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Copy Url
                </Button>
                <Button
                  onClick={handleDownloadImg}
                  style={
                    "mx-5 bg-blue-700 text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Download Image
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubNavBar;
