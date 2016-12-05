import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_ERROR, AUTH_USER, FETCH_MESSAGE, UNAUTH_USER } from './types';


const API_URL = 'http://localhost:3090';

export function authError(errorStr) {
  return {
    payload: errorStr,
    type: AUTH_ERROR,
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') },
    })
      .then(res => {
        dispatch({ payload: res.data.message, type: FETCH_MESSAGE });
      });
  }
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${API_URL}/signin`, { email, password })
      .then(res => {
        // If request is good:
        // - update the state to indicate the user is authenticated;
        dispatch({ type: AUTH_USER });
        // - save the JWT token;
        localStorage.setItem('token', res.data.token);
        // - redirect to the route '/feature'.
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If the request is bad:
        // - show an error to the user;
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/feature');
      })
      .catch(res => dispatch(authError(res.response.data.error)));
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}
