import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signOut, getAuth } from "firebase/auth";

import Button from "../Button";

const NavBar = () => {
  const [toShowDropDownMenu, setToShowDropDownMenu] = useState(false);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    try {
      const auth = getAuth();

      await signOut(auth);
      sessionStorage.clear();

      navigate("/");
    } catch (error) {
      alert("error 발생");
    }
  };

  const userPhotoURL = sessionStorage.getItem("userPhotoURL");

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-16 items-center justify-between">
          <Button
            onClick={navigateToHome}
            style={
              "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            }
          >
            홈으로 가기
          </Button>

          <div>
            {!!sessionStorage.accessToken ? (
              <Button
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() =>
                  setToShowDropDownMenu(
                    (prevToShowDropDownMenu) => !prevToShowDropDownMenu,
                  )
                }
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={userPhotoURL}
                  alt="userImage"
                />
              </Button>
            ) : null}

            {toShowDropDownMenu && (
              <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Button style={"block px-4 py-2 text-sm text-gray-700"}>
                  내 그림 보기
                </Button>
                <Button
                  style={"block px-4 py-2 text-sm text-gray-700"}
                  onClick={logoutUser}
                >
                  로그아웃
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
