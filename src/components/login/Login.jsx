import React, { useState } from 'react';
import './login.css';
import PropTypes from 'prop-types';
import callAPI from '../../utils/apiCaller';

const loginUser = async (credentials) => {
  let res;
  await callAPI('api/account/login', 'POST', credentials).then((response) => {
    console.log(response);
    res = response.data.access_jwt_token;
    // return response;
    // get data from call api
    // setBooks(response.data);
  });
  return res;
};
// console.log('responseStatus', responseStatus);

const Login = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
