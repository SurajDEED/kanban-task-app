/* eslint-disable no-undef */

import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import User from './Schema/UserSchema.js';
import bodyParser from 'body-parser';
import Board from './Schema/Board.js';
import Task from './Schema/TaskSchema.js';
import subtaskSchema from './Schema/Subtask.js';
import Subtask from './Schema/Subtask.js';
config();

const app = express();

app.use(cors());
app.use(json());
app.use(bodyParser.json());

connect("mongodb://localhost:27017/taskapp")
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    console.log("I got request from front end")
});


app.post('/saveData', async (req, res) => {
    const { auth0Id, email } = req.body;
    try {
        let user = await User.findOne({ auth0Id });

        if (!user) {
            user = new User({ auth0Id, email });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/boards', async (req, res) => {
    const { auth0Id } = req.query;

    try {
        const user = await User.findOne({ auth0Id }).populate('boards');
        console.log("The user is " + user.boards)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user.boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


})

app.post('/boards', async (req, res) => {
    const { auth0Id, email, boardTitle } = req.body
    try {
        let user = await User.findOne({ auth0Id });
        let board = new Board({ name: boardTitle, user: user.id })
        await board.save();
        console.log(board)
        console.log(user);
        console.log(user.id);
        user.boards.push(board._id);
        await user.save();
        res.status(200).json(board);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

app.get('/gettasks', async (req, res) => {
    const { boardId } = req.query;
    console.log("Request got again")
    try {
        const board = await Board.findById(boardId).populate({
            path: 'tasks',
            populate: { path: 'subtasks' } // Populate subtasks for each task
        });
        console.log(board);
        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }
        res.status(200).json(board.tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post('/addtasks', async (req, res) => {
    let { selectedBoardId, data } = req.body;
    console.log(selectedBoardId, data);
    let board = await Board.findOne({ _id: selectedBoardId })
    console.log("The board is " + board);
    console.log(data);
    try {
        let task = new Task({
            title: data.title,
            description: data.description,
            status: data.status.toLowerCase(),
        })
        await task.save();
        console.log(task);
        console.log("The task is " + task);
        board.tasks.push(task._id);
        console.log(board)
        await board.save();
        if (data.subtasks) {
            const subt = await Promise.all(
                data.subtasks.map(async (sub) => {

                    const newSubtask = new Subtask({ name: sub.name, isCompleted: false });
                    await newSubtask.save();
                    return newSubtask._id;

                })
            );
            task.subtasks = subt;
            await task.save();
        }

        console.log("Now the new task is " + task);
        res.status(200).send("Task was added successfully !!")
    } catch (e) {
        console.log(e);
        res.status(200).send("Error occured while adding task !! ")
    }

})

app.put('/editboard', async (req, res) => {
    let { selectedBoardId, data } = req.body;

    try {
        let updatedBoard = await Board.findByIdAndUpdate(
            { _id: selectedBoardId },
            { name: data.name },
            { new: true }
        );

        if (!updatedBoard) {
            return res.status(404).send('Board not found');
        }

        res.status(200).json({ message: 'Board updated successfully', board: updatedBoard });
    } catch (e) {
        console.error(e);
        res.status(500).send('An error occurred while updating the board');
    }


})

app.put('/edittasks', async (req, res) => {
    const { data, id, subtasks } = req.body;

    try {
        const task = await Task.findById(id).populate('subtasks');
        if (!task) {
            return res.status(404).send("Task not found");
        }

        console.log("The stauuts isn " + data.status);

        task.title = data.title;
        task.description = data.description;
        task.status = data.status.toLowerCase();

        console.log(data);
        console.log(subtasks);
        await Promise.all(
            subtasks.map(async (sub, index) => {
                let singletask = await Subtask.findById({ _id: sub._id });
                console.log("Single task is " + singletask);
                if (singletask) {
                    singletask.isCompleted = sub.isCompleted;
                    singletask.save();
                }
            })
        )

        if (data.subtask) {

            await Promise.all(
                data.subtask.map(async (sub) => {

                    const newSubtask = new Subtask({ name: sub.name, isCompleted: false });
                    await newSubtask.save();
                    task.subtasks.push(newSubtask._id);
                })
            );

        }


        console.log(task);
        task.save();
        console.log("The final task is " + task);
        res.status(200).send("Task was updated ")
    } catch (e) {
        console.log(e);
        res.status(500).send("Task updation failed")
    }

})

app.delete('/board/:selectedBoardId/delete/:id', async (req, res) => {
    let { id, selectedBoardId } = req.params;
    console.log(id, selectedBoardId);
    let task = await Task.findById({ _id: id });
    const updatedBoard = await Board.findByIdAndUpdate(
        selectedBoardId,
        { $pull: { tasks: id } },
        { new: true }
    );
    if (!updatedBoard) {

        return res.status(404).json({ message: 'Board not found' });
    }
    const subtasks = task.subtasks;
    await Subtask.deleteMany({ _id: { $in: subtasks } });
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {

        return res.status(404).json({ message: 'Task not found' });
    }

    console.log('Updated Board:', updatedBoard);
    console.log('Deleted Task:', deletedTask);
    res.status(200).send("Deleation Done !!")

})


app.delete('/boardDelete/:selectedBoardId/user/:id', async (req, res) => {
    let { id, selectedBoardId } = req.params;
    console.log("User ID:", id);
    console.log("Board ID:", selectedBoardId);

    try {

        let user = await User.findOneAndUpdate(
            { auth0Id: id },
            { $pull: { boards: selectedBoardId } },
            { new: true }
        );

        if (!user) {

            return res.status(404).send("User not found");
        }

        console.log("Updated User:", user);

        let board = await Board.findByIdAndDelete({ _id: selectedBoardId });

        if (!board) {
            return res.status(404).send("Board not found");
        }

        console.log("Deleted Board:", board);
        res.status(200).send("Board removed successfully");
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
