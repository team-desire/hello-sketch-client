import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import NavBar from "../../components/NavBar";
import Button from "../../components/Button";

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const token = await user.getIdToken();

        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("userPhotoURL", user.photoURL);
        sessionStorage.setItem("userEmail", user.email);

        const fetchData = async (token) => {
          try {
            const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: user.email }),
            });

            if (response.ok) {
              navigate("/");
            } else {
              throw new Error("요청이 실패했습니다");
            }
          } catch (error) {
            console.error("Error");
          }
        };

        await fetchData(token);
      }
    } catch (error) {
      console.error("Error");
    }
  };

  return (
    <div className="flex flex-col space-y-40">
      <NavBar />
      <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-zinc-100 border-2 border-blue-800 mx-56">
          <div className="sm:mx-auto sm:w-full">
            <h1 className="text-center text-4xl font-bold mt-0">
              Hello, sketch!
            </h1>
            <h2 className="my-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome Back
            </h2>
          </div>
          <div className="mt-2.5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <Button
                onClick={signInwithGoogle}
                style={
                  "flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                }
              >
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
