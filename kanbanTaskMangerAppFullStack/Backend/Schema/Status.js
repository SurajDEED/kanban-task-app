// models/Status.js
import mongoose from "mongoose";
const { Schema } = mongoose.Schema;

const statusSchema = new Schema({
    name: { type: String, required: true, unique: true }
});

const Status = mongoose.model('Status', statusSchema);

export default Status;
