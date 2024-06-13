import React from "react";
import { Button } from "./index";
import { useSelector } from "react-redux";
function Namebutton() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div>
      <div className="flex gap-2 items-center">
        <div className="text-3xl mr-3 capitalize">{userData.name}</div>
        <div>
          <Button
            children="Edit Profile"
            style={{ backgroundColor: "#efefef" }}
            textColor="text-black"
          />
        </div>
        <div>
          <Button
            children="View Archive"
            style={{ backgroundColor: "#efefef" }}
            textColor="text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default Namebutton;
