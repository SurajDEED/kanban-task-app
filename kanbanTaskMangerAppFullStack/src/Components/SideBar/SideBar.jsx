/* eslint-disable react/prop-types */

import AllBoardsComponent from "./AllBoardsComponent";
import DarkModeToggleComponent from "./DarkModeToggleComponent";
import HideSideBarComponent from "./HideSideBarComponent";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function SideBar({
  toggleSidebar,
  toggleState,

  addNewBoardPopupSate,
  setAddNewBoardPopupState,
}) {
  const { user, isAuthenticated } = useAuth0();
  const fetchBoards = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/boards?auth0Id=${user.sub}`
        );
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    }
  };

  const [board, setBoard] = useState([]);
  useEffect(() => {
    fetchBoards();
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="fixed flex top-[70px] pt-[36px]  flex-col h-[90vh] justify-between bg-white dark:bg-lightBlack2 p-3">
        <div className=" flex flex-col w-[230px]  justify-between h-full">
          <AllBoardsComponent
            board={board}
            addNewBoardPopupSate={addNewBoardPopupSate}
            setAddNewBoardPopupState={setAddNewBoardPopupState}
          />
        </div>
        <div className="mb-4">
          <DarkModeToggleComponent />
          <HideSideBarComponent
            toggleSidebar={toggleSidebar}
            toggleState={toggleState}
          />
        </div>
      </div>
    </>
  );
}

export default SideBar;
