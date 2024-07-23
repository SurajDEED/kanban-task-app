import React, { useId } from "react";

function Button(
  { type="", onchange="", classname = "", onclick = "", children = "", ...props },
  ref
) {
  const id = useId();
  return (
    <>
      <button id={id} type={type} onClick={onclick}  onChange={onchange} className={` ${classname}`}>
        {children} 
      </button>
    </>
  );
}

export default React.forwardRef(Button);
