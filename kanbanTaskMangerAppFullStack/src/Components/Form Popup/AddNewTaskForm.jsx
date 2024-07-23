import { useRef, useEffect } from "react";
import iconCross from "../../assets/icon-cross.svg";
import Button from "../FormComponents/Button";
import DropDown from "../FormComponents/DropDown";
import Input from "../FormComponents/Input";
import Textarea from "../FormComponents/Textarea";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm, useFieldArray } from "react-hook-form";
import useBoardId from "../../Context/BoardContext";
import useBanner from "../../Context/Banners";

function AddNewTaskForm({ setAddPopupSate, addPopupState }) {
  const popupRef = useRef(null);
  const { selectedBoardId, setSelectedBoardId } = useBoardId();
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
  const closeAddForm = (e) => {
    e.preventDefault();
    setAddPopupSate(!addPopupState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit = async (data) => {
    if (isAuthenticated) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/addtasks",
          {
            selectedBoardId,
            data,
          }
        );
        console.log(response.data);
        successMessage = response.data;
        setSuccessMessage(successMessage);

        setIsSuccessVisible(!isSuccessVisible);

        setTimeout(() => {
          setIsSuccessVisible((isSuccessVisible = false));
        }, 2000);
        setAddPopupSate(!addPopupState);
      } catch (e) {
        console.error("Error saving task to the database", e);
        alertMessage = "Error occurred while saving your task !!";
        setAlertMessage(alertMessage);
        setIsAlertVisible(!isAlertVisible);
        setTimeout(() => {
          setIsAlertVisible((isAlertVisible = false));
        }, 2000);
        setAddPopupSate(!addPopupState);
      }
    } else {
      alertMessage = "Please login and select a board for creating a task !!";
      setAlertMessage(alertMessage);
      setIsAlertVisible(!isAlertVisible);
      setTimeout(() => {
        setIsAlertVisible((isAlertVisible = false));
      }, 2000);
      setAddPopupSate(!addPopupState);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setAddPopupSate(false);
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
      <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full h-full">
        <div
          ref={popupRef}
          className="relative dark:text-customWhite bg-white dark:bg-lightBlack2 p-6 rounded-md w-full max-w-md mx-4 overflow-y-auto"
        >
          <h2 className="text-2xl pb-4">Add a new Task</h2>
          <div className="overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  label="Title"
                  type="text"
                  placeholder="e.g. Take coffee break"
                  classname="h-10 w-full dark:bg-lightBlack1 outline-none border-2 p-2 border-gray-200 rounded-lg"
                  {...register("title", {
                    required: "Task title is required",
                  })}
                />
                {errors.title && (
                  <span className="text-red-500">{errors.title.message}</span>
                )}
              </div>

              <div>
                <Textarea
                  label="Description"
                  placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little"
                  classname="w-full resize-none dark:bg-lightBlack1 outline-none border-2 p-2 border-gray-200 rounded-lg"
                  {...register("description", {
                    required: "Task description is required",
                  })}
                />
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="flex flex-col mb-2 mt-3">
                  <label className="mb-2">Subtasks</label>
                  {fields.map((item, index) => (
                    <div className="flex items-center mb-2" key={item.id}>
                      <Input
                        classname="w-[90%] h-10 outline-none border-2 p-2 border-gray-200 dark:bg-lightBlack1 rounded-lg"
                        placeholder="e.g. Make Coffee"
                        type="text"
                        {...register(`subtasks.${index}.name`, {
                          required: "Subtask is required",
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2"
                      >
                        <img className="h-5 w-5" src={iconCross} alt="" />
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    classname="w-full p-2 hover:bg-darkPurpel hover:text-customWhite transition rounded-full bg-lightPurpel text-darkPurpel"
                    onclick={() => append({ name: "" })}
                  >
                    Add a new subtask
                  </Button>
                </div>
              </div>

              <div>
                <DropDown
                  label="Status"
                  classname="w-full h-10 dark:bg-lightBlack1 rounded-sm border-2 p-2 border-gray-200 outline-none"
                  options={["Todo", "Doing", "Completed"]}
                  {...register("status", { required: "Status is required" })}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  classname="w-full p-2 rounded-full hover:bg-lightP transition bg-darkPurpel text-white"
                >
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewTaskForm;
