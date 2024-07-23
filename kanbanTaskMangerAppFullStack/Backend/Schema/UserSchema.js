import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    auth0Id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    boards: [{ type: Schema.Types.ObjectId, ref: 'Board' }]
});

const User = mongoose.model('User', userSchema);
export default User;
