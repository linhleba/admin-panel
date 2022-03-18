import React, { useState } from 'react';
import './login.css';
import PropTypes from 'prop-types';
import callAPI from '../../utils/apiCaller';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import './login.css';
import useStyles from './style.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Controls from '../../components/controls/Controls';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
// import { AUTH } from '../../constants/actionTypes';
import { authenticate } from '../../components/redux/ducks/auth';
import { signIn, signUp } from '../../components/redux/actions/auth';
import { useHistory } from 'react-router-dom';
import * as api from '../../api/index';

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

const initialState = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const Login = ({ setToken }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [form, setForm] = useState(initialState);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  // const [username, setUserName] = useState();
  // const [password, setPassword] = useState();

  const switchMode = () => {
    setForm(initialState);
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = await loginUser({
    //   username,
    //   password,
    // });
    // setToken(token);
    if (isSignedUp) {
      // dispatch(signUp(form, history));
    } else {
      console.log(form);
      const { data } = await api.signIn(form);
      setToken(data.access_jwt_token);
      dispatch(authenticate(data));
      history.push('/');
      // dispatch(signIn(form, history));
    }
  };
  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;
    const data = {
      result,
      token,
    };

    try {
      dispatch(authenticate(data));
      // history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    alert('Đã có lỗi xảy ra trong quá trình đăng nhập. Thử lại sau!');
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignedUp ? 'Đăng kí' : 'Đăng nhập'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <Input
                name="name"
                label="Họ tên"
                autoFocus
                handleChange={handleChange}
              />
            )}
            <Input
              name="username"
              label="Tên người dùng"
              type="text"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
            {isSignedUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                // handleChange={handleChange}
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? 'Đăng kí' : 'Đăng nhập'}
          </Button>
          <GoogleLogin
            clientId="760325754105-f20dtj8ttufvs00sufb4sc9fniq83apk.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Đăng nhập Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp
                  ? 'Đã có tài khoản? Đăng nhập'
                  : 'Chưa có tài khoản? Đăng kí'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
