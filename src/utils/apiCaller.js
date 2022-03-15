import axios from 'axios';
import * as Config from '../constants/Config';
import React from 'react';

const apiCaller = (endpoint, method = 'GET', payload) => {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: payload,
    headers: { 'Content-Type': 'application/json' },
    // credentials: 'include',
    // headers: {
    //   Cookie:
    //     'access_jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidHlwZSI6MSwiaWF0IjoxNjQ3MjY2MjI4LCJleHAiOjE2NDcyNjk4Mjh9.Vl4m7InvL3sjJA99StiTIlxP509jeQ9KUn7r4F742dI; cookie2=value; cookie3=value;',
    // },
    withCredentials: true,
  }).catch(function (error) {
    // handle error
    return error;
  });
};

export default apiCaller;
