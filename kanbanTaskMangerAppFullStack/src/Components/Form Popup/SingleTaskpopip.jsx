/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-children-prop */
import React, { useState, useRef, useEffect } from "react";
import iconVe from "../../assets/icon-vertical-ellipsis.svg";
import DropDown from "../FormComponents/DropDown";
import useBoardId from "../../Context/BoardContext";
import axios from "axios";
import Delete from "./Delete"; // Import the Delete component
import EditTaskPopup from "./EditTaskPopup";

function SingleTaskpopip({ singleTaskPopup, setSingleTaskPopup, task }) {
  console.log(task);
  const { selectedBoardId } = useBoardId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.status);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const popupRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeTaskForm = (e) => {
    e.preventDefault();
    setSingleTaskPopup(!singleTaskPopup);
  };

  //   const handleCheckboxChange = (index) => {
  //     const updatedSubtasks = subtasks.map((subtask, i) =>
  //       i === index ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
  //     );
  //     setSubtasks(updatedSubtasks);
  //   };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  const handleEditClick = () => {
    setShowEditModal(true);
  };
  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSingleTaskPopup(false);
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
      {showEditModal ? (
        <EditTaskPopup
          task={task}
          handleCancelEdit={handleCancelEdit}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          setSingleTaskPopup={setSingleTaskPopup}
        />
      ) : showDeleteModal ? (
        <Delete singleTaskPopup={singleTaskPopup}  setSingleTaskPopup={setSingleTaskPopup} handleCancelDelete={handleCancelDelete} task={task} />
      ) : (
        <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 justify-center flex w-[100%] flex-col items-center ">
          <div
            ref={popupRef}
            className="w-[90%] sm:w-[80%] m-4 relative bg-white dark:bg-lightBlack2 p-[30px] rounded-md hide-scrollbar h-[400px] overflow-y-scroll"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl dark:text-customWhite">{task.title}</p>

              <div className="mr-3">
                <button onClick={toggleMenu}>
                  <img src={iconVe} alt="" />
                </button>
                {isMenuOpen && (
                  <div className="absolute w-[140px] shadow-[0_4px_10px_rgba(255,255,255,0.2)] right-[4%] top-[100px] bg-white rounded-xl flex flex-col p-4 dark:bg-lightBlack2">
                    <button onClick={handleEditClick}>
                      <p className="text-gray-500 pb-3">Edit Task</p>
                    </button>
                    <button onClick={handleDeleteClick}>
                      <p className="text-red-500">Delete Task</p>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="mb-4 max-w-[90%] text-customGrey">
              {task.description}
            </p>
            <p className="text-customGrey">Subtasks ({subtasks.length})</p>
            {subtasks.map((sub, index) => {
              return (
                <div
                  key={index}
                  className="flex mb-4 p-3 rounded-md gap-3 dark:bg-lightBlack1 dark:text-customWhite bg-lightBlueish text-customBlack font-bold hover:bg-lightPurpel transition"
                >
                  {/* <input
                    className="w-4"
                    type="checkbox"
                    checked={sub.isCompleted}
                    onChange={() => handleCheckboxChange(index)}
                  /> */}
                  <p className={sub.isCompleted ? "line-through" : ""}>
                    {sub.name}
                  </p>
                </div>
              );
            })}
            <p className="p-2 text-customGrey">Current Status</p>

            <p className="p-2 rounded-lg bg-lightPurpel dark:bg-lightBlack1 dark:text-customWhite text-center text-lg">
              {task.status &&
                task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleTaskpopip;
