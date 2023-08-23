import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true, default: ''},
    isComplete: {type: Boolean, default: false},
    createdAt: {type: Date, default: new Date()},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    authorsName: String,
    description: String,
})

export default mongoose.model('Task', taskSchema)