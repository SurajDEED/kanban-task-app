import React, { useId } from "react";

function DropDown({ options = [], label, classname = "", ...props }, ref) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="mb-4">
        <select className={` ${classname}`} id={id} ref={ref} {...props} >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default React.forwardRef(DropDown);
