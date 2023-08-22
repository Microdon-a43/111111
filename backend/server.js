import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import tasksRouter from './routers/tasksRouter.js';
import userRouter from './routers/userRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 300);
  });
  next();
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error(err));

app.use('/', tasksRouter);
app.use('/', userRouter);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server is up on port - ${PORT}`);
});
