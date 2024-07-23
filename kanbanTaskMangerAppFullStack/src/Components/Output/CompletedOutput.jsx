import React, { useState } from "react";
import axios from "axios";
import SingleTaskpopip from "../Form Popup/SingleTaskpopip";

function CompletedOutput({ tasks = [] }) {
  const [singleTaskPopup, setSingleTaskPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const singleTask = async (task) => {
    setSelectedTask(task);
    setSingleTaskPopup(!singleTaskPopup);
  };
  return (
    <>
      {singleTaskPopup && (
        <SingleTaskpopip
          singleTaskPopup={singleTaskPopup}
          setSingleTaskPopup={setSingleTaskPopup}
          task={selectedTask}
        />
      )}
      <div>
        <div className="p-4 dark:text-white">
          <h3>Completed ({tasks.length}) </h3>
        </div>
        <div className="">
          {tasks.map((task, index) => {
            const completedSubtasks = task.subtasks.filter(
              (subtask) => subtask.isCompleted
            ).length;
            const totalSubtasks = task.subtasks.length;

            return (
              <div
                onClick={() => {
                  singleTask(task);
                }}
                key={index}
                className="bg-white dark:bg-lightBlack2 dark:text-customWhite p-4 shadow-xl mb-5 rounded-md w-[280px] cursor-pointer"
              >
                <h2 className="text-xl pb-2">{task.title}</h2>
                <p className="text-sm dark:text-customGrey">
                  {completedSubtasks} of {totalSubtasks} subtasks
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CompletedOutput;
