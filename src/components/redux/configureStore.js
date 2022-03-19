import { combineReducers, createStore } from 'redux';
import snackbarReducer from './ducks/snackbar';
import authenticateReducer from './ducks/auth';

const reducer = combineReducers({
  snackbar: snackbarReducer,
  authenticate: authenticateReducer,
});

const store = createStore(reducer, {});

export default store;
