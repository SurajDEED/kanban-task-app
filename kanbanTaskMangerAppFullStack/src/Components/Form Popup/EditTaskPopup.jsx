/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Textarea from "../FormComponents/Textarea";
import Input from "../FormComponents/Input";
import Button from "../FormComponents/Button";
import DropDown from "../FormComponents/DropDown";
import useBoardId from "../../Context/BoardContext";
import iconCross from "../../assets/icon-cross.svg";
import axios from "axios";
import useBanner from "../../Context/Banners";
import { useAuth0 } from "@auth0/auth0-react";

function EditTaskPopup({
  task,
  showEditModal,
  setShowEditModal,
  handleCancelEdit,
  setSingleTaskPopup,
}) {
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
  let { user, isAuthenticated } = useAuth0();
  const popupRef = useRef(null);
  const { selectedBoardId } = useBoardId();
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtask",
  });
  React.useEffect(() => {
    reset({
      title: task.title,
      description: task.description,
      subtasks: task.subtasks,
      status: task.status,
    });
  }, [task, reset]);
  const onSubmit = async (data) => {
    if (user && isAuthenticated) {
      console.log("Form Submitted");
      console.log("The data is " + JSON.stringify(data));
      console.log(subtasks);
      try {
        const id = task._id;
        const response = await axios.put(
          import.meta.env.VITE_BACKEND_URL + "/edittasks",
          { id, data, subtasks }
        );
        console.log(response);
        successMessage = "The task was updated successfully !!";
        setSuccessMessage(successMessage);

        setIsSuccessVisible(!isSuccessVisible);

        setTimeout(() => {
          setIsSuccessVisible((isSuccessVisible = false));
        }, 2000);

        setSingleTaskPopup(false);
        setShowEditModal(false);
      } catch (e) {
        console.log(e.message);
        alertMessage = "Error occurred while updating the task !!";
        setAlertMessage(alertMessage);
        setIsAlertVisible(!isAlertVisible);
        setTimeout(() => {
          setIsAlertVisible((isAlertVisible = false));
        }, 2000);
        setSingleTaskPopup(false);
        setShowEditModal(false);
      }
    } else {
      alertMessage = "Please login before editing a task !!";
      setAlertMessage(alertMessage);
      setIsAlertVisible(!isAlertVisible);
      setTimeout(() => {
        setIsAlertVisible((isAlertVisible = false));
      }, 2000);
      setSingleTaskPopup(false);
      setShowEditModal(false);
    }
  };
  const handleCheckboxChange = (index) => {
    const updatedSubtasks = subtasks.map((subtask, i) =>
      i === index ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
    );
    setSubtasks(updatedSubtasks);
  };
  console.log(subtasks);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowEditModal(false);
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
      <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 justify-center flex w-[100%] flex-col items-center ">
        <div
          ref={popupRef}
          className="w-[90%] sm:w-[80%] max-w-[600px] m-4 relative hide-scrollbar dark:bg-lightBlack2 dark:text-customWhite h-[80%] sm:h-[400px] overflow-y-scroll bg-white rounded-md p-[30px]"
        >
          <div className="flex justify-between items-center mb-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div>
                <Input
                  label="Title"
                  type="text"
                  placeholder="e.g. Take coffee break"
                  classname="h-[40px] dark:bg-lightBlack1 w-full outline-none border-2 p-2 border-gray-200 rounded-lg"
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
                  classname="w-full dark:bg-lightBlack1 resize-none outline-none border-2 p-2 border-gray-200 rounded-lg"
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
                  {subtasks.map((sub, index) => {
                    return (
                      <div
                        key={index}
                        className="flex dark:bg-lightBlack1 mb-4 p-3 rounded-md gap-3 bg-lightBlueish text-customBlack font-bold hover:bg-lightPurpel transition"
                      >
                        <input
                          className="w-4"
                          type="checkbox"
                          checked={sub.isCompleted}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <p className={sub.isCompleted ? "line-through" : ""}>
                          {sub.name}
                        </p>
                      </div>
                    );
                  })}
                  {fields.map((item, index) => (
                    <div className="flex items-center mb-2" key={item.id}>
                      <Input
                        classname="w-[90%] dark:bg-lightBlack1 h-[40px] outline-none border-2 p-2 border-gray-200 rounded-lg"
                        placeholder="e.g. Make Coffee"
                        type="text"
                        {...register(`subtask.${index}.name`, {
                          required: "Subtask is required",
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2"
                      >
                        <img className="h-5 w-5" src={iconCross} alt="Remove" />
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    classname="w-full p-2 rounded-full bg-lightPurpel text-darkPurpel"
                    onclick={() => append({ name: "" })}
                  >
                    + Add a new subtask
                  </Button>
                </div>
              </div>

              <div>
                <DropDown
                  label="Status"
                  classname="w-full dark:bg-lightBlack1 h-[40px] border-2 p-2 border-gray-200 outline-none"
                  options={["Todo", "Doing", "Completed"]}
                  {...register("status", { required: "Status is required" })}
                />
                {errors.status && (
                  <span className="text-red-500">{errors.status.message}</span>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  classname="w-full p-2 rounded-full bg-darkPurpel transition-colors hover:bg-lightPurpel hover:text-darkBlack text-white"
                >
                  Save Changes
                </Button>
                <Button
                  onclick={handleCancelEdit}
                  classname="w-full mt-3 p-2 rounded-full bg-customRed1 hover:bg-customRed2 transition text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTaskPopup;
