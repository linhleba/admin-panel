import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Layout from './components/layout/Layout';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/grid.css';
import './assets/css/index.css';
import './assets/css/theme.css';
import { Provider } from 'react-redux';
import store from './components/redux/configureStore';
import SnackBar from './components/snackbar/SnackBar';
import App from './components/App';

document.title = 'Report';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SnackBar /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
