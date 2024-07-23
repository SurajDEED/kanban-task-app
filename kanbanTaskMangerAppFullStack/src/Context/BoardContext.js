import { useContext, createContext } from "react";

export const BoardContext = createContext({
    selectedBoardId: null,
    boardName: null,
    setSelectedBoardId: () => { },
    setBoardName: () => { },
})


export const BoardProvider = BoardContext.Provider;

export default function useBoardId() {
    return useContext(BoardContext);
}