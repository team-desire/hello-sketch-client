import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import Button from "../../components/Button";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/NavBar";

const Home = () => {
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

        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: {
                Authrorization: token,
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
            console.log(error);
          }
        };
        await fetchData(token);
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
                Welcome Hello, sketch!
              </h2>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                collection of illustrations of people for designer
              </h2>
              <Carousel />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <Button
                  onClick={signInwithGoogle}
                  style={
                    "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  }
                >
                  sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
