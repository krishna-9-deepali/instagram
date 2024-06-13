import React from "react";

export default function Button({
  children, //children is text
  type = "button",
  bgColor = "bg-blue-400",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={` py-2 my-4 p-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
