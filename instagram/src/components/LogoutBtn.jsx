import React from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/authslice";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
    <button
      className="inline-bock flex justify-center  py-2 duration-200  rounded-full hidelogout   "
      onClick={logoutHandler}
    >
      <div className="flex items-center flex-warp gap-2 p-2 menu">
        <div className="text-3xl">
          <RiLogoutCircleRLine />
        </div>
        <div className={`hideMenu`}>Log out</div>
      </div>

      <div className="hideMenu"></div>
    </button>
  );
}

export default LogoutBtn;
