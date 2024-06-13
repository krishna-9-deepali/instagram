import React, { useState } from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiFolderVideoLine, RiFolderVideoFill } from "react-icons/ri";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import {
  BiMessageRoundedCheck,
  BiSolidMessageRoundedCheck,
} from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { RiAddBoxLine, RiAddBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Logo, Instagramimg, LogoutBtn } from "./index";

function Sidebar() {
  const [active, setActive] = useState("");

  const navlink = [
    {
      name: "Home",
      path: "/",
      active: <GoHomeFill />,
      inactive: <GoHome />,
    },
    // {
    //   name: "Search",
    //   path: "/",
    //   active: <GoHomeFill />,
    //   inactive: <GoHome />,
    // },

    {
      name: "Messages",
      path: "/",
      active: <BiSolidMessageRoundedCheck />,
      inactive: <BiMessageRoundedCheck />,
    },
    {
      name: "Notification",
      path: "/",
      active: <FaHeart />,
      inactive: <FaRegHeart />,
    },
    {
      name: "Create",
      path: "/createpost",
      active: <RiAddBoxFill />,
      inactive: <RiAddBoxLine />,
    },
    {
      name: "Profile",
      path: "/profile",
      active: <FaCircleUser />,
      inactive: <FaRegUserCircle />,
    },
    {
      name: "Reals",
      path: "/reels",
      active: <RiFolderVideoFill />,
      inactive: <RiFolderVideoLine />,
    },
    {
      name: "Explore",
      path: "/reels",
      active: <MdExplore />,
      inactive: <MdOutlineExplore />,
    },
  ];

  const handleIconClick = (item) => {
    setActive(item);
  };

  return (
    <>
      <div
        className="flex flex-col md:flex-row min-h-screen flex-wrap  "
        style={{ backgroundColor: "white" }}
      >
        <aside className="w-full  flex flex-warp  md:flex-col  md:min-h-screen gap-x-4 gap-y-6 sidebar sidebarWidth fixed  p-4">
          <div className="flex items-center  flex-warp gap-2 p-2">
            <div>
              <NavLink to="/">
                <Instagramimg className="showInstagramLogo" />
                <Logo />
              </NavLink>
            </div>
          </div>
          {/* Sidebar content */}
          {navlink.map((item) => (
            <NavLink
              to={item.path}
              className={(isActive) => `${isActive}`}
              onClick={() => handleIconClick(item.name)}
              key={item.name}
            >
              <div className="flex items-center flex-warp gap-2 p-2 menu">
                <div className="text-3xl">
                  {active === item.name ? item.active : item.inactive}
                </div>
                <div
                  className={`${
                    active === item.name ? "font-black" : ""
                  } hideMenu`}
                >
                  {item.name}
                </div>
              </div>
            </NavLink>
          ))}
          <div className="flex menu  logoutProfilehide">
            {/* <NavLink to="/"> */}

            <LogoutBtn></LogoutBtn>
            {/* </NavLink> */}
          </div>

          {/* <NavLink to="/profile" onClick={() => handleIconClick("profile")}>
        <div
          className="rounded rounded-2xl bg-black"
          style={{ width: "20px", height: "20px" }}
        ></div>
        profile
      </NavLink> */}
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
