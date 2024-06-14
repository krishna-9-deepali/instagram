import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Instagramimg, Footer } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log("login form data", data);
    setError("");
    try {
      const session = await authService.login(data);
      console.log("Session created:", session); //
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("Fetched user data:", userData, userData.name); // Debug: Log user data
        console.log("get user data", userData);
        if (userData) {
          localStorage.setItem("authToken", JSON.stringify(userData));
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center mt-32 mx-2  justify-center w-full ">
        <div
          className={`mx-auto w-full max-w-md   p-10 sm-border md-border lg-border border  border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            {/* <span className="inline-block w-full max-w-[100px]"> */}
            <Instagramimg className="font-black  text-5xl " />
            {/* </span> */}
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            {/* Sign in to your account */}
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            {/* Don&apos;t have any account?&nbsp; */}
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
              // onClick={(e) => navigate("/signup")}
            >
              {/* Sign Up */}
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email: "
                autoComplete="email"
                classNamelable="inputfile"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                classNamelable="inputfile"
                autoComplete="current-password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center mt-8 mx-2 mr-2 justify-center w-full">
        <div className={`mx-auto w-full max-w-md   p-4 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            <div className="  ">
              <h2 className="text-center text-2xl font-bold leading-tight">
                {/* Sign in to your account */}
              </h2>
              <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                  to="/signup"
                  className="font-medium text-primary transition-all duration-200  "
                  // onClick={(e) => navigate("/signup")}
                >
                  <span className="bold text-blue-400 font-black">Sign Up</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
