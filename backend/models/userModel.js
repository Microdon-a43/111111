import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, default: '', required: true, unique: true},
    password: {type: String, required: true}
});

export default mongoose.model('User', userSchema)