import React from "react";

function AddNewColumn({ setAddState }) {
  return (
    <>
      <div
        onClick={setAddState}
        className=" cursor-pointer h-[93%] flex mt-[19%] rounded-md shadow-xl  justify-center items-center text-2xl w-[300px] bg-lightGrey dark:bg-lightBlack2"
      >
        <div className="">
          <h1 className=" cursor-pointer text-gray-500 hover:text-darkPurpel">
            + Add new Task
          </h1>
        </div>
      </div>
    </>
  );
}

export default AddNewColumn;
