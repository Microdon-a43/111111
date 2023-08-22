import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true, default: ''},
    isComplete: {type: Boolean, default: false},
    createdAt: {type: Date, default: new Date()},
    user: {type: mongoose.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Task', taskSchema)