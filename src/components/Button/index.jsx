import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

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
    <button
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={signInwithGoogle}
    >
      sign in with Google
    </button>
  );
};

export default Button;
