import React, { useState, useEffect } from "react";
import DarkModeToggleComponent from "./DarkModeToggleComponent";
import logoBoard from "../../assets/icon-board.svg";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import useBoardId from "../../Context/BoardContext";
import AddBoardComponet from "./AddBoardComponet";

function DropDownSideBar({ addNewBoardPopupSate, setAddNewBoardPopupState }) {
  const { user, isAuthenticated } = useAuth0();
  const [boards, setBoards] = useState([]);
  let { setSelectedBoardId, selectedBoardId, setBoardName } = useBoardId();

  const updateId = (boardId) => {
    setSelectedBoardId(boardId._id);
    setBoardName(boardId.name);
  };
  useEffect(() => {
    const fetchBoards = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + `/boards?auth0Id=${user.sub}`
          );
          setBoards(response.data);
        } catch (error) {
          console.error("Error fetching boards:", error);
        }
      }
    };

    fetchBoards();
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="h-full absolute">
        <div className="flex dark:bg-lightBlack2 dark:text-lightGrey flex-col justify-center gap-1 text-sm fixed top-[100px]  left-[1%] rounded-xl w-[60%] pb-5 bg-white pr-5">
          <div>
            <p className="pb-3 ml-6 mt-4 text-md">
              All Boards ({boards.length}){" "}
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            {boards.map((board, index) => (
              <div
                key={index}
                onClick={() => updateId(board)}
                className={`cursor-pointer flex p-2 text-lg items-center pl-6 ${
                  selectedBoardId === board._id
                    ? "bg-darkPurpel text-white hover:bg-lightGrey hover:text-darkPurpel transition ease-in-out flex p-4 text-lg items-center rounded-r-full pl-6"
                    : "hover:bg-lightGrey hover:text-darkPurpel rounded-r-full"
                }`}
              >
                <img className="mr-2 w-4 h-4" src={logoBoard} alt="" />
                <p>{board.name}</p>
              </div>
            ))}

            <AddBoardComponet
              addNewBoardPopupSate={addNewBoardPopupSate}
              setAddNewBoardPopupState={setAddNewBoardPopupState}
            />
          </div>
          <div>
            <DarkModeToggleComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default DropDownSideBar;
