import apiCaller from '../utils/apiCaller';

export const signIn = (formData) =>
  apiCaller('api/account/login', 'post', formData);
export const signUp = (formData) =>
  apiCaller('api/account/create', 'post', formData);
