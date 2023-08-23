import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginpage.css';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userInfo, serUserInfo] = useState({username: ""})

  function addUserName(e) {
    setUsername(e.target.value);
    const {name, value} = e.target
    serUserInfo({...userInfo, [name] : value})

  }
  function addUserPassword(e) {
    setPassword(e.target.value);
  }

  const loginUser = async (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({userInfo}))

    if (!userName || !userPassword) {
      alert('Неправильный логин или пароль');
      return;
    }

    const userData = {
      username: userName,
      password: userPassword,
    };

    try {
      const response = await axios.post(
        'http://localhost:5555/login',
        userData
      );
      if (response.data) {
        alert(`Приветствуем Вас, ${response.data.user.username}`);
        window.location.href = '/';
      } else {
        alert('Пользователя с таким именем не существует');
      }
    } catch (error) {
      console.log(error);
      alert('Неправильный логин или пароль');
    }
  };

  return (
    <div className="login">
      <h1>Войти</h1>
      <form className="login__form" onSubmit={loginUser}>
        <input type="text" name="username" placeholder="username" onChange={addUserName} />
        <input
          type="password"
          name='password'
          placeholder="password"
          onChange={addUserPassword}
        />
        <button type="submit">Войти</button>
        <div className="register-link">
          Не зарегистрированы? <Link to="/register">Регистрация</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
