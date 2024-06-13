import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", classNamelable = "", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className={`inline-block mb-1 p-1 ${classNamelable}  `}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-blue-50 duration-200 border  w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
        // style={{ display: "none" }}
      />
    </div>
  );
});

export default Input;
