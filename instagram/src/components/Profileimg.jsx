import React, { useRef } from "react";
import Input from "./Input";
import { HiUserCircle } from "react-icons/hi";
function Profileimg({ className = "", ...prop }) {
  const inputRef = useRef(null);
  const handleImageupload = () => {
    // inputRef.current.click();
    console.log("clicked");
  };
  return (
    <>
      <div
        className={`flex items-center justify-center   ${className} `}
        {...prop}
      >
        <HiUserCircle className="text-9xl text-slate-300 profile " />
      </div>
      {/*<div className="">
          <Input
            // label="Featured Image :"
            type="file"
            classNamelable="bg-blue-500 text-white rounded"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            ref={inputRef}
            style={{ display: "none" }}
          />
        </div>
      </div> */}
    </>
  );
}

export default Profileimg;
