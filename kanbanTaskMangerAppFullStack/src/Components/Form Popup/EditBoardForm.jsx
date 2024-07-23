/* eslint-disable react/prop-types */
import iconCross from "../../assets/icon-cross.svg";
import { useRef, useEffect } from "react";
import useBoardId from "../../Context/BoardContext";
import Button from "../FormComponents/Button";
import Input from "../FormComponents/Input";
import axios from "axios";
import useBanner from "../../Context/Banners";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";

function EditBoardForm({ editBoardPopupSate, setEditBoardPopupState }) {
  const closeEditForm = (e) => {
    e.preventDefault();
    setEditBoardPopupState(!editBoardPopupSate);
  };
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

  const { user, isAuthenticated } = useAuth0();

  let { selectedBoardId, boardName } = useBoardId();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: boardName,
    },
  });

  const onSubmit = async (data) => {
    if (user && isAuthenticated) {
      if (selectedBoardId !== null) {
        try {
          const response = await axios.put(
            import.meta.env.VITE_BACKEND_URL + "/editboard",
            { selectedBoardId, data }
          );
          console.log(response);
          successMessage = "The board was updated successfully !!";
          setSuccessMessage(successMessage);

          setIsSuccessVisible(!isSuccessVisible);
          setTimeout(() => {
            setIsSuccessVisible((isSuccessVisible = false));
          }, 2000);

          setEditBoardPopupState(!editBoardPopupSate);
        } catch (e) {
          console.log(e.message);
          alertMessage = "Error occurred while updating the board !!";
          setAlertMessage(alertMessage);
          setIsAlertVisible(!isAlertVisible);
          setTimeout(() => {
            setIsAlertVisible((isAlertVisible = false));
          }, 2000);
          setEditBoardPopupState(!editBoardPopupSate);
        }
      } else {
        alertMessage = "Please select a board you want to edit !!";
        setAlertMessage(alertMessage);
        setIsAlertVisible(!isAlertVisible);
        setTimeout(() => {
          setIsAlertVisible((isAlertVisible = false));
        }, 2000);
        setEditBoardPopupState(!editBoardPopupSate);
      }
    } else {
      alertMessage = "Please login before editing a board!!";
      setAlertMessage(alertMessage);
      setIsAlertVisible(!isAlertVisible);
      setTimeout(() => {
        setIsAlertVisible((isAlertVisible = false));
      }, 2000);
      setEditBoardPopupState(!editBoardPopupSate);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setEditBoardPopupState(false);
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
          className="relative dark:bg-lightBlack2 rounded-md dark:text-customWhite bg-white p-6 w-full max-w-lg mx-4 sm:mx-auto"
        >
          <h2 className="text-2xl pb-4">Edit Board</h2>
          <div className="hide-scrollbar w-full max-h-[400px] overflow-y-scroll">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  label={"Board Name"}
                  type={"text"}
                  defaultValue={boardName}
                  placeholder={"e.g. Web Design"}
                  classname={
                    "h-[40px] w-full dark:bg-lightBlack1 outline-none border-2 p-2 border-gray-200 rounded-lg"
                  }
                  {...register("name", {
                    required: "Board name is required",
                  })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

              <div>
                <Button
                  classname={"w-full p-2 rounded-full bg-darkPurpel hover:bg-lightP transition text-white"}
                  type={"submit"}
                  children={"Save Changes"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBoardForm;
