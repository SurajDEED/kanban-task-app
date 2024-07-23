import React, { createContext, useState, useContext } from 'react';

const UpdateContext = createContext({
    boards: [],
    tasks: [],
    setBoards: (boards) => { },
    setTasks: (tasks) => { },
    addBoard: (newboard) => { },
    removeBoard: (boardId) => { },
    updateBoard: (updateboard) => { },
    addTask: (newtask) => { },
    removeTask: (taskId) => { },
    updateTask: (updatetask) => { }

});


export const UpdateProvider = UpdateContext.Provider;

export default function useUpdate() {
    return useContext(UpdateContext);
}