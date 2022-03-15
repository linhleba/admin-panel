import callAPI from '../utils/apiCaller';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await callAPI('/api/account/refresh-token', 'get', {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.access_jwt_token);
      return { ...prev, access_jwt_token: response.data.access_jwt_token };
    });
    return response.data.access_jwt_token;
  };
  return refresh;
};

export default useRefreshToken;
