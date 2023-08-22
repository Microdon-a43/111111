import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userCtrl = {
  register: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user)
        return res.json({
          message: 'Пользователь с таким именем уже существует',
        });

      const hashedPassword = await bcrypt.hash(req.body.password, 8);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      newUser.save();
      res.status(200).json({
        message: 'Пользователь создан успешно',
        newUser,
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user)
        return res.json({
          message: 'Неверное имя пользователя или пароль',
        });

      const passCheck = await bcrypt.compare(req.body.password, user.password);
      if (!passCheck)
        return res.status(404).json({
          message: 'Неверное имя пользователя или пароль',
        });

      const accessToken = jwt.sign(
        { _id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/api/accessToken',
      });

      return res.status(200).json({
        message: 'Вы успешно вошли в личный кабинет',
        user,
        accessToken,
      });
    } catch (error) {
      console.log('dfsdfgfgdfbdb');
    }
  },
};
