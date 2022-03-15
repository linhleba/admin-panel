import axios from 'axios';
import * as Config from '../constants/Config';
import React from 'react';

const BASE_URL = `${Config.API_URL}/`;
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosPrivate;
