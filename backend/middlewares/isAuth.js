import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const isAuth = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res.status(401).json({
      message: 'Вы не были авторизованы.',
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
    if (err) return res.json({ message: 'Please login now!' });
    const user = await User.find({ _id: result._id });
    if (!user) return res.json({ message: 'Please register!' });

    req.user = user;
    next();
  });
};

export default isAuth;
