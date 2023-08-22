import express from 'express';
import { taskController } from '../controllers/tasksController.js';
import isAuth from '../middlewares/isAuth.js'

const tasksRouter = express.Router();

tasksRouter.post('/create-task', isAuth, taskController.createTask);
tasksRouter.get('/tasks', taskController.getAllTasks);
tasksRouter.get('/tasks/:id', taskController.getOneTask);
tasksRouter.patch('/tasks/:id', taskController.updateTask);
tasksRouter.delete('/tasks', taskController.deleteAllTasks);
tasksRouter.delete('/tasks/:id', taskController.deleteOneTask);

export default tasksRouter;
