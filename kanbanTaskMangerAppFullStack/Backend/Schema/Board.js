// models/Board.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Board = mongoose.model('Board', boardSchema);

export default Board;
