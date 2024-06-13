import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  const footer = [
    "Meta",
    "About",
    "Blog",
    "Jobs",
    "Help",
    "API",
    "Privacy",
    "Terms",
    "Locations",
    "Instagram Lite",
    "Threads",
    "Contact uploading and non-users",
    "Meta & Verified",
  ];

  return (
    <div
      className="flex flex-col flex-wrap items-center justify-center my-20 text-sm gap-y-4 "
      style={{ color: "#737373" }}
    >
      <div className=" flex gap-x-4 justify-center flex-wrap items-center">
        {footer.map((item) => (
          <Link to="" key={item}>
            {item}
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {" "}
        English(Uk)&#9662; &nbsp; &#169; Instagram from Meta{" "}
      </div>
    </div>
  );
}

export default Footer;
