
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subtaskSchema = new Schema({
    name: { type: String, required: true },
    isCompleted: { type: Boolean, default: false }
});
const Subtask = mongoose.model('Subtask', subtaskSchema);
export default Subtask;
