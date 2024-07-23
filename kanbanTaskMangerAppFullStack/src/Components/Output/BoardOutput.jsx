import iconAddNew from "../../assets/icon-add-task-mobile.svg";
import AddNewColumn from "./AddNewColumn";
import CompletedOutput from "./CompletedOutput";
import DoingOutput from "./DoingOutput";
import TodoOutput from "./TodoOutput";
import useBoardId from "../../Context/BoardContext";
import axios from "axios";
import useBanner from "../../Context/Banners";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
function BoardOutput({ setAddPopupSate, addPopupState }) {
  const { user, isAuthenticated } = useAuth0();
  const { selectedBoardId, setSelectedBoardId } = useBoardId();
  let {
    isAlertVisible,
    isSuccessVisible,
    setIsAlertVisible,
    setIsSuccessVisible,
    setAlertMessage,
    alertMessage,
    setSuccessMessage,
    successMessage,
  } = useBanner();
  const [tasks, setTasks] = useState([]);
  const setAddState = (e) => {
    e.preventDefault();
    if (selectedBoardId) {
      setAddPopupSate(!addPopupState);
    } else {
      console.log("Came haer");
      if (!user && !isAuthenticated) {
        alertMessage = "Please login to add a new task !!";
        setAlertMessage(alertMessage);
        setIsAlertVisible(!isAlertVisible);
        setTimeout(() => {
          setIsAlertVisible((isAlertVisible = false));
        }, 2000);
      } else if (selectedBoardId === null) {
        alertMessage = "Please select a board to add task";
        setAlertMessage(alertMessage);
        setIsAlertVisible(!isAlertVisible);
        setTimeout(() => {
          setIsAlertVisible((isAlertVisible = false));
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (selectedBoardId) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "/gettasks",
            {
              params: { boardId: selectedBoardId },
            }
          );
          setTasks(response.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };

      fetchTasks();
    }
  }, [selectedBoardId]);

  console.log(tasks);
  if (selectedBoardId && tasks) {
    return (
      <div className="bg-lightBlueish dark:bg-lightBlack1 mt-[100px] w-full flex p-5 min-h-[90vh] max-h-full gap-3 overflow-x-scroll overflow-y-scroll hide-scrollbar">
        <div>
          <TodoOutput tasks={tasks.filter((task) => task.status === "todo")} />
        </div>
        <div>
          <DoingOutput
            tasks={tasks.filter((task) => task.status === "doing")}
          />
        </div>
        <div>
          <CompletedOutput
            tasks={tasks.filter((task) => task.status === "completed")}
          />
        </div>
        <div>
          <AddNewColumn setAddState={setAddState} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex dark:bg-lightBlack1 bg-lightBlueish h-[100vh] w-full flex-col justify-center items-center">
        <div>
          {!isAuthenticated && !user && <p className="text-black dark:text-customWhite" >Please login to see tasks !!</p>}
        </div>
        <div className="mt-4">
          <button
            onClick={setAddState}
            className="flex m-2  items-center bg-darkPurpel  text-white hover:text-gray-200 transition rounded-xl p-3"
          >
            <img src={iconAddNew} alt="" />
            <p className="pl-3   rounded-r-full  ">Add new task</p>
          </button>
        </div>
      </div>
    );
  }
}

export default BoardOutput;
