import React, { useId } from "react";

function Textarea({ label, placeholder, classname = "", ...props }, ref) {
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
          <textarea
            placeholder={placeholder}
            className={`${classname}`}
            rows="5"
            ref={ref}
            id={id}
            {...props}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default React.forwardRef(Textarea);
