import axios from 'axios';
import * as Config from '../constants/Config';
import React from 'react';

const apiCaller = (endpoint, method = 'GET', payload) => {
  return (
    axios({
      method: method,
      url: `${Config.API_URL}/${endpoint}`,
      data: payload,
    })
      // .then(function (response) {
      //   // handle success
      //   console.log(response);
      // })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  );
  // .then(function () {
  //   // always executed
  // });
};

export default apiCaller;
