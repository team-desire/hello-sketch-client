import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";

const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const tkn = await user.getIdToken();

        sessionStorage.setItem("accessToken", tkn);

        const fetchData = async (tkn) => {
          try {
            const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: {
                Authorization: tkn,
              },
            });

            if (response.ok) {
              navigate("/");
            } else {
              throw new Error("요청이 실패했습니다");
            }
          } catch (error) {
            console.error(error);
          }
        };

        await fetchData(tkn);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-40">
        <NavBar />
        <div>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-violet-200 border-2 border-indigo-600 mx-56">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Hello, sketch!
              </h2>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome Back
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={signInwithGoogle}
                >
                  sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
