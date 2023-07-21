import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
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

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2">
        <div className="relative flex h-16 items-center justify-between">
          <a
            href="#"
            className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            aria-current="page"
          >
            홈으로 가기
          </a>

          <div className="relative ml-3">
            <div>
              <button
                type="button"
                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://lh3.googleusercontent.com/a/AAcHTtc_iQzeM6UY-xwrPg_jMPl2SxW-7fNaVyoSuEmia-qh=s96-c"
                  alt="userImg"
                />
              </button>
            </div>

            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              <button className="block px-4 py-2 text-sm text-gray-700">
                내 그림 보기
              </button>

              <button
                className="block px-4 py-2 text-sm text-gray-700"
                onClick={logoutUser}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
