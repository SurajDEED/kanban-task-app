/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */

import useBoardId from "../../Context/BoardContext";
import Button from "../FormComponents/Button";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import useBanner from "../../Context/Banners";

function DeleteBoard({
  handleCancelDelete,
  task,
  singleTaskPopup,
  setSingleTaskPopup,
}) {
  let { user, isAuthenticated } = useAuth0();
  const { selectedBoardId, boardName } = useBoardId();
  console.log(selectedBoardId);
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

  const deleteTask = async () => {
    if (user && isAuthenticated) {
      if (selectedBoardId) {
        try {
          let id = user.sub;
          const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/boardDelete/${selectedBoardId}/user/${id}`
          );
          console.log(response);
          successMessage = "Board removed successfully";
          setSuccessMessage(successMessage);

          setIsSuccessVisible(!isSuccessVisible);

          setTimeout(() => {
            setIsSuccessVisible((isSuccessVisible = false));
          }, 2000);

          handleCancelDelete();
        } catch (e) {
          console.log(e);
          alertMessage = "Error occured while removing board !!";
          setAlertMessage(alertMessage);
          setIsAlertVisible(!isAlertVisible);
          setTimeout(() => {
            setIsAlertVisible((isAlertVisible = false));
          }, 2000);

          handleCancelDelete();
        }
      } else {
        alertMessage = "Please select a board !!";
        setAlertMessage(alertMessage);
        setIsAlertVisible(!isAlertVisible);
        setTimeout(() => {
          setIsAlertVisible((isAlertVisible = false));
        }, 2000);
        handleCancelDelete();
      }
    } else {
      alertMessage = "Please login !!";
      setAlertMessage(alertMessage);
      setIsAlertVisible(!isAlertVisible);
      setTimeout(() => {
        setIsAlertVisible((isAlertVisible = false));
      }, 2000);
      handleCancelDelete;
    }
  };

  return (
    <>
      <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 justify-center flex w-full flex-col items-center">
        <div className="max-w-full sm:max-w-lg m-4 relative bg-white dark:bg-lightBlack2 p-6 rounded-md">
          <div>
            <h2 className="text-2xl p-2 text-customRed1">Delete this board?</h2>
            <p className="text-lg p-2 text-customGrey">
              Are you sure you want to delete the "{boardName}" board? This action cannot be reversed.
            </p>
            <div>
              <Button
                children={"Delete"}
                onclick={deleteTask}
                classname={
                  "w-full mt-4 mb-4 p-2 bg-customRed1 text-customWhite rounded-full hover:bg-customRed2 transition"
                }
              />
              <Button
                children={"Cancel"}
                classname={
                  "w-full mb-4 p-2 bg-lightPurpel text-darkPurpel rounded-full"
                }
                onclick={handleCancelDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteBoard;
