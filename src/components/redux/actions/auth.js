import { authenticate } from '../ducks/auth';
import * as api from '../../../api/index';

// export const signIn = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await api.signIn(formData);

//     dispatch(authenticate(data));

//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signUp = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);

//     dispatch(authenticate(data));

//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };
