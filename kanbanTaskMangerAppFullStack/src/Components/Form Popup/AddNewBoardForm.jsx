/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import iconCross from "../../assets/icon-cross.svg";
import { useForm } from "react-hook-form";

import { useState, useEffect, useRef } from "react";
import Input from "../FormComponents/Input";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../FormComponents/Button";
import axios from "axios";
import useBanner from "../../Context/Banners";

function AddNewBoardForm({ addNewBoardPopupSate, setAddNewBoardPopupState }) {
  const { user, isAuthenticated } = useAuth0();
  const popupRef = useRef(null);

  let {
    isSuccessVisible,
    isAlertVisible,
    alertMessage,
    successMessage,
    setAlertMessage,
    setSuccessMessage,
    setIsAlertVisible,
    setIsSuccessVisible,
  } = useBanner();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isAuthenticated) {
      try {
        const { sub, email } = user;
        const boardTitle = data.boardTitle;

        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/boards",
          {
            auth0Id: sub,
            email,
            boardTitle,
          }
        );

        successMessage = "Board Created successfully";
        setSuccessMessage(successMessage);

        setIsSuccessVisible(!isSuccessVisible);

        setTimeout(() => {
          setIsSuccessVisible((isSuccessVisible = false));
        }, 3000);
        setAddNewBoardPopupState(!addNewBoardPopupSate);
        console.log(response.data);
      } catch (error) {
        console.error("Error saving board to the database", error);
        alertMessage = "Error occured while saving your board !!";
        setAlertMessage(alertMessage);
        setIsAlertVisible(!isAlertVisible);
        setTimeout(() => {
          setIsAlertVisible((isAlertVisible = false));
        }, 2000);
        setAddNewBoardPopupState(!addNewBoardPopupSate);
      }
    } else {
      alertMessage = "Please login and select a board for creating a task !!";
      setAlertMessage(alertMessage);
      setIsAlertVisible(!isAlertVisible);
      setTimeout(() => {
        setIsAlertVisible((isAlertVisible = false));
      }, 2000);
      setAddNewBoardPopupState(!addNewBoardPopupSate);
    }
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setAddNewBoardPopupState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 justify-center flex w-full flex-col items-center">
        <div
          ref={popupRef}
          className="relative bg-white dark:bg-lightBlack2 dark:text-customWhite p-6 w-full max-w-lg mx-4 sm:mx-auto rounded-md"
        >
          <h2 className="text-2xl pb-4">Add a new Board</h2>
          <div className="hide-scrollbar w-full max-h-[400px] overflow-y-scroll">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  label={"Board Name"}
                  classname={
                    "h-[40px] w-full outline-none border-2 p-2 border-gray-200 dark:bg-lightBlack2 dark:text-customWhite rounded-lg"
                  }
                  placeholder={"e.g. Web Design"}
                  type={"text"}
                  {...register("boardTitle", {
                    required: "Board name is required",
                  })}
                />
                {errors.boardTitle && (
                  <span className="text-red-500">
                    {errors.boardTitle.message}
                  </span>
                )}
              </div>
              <div>
                <Button
                  children={"Create New Board"}
                  type={"submit"}
                  classname={
                    "w-full mt-4 mb-4 p-2 bg-customRed1 text-customWhite rounded-full hover:bg-customRed2 transition"
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewBoardForm;
