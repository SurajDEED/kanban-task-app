
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import subtaskSchema from './Subtask.js';
const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['todo', 'doing', 'completed'], default: 'todo' },
    subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }]
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
