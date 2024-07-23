/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useId } from "react";

function Input(
  {
    label,
    onchange = "",
    type = "text",
    placeholder,
    classname = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <>
      <div className="w-full">
        {label && (
          <label className="" htmlFor={id}>
            {label}
          </label>
        )}
        <div className="mt-2 mb-3 ">
          <input
            type={type}
            onChange={onchange}
            placeholder={placeholder}
            className={`${classname}`}
            ref={ref}
            id={id}
            {...props}
          />
        </div>
      </div>
    </>
  );
}

export default React.forwardRef(Input);
