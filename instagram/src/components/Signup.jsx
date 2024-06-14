import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Instagramimg, Footer } from "./index";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      console.log(userData);
      if (userData) {
        const userData = await authService.getCurrentUser();
        localStorage.setItem("authToken", JSON.stringify(userData));
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center mt-32 justify-center w-full">
        <div className={`mx-auto w-full max-w-md  p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            {/* <span className="inline-block w-full max-w-[100px]"> */}
            <Instagramimg className="font-black  text-5xl " />
            {/* </span> */}
          </div>
          <h2
            className="text-center text-lg	 my-8 font-bold  leading-tight"
            style={{ color: "#737373" }}
          >
            Sign up to see photos and videos from your friends.
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            {/* Already have an account?&nbsp; */}
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              {/* Sign In */}
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Full Name: "
                autoComplete="username"
                classNamelable="inputfile"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Email: "
                autoComplete="email"
                placeholder="Enter your email"
                classNamelable="inputfile"
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
                type="password"
                autoComplete="current-password"
                classNamelable="inputfile"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center mt-8  mr-2 justify-center w-full">
        <div className={`mx-auto w-full max-w-md   p-4 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            <div className="  ">
              <h2 className="text-center text-2xl font-bold leading-tight">
                {/* Sign in to your account */}
              </h2>
              <p className="mt-2 text-center text-base text-black/60">
                Have an account?&nbsp;
                <Link
                  to="/login"
                  className="font-medium text-primary transition-all duration-200  "
                  // onClick={(e) => navigate("/signup")}
                >
                  <span className="bold text-blue-400 font-black"> Log in</span>
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

export default Signup;
