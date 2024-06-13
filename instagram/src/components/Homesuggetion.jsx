import React from "react";
import { Button } from "./index";
import { FaRegUserCircle } from "react-icons/fa";
function Homesuggetion({ user }) {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-2">
          <FaRegUserCircle className="text-2xl" />
          <div className="capitalize font-semibold">{user}</div>
        </div>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
    </>
  );
}

export default Homesuggetion;
