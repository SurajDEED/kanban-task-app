import { useEffect } from "react";
import AddBoardComponet from "./AddBoardComponet";
import logoBoard from "../../assets/icon-board.svg";
import useBoardId from "../../Context/BoardContext";
import useUpdate from "../../Context/Updates";

function AllBoardsComponent({
  addNewBoardPopupSate,
  setAddNewBoardPopupState,
  board = [],
}) {
  const { selectedBoardId, setSelectedBoardId, boardName, setBoardName } =
    useBoardId();

  const updateId = (boardId) => {
    setSelectedBoardId(boardId._id);
    setBoardName(boardId.name);
  };

  // Set the default selected board when the component mounts or when board array changes
  useEffect(() => {
    if (board.length > 0 && !selectedBoardId) {
      setSelectedBoardId(board[0]._id);
      setBoardName(board[0].name);
    }
  }, [board, selectedBoardId, setSelectedBoardId, setBoardName]);

  return (
    <>
      <div className="">
        <p className="pb-3 ml-6 text-sm text-customGrey dark:text-customGrey">All Boards ({board.length}) </p>
        <div>
          <div className="flex flex-col gap-1 text-sm">
            {board.map((boar, index) => (
              <div
                key={index}
                onClick={() => updateId(boar)}
                className={`cursor-pointer text-customGrey flex p-2 text-lg items-center pl-6 ${
                  selectedBoardId === boar._id
                    ? "bg-darkPurpel text-white hover:bg-lightGrey hover:text-darkPurpel transition ease-in-out flex p-4 text-lg items-center rounded-r-full pl-6"
                    : "hover:bg-lightGrey dark:hover:bg-customWhite hover:text-darkPurpel rounded-r-full"
                }`}
              >
                <img className="mr-2 w-4 h-4" src={logoBoard} alt="" />
                <p>{boar.name}</p>
              </div>
            ))}

            <AddBoardComponet
              addNewBoardPopupSate={addNewBoardPopupSate}
              setAddNewBoardPopupState={setAddNewBoardPopupState}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllBoardsComponent;
