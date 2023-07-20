import React from "react";
import NavBar from "../../components/NavBar";
import Button from "../../components/Button";

const Login = () => {
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
                <Button />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
