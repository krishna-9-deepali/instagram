import React from "react";
import { Instagramimg, LogoutBtn, Profileimg } from "./index";

function Navbar() {
  return (
    <div className="flex  justify-between fixed top-0 z-50 w-full items-center border bg-white p-2  shownavbar ">
      <div>
        <Instagramimg />
      </div>
      <div>
        <Profileimg style={{ width: "30px", height: "30px" }} />
      </div>
      <div>
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Navbar;
