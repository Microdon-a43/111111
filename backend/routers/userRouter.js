import express from 'express';
import { userCtrl } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', userCtrl.register)
userRouter.post('/login', userCtrl.login)


export default userRouter;